/* Service worker do treinador de ouvido absoluto.
   Registrado com escopo "./ouvido-absoluto": não interfere nos afinadores nem nos quizzes.
   Página: rede primeiro (atualizações chegam na hora), cache se estiver offline.
   Manifesto e ícones: cache primeiro. */
const CACHE='ouvido-v1';
const PAGINA='ouvido-absoluto.html';
const ASSETS=[PAGINA,'ouvido.webmanifest','icon-ouvido-192.png','icon-ouvido-512.png','icon-ouvido-512-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>null)))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ouvido-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url),a=ASSETS.find(x=>url.pathname.endsWith('/'+x));
  if(!a)return;
  if(a===PAGINA){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put(PAGINA,c));return r;})
      .catch(()=>caches.match(PAGINA)));
  }else{
    e.respondWith(caches.match(a).then(h=>h||fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put(a,c));return r;})));
  }
});
