/* Run: node scripts/verifyStoryArtwork.cjs. Read-only validation; requires npm install. */
const fs=require('fs'),path=require('path'),crypto=require('crypto'),Module=require('module');
const root=path.resolve(__dirname,'..');
const ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const originalResolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...rest){if(/^(data|features|types|components|hooks|utils|contexts)\//.test(request))request=path.join(root,'src',request);return originalResolve.call(this,request,parent,...rest)};
for(const extension of ['.ts','.tsx'])require.extensions[extension]=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,resolveJsonModule:true}}).outputText,file);
require.extensions['.css']=(m)=>{m.exports=new Proxy({},{get:(_,key)=>String(key)})};
const {KIDS_STORIES_V2}=require('../src/data/kids/storiesV2'),{KIDS_SAHABI_V2}=require('../src/data/kids/sahabiV2');
const {resolvePanelScenes}=require('../src/features/kids/storyScenes/scenes');
const StoryScene=require('../src/features/kids/components/StoryScene').default;
const manifest=JSON.parse(fs.readFileSync(path.join(root,'public/data/kidsStoryMedia.json'),'utf8'));
const stories=[...KIDS_STORIES_V2,...KIDS_SAHABI_V2];
let chapters=0,panels=0,native=0,preserved=0,paintings=0;const seen=new Map(),failures=[],rows=[],samples=[];
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
for(const story of stories)for(const chapter of story.chapters){chapters++;const plans=resolvePanelScenes(chapter,story.illustrationSymbol,story.id);
 if(plans.length!==chapter.paragraphs.length)failures.push('Missing panels: '+story.id+'/'+chapter.id);
 plans.forEach(({spec,frame},i)=>{panels++;const id=`${story.id}/${chapter.id}/p${i}`,file=manifest.paintings?.[story.id]?.[`${chapter.id}/p${i}`];let kind,signature,picture;
 if(file){paintings++;kind=file==='image.jpg'?'preserved painting':'new painting';const rel=`/assets/kids/story-art/${id}/${file}`,local=path.join(root,'public',rel);if(!fs.existsSync(local))failures.push('Missing image: '+rel);else {signature='raster:'+hash(fs.readFileSync(local));picture=`<img src="${rel}" alt="${spec.alt.replace(/"/g,'&quot;')}" style="width:100%;display:block;aspect-ratio:16/9;object-fit:cover"/>`;}}
 else {if(spec.art){native++;kind='contextual vector'}else{preserved++;kind='preserved vector'}
 picture=renderToStaticMarkup(React.createElement(StoryScene,{scene:spec,accent:story.accentColor,seed:id,frame}),{identifierPrefix:hash(id).slice(0,12)});
 // Ignore metadata, labels and React-generated ids. Uniqueness must come from
 // actual shapes/composition rather than filenames or accessibility copy.
 const canonical=picture.replace(/(?:aria-label|data-story-art|data-art-layout)="[^"]*"/g,'').replace(/id="[^"]*"/g,'id="ID"').replace(/url\(#[^)]+\)/g,'url(#ID)');signature='vector:'+hash(canonical);
 if(!picture.includes('<svg'))failures.push('No drawn artwork: '+id);
 }
 if(signature){const prior=seen.get(signature);if(prior)failures.push(`Duplicate rendered artwork: ${prior} and ${id}`);seen.set(signature,id)}
 rows.push([id,kind,spec.motif,spec.art?.secondary??'',spec.art?.layout??'original',chapter.paragraphs[i].en]);
 if((samples.length<2&&story.id==='adam')||(['nuh','musa','sulayman','bilal','salman','uthman','aisha','khadijah','ibrahim','yunus','salih','dawud'].includes(story.id)&&i<2&&['the-ark-command','the-night-of-the-sea','valley-of-ants','bought-and-freed','the-trench-of-salman','one-quran','early-faith','fair-merchant-of-makkah','searching-for-truth','in-the-fish','the-miraculous-she-camel','iron-armor'].includes(chapter.id)))samples.push({id,picture,text:chapter.paragraphs[i].en});
 });
}
const expect=(story,chapter,index,motif)=>{const s=stories.find(x=>x.id===story),c=s.chapters.find(x=>x.id===chapter),actual=resolvePanelScenes(c,s.illustrationSymbol,story)[index].spec.motif;if(actual!==motif)failures.push(`Context regression: ${story}/${chapter}/p${index} should be ${motif}, got ${actual}`)};
expect('adam','creation',0,'clayBank');expect('adam','names',0,'learningObjects');expect('nuh','the-ark-command',1,'arkWorkshop');expect('musa','the-night-of-the-sea',3,'seaPassage');expect('musa','the-night-of-the-sea',4,'closingSea');expect('sulayman','valley-of-ants',1,'antValley');expect('salman','the-trench-of-salman',2,'trench');expect('bilal','bought-and-freed',0,'freedom');expect('uthman','well-of-rumah',0,'well');
const report={stories:stories.length,prophets:KIDS_STORIES_V2.length,companions:KIDS_SAHABI_V2.length,chapters,panels,paintings,preservedVectorPanels:preserved,contextualVectorPanels:native,duplicateOrMissingArtwork:failures.length,failures};
console.log(JSON.stringify(report,null,2));
if(process.env.ART_REPORT_DIRECTORY){const out=path.resolve(process.env.ART_REPORT_DIRECTORY);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'story-art-verification.json'),JSON.stringify(report,null,2)+'\n');fs.writeFileSync(path.join(out,'story-art-panel-audit.csv'),'panel,status,subject,secondary,composition,paragraph\n'+rows.map(row=>row.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(',')).join('\n')+'\n');fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><meta charset="utf-8"><title>Story artwork review</title><style>body{font:14px system-ui;background:#f7f1e7;padding:24px;color:#342d26}main{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.scene{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:16px}.art{position:absolute;inset:0;width:100%;height:100%}.vignette{display:none}article{background:white;border-radius:16px;overflow:hidden}p,h3{padding:0 14px}p{line-height:1.5;font-size:12px}h3{font-size:12px}img{width:100%}</style><h1>Paragraph artwork review</h1><main>`+samples.map(x=>`<article>${x.picture}<h3>${x.id}</h3><p>${x.text}</p></article>`).join('')+'</main>');}
if(failures.length)process.exitCode=1;
