/* Offline planning only. All scene subjects come from the story resolver. */
const fs=require('fs'),path=require('path'),Module=require('module'),ts=require('typescript');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(r,p,...rest){if(/^(data|features|types)\//.test(r))r=path.join(root,'src',r);return resolve.call(this,r,p,...rest)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,resolveJsonModule:true}}).outputText,f);
const stories=[...require('../src/data/kids/storiesV2').KIDS_STORIES_V2,...require('../src/data/kids/sahabiV2').KIDS_SAHABI_V2];
const {resolvePanelScenes,resolveScene}=require('../src/features/kids/storyScenes/scenes');
const {STORYBOARD_STAGES}=require('../src/features/kids/storyScenes/storyboard');
const result={},globalCompositions=new Set();let max=0;
// The order is deliberately interleaved: consecutive panels never reuse a set.
const order=[0,3,7,12,19,5,16,24,9,21,14,28,2,18,26,11,30,6,23,15,29,4,20,10,27,17,31,8,22,13,25,1];
for(const [storyIndex,story] of stories.entries()){
 const used=new Map(),sets=new Map();let panel=0,lastStage=-1;
 const reserve=(id,motif)=>{const n=used.get(motif)||0;used.set(motif,n+1);max=Math.max(max,n+1);
 if(n>=order.length)throw Error('More returns to a subject than distinct sets: '+id);
 // Rotate per story, keeping all returns to each subject distinct.
 const taken=sets.get(motif)||new Set();let choice;
 for(let offset=0;offset<order.length&&!choice;offset++){
  const stageIndex=order[(panel*7+storyIndex*3+offset)%order.length];
  if(taken.has(stageIndex)||stageIndex===lastStage)continue;
  const stage=STORYBOARD_STAGES[stageIndex];
  for(let delta=0;delta<12;delta++){
   const pose=(n+panel+storyIndex+delta)%12;
   if(!globalCompositions.has(motif+'/'+stage+'/'+pose)){choice={stage,stageIndex,pose};break}
  }
 }
 if(!choice)throw Error('No unused subject/set/pose combination for '+id);
 taken.add(choice.stageIndex);sets.set(motif,taken);lastStage=choice.stageIndex;
 globalCompositions.add(motif+'/'+choice.stage+'/'+choice.pose);
 result[id]={stage:choice.stage,encounter:n,pose:choice.pose};panel++};
 for(const chapter of story.chapters){
  reserve(`${story.id}/${chapter.id}/cover`,resolveScene(chapter,story.illustrationSymbol).motif);
  resolvePanelScenes(chapter,story.illustrationSymbol,story.id).forEach(({spec},i)=>reserve(`${story.id}/${chapter.id}/p${i}`,spec.motif));
 }
}
fs.writeFileSync(path.join(root,'src/features/kids/storyScenes/storyboardInventory.json'),JSON.stringify(result,null,2)+'\n');
console.log('Reserved '+Object.keys(result).length+' independent compositions; maximum returns to one subject in a story: '+max);
