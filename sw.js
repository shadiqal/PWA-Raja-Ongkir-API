var CACHE_NAME = 'kuliahKoding-PWA-webOngkir-v1';
var urlsToCache = [
    '/',
    'assets/css/bootstrap.min.css',
    'assets/css/mdb.min.css',
    'assets/js/index.js'
];

//instalasi cache nya
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//Event untuk mengupdate
self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['kuliahKoding-PWA-webOngkir-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

//event untuk fetching cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});