let cache_name = "v2.9"; 

const assets = [
  './index.html',
  './css/style.css',
  './css/link.png',
  './css/select.png',
  './img/dl.png',
  './img/logo.png',
  './img/light.png',
  './img/dark.png',
  './img/arrow.png',
  './img/preview.png',
  './js/script.js',
  './js/detect.js',
  './js/vue.js',
  './js/vue-script.js'
];

self.addEventListener("install", event => {
    console.log("installing...");
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
                self.cache.open(cache_name).then(cache => cache.match("./index.html"))
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