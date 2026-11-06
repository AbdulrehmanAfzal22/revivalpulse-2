/* Offline visual QA: render the actual React SVGs; no network requests. */
const fs=require('fs'),path=require('path'),crypto=require('crypto'),Module=require('module'),ts=require('typescript'),React=require('react'),sharp=require('sharp');
const {renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(r,p,...rest){if(/^(data|features|types|components|hooks|utils|contexts)\//.test(r))r=path.join(root,'src',r);return resolve.call(this,r,p,...rest)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,resolveJsonModule:true}}).outputText,f);
require.extensions['.css']=m=>m.exports=new Proxy({},{get:(_,k)=>String(k)});
const stories=[...require('../src/data/kids/storiesV2').KIDS_STORIES_V2,...require('../src/data/kids/sahabiV2').KIDS_SAHABI_V2];
const {resolvePanelScenes,resolveScene}=require('../src/features/kids/storyScenes/scenes');
const StoryScene=require('../src/features/kids/components/StoryScene').default;
const {storyboardFor}=require('../src/features/kids/storyScenes/storyboard');
const manifest=require('../public/data/kidsStoryMedia.json');
const out=path.resolve(process.argv[2]||path.join(root,'docs/story-art-v3'));
fs.mkdirSync(path.join(out,'thumbnails'),{recursive:true});
const rows=[],failures=[],hashes=new Map(),perceptual=[];const escape=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
(async()=>{
 for(const story of stories){const compositions=new Map();for(const chapter of story.chapters){
 const shots=[{id:'cover',spec:resolveScene(chapter,story.illustrationSymbol),text:chapter.title.en,frame:0},...resolvePanelScenes(chapter,story.illustrationSymbol,story.id).map((s,i)=>({...s,id:'p'+i,text:chapter.paragraphs[i].en}))];
 for(const {id,spec,text,frame} of shots){
  const seed=`${story.id}/${chapter.id}/${id}`,shot=storyboardFor(seed),file=manifest.paintings?.[story.id]?.[`${chapter.id}/${id}`];
  const markup=renderToStaticMarkup(React.createElement(StoryScene,{scene:spec,accent:story.accentColor,seed,frame}));
  const svg=markup.slice(markup.indexOf('<svg'),markup.lastIndexOf('</svg>')+6).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
  const buffer=file?fs.readFileSync(path.join(root,'public/assets/kids/story-art',story.id,chapter.id,id,file)):Buffer.from(svg);
  const canonical=file?buffer:svg.replace(/(?:aria-label|data-story-art|data-art-layout)="[^"]*"/g,'').replace(/id="[^"]*"/g,'id="ID"').replace(/url\(#[^)]+\)/g,'url(#ID)');
  const digest=crypto.createHash('sha256').update(canonical).digest('hex');
  if(hashes.has(digest))failures.push('Identical artwork: '+seed+' and '+hashes.get(digest));hashes.set(digest,seed);
  const composition=spec.motif+'/'+shot?.stage;
  if(!file&&compositions.has(composition))failures.push('Repeated subject/set: '+seed+' and '+compositions.get(composition));
  if(!file)compositions.set(composition,seed);
  const thumbnail=seed.replaceAll('/','--')+'.webp';
  await sharp(buffer).resize(320,180,{fit:'cover'}).webp({quality:80}).toFile(path.join(out,'thumbnails',thumbnail));
  const pixels=await sharp(path.join(out,'thumbnails',thumbnail)).resize(9,8).greyscale().raw().toBuffer();
  let fingerprint=0n;for(let y=0;y<8;y++)for(let x=0;x<8;x++)fingerprint=(fingerprint<<1n)|BigInt(pixels[y*9+x]>pixels[y*9+x+1]);
  perceptual.push({id:seed,storyId:story.id,fingerprint});
  rows.push({id:seed,story:story.nameEnglish,storyId:story.id,kind:file?'painting':'native illustration',motif:spec.motif,stage:shot?.stage,pose:shot?.pose,thumbnail,text});
 }
 }}
 const closePairs=[];
 for(let i=0;i<perceptual.length;i++)for(let j=i+1;j<perceptual.length;j++){
  const a=perceptual[i],b=perceptual[j];if(a.storyId!==b.storyId)continue;
  let xor=a.fingerprint^b.fingerprint,distance=0;while(xor&&distance<=3){distance++;xor&=xor-1n}
  if(distance<=3)closePairs.push({a:a.id,b:b.id,distance});
 }
 const report={withinStoryPerceptualCandidates:closePairs,perceptualScreen:'64-bit horizontal dHash, distance <=3. A candidate screen, not a percentage similarity guarantee.',stories:stories.length,chapters:rows.filter(r=>r.id.endsWith('/cover')).length,paragraphs:rows.filter(r=>!r.id.endsWith('/cover')).length,artworks:rows.length,paintings:rows.filter(r=>r.kind==='painting').length,identicalArtworkOrReusedSubjectSet:failures.length,failures,scope:'Entire story, including all chapter headers. Structural duplicates plus rendered file equality. These are not a claim of a universal 50% perceptual similarity score.'};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(out,'inventory.json'),JSON.stringify(rows,null,2)+'\n');
 const options=stories.map(s=>`<option value="${escape(s.id)}">${escape(s.nameEnglish)}</option>`).join('');
 const cards=rows.map(r=>`<article data-story="${escape(r.storyId)}"><img src="thumbnails/${r.thumbnail}" width="320" height="180" alt="${escape(r.motif)}" loading="lazy"><div><strong>${escape(r.id)}</strong><p>${escape(r.text)}</p><small>${escape(r.kind+' · '+r.stage)}</small></div></article>`).join('');
 fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>All story illustrations — visual review</title><style>*{box-sizing:border-box}body{margin:0;background:#f8f3e9;color:#302e28;font:15px system-ui}header{position:sticky;top:0;background:#fffdf7ed;padding:20px 5vw;z-index:1;border-bottom:1px solid #ddd}h1{font-size:22px;margin:0 0 8px}select{max-width:100%;padding:10px;margin-top:10px}main{padding:24px 5vw;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:22px}article{border-radius:16px;overflow:hidden;background:white;box-shadow:0 3px 18px #302e2812}article[hidden]{display:none}img{display:block;width:100%;height:auto;aspect-ratio:16/9}article div{padding:16px}strong{font-size:12px;overflow-wrap:anywhere}p{line-height:1.6}small{color:#666}header p{margin:0;font-size:13px}</style><header><h1>Story illustration review</h1><p>${report.stories} stories · ${report.paragraphs} paragraph illustrations · ${report.chapters} separate chapter covers</p><select id="filter" aria-label="Choose story"><option value="">All stories</option>${options}</select></header><main>${cards}</main><script>document.getElementById('filter').onchange=function(){document.querySelectorAll('article').forEach(x=>x.hidden=this.value&&x.dataset.story!==this.value)}</script></html>`);
 console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
