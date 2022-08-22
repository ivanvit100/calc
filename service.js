let cache_name = "v2.18"; 

const assets = [
  './index.html',
  './css/style.css',
  './css/link.png',
  './css/select.png',
  './css/waves.min.css',
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
  './js/waves.min.js',
  './js/waves.min.js.map'
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
    if(event.request.url === "https://calc.ivanvit.ru/"){
        event.respondWith(
            fetch(event.request).catch(err =>
                self.caches.open(cache_name).then(cache => cache.match("./index.html"))
            )
        );
    }else{
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});