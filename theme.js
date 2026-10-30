(function(){
 const root=document.documentElement;
 let saved;try{saved=localStorage.getItem('coffee1111-theme')}catch{}
 const system=window.matchMedia('(prefers-color-scheme: dark)');
 let explicit=saved==='light'||saved==='dark';
 function apply(theme){
  root.dataset.theme=theme;root.style.colorScheme=theme;
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=theme==='dark'?'#201811':'#f7f1e7';
  const button=document.querySelector('#theme-toggle');
  if(button){const dark=theme==='dark';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Включить светлую тему':'Включить тёмную тему');button.querySelector('.theme-icon').textContent=dark?'☀':'☾';button.querySelector('.theme-label').textContent=dark?'Светлая':'Тёмная';}
 }
 apply(explicit?saved:system.matches?'dark':'light');
 system.addEventListener('change',event=>{if(!explicit)apply(event.matches?'dark':'light')});
 document.addEventListener('DOMContentLoaded',()=>{
  apply(root.dataset.theme);
  document.querySelector('#theme-toggle').addEventListener('click',()=>{
   const next=root.dataset.theme==='dark'?'light':'dark';explicit=true;apply(next);
   try{localStorage.setItem('coffee1111-theme',next)}catch{}
  });
 });
})();
