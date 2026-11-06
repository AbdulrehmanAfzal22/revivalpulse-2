#!/usr/bin/env python3
"""Generate local English/Urdu natural narration. Requires edge-tts and ffmpeg.
Run exportStoryNarration.cjs first. No runtime speech API or key is needed by the app.
Uses verified TLS; never disables certificate or hostname checks.
"""
import argparse,asyncio,json,os,re,ssl,tempfile,unicodedata,hashlib,time
from pathlib import Path
import edge_tts
import edge_tts.communicate
parser=argparse.ArgumentParser();parser.add_argument('--source',required=True);parser.add_argument('--root',default=str(Path(__file__).resolve().parent.parent));parser.add_argument('--work',required=True);parser.add_argument('--limit',type=int);parser.add_argument('--concurrency',type=int,default=4);args=parser.parse_args()
root=Path(args.root);work=Path(args.work);work.mkdir(parents=True,exist_ok=True)
if os.environ.get('SSL_CERT_FILE'):edge_tts.communicate._SSL_CTX=ssl.create_default_context(cafile=os.environ['SSL_CERT_FILE'])
VOICES={'en':'en-US-JennyNeural','ur':'ur-PK-UzmaNeural'};RATES={'en':'-8%','ur':'-7%'}
def spoken(text,language):
 text=re.sub(r'\([^)]*(?:Qur|Quran|Bukhari|Muslim|Seerah|Tirmidhi|Ibn |\d\s*:\s*\d)[^)]*\)','',text,flags=re.I)
 text=text.replace('ﷺ','صلی اللہ علیہ وسلم' if language=='ur' else 'peace and blessings be upon him')
 text=re.sub(r'\((?:AS|A\.S\.)\)','علیہ السلام' if language=='ur' else 'peace be upon him',text)
 text=re.sub(r'\((?:RA|R\.A\.)\)','رضی اللہ عنہ' if language=='ur' else 'may Allah be pleased with them',text)
 return re.sub(r'\s+',' ',text).strip()
def normalize(text):return ''.join(c for c in unicodedata.normalize('NFKC',text).casefold() if c.isalnum())
async def synth(text,lang,target):
 events=[]
 for attempt in range(2):
  try:
   target.parent.mkdir(parents=True,exist_ok=True)
   with target.open('wb') as f:
    async for item in edge_tts.Communicate(text,VOICES[lang],rate=RATES[lang],boundary='WordBoundary',connect_timeout=15,receive_timeout=90).stream():
     if item['type']=='audio':f.write(item['data'])
     elif item['type']=='WordBoundary':events.append(item)
   if target.stat().st_size<1000:raise ValueError('Empty audio')
   return events
  except Exception:
   events=[]
   if attempt:raise
   await asyncio.sleep(2)
async def cut(source,target,start,end=None):
 target.parent.mkdir(parents=True,exist_ok=True)
 command=['ffmpeg','-nostdin','-v','error','-y','-i',str(source),'-ss',str(max(0,start))]
 if end is not None:command+=['-t',str(max(.1,end-max(0,start)))]
 command+=['-vn','-codec:a','libmp3lame','-b:a','48k','-ar','24000',str(target)]
 p=await asyncio.create_subprocess_exec(*command,stdout=asyncio.subprocess.DEVNULL,stderr=asyncio.subprocess.PIPE);_,err=await p.communicate()
 if p.returncode or not target.exists() or target.stat().st_size<500:raise RuntimeError('Audio segmentation failed: '+err.decode()[:100])
stories=json.loads(Path(args.source).read_text());jobs=[]
for story in stories:
 for chapter in story['chapters']:
  for language in ['en','ur']:
   parts=[(i,spoken(p.get(language,''),language)) for i,p in enumerate(chapter['paragraphs']) if p.get(language,'').strip()]
   if parts:jobs.append((story['id'],chapter['id'],language,parts))
if args.limit:jobs=jobs[:args.limit]
status={'chaptersRequested':len(jobs),'chaptersDone':0,'clipsWritten':0,'cachedClips':0,'alignmentFallbacks':0,'failed':[],'voices':VOICES,'rates':RATES};started=time.time();sem=None
def report():
 status['elapsedSeconds']=round(time.time()-started);(work/'progress.json').write_text(json.dumps(status,ensure_ascii=False,indent=2));print(json.dumps({k:status[k] for k in ['chaptersDone','chaptersRequested','clipsWritten','cachedClips','alignmentFallbacks','elapsedSeconds']}),flush=True)
async def chapter_job(job):
 async with sem:
  sid,cid,lang,parts=job;dest=lambda i:root/'public/audio/kids/story'/sid/cid/f'p{i}'/f'narration.{lang}.mp3'
  missing=[(i,t) for i,t in parts if not dest(i).exists() or dest(i).stat().st_size<1000]
  status['cachedClips']+=len(parts)-len(missing)
  if not missing:status['chaptersDone']+=1;return
  try:
   target=work/f'{sid}--{cid}--{lang}.mp3';events=await asyncio.wait_for(synth('\n\n'.join(t for _,t in parts),lang,target),180)
   wanted=''.join(normalize(t) for _,t in parts);observed=''.join(normalize(e['text']) for e in events)
   if observed==wanted and events:
    starts=[];position=0;threshold=0;which=0
    for event in events:
     if which<len(parts) and position==threshold:
      starts.append(event['offset']/10000000);threshold+=len(normalize(parts[which][1]));which+=1
     position+=len(normalize(event['text']))
    if len(starts)!=len(parts):raise ValueError('Timing does not align with paragraph boundaries')
    for pos,(index,text) in enumerate(parts):
     if (index,text) not in missing:continue
     await cut(target,dest(index),starts[pos]-.1,starts[pos+1]-.1 if pos+1<len(starts) else None);status['clipsWritten']+=1
   else:
    # Never guess a paragraph cut. If the service normalizes the words, record
    # the paragraphs individually so no child hears an incomplete sentence.
    status['alignmentFallbacks']+=1
    for index,text in missing:
     await asyncio.wait_for(synth(text,lang,dest(index)),150);status['clipsWritten']+=1
   status['chaptersDone']+=1
  except Exception as e:status['failed'].append({'story':sid,'chapter':cid,'language':lang,'error':type(e).__name__+': '+str(e)[:180]})
  if (status['chaptersDone']+len(status['failed']))%5==0:report()
async def main():
 global sem;sem=asyncio.Semaphore(max(1,min(args.concurrency,6)));report();await asyncio.gather(*(chapter_job(job) for job in jobs));report()
 manifest_path=root/'public/data/kidsStoryMedia.json';manifest=json.loads(manifest_path.read_text());narration={}
 for file in (root/'public/audio/kids/story').glob('*/*/p*/narration.*.mp3'):
  if file.stat().st_size<1000:continue
  sid,cid,panel,name=file.relative_to(root/'public/audio/kids/story').parts;lang=name.split('.')[1];narration.setdefault(sid,{}).setdefault(cid+'/'+panel,{})[lang]=name
 manifest['narration']=narration;manifest['narratorVoices']=VOICES;manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');(work/'completed.json').write_text(json.dumps(status,ensure_ascii=False,indent=2)+'\n')
 if status['failed']:raise SystemExit(1)
asyncio.run(main())
