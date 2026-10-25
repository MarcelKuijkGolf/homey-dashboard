// 25-10-2026 MK eerst netwerk, zonder verbinding de laatst bewaarde versie
// Alleen eigen bestanden, nooit de Homey gegevens
const CACHE = 'energie-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const kopie = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopie));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
