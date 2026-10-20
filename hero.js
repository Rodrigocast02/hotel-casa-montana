(()=>{
const hero=document.querySelector('.hero');
const photos=[1,2,3,4,5,6,7,8,9,10,11].map(n=>`hotel-${n}.jpeg`);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let position=0,paused=reduced.matches,timer,request=0;
const layers=[document.createElement('div'),document.createElement('div')];
layers.forEach((layer,i)=>{layer.className='hero-slide';layer.setAttribute('aria-hidden','true');if(i===0){layer.style.backgroundImage=`url("${photos[0]}")`;layer.classList.add('is-active')}hero.prepend(layer)});
const controls=document.createElement('div');controls.className='hero-controls';
const counter=document.createElement('span');counter.textContent='01 / 11';counter.setAttribute('aria-hidden','true');
const toggle=document.createElement('button');toggle.type='button';
function label(){const es=document.documentElement.lang==='es';toggle.textContent=paused?(es?'▶ Reanudar fotos':'▶ Play slideshow'):(es?'Ⅱ Pausar fotos':'Ⅱ Pause slideshow');toggle.setAttribute('aria-label',toggle.textContent)}
controls.append(counter,toggle);hero.append(controls);let active=0;
function advance(){const next=(position+1)%photos.length;const image=new Image();const id=++request;image.onload=()=>{if(id!==request||paused||document.hidden)return;const incoming=1-active;layers[incoming].style.backgroundImage=`url("${photos[next]}")`;layers[incoming].classList.add('is-active');layers[active].classList.remove('is-active');active=incoming;position=next;counter.textContent=`${String(position+1).padStart(2,'0')} / 11`};image.src=photos[next]}
function schedule(){clearInterval(timer);if(!paused&&!document.hidden)timer=setInterval(advance,5000)}
toggle.addEventListener('click',()=>{paused=!paused;request++;label();schedule()});document.addEventListener('visibilitychange',()=>{request++;schedule()});
reduced.addEventListener('change',event=>{paused=event.matches;request++;label();schedule()});
new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});label();schedule();
})();
