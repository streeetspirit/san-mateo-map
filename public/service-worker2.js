//setting variable for caching
//then installing a service worker
// where we cache necessary data

const neighborhood_cache = 'neighborhood_cache-v4';
const neighborhood_dynamic_cache = 'neighborhood_dynamic_cache-v4';
const urlsToCache = [
    '/',
    '/index.html',

];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(neighborhood_cache)
            .then (function(cache){
                return cache.addAll(urlsToCache);
            })
    );
});


// listen to all fetch requests 
// try to find matching content from cache
// otherwise request it from the network
// at the same time save new stuff to cache as well

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          if (response) {
              return response;
           } 
           
           const fetchRequest = event.request.clone();
           
           return fetch(fetchRequest)
           .then(function (response){
               if (!response || response.status !== 200 || response.type !== 'basic') {
                      return response;
                  }

               const responseToCache = response.clone();

               caches.open(neighborhood_dynamic_cache)
               .then(function(cache){
                      cache.put (event.request, responseToCache);
                  });

              return response;
           });
      })
  );    
});

// if there's an updated service worker, let's delete old cache and use new version
self.addEventListener ('activate', function (event) {
    event.waitUntil (caches.keys()
    .then (function(cacheList){
        return Promise.all (
            cacheList.filter (function (cacheItem){
                return cacheItem.startsWith ('neighborhood_') && cacheItem !== neighborhood_cache && cacheItem !== neighborhood_dynamic_cache; 
            }).map(function (cacheItem){
                return caches.delete(cacheItem);
            })
        );
    })
    );
});