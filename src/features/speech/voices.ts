/** Natural voices win; language matching is mandatory. No English fallback for Urdu text. */
export function speechLocale(text: string, requested = 'en'): string {
  const code=requested.toLowerCase();
  if(code.startsWith('ur')) {
    const arabic=(text.match(/[\u0600-\u06ff]/g)||[]).length;
    const latin=(text.match(/[a-z]/gi)||[]).length;
    return arabic>latin*.25?'ur-PK':'en-US';
  }
  return code.startsWith('en')?'en-US':requested;
}
export function voiceScore(voice: SpeechSynthesisVoice, locale: string): number {
 const prefix=locale.slice(0,2).toLowerCase();
 if(voice.lang.toLowerCase().split(/[-_]/)[0]!==prefix)return Infinity;
 const n=voice.name;let quality=60;
 if(/natural|neural|premium|enhanced/i.test(n))quality=5;
 if(/\b(?:jenny|aria|sonia|libby|uzma|gul)\b/i.test(n))quality=Math.min(quality,3);
 if(/google/i.test(n))quality=Math.min(quality,18);
 if(/samantha|serena|karen|moira|tessa|fiona/i.test(n))quality=Math.min(quality,20);
 // Keep a natural voice ahead of a legacy voice even if the latter is local.
 return quality+(voice.lang.toLowerCase()===locale.toLowerCase()?0:1)+(voice.default?0:.1);
}
export function pickVoice(voices: SpeechSynthesisVoice[],locale:string,preferredURI?:string):SpeechSynthesisVoice|null {
 const candidates=voices.filter(v=>Number.isFinite(voiceScore(v,locale)));
 return candidates.find(v=>v.voiceURI===preferredURI)??candidates.slice().sort((a,b)=>voiceScore(a,locale)-voiceScore(b,locale))[0]??null;
}
export function voicesFor(voices:SpeechSynthesisVoice[],locale:string):SpeechSynthesisVoice[]{return voices.filter(v=>Number.isFinite(voiceScore(v,locale))).sort((a,b)=>voiceScore(a,locale)-voiceScore(b,locale));}
