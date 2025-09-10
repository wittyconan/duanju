const CACHE_NAME = 'snapdrama-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/snapdrama-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 跳过外部视频资源，特别是夸克网盘等第三方服务
  if (url.hostname.includes('drive.quark.cn') || 
      url.hostname.includes('quark.cn') ||
      event.request.url.includes('.mp4') ||
      event.request.url.includes('.m3u8') ||
      event.request.destination === 'video') {
    // 直接使用fetch，不经过缓存
    return;
  }

  // 只缓存同源或静态资源请求
  if (url.origin === location.origin || 
      event.request.url.includes('/manifest.json') ||
      event.request.url.includes('.svg') ||
      event.request.url.includes('.png') ||
      event.request.url.includes('.ico')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});