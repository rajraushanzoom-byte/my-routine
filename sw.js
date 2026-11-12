// Service worker for My Routine
// It lets Android show reminders as real notifications and lets the app open offline.
const CACHE = "routine-v1";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./"])).catch(() => {}));
});

self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./")))
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      return self.clients.openWindow("./");
    })
  );
});
