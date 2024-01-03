const CACHE_NAME = 'alimpuestos-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/legales.html',
    '/assets/js/jquery-3.7.1.min.js',
    '/assets/js/select2.min.js',
    '/assets/js/dolar.js',
    '/assets/js/modal.js',
    '/assets/js/calculadora.js',
    '/assets/js/main.js',
    '/assets/css/bulma.min.css',
    '/assets/css/bulma-divider.min.css',
    '/assets/css/solid.min.css',
    '/assets/css/fontawesome.min.css',
    '/assets/css/select2.min.css',
    '/assets/css/style.css',
    '/favicon.ico',
    '/assets/img/logo.png',
    '/assets/img/meta.png',
    '/assets/img/android-chrome-512x512.png',
    '/assets/img/android-chrome-192x192.png',
  ];

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetchAndUpdate(event.request);
        })
    );
  });
  
  function fetchAndUpdate(request) {
    return fetch(request).then(function(response) {
      // Verifica si la respuesta es válida
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
  
      // Clona la respuesta
      const responseToCache = response.clone();
  
      // Almacena la respuesta en caché
      caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(request, responseToCache);
        });
  
      return response;
    });
  }