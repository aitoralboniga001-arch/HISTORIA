const CACHE_NAME = 'historia-usap-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg'
];

// Install SW and cache initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate SW and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and local/http/https requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip supabase or other external api calls
  if (event.request.url.includes('/rest/v1/') || event.request.url.includes('/auth/v1/')) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cachedResponse) => cachedResponse || caches.match('/')))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request)
          .then((networkResponse) => {
            // Cache the new response for next time if it is a successful GET request
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // If offline, return the cached response (which might be undefined if not cached yet)
            return cachedResponse;
          });

        // Return cached response immediately if available, otherwise wait for network
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
