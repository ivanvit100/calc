var cacheName = "v2.8"

const appShellFiles = [
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

self.addEventListener('install', (e) => {
  console.log('[Service Worker]: Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker]: Caching content');
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker]: Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker]: Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});