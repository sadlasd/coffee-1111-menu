let menu,tab='coffee',size='300';
const content=document.querySelector('#content');
const price=p=>`${p} <span>₽</span>`;
const row=(name,p,note='')=>`<div class="item"><div><div class="item-name">${name}</div>${note?`<small>${note}</small>`:''}</div><div class="price">${price(p)}</div></div>`;
function render(){
 if(!menu)return;
 if(tab==='coffee'){
 content.innerHTML=`<div class="section-top"><h3>Кофе и какао</h3><div class="size-buttons" aria-label="Объём напитка">${['200','300','400'].map(s=>`<button data-size="${s}" aria-pressed="${s===size}">${Number(s)/1000} л</button>`).join('')}</div></div><div class="rows">${menu.coffee.map(i=>{const p=i.prices[size];if(p)return row(i.name,p,`${size} мл`);const available=Object.entries(i.prices);return row(i.name,available[0][1],available.map(([s,p])=>`${s} мл · ${p} ₽`).join(' / '));}).join('')}</div><p class="section-note">Выберите объём. Если напиток доступен в другом объёме, он указан под названием.</p>`;
 content.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{size=b.dataset.size;render()});
 }else if(tab==='signature'){
 content.innerHTML=`<div class="section-top"><h3>Авторские напитки</h3><span class="section-note">Все напитки · 0.3 л</span></div><div class="rows">${menu.signature.map(i=>row(i.name,i.price,'300 мл')).join('')}</div>`;
 }else if(tab==='desserts'){
 content.innerHTML=`<div class="section-top"><h3>Корпусные десерты</h3></div><div class="rows">${menu.desserts.flavors.map(n=>row(n,menu.desserts.price)).join('')}</div>`;
 }else{
 const m=menu[tab];content.innerHTML=`<div class="section-top"><h3>${tab==='milkshake'?'Милкшейки':'Лимонады'}</h3></div><div class="rows">${row('Классический',m.price)}${row('Собери сам',m.price+m.extra,`Классический + ${m.extra} ₽`)}</div><p class="section-note">Выберите свой сироп</p><div class="flavors">${m.flavors.map(n=>`<span>${n}</span>`).join('')}</div>`;
 }
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render()});
fetch('menu.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{menu=data;render();document.querySelector('#extras').innerHTML=menu.extras.map(i=>row(i.name,i.price)).join('')}).catch(()=>content.innerHTML='<p>Не удалось загрузить меню. Пожалуйста, обновите страницу.</p>');
