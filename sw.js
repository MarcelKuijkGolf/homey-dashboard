// 25-10-2026 MK eerst netwerk, zonder verbinding de laatst bewaarde versie
// Alleen eigen bestanden, nooit de Homey gegevens
const CACHE = 'energie-v2';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    // 09-11-2026 MK altijd bij GitHub navragen, niet de browsercache
    fetch(e.request, { cache: 'no-cache' }).then(r => {
      const kopie = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopie));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
