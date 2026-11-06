import type { MotifRenderer } from './sceneTypes';
/** Alternate native drawings for the most frequently returning story subjects.
 * These change the object's construction, not just its colour or transform. */
export const STORYBOARD_SUBJECTS:Partial<Record<import('types/kidsStories.types').StorySceneKey,MotifRenderer>>={
 seedling:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),count=1+n%4,stem=63+n%3*15;
  return <g><path d={n%2?'M27 157Q160 126 293 157L293 170H27Z':'M38 151Q162 126 282 151Q162 180 38 151Z'} fill={p.woodDark}/>
   {Array.from({length:count},(_,i)=>{const x=85+i*49+(count===1?70:0),top=151-stem+i%2*25;return <g key={i} stroke={p.foliage} strokeWidth="3"><path d={`M${x} 153Q${x-8} ${top+37} ${x+4} ${top}`} fill="none"/>{Array.from({length:2+n%3},(_,j)=><path key={j} d={`M${x} ${top+15+j*22}Q${x+(j%2?-36:34)} ${top-13+j*22} ${x+(j%2?-39:40)} ${top+12+j*22}Q${x+(j%2?-10:12)} ${top+38+j*22} ${x} ${top+15+j*22}Z`} fill={j%2?p.foliage:p.accentSoft}/>)}</g>})}
   {n%3===0&&<path d="M52 161L91 152M225 160L270 154" stroke={p.cloth} strokeWidth="3"/>}
  </g>;
 },
 sickroom:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),side=n%2===0;
  return <g stroke={p.woodDark} strokeWidth="2.5">
   {n%3===0?<><path d="M54 160V60L218 40L266 70V161Z" fill={p.wood}/><path d="M65 70L211 52L252 77L240 150L70 158Z" fill={p.cloth}/><path d="M75 71L133 62L151 87L88 95Z" fill="#f9efd9"/><path d="M74 110L248 91L240 151L70 158Z" fill={p.accentSoft}/></>:n%3===1?<><path d="M28 103H278V153H28Z" fill={p.wood}/><path d="M32 102Q147 79 275 100V135H32Z" fill={p.cloth}/><path d="M44 103Q55 80 96 91L111 105Z" fill="#fff1d6"/><path d="M110 99Q200 82 273 100V136H114Z" fill={p.accentSoft}/><path d="M30 82V165M278 83V165" strokeWidth="8"/></>:<><path d="M38 149Q146 119 282 133L283 157Q132 145 39 165Z" fill={p.accentSoft}/><path d="M45 139Q65 112 114 133L111 149L46 157Z" fill={p.cloth}/><path d="M34 168H288" strokeWidth="6"/></>}
   <path d={side?'M26 114V69H53V114Z':'M260 68H284V105H260Z'} fill={p.water}/>
   {n%2===0&&<path d="M230 31H286V60H230Z" fill={p.skyBottom}/>}
  </g>;
 },
 kaaba:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),cx=128+n%3*17,black='#242625';
  return <g stroke={p.ink} strokeWidth="2">
   {n%3===0?<><path d={`M${cx-61} 60L${cx+12} 38L${cx+80} 68L${cx+4} 94Z`} fill="#4a4a43"/><path d={`M${cx-61} 60V141L${cx+4} 166V94Z`} fill={black}/><path d={`M${cx+4} 94L${cx+80} 68V143L${cx+4} 166Z`} fill="#151b1b"/><path d={`M${cx-61} 83L${cx+4} 108L${cx+80} 83`} stroke={p.metal} strokeWidth="6" fill="none"/></>:n%3===1?<><path d="M58 58H261V154H58Z" fill={black}/><path d="M58 77H261" stroke={p.metal} strokeWidth="8"/><path d="M199 114H224V153H199Z" fill={p.metal}/><path d="M58 58L82 45H279L261 58Z" fill="#4c4e48"/></>:<><path d="M103 56L219 71V159L103 145Z" fill={black}/><path d="M52 78L103 56V145L52 165Z" fill="#151b1b"/><path d="M52 97L103 78L219 92" fill="none" stroke={p.metal} strokeWidth="7"/><path d="M147 111L172 115V151L147 148Z" fill={p.metal}/></>}
   <path d="M20 171Q163 146 300 172M16 180Q160 163 305 180" fill="none" stroke={p.stone}/>
  </g>;
 },
 coolGarden:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),xs=n%2?[55,249]:[35,117,275];
  return <g><path d={n%3===0?'M23 152Q158 104 298 155Q162 183 23 152Z':n%3===1?'M103 165Q33 124 103 90Q216 63 271 110Q270 155 103 165Z':'M55 106H268V160H55Z'} fill={p.water} stroke={p.waterLight} strokeWidth="4"/>
   {xs.map((x,i)=><g key={x}><path d={`M${x} 146Q${x-7} 102 ${x+7} ${48+i%2*23}`} fill="none" stroke={p.wood} strokeWidth="7"/>{[-1,1].map(d=><path key={d} d={`M${x+7} ${48+i%2*23}Q${x+d*31} ${18+i%2*23} ${x+d*37} ${61+i%2*23}Q${x+d*8} ${41+i%2*23} ${x+7} ${48+i%2*23}Z`} fill={p.foliage}/>)}</g>)}
   {Array.from({length:5+n%4},(_,i)=><g key={i}><path d={`M${55+i*27} 161V145`} stroke={p.foliage} strokeWidth="2"/><circle cx={55+i*27} cy="144" r="4" fill={i%2?p.cloth:p.accentSoft}/></g>)}
  </g>;
 },
 homeYard:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),side=n%3,door=side===0?87:side===1?161:224;
  const h=[72,47,88,58][n]??58;
  if(n>=4)return <g stroke={p.woodDark} strokeWidth="2" strokeLinejoin="round">
   {n===4?<><path d="M16 33H305V165H16Z" fill={p.cloth}/><path d="M16 123H305V165H16Z" fill={p.wood}/><path d="M198 39H273V111H198Z" fill={p.skyBottom}/><path d="M236 39V111M198 75H273" fill="none" stroke={p.wood} strokeWidth="5"/><path d="M30 153L186 135L232 158L76 170Z" fill={p.accentSoft}/><ellipse cx="81" cy="109" rx="41" ry="9" fill={p.wood}/><path d="M47 111V139M112 113V135" strokeWidth="5"/></>:
   n===5?<><path d="M14 56H306V166H14Z" fill={p.stone}/><path d="M14 56L75 27H250L306 56Z" fill={p.cloth}/><path d="M94 65H220V166H94Z" fill={p.skyBottom}/><path d="M78 165V66Q157 1 236 66V165" stroke={p.wood} strokeWidth="12" fill="none"/><path d="M31 166L57 125H78M245 126H273L295 166" fill={p.foliage}/></>:
   n===6?<><path d="M19 29H301V168H19Z" fill={p.stone}/><path d="M71 168V72Q158 2 247 72V168Z" fill={p.groundShadow}/><path d="M78 165V78Q113 40 147 40V164Z" fill={p.wood}/><path d="M160 44L232 76V164H160Z" fill={p.woodDark}/><circle cx="139" cy="111" r="3" fill={p.metal}/><path d="M50 164H270M36 173H286" stroke={p.cloth} strokeWidth="8"/></>:
   n===7?<><path d="M13 121L267 79L307 109L62 157Z" fill={p.cloth}/><path d="M13 91L267 49V79L13 121Z" fill={p.stone}/><path d="M13 91L267 49" strokeWidth="7"/><path d="M62 157L307 109V168H62Z" fill={p.stone}/><path d="M215 94L215 63Q238 42 258 63V85Z" fill={p.wood}/><path d="M56 123L151 107L190 123L97 143Z" fill={p.accentSoft}/></>:
   n===8?<><path d="M16 30H304V167H16Z" fill={p.cloth}/><path d="M16 120H304V167H16Z" fill={p.wood}/><path d="M39 123V89H263V123Z" fill={p.stone}/><path d="M36 86H267" strokeWidth="7"/><path d="M67 79Q47 59 61 43H89Q104 59 85 79Z" fill={p.wood}/><ellipse cx="152" cy="79" rx="33" ry="11" fill="#d4a66a"/><path d="M217 81V49H236V81" fill={p.water}/><path d="M43 41H137M161 43H274" stroke={p.wood} strokeWidth="6"/></>:
   n===9?<><path d="M16 24H304V169H16Z" fill={p.cloth}/><path d="M52 48Q160 15 269 48V146H52Z" fill={p.woodDark}/><path d="M61 54L144 37V137L61 137ZM177 37L260 54V137H177Z" fill={p.wood}/><path d="M144 37H177V137H144Z" fill={p.skyBottom}/><path d="M71 64L133 51M71 88L133 76M71 111L133 102M188 52L249 65M188 77L249 88M188 103L249 113" stroke={p.cloth} opacity=".5"/><path d="M39 146H284" stroke={p.stone} strokeWidth="13"/></>:
   n===10?<><path d="M20 23H301V166H20Z" fill={p.stone}/><path d="M20 106H301V166H20Z" fill={p.cloth}/><path d="M179 23V103H272V23Z" fill={p.skyBottom}/><path d="M179 103L38 166H190L272 103Z" fill="#ffedbe" stroke="none"/><path d="M30 141L116 120L161 151L76 169Z" fill={p.accentSoft}/><path d="M160 141L244 122L287 152L204 169Z" fill={p.wood}/><path d="M62 48H128V88H62Z" fill={p.cloth}/></>:
   <><path d="M28 26H288V130H28Z" fill={p.stone}/><path d="M101 130V63Q158 12 215 63V130Z" fill={p.woodDark}/><path d="M28 130H288L306 149H9Z" fill={p.cloth}/><path d="M9 149H306V170H9Z" fill={p.stone}/><path d="M44 151Q49 132 63 137Q75 141 76 152ZM81 154Q83 136 99 139Q111 144 111 156Z" fill={p.wood}/><path d="M244 133V106H264V133Z" fill={p.wood}/></>}
  </g>;
  return <g stroke={p.woodDark} strokeWidth="2" strokeLinejoin="round">
   {n===0?<><path d="M35 72L159 60V157H35Z" fill={p.stone}/><path d="M159 60L280 90V157H159Z" fill={p.cloth}/><path d="M35 72L159 60L280 90L163 97Z" fill={p.wood}/></>:
    n===1?<><path d="M28 47H115V157H28ZM205 37H290V157H205Z" fill={p.stone}/><path d="M115 91H205V157H115Z" fill={p.cloth}/><path d="M22 43H121M199 33H296" strokeWidth="8"/></>:
    n===2?<><path d="M45 108L131 76L278 98V158H45Z" fill={p.cloth}/><path d="M131 76V158H45V108Z" fill={p.stone}/><path d="M45 108L131 76L278 98" fill="none" strokeWidth="7"/></>:
    <><path d="M26 84H292V158H26Z" fill={p.stone}/><path d="M100 52H220V158H100Z" fill={p.cloth}/><path d="M20 80H298M93 48H227" strokeWidth="8"/><path d="M32 112H94M226 112H284" stroke={p.wood} strokeWidth="5"/></>}


   <path d={`M${door-15} 157V116Q${door} 93 ${door+15} 116V157Z`} fill={p.woodDark}/>
   {Array.from({length:2+n%3},(_,i)=>{const x=49+(i*63+n*7)%205;return <path key={i} d={`M${x} ${h+21}h17v15h-17Z`} fill={p.groundShadow}/>})}
   <path d="M20 159H292M28 169H284" stroke={p.stoneDark} fill="none"/>
   {n%2===0?<><path d="M32 154V128H54V154Z" fill={p.wood}/><path d="M40 130Q18 111 31 101Q51 102 45 131Q52 110 65 115Q64 129 45 134" fill={p.foliage} stroke="none"/></>:<><path d="M250 154L251 135Q266 123 274 135L278 154Z" fill={p.wood}/><path d="M257 134V125H269V134" fill={p.water}/></>}
  </g>;
 },
 prayerMat:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),cx=80+n%4*30;
  const x=42+n%3*13,y=58+n%4*8,w=226-n%3*18,h=100-n%4*7;
  return <g><path d={`M${x} ${y}L${x+w} ${y+8}L${x+w-18} ${y+h}L${x-13} ${y+h-8}Z`} fill={p.accentSoft} stroke={p.accent} strokeWidth="3"/>
   <path d={`M${x+14} ${y+14}L${x+w-17} ${y+20}L${x+w-31} ${y+h-14}L${x+3} ${y+h-20}Z`} fill={p.cloth} stroke={p.wood} strokeWidth="2"/>
   {n%3===0?<path d={`M${cx} ${y+h-25}V${y+45}Q${cx+28} ${y+4} ${cx+56} ${y+47}V${y+h-23}`} fill="none" stroke={p.accent} strokeWidth="3"/>:n%3===1?<g fill={p.accent}>{[0,1,2].map(i=><path key={i} d={`M${92+i*51} ${y+30}l15 20l-15 20l-15 -20Z`}/>)}</g>:<path d={`M${x+20} ${y+30}L${x+w-30} ${y+35}M${x+18} ${y+53}L${x+w-34} ${y+58}M${x+15} ${y+76}L${x+w-37} ${y+81}`} fill="none" stroke={p.accent} strokeWidth="6"/>}
   {Array.from({length:13},(_,i)=><path key={i} d={`M${x-11+i*(w-4)/13} ${y+h-8+i*8/13}l-4 8M${x+i*w/13} ${y+i*8/13}l2 -7`} stroke={p.cloth} strokeWidth="2"/>)}
  </g>;
 },
 balance:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),cx=123+n%4*13,top=49+n%3*7,span=59+n%3*12,base=151;
  return <g stroke={p.woodDark} strokeWidth="2.5" strokeLinejoin="round">
   {n%2===0?<><path d={`M${cx-7} ${base}V${top+6}H${cx+7}V${base}Z`} fill={p.metal}/><path d={`M${cx-35} ${base}Q${cx} ${base-17} ${cx+35} ${base}Z`} fill={p.stone}/></>:<><path d={`M${cx-14} ${base}L${cx} ${top}L${cx+14} ${base}Z`} fill={p.wood}/><path d={`M${cx-40} ${base}H${cx+40}`} strokeWidth="7"/></>}
   <path d={`M${cx-span} ${top+12}H${cx+span}`} strokeWidth="6" stroke={n%2?p.wood:p.metal}/>
   {[-1,1].map(d=><g key={d}><path d={`M${cx+d*span} ${top+12}l-23 59M${cx+d*span} ${top+12}l23 59`} fill="none" strokeWidth="1.8"/><path d={`M${cx+d*span-26} ${top+71}q26 32 52 0Z`} fill={p.metal}/></g>)}
   {n%3===0?<><path d="M47 155L50 138H72L76 155Z" fill={p.stone}/><path d="M235 157L241 133H267L273 157Z" fill={p.wood}/></>:<><ellipse cx="60" cy="153" rx="22" ry="8" fill="#d4b46a"/><path d="M240 158V137H265V158" fill={p.stone}/></>}
  </g>;
 },
 inkwell:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),x=77+n%4*31;
  return <g stroke={p.woodDark} strokeWidth="2"><path d={`M40 ${101+n%3*7}Q140 81 276 103L270 154Q145 131 40 157Z`} fill={p.cloth}/><path d={`M${x} 142L${x+3} 112Q${x+18} 103 ${x+33} 112L${x+38} 142Z`} fill={p.accent}/><ellipse cx={x+19} cy="112" rx="15" ry="5" fill={p.ink}/><path d={`M${x+23} 111L${210+n%3*20} ${49+n%4*6}`} strokeWidth="5"/>{n%2===0?<path d="M174 153L277 146L280 157L176 165Z" fill={p.wood}/>:<path d="M43 156Q33 130 44 105M274 154Q288 127 276 103" fill="none" strokeWidth="5"/>}</g>;
 },
 well:(p,v)=>{
  const n=Math.floor((v.props[0]??0)*12),rx=63+n%3*9,cx=124+n%4*17;
  return <g><path d={`M${cx-rx} 114V153Q${cx} 181 ${cx+rx} 153V114Z`} fill={p.stone} stroke={p.stoneDark} strokeWidth="3"/><ellipse cx={cx} cy="114" rx={rx} ry="21" fill={p.groundShadow} stroke={p.cloth} strokeWidth="9"/>
   {n%2===0?<><path d={`M${cx-rx-8} 133V54H${cx+rx+8}V133`} fill="none" stroke={p.woodDark} strokeWidth="7"/><path d={`M${cx-rx-19} 54L${cx} 29L${cx+rx+19} 54Z`} fill={p.wood}/><path d={`M${cx} 54V113`} stroke={p.woodDark} strokeWidth="2"/></>:<><path d={`M${cx-16} 135Q${cx+90} 130 ${cx+87} 80`} stroke={p.woodDark} strokeWidth="2" fill="none"/><path d={`M${cx+68} 82H${cx+99}L${cx+94} 107H${cx+73}Z`} fill={p.wood}/></>}
   <path d={`M${cx-rx+2} 137Q${cx} 164 ${cx+rx-2} 137M${cx} 137V167M${cx-38} 128V148M${cx+38} 128V148`} stroke={p.stoneDark} strokeWidth="2" fill="none"/>
  </g>;
 },
};
