const CACHE_NAME = 'construction-system-v1';
const RUNTIME_CACHE = 'construction-runtime-v1';

// Files to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/rfp_analysis_mobile.html',
  '/construction_project_tool.html',
  '/manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Installing and caching essential files');
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Service Worker: Some files could not be cached', err);
        // Continue anyway - non-critical files may not be available
        return cache.addAll(urlsToCache.filter(url => url !== '/manifest.json'));
      });
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of clients immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Strategy: Cache first, then network (for offline support)
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        // Update cache in background if online
        if (navigator.onLine) {
          fetch(request).then(freshResponse => {
            if (freshResponse && freshResponse.status === 200) {
              caches.open(RUNTIME_CACHE).then(cache => {
                cache.put(request, freshResponse);
              });
            }
          }).catch(() => {
            // Offline, use cached response
          });
        }
        return response;
      }

      // Not in cache, fetch from network
      return fetch(request).then(response => {
        // Cache successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Network failed and not in cache
        // Return offline page if available
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
        // For other requests, return a simple offline response
        return new Response('Offline - Please check your connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});

// Background sync (optional - for future form submissions)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      syncData().then(() => {
        // Notify clients that sync is complete
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'SYNC_COMPLETE' });
          });
        });
      }).catch(() => {
        // Retry sync
        event.waitUntil(self.registration.sync.register('sync-data'));
      })
    );
  }
});

// Helper function for background sync
async function syncData() {
  // Placeholder for future data sync functionality
  console.log('Service Worker: Syncing data');
  return Promise.resolve();
}

// Message handling (for client communication)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Registered and ready');
