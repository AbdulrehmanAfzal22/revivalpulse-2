const fs=require('fs'),path=require('path'),Module=require('module'),ts=require('typescript');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(r,p,...rest){if(/^(data|features|types)\//.test(r))r=path.join(root,'src',r);return resolve.call(this,r,p,...rest)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,f);
const all=[...require('../src/data/kids/storiesV2').KIDS_STORIES_V2,...require('../src/data/kids/sahabiV2').KIDS_SAHABI_V2];
const out=process.argv[2];if(!out)throw new Error('Provide an output JSON path');fs.writeFileSync(out,JSON.stringify(all.map(s=>({id:s.id,name:s.nameEnglish,chapters:s.chapters.map(c=>({id:c.id,paragraphs:c.paragraphs}))})),null,2));console.log(`Exported ${all.length} stories`);
