import{c as O,u as M,j as s,S as V,a as Ie,b as L,d as B,P as F,e as x,f as Re,g as G}from"./utils.DcbWCrs8.js";import{R as h,r,a as Ce}from"./index.BUDWeftR.js";function Te(e){const t=e+"CollectionProvider",[n,o]=O(t),[i,u]=n(t,{collectionRef:{current:null},itemMap:new Map}),l=C=>{const{scope:a,children:g}=C,T=h.useRef(null),v=h.useRef(new Map).current;return s.jsx(i,{scope:a,itemMap:v,collectionRef:T,children:g})};l.displayName=t;const m=e+"CollectionSlot",b=h.forwardRef((C,a)=>{const{scope:g,children:T}=C,v=u(m,g),p=M(a,v.collectionRef);return s.jsx(V,{ref:p,children:T})});b.displayName=m;const c=e+"CollectionItemSlot",f="data-radix-collection-item",d=h.forwardRef((C,a)=>{const{scope:g,children:T,...v}=C,p=h.useRef(null),E=M(a,p),y=u(c,g);return h.useEffect(()=>(y.itemMap.set(p,{ref:p,...v}),()=>void y.itemMap.delete(p))),s.jsx(V,{[f]:"",ref:E,children:T})});d.displayName=c;function I(C){const a=u(e+"CollectionConsumer",C);return h.useCallback(()=>{const T=a.collectionRef.current;if(!T)return[];const v=Array.from(T.querySelectorAll(`[${f}]`));return Array.from(a.itemMap.values()).sort((y,w)=>v.indexOf(y.ref.current)-v.indexOf(w.ref.current))},[a.collectionRef,a.itemMap])}return[{Provider:l,Slot:b,ItemSlot:d},I,o]}var xe=Ce.useId||(()=>{}),Se=0;function Y(e){const[t,n]=r.useState(xe());return Ie(()=>{e||n(o=>o??String(Se++))},[e]),e||(t?`radix-${t}`:"")}function q({prop:e,defaultProp:t,onChange:n=()=>{}}){const[o,i]=he({defaultProp:t,onChange:n}),u=e!==void 0,l=u?e:o,m=L(n),b=r.useCallback(c=>{if(u){const d=typeof c=="function"?c(e):c;d!==e&&m(d)}else i(c)},[u,e,i,m]);return[l,b]}function he({defaultProp:e,onChange:t}){const n=r.useState(e),[o]=n,i=r.useRef(o),u=L(t);return r.useEffect(()=>{i.current!==o&&(u(o),i.current=o)},[o,i,u]),n}var _="rovingFocusGroup.onEntryFocus",Ee={bubbles:!1,cancelable:!0},A="RovingFocusGroup",[j,z,ye]=Te(A),[Fe,H]=O(A,[ye]),[we,Ae]=Fe(A),J=r.forwardRef((e,t)=>s.jsx(j.Provider,{scope:e.__scopeRovingFocusGroup,children:s.jsx(j.Slot,{scope:e.__scopeRovingFocusGroup,children:s.jsx(Ne,{...e,ref:t})})}));J.displayName=A;var Ne=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:o,loop:i=!1,dir:u,currentTabStopId:l,defaultCurrentTabStopId:m,onCurrentTabStopIdChange:b,onEntryFocus:c,preventScrollOnEntryFocus:f=!1,...d}=e,I=r.useRef(null),C=M(t,I),a=B(u),[g=null,T]=q({prop:l,defaultProp:m,onChange:b}),[v,p]=r.useState(!1),E=L(c),y=z(n),w=r.useRef(!1),[ve,$]=r.useState(0);return r.useEffect(()=>{const R=I.current;if(R)return R.addEventListener(_,E),()=>R.removeEventListener(_,E)},[E]),s.jsx(we,{scope:n,orientation:o,dir:a,loop:i,currentTabStopId:g,onItemFocus:r.useCallback(R=>T(R),[T]),onItemShiftTab:r.useCallback(()=>p(!0),[]),onFocusableItemAdd:r.useCallback(()=>$(R=>R+1),[]),onFocusableItemRemove:r.useCallback(()=>$(R=>R-1),[]),children:s.jsx(F.div,{tabIndex:v||ve===0?-1:0,"data-orientation":o,...d,ref:C,style:{outline:"none",...e.style},onMouseDown:x(e.onMouseDown,()=>{w.current=!0}),onFocus:x(e.onFocus,R=>{const me=!w.current;if(R.target===R.currentTarget&&me&&!v){const U=new CustomEvent(_,Ee);if(R.currentTarget.dispatchEvent(U),!U.defaultPrevented){const N=y().filter(S=>S.focusable),be=N.find(S=>S.active),pe=N.find(S=>S.id===g),ge=[be,pe,...N].filter(Boolean).map(S=>S.ref.current);X(ge,f)}}w.current=!1}),onBlur:x(e.onBlur,()=>p(!1))})})}),Q="RovingFocusGroupItem",W=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:o=!0,active:i=!1,tabStopId:u,...l}=e,m=Y(),b=u||m,c=Ae(Q,n),f=c.currentTabStopId===b,d=z(n),{onFocusableItemAdd:I,onFocusableItemRemove:C}=c;return r.useEffect(()=>{if(o)return I(),()=>C()},[o,I,C]),s.jsx(j.ItemSlot,{scope:n,id:b,focusable:o,active:i,children:s.jsx(F.span,{tabIndex:f?0:-1,"data-orientation":c.orientation,...l,ref:t,onMouseDown:x(e.onMouseDown,a=>{o?c.onItemFocus(b):a.preventDefault()}),onFocus:x(e.onFocus,()=>c.onItemFocus(b)),onKeyDown:x(e.onKeyDown,a=>{if(a.key==="Tab"&&a.shiftKey){c.onItemShiftTab();return}if(a.target!==a.currentTarget)return;const g=je(a,c.orientation,c.dir);if(g!==void 0){if(a.metaKey||a.ctrlKey||a.altKey||a.shiftKey)return;a.preventDefault();let v=d().filter(p=>p.focusable).map(p=>p.ref.current);if(g==="last")v.reverse();else if(g==="prev"||g==="next"){g==="prev"&&v.reverse();const p=v.indexOf(a.currentTarget);v=c.loop?Pe(v,p+1):v.slice(p+1)}setTimeout(()=>X(v))}})})})});W.displayName=Q;var _e={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Me(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function je(e,t,n){const o=Me(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return _e[o]}function X(e,t=!1){const n=document.activeElement;for(const o of e)if(o===n||(o.focus({preventScroll:t}),document.activeElement!==n))return}function Pe(e,t){return e.map((n,o)=>e[(t+o)%e.length])}var De=J,Oe=W,k="Tabs",[Le,Be]=O(k,[H]),Z=H(),[Ge,K]=Le(k),ee=r.forwardRef((e,t)=>{const{__scopeTabs:n,value:o,onValueChange:i,defaultValue:u,orientation:l="horizontal",dir:m,activationMode:b="automatic",...c}=e,f=B(m),[d,I]=q({prop:o,onChange:i,defaultProp:u});return s.jsx(Ge,{scope:n,baseId:Y(),value:d,onValueChange:I,orientation:l,dir:f,activationMode:b,children:s.jsx(F.div,{dir:f,"data-orientation":l,...c,ref:t})})});ee.displayName=k;var te="TabsList",oe=r.forwardRef((e,t)=>{const{__scopeTabs:n,loop:o=!0,...i}=e,u=K(te,n),l=Z(n);return s.jsx(De,{asChild:!0,...l,orientation:u.orientation,dir:u.dir,loop:o,children:s.jsx(F.div,{role:"tablist","aria-orientation":u.orientation,...i,ref:t})})});oe.displayName=te;var ne="TabsTrigger",re=r.forwardRef((e,t)=>{const{__scopeTabs:n,value:o,disabled:i=!1,...u}=e,l=K(ne,n),m=Z(n),b=ce(l.baseId,o),c=ie(l.baseId,o),f=o===l.value;return s.jsx(Oe,{asChild:!0,...m,focusable:!i,active:f,children:s.jsx(F.button,{type:"button",role:"tab","aria-selected":f,"aria-controls":c,"data-state":f?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:b,...u,ref:t,onMouseDown:x(e.onMouseDown,d=>{!i&&d.button===0&&d.ctrlKey===!1?l.onValueChange(o):d.preventDefault()}),onKeyDown:x(e.onKeyDown,d=>{[" ","Enter"].includes(d.key)&&l.onValueChange(o)}),onFocus:x(e.onFocus,()=>{const d=l.activationMode!=="manual";!f&&!i&&d&&l.onValueChange(o)})})})});re.displayName=ne;var se="TabsContent",ae=r.forwardRef((e,t)=>{const{__scopeTabs:n,value:o,forceMount:i,children:u,...l}=e,m=K(se,n),b=ce(m.baseId,o),c=ie(m.baseId,o),f=o===m.value,d=r.useRef(f);return r.useEffect(()=>{const I=requestAnimationFrame(()=>d.current=!1);return()=>cancelAnimationFrame(I)},[]),s.jsx(Re,{present:i||f,children:({present:I})=>s.jsx(F.div,{"data-state":f?"active":"inactive","data-orientation":m.orientation,role:"tabpanel","aria-labelledby":b,hidden:!I,id:c,tabIndex:0,...l,ref:t,style:{...e.style,animationDuration:d.current?"0s":void 0},children:I&&u})})});ae.displayName=se;function ce(e,t){return`${e}-trigger-${t}`}function ie(e,t){return`${e}-content-${t}`}var ke=ee,ue=oe,le=re,de=ae;const Ke=ke,fe=r.forwardRef(({className:e,...t},n)=>s.jsx(ue,{ref:n,className:G("inline-flex h-14 w-full items-end justify-start border-b",e),...t}));fe.displayName=ue.displayName;const P=r.forwardRef(({className:e,...t},n)=>s.jsx(le,{ref:n,className:G("inline-flex items-center justify-center whitespace-nowrap border-b border-transparent p-3 text-sm font-medium text-muted-foreground ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-foreground data-[state=active]:text-foreground",e),...t}));P.displayName=le.displayName;const D=r.forwardRef(({className:e,...t},n)=>s.jsx(de,{ref:n,className:G("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...t}));D.displayName=de.displayName;function Ye({cli:e,manual:t}){return s.jsxs(Ke,{defaultValue:"cli",children:[s.jsxs(fe,{children:[s.jsx(P,{value:"cli",children:"CLI"}),s.jsx(P,{value:"manual",children:"Manual"})]}),s.jsx(D,{value:"cli",children:e}),s.jsx(D,{value:"manual",children:t})]})}export{Ye as Installation};
