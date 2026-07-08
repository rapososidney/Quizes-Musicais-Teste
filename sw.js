/* Service worker do Afinador.
   Guarda em cache SÓ os arquivos do afinador, para ele abrir offline
   depois da primeira visita. Qualquer outra página do repositório
   (seus outros quizzes) continua indo pela rede, sem interferência. */

const CACHE = 'afinador-v1';
const ASSETS = [
  'afinador-precisao-violao.html',
  'afinador.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isTunerAsset = ASSETS.some((a) => url.pathname.endsWith('/' + a) || url.pathname.endsWith(a));
  if (!isTunerAsset) return; // deixa o resto seguir normal (rede)

  e.respondWith(
    caches.match(e.request).then((hit) => {
      return hit || fetch(e.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match('afinador-precisao-violao.html'));
    })
  );
});
