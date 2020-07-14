CACHE_NAME = "liga-bola-v1";
CACHE_URLS = [];

// Installing caches
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("cache opened");
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Listening to fetch events
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
