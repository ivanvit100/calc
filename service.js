var CACHE_STATIC_NAME = 'static-v2.5';
var CACHE_DYNAMIC_NAME = 'dynamic-v2.5';

self.addEventListener('install', function (event) {
  console.log('Installing Service Worker ...');
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('Precaching App Shell');
        cache.addAll([
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
          './js/vue-script.js',
          'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap'
        ]);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker ....');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the network
    fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
          .then(function(cache) {
            // Put in cache if succeeds
            cache.put(event.request.url, res.clone());
            return res;
          })
      })
      .catch(function(err) {
          // Fallback to cache
          event.respondWith(fromCache(event.request));
      })
  );
});

function fromCache(request) {
    return caches.open(CACHE_DYNAMIC_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}