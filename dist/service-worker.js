CACHE_NAME = "liga-bola-v1";

// Predefined cached urls
CACHE_URLS = ["/settings", "/main.js"];

// Installing caches
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Use network with revalidation strategy
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((res) => {
        let netResult = fetch(e.request).then((netResp) => {
          cache.put(e.request, netResp.clone());
          return netResp;
        });

        return res || netResult;
      });
    })
  );
});
