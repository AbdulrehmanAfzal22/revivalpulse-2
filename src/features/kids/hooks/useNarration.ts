import { claimNarration, ownsNarration, releaseNarration } from 'features/speech/narrationOwner';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {pickVoice,speechLocale} from 'features/speech/voices';
import {useNarratorPreferences} from 'features/speech/preferences';
export {pickVoice} from 'features/speech/voices';
const SENTENCE_END=/(?<=[.!?\u2026\u06d4\u061f])\s+/;
export function toSentences(paragraph:string):string[]{return paragraph.split(SENTENCE_END).map(s=>s.trim()).filter(Boolean)}
export interface NarrationSentenceGroup {sentences:string[];start:number}
export interface NarrationOptions {clips?:Array<string|null>;languages?:string[]}
export interface Narration {supported:boolean;isSpeaking:boolean;activeSentence:number|null;playingParagraph:number|null;usingClip:boolean;error:string|null;toggle:()=>void;toggleParagraph:(index:number,clip?:string|null)=>void;stop:()=>void}
/** Paragraph queue: recorded clips first, then a natural language-matched voice.
 * Full-chapter playback and picture playback follow the same audio path. */
export function useNarration(paragraphs:string[],lang:string,options:NarrationOptions={}):Narration {
 const [isSpeaking,setSpeaking]=useState(false),[activeSentence,setActive]=useState<number|null>(null),[playingParagraph,setParagraph]=useState<number|null>(null),[usingClip,setClip]=useState(false),[error,setError]=useState<string|null>(null);
 const owner=useRef(Symbol('story-narrator'));
 const audioRef=useRef<HTMLAudioElement|null>(null),utteranceRef=useRef<SpeechSynthesisUtterance|null>(null),runId=useRef(0);
 const prefs=useNarratorPreferences();
 const groups=useMemo(()=>{let start=0;return paragraphs.map(p=>{const sentences=toSentences(p),group={sentences,start};start+=sentences.length;return group})},[paragraphs]);
 const contentKey=paragraphs.join('\n'),languagesKey=JSON.stringify(options.languages??[]);
 const supported=typeof window!=='undefined'&&('speechSynthesis' in window||!!options.clips?.some(Boolean));
 const halt=useCallback(()=>{runId.current++;if(ownsNarration(owner.current)){if(typeof window!=='undefined')window.speechSynthesis?.cancel();releaseNarration(owner.current)}const audio=audioRef.current;audioRef.current=null;if(audio){audio.onended=null;audio.onerror=null;audio.pause();audio.removeAttribute?.('src');audio.load?.()}utteranceRef.current=null;setSpeaking(false);setActive(null);setParagraph(null);setClip(false)},[]);
 useEffect(()=>{halt();setError(null);return halt},[halt,contentKey,lang,languagesKey,prefs.englishVoice,prefs.urduVoice,prefs.speed]);
 const start=useCallback((first:number,whole:boolean,overrideClip?:string|null)=>{
  halt();claimNarration(owner.current,halt);window.speechSynthesis?.cancel();setError(null);const run=runId.current;
  const current=()=>run===runId.current;
  const finish=()=>{if(!current())return;releaseNarration(owner.current);setSpeaking(false);setActive(null);setParagraph(null);setClip(false);utteranceRef.current=null};
  function paragraphAt(index:number):void {
   if(!current())return;const group=groups[index];if(!group){finish();return}
   setParagraph(index);setSpeaking(true);
   const next=()=>{if(!current())return;if(whole)paragraphAt(index+1);else finish()};
   const locale=speechLocale(paragraphs[index]??'',options.languages?.[index]??lang);
   function speak(sentenceIndex:number):void {
    if(!current())return;
    if(sentenceIndex>=group!.sentences.length){next();return}
    if(!window.speechSynthesis){setError('Narration is unavailable on this browser.');finish();return}
    const synth=window.speechSynthesis,voice=pickVoice(synth.getVoices(),locale,locale.startsWith('ur')?prefs.urduVoice:prefs.englishVoice);
    if(!voice){setError(locale.startsWith('ur')?'No Urdu narrator is installed on this device. Choose an Urdu voice in your device settings or use recorded narration.':'An English narrator is not available yet. Please try again after the voices load.');finish();return}
    const utterance=new SpeechSynthesisUtterance(group!.sentences[sentenceIndex]);utteranceRef.current=utterance;utterance.voice=voice;utterance.lang=locale;utterance.rate=(locale.startsWith('ur')?.9:.94)*prefs.speed;utterance.pitch=1;utterance.volume=1;
    utterance.onstart=()=>{if(current()){setActive(group!.start+sentenceIndex);setSpeaking(true);setParagraph(index)}};
    utterance.onend=()=>{if(current())speak(sentenceIndex+1)};
    utterance.onerror=event=>{if(!current())return;if(!['interrupted','canceled'].includes(event.error))setError('The narrator could not continue. Tap Listen to try again.');finish()};
    try{synth.speak(utterance);if(synth.paused)synth.resume()}catch{setError('The narrator could not start. Please try again.');finish()}
   }
   const clip=index===first&&overrideClip!==undefined?overrideClip:options.clips?.[index];
   if(clip){const audio=new Audio(clip);audioRef.current=audio;audio.playbackRate=prefs.speed;setClip(true);setActive(null);
    let failed=false;const fallback=()=>{if(failed||!current()||audioRef.current!==audio)return;failed=true;audioRef.current=null;audio.onended=null;audio.onerror=null;audio.pause();setClip(false);speak(0)};
    audio.onended=()=>{if(!current()||audioRef.current!==audio)return;audioRef.current=null;setClip(false);next()};audio.onerror=fallback;audio.play().catch(fallback);
   }else{setClip(false);speak(0)}
  }
  paragraphAt(first);
 },[halt,groups,paragraphs,lang,options.clips,options.languages,prefs.englishVoice,prefs.urduVoice,prefs.speed]);
 const toggle=useCallback(()=>{if(isSpeaking)halt();else start(0,true)},[isSpeaking,halt,start]);
 const toggleParagraph=useCallback((index:number,clip?:string|null)=>{if(isSpeaking&&playingParagraph===index)halt();else start(index,false,clip)},[isSpeaking,playingParagraph,halt,start]);
 return {supported,isSpeaking,activeSentence,playingParagraph,usingClip,error,toggle,toggleParagraph,stop:halt};
}
