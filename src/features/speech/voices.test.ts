import {pickVoice,speechLocale,voicesFor} from './voices';
const voice=(name:string,lang:string,extra:Partial<SpeechSynthesisVoice>={}):SpeechSynthesisVoice=>({name,lang,voiceURI:name,default:false,localService:true,...extra});
describe('narrator selection',()=>{
 const legacy=voice('Microsoft David','en-US',{default:true}),natural=voice('Microsoft Jenny Online (Natural)','en-US'),urdu=voice('Microsoft Uzma Online (Natural)','ur-PK');
 it('chooses a natural English voice over a legacy default regardless of ordering',()=>{expect(pickVoice([natural,legacy],'en-US')).toBe(natural);expect(pickVoice([legacy,natural],'en-US')).toBe(natural)});
 it('does not choose the highest numerical (worst) quality rank',()=>expect(pickVoice([natural,voice('Old robotic voice','en-US')],'en-US')).toBe(natural));
 it('picks a natural Urdu narrator in its own language',()=>expect(pickVoice([legacy,urdu,natural],'ur-PK')).toBe(urdu));
 it('never substitutes an English narrator for Urdu text',()=>expect(pickVoice([natural],'ur-PK')).toBeNull());
 it('honors a saved compatible narrator',()=>expect(pickVoice([legacy,natural],'en-US',legacy.voiceURI)).toBe(legacy));
 it('ignores a saved narrator from another language',()=>expect(pickVoice([natural,urdu],'ur-PK',natural.voiceURI)).toBe(urdu));
 it('falls back to automatic choice if a saved voice was removed',()=>expect(pickVoice([natural],'en-US','missing')).toBe(natural));
 it('keeps English fallback paragraphs in English even when Urdu is selected',()=>expect(speechLocale('This chapter is currently available in English.','ur')).toBe('en-US'));
 it('recognizes genuine Urdu story text',()=>expect(speechLocale('آؤ بچو، آج ہم ایک خوبصورت کہانی سنتے ہیں۔','ur')).toBe('ur-PK'));
 it('does not mistake an Arabic honorific inside English for an Urdu paragraph',()=>expect(speechLocale('The Prophet ﷺ taught us to be kind and honest.','ur')).toBe('en-US'));
 it('sorts voice choices by quality and excludes incompatible languages',()=>expect(voicesFor([legacy,urdu,natural],'en-US')).toEqual([natural,legacy]));
});
