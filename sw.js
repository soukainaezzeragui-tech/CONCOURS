const CACHE_NAME = 'concours-v1';
const urlsToCache = [
  '/CONCOURS/index.html',
  '/CONCOURS/manifest.json',
  '/CONCOURS/sw.js'
  // يمكنك إضافة أي ملفات CSS أو JS إضافية إن وجدت
];

// تثبيت الـ Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// جلب الملفات من الشبكة أولاً، وفي حال فشل الإنترنت استخدم التخزين المؤقت
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// تحديث الـ Cache عند تفعيل إصدار جديد
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
