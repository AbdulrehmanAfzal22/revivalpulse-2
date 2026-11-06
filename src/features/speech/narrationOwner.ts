/** One audible narrator at a time, including recorded clips and previews. */
let current:{owner:symbol;stop:()=>void}|null=null;
export function claimNarration(owner:symbol,stop:()=>void){if(current&&current.owner!==owner)current.stop();current={owner,stop}}
export function ownsNarration(owner:symbol){return current?.owner===owner}
export function releaseNarration(owner:symbol){if(current?.owner===owner)current=null}
