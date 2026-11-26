// Service worker del Lector: deja la app disponible sin conexión.
const CACHE = 'lector-v4';
const SHELL = ['./', 'index.html', 'mt-worker.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'jszip.min.js', 'pdf.min.js', 'pdf.worker.min.js'];
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  // Cada archivo por separado: si uno falla, los demás igual quedan guardados.
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))));
});
self.addEventListener('message', (e) => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k.startsWith('lector-')).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero (para recibir actualizaciones), pero si tarda más de 3,5 s o no hay internet, usa la copia guardada.
function networkFirst(req) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => caches.match(req).then(finish), 3500);
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      clearTimeout(timer); finish(res);
    }).catch(() => {
      caches.match(req).then((r) => r || caches.match('index.html')).then((r) => {
        finish(r || new Response('Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
      });
    });
  });
}
// Librerías y fuentes externas: caché primero.
function cacheFirst(req) {
  return caches.open(CACHE).then(async (c) => {
    const hit = await c.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
    return res;
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (CDN.includes(url.hostname)) { e.respondWith(cacheFirst(req)); return; }
  if (url.origin === location.origin) e.respondWith(networkFirst(req));
  // Traductores y diccionario en línea pasan directo (sus respuestas se guardan dentro de la app).
});
