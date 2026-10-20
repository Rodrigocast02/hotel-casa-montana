let language=new URLSearchParams(location.search).get('lang')==='en'?'en':'es';
function translate(){document.documentElement.lang=language;document.querySelectorAll('[data-es]').forEach(el=>el.innerHTML=el.dataset[language]);document.getElementById('language').textContent='Español / Inglés';document.querySelectorAll('[data-room]').forEach(el=>el.href=`reservar.html?room=${el.dataset.room}&lang=${language}`)}
document.getElementById('language').addEventListener('click',()=>{language=language==='es'?'en':'es';translate()});translate();
