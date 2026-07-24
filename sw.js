/* Service worker dos afinadores.
   Guarda em cache as DUAS versões (completa e simples) para abrirem
   offline. Qualquer outra página do repositório — seus quizzes — continua
   indo pela rede normalmente, sem interferência nenhuma. */

const CACHE = 'afinador-v4';

const PAGES = [
  'afinador-precisao-violao.html',   // completa: harmônico + calibração
  'afinador-simples.html'            // simples: só o fundamental
];

const ASSETS = PAGES.concat([
  'afinador.webmanifest',
  'afinador-simples.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png',
  'icon-plus-192.png',
  'icon-plus-512.png',
  'icon-plus-512-maskable.png'
]);

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => null))))
      .then(() => self.skipWaiting())
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

  // só cuidamos dos arquivos dos afinadores
  const asset = ASSETS.find((a) => url.pathname.endsWith('/' + a));
  if (!asset) return;   // resto segue pela rede, intocado

  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return resp;
        })
        .catch(() => caches.match(asset));   // fallback do PRÓPRIO arquivo
    })
  );
});
