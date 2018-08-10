// flag for enabling cache in production
const doCache = false

const CACHE_NAME = 'we-are-not-alone-cache'

// delete old caches
self.addEventListener('activate', event => {
  const currentCacheList = [CACHE_NAME]
  event.waitUntil(
    caches.keys()
      .then(keyList => 
        Promise.all(keyList.map(key => {
          if (!currentList.includes(key)) {
            return caches.delete(key)
          }
        }))
      )
  )
})

// this triggers when user starts the app
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch('asset-manifest.json')
            .then(response => {
              response.json()
            })
            .then(assets => {
              // we cache initial page and the main.js file
              // we could also cache assets like CSS and images
              const urlsToCache = [
                '/',
                assets['main.js']
              ]
              cache.addAll(urlsToCache)
            })
        })
    )
  }
})

// this is where we intercept requests and serve up the matching files
self.addEventListener('fetch', function(event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request) )
    )
  }
})