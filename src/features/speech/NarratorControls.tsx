import {useMemo} from 'react';
import useVoices from './useVoices';
import {voicesFor} from './voices';
import {useNarratorPreferences} from './preferences';
import {useNarration} from 'features/kids/hooks/useNarration';
import styles from './NarratorControls.module.css';
export default function NarratorControls(){
 const voices=useVoices(),prefs=useNarratorPreferences();
 const english=useMemo(()=>voicesFor(voices,'en-US'),[voices]),urdu=useMemo(()=>voicesFor(voices,'ur-PK'),[voices]);
 const en=useNarration(['Welcome, little explorer. Let us enjoy a beautiful story together.'],'en');
 const ur=useNarration(['آؤ بچو، آج ہم ایک خوبصورت کہانی سنتے ہیں۔'],'ur');
 return <details className={styles.panel}><summary>Narrator &amp; reading speed <span lang="ur" dir="rtl">راوی اور رفتار</span></summary><p className={styles.message}>Choose a voice available on this device. Saved story recordings, when available, play first.</p><div className={styles.controls}>
 {([{code:'en' as const,title:'English narrator',list:english,selected:prefs.englishVoice,preview:en},{code:'ur' as const,title:'Urdu narrator · اردو آواز',list:urdu,selected:prefs.urduVoice,preview:ur}]).map(item=><div className={styles.field} key={item.code}><label htmlFor={`narrator-${item.code}`}>{item.title}</label><select id={`narrator-${item.code}`} value={item.list.some(v=>v.voiceURI===item.selected)?item.selected:''} onChange={e=>{en.stop();ur.stop();prefs.setVoice(item.code,e.target.value)}}><option value="">Best available natural voice</option>{item.list.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name} · {v.lang}</option>)}</select><button type="button" disabled={!item.list.length} onClick={()=>{if(item.code==='en')ur.stop();else en.stop();item.preview.toggle()}}>{item.preview.isSpeaking?'Stop preview':'Preview voice'}</button>{!item.list.length&&<p>{item.code==='ur'?'No Urdu voice is available on this device. Recorded Urdu audio will still play.':'Your device’s English voices will appear here when available.'}</p>}</div>)}
 <div className={styles.field}><label htmlFor="narrator-speed">Reading speed</label><select id="narrator-speed" value={prefs.speed} onChange={e=>prefs.setSpeed(Number(e.target.value))}><option value={.8}>Gentle · 0.8×</option><option value={.9}>Relaxed · 0.9×</option><option value={1}>Storytelling · 1×</option><option value={1.1}>Brisk · 1.1×</option><option value={1.25}>Fast · 1.25×</option></select></div></div>{(en.error||ur.error)&&<p className={styles.message} role="status">{en.error||ur.error}</p>}</details>;
}
