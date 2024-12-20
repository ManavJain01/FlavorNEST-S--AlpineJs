self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-static-v1").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./assets/css/style.css",
        "./assets/js/component_Injection.js",
        "./assets/images/logo.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
