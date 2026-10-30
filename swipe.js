(()=>{
 const panel=document.querySelector('#content');
 const tabs=[...document.querySelectorAll('[data-tab]')];
 if(!panel||tabs.length<2)return;
 let gesture=null,animation=null;
 const clear=()=>{gesture=null};
 panel.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='touch'||!event.isPrimary||event.target.closest('button,a,input,select,textarea'))return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY,start:event.timeStamp,direction:null};
  panel.setPointerCapture(event.pointerId);
 });
 panel.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const dx=Math.abs(event.clientX-gesture.x),dy=Math.abs(event.clientY-gesture.y);
  if(!gesture.direction&&Math.max(dx,dy)>12){
   if(dx>dy*1.5)gesture.direction='horizontal';
   else if(dy>=dx)clear();
  }
 });
 panel.addEventListener('pointerup',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const g=gesture;clear();
  const dx=event.clientX-g.x,dy=event.clientY-g.y;
  if(event.timeStamp-g.start>1000||Math.abs(dx)<50||Math.abs(dx)<Math.abs(dy)*1.5)return;
  const index=tabs.findIndex(button=>button.getAttribute('aria-pressed')==='true');
  const next=index+(dx<0?1:-1);
  if(index<0||next<0||next>=tabs.length)return;
  animation?.cancel();
  tabs[next].click();
  if(panel.getBoundingClientRect().top<0)panel.scrollIntoView({block:'start',behavior:'instant'});
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&typeof panel.animate==='function'){
   animation=panel.animate([{opacity:.45,transform:`translateX(${dx<0?12:-12}px)`},{opacity:1,transform:'translateX(0)'}],{duration:180,easing:'ease-out'});
  }
 });
 panel.addEventListener('pointercancel',clear);
 panel.addEventListener('lostpointercapture',clear);
})();
