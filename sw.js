// Service worker: makes Multi Converter installable and usable offline.
// Own files are network-first, so a deploy shows up on the next load without a version bump;
// the cache is only the offline fallback. Bump CACHE_NAME only to wipe old cached files.
const CACHE_NAME = 'multi-conv-v1';

// Versioned CDN files (Font Awesome) never change, so serve them straight from cache
const CACHE_FIRST_HOSTS = ['cdnjs.cloudflare.com'];
// Unversioned CDN files (Clippy) can change, so treat them like our own files
const NETWORK_FIRST_HOSTS = ['cdn.jsdelivr.net'];

self.addEventListener('install', event => {
    // App Guide and What's New load their data only when opened, so store them up front for offline use
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['./', 'data/app-guide.json', 'data/whats-new.json'])));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

// Analytics, ads and live lookups (Nominatim) are never cached
function isCacheable(url) {
    return url.origin === self.location.origin
        || CACHE_FIRST_HOSTS.includes(url.hostname)
        || NETWORK_FIRST_HOSTS.includes(url.hostname);
}

async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
        return response;
    } catch (err) {
        const cached = await cache.match(request, { ignoreSearch: request.mode === 'navigate' });
        if (cached) return cached;
        if (request.mode === 'navigate') return cache.match('./');
        throw err;
    }
}

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
    return response;
}

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (!isCacheable(url)) return;
    event.respondWith(CACHE_FIRST_HOSTS.includes(url.hostname) ? cacheFirst(event.request) : networkFirst(event.request));
});

// The page sends the files it loaded before this worker took control, so the very first visit is already available offline
self.addEventListener('message', event => {
    if (!event.data || event.data.type !== 'cache-urls') return;
    const urls = event.data.urls.filter(u => isCacheable(new URL(u)));
    event.waitUntil(caches.open(CACHE_NAME).then(cache => Promise.all(urls.map(async u => {
        if (await cache.match(u)) return;
        try {
            const sameOrigin = new URL(u).origin === self.location.origin;
            const res = await fetch(u, { mode: sameOrigin ? 'same-origin' : 'no-cors' });
            if (res.ok || res.type === 'opaque') await cache.put(u, res);
        } catch (err) { /* offline or blocked: it gets cached on the next normal load */ }
    }))));
});
