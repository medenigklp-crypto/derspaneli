const CACHE_NAME = "derspanel-v3";

const urlsToCache = [
  "/derspaneli/",
  "/derspaneli/index.html",
  "/derspaneli/icon-192.png",
  "/derspaneli/icon-512.png",
  "/derspaneli/icon-180.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("/derspaneli/index.html");
    })
  );
});
