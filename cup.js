(()=>{
 const button=document.querySelector('.cup-button');
 if(!button)return;
 const cup=button.querySelector('.cup');
 const glow=button.querySelector('.cup-glow');
 const steam=button.querySelector('.cup-steam');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let active=[];
 button.addEventListener('click',()=>{
  active.forEach(animation=>animation.cancel());
  active=[];
  if(typeof cup.animate!=='function')return;
  active.push(glow.animate([{opacity:0},{opacity:.85,offset:.35},{opacity:0}],{duration:reduced.matches?400:1100,easing:'ease-out'}));
  if(reduced.matches)return;
  active.push(cup.animate([
   {transform:'translateY(0) rotate(0deg)'},
   {transform:'translateY(-5px) rotate(-4deg)',offset:.22},
   {transform:'translateY(-3px) rotate(3deg)',offset:.5},
   {transform:'translateY(-1px) rotate(-1.5deg)',offset:.76},
   {transform:'translateY(0) rotate(0deg)'}
  ],{duration:800,easing:'ease-in-out'}));
  active.push(steam.animate([
   {opacity:0,transform:'translateY(12px) scale(.92)'},
   {opacity:.65,transform:'translateY(-2px) scale(1)',offset:.35},
   {opacity:0,transform:'translateY(-25px) scale(1.08)'}
  ],{duration:1300,easing:'ease-out'}));
 });
 reduced.addEventListener('change',()=>{active.forEach(a=>a.cancel());active=[]});
})();
