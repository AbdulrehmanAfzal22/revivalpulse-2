import {create} from 'zustand';
import {persist} from 'zustand/middleware';
interface NarratorPreferences {englishVoice:string;urduVoice:string;speed:number;setVoice:(language:'en'|'ur',voice:string)=>void;setSpeed:(speed:number)=>void}
export const useNarratorPreferences=create<NarratorPreferences>()(persist((set)=>({englishVoice:'',urduVoice:'',speed:1,setVoice:(language,voice)=>set(language==='ur'?{urduVoice:voice}:{englishVoice:voice}),setSpeed:(speed)=>set({speed:Math.min(1.25,Math.max(.75,speed))})}),{name:'islamicweb-narrator',partialize:({englishVoice,urduVoice,speed})=>({englishVoice,urduVoice,speed})}));
