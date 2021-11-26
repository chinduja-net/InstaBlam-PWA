
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'v2'

self.addEventListener('install', event => {


  const defaultFiles = ['index.html', './Image1.jpg', './Image2.jpg']
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(defaultFiles)
  }))
});

self.addEventListener('activate', event => {
  
});


self.addEventListener('fetch', event => {

  // API gets special treatment
  if (event.request.url.includes('simple.php')) {
    event.respondWith(new Response('<h1>This API is not allowed anymore</h1> <p>Try something else! </p>',
      { headers: { 'Content-Type': 'text/html' } }));
    return
  }

  // Om det inte är ett API request - använda cache
  if (navigator.onLine) {
    event.respondWith(fetch(event.request).then(response => {
      let clone = response.clone()
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, clone)
      })
      return response
    }))

  } else {
    // Kolla om det som vi ska hämta finns i webbläsarens cache
    event.respondWith(caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      return null  // kanske bättre att returnera en standardbild?
    }))
  }
}) 