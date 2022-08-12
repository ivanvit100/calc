let cache_name = "v2.11"; 

const assets = [
  './index.html',
  './css/style.css',
  './css/link.png',
  './css/select.png',
  './img/dl.png',
  './img/logo.ico',
  './img/light.png',
  './img/dark.png',
  './img/arrow.png',
  './img/preview.png',
  './js/script.js',
  './js/detect.js',
  './js/vue.js',
  './js/vue-script.js',
  'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap'
];

self.addEventListener("install", event => {
    console.log("[Service Worker]: Installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url === "https://calc.ivanvit.ru/") {
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.matchAll())
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});