CACHE_NAME = "liga-bola-v1";

// Predefined cached urls
CACHE_URLS = [];

// Installing caches
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Listening to fetch events
self.addEventListener("fetch", (e) => {
  // Cache matches, else get from source

  let mediaTest = new RegExp(`\.(svg|png|jpg)$`, "gi");
  if (mediaTest.test(e.request.url)) {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(e.request).then((res) => {
          let netResult = fetch(e.request).then((netResp) => {
            console.log("image cached");

            cache.put(e.request, netResp.clone());
            return netResp;
          });

          return res || netResult;
        });
      })
    );
  }
});
