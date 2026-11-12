// Service worker for My Routine
// It lets Android show reminders as real system notifications (with buttons) and lets the app open offline.
const CACHE = "routine-v2";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./"])).catch(() => {}));
});

self.addEventListener("activate", e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .catch(() => {})
    .then(() => self.clients.claim())
));

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

// Tapping the notification, or its "I did it" / "Snooze 5 min" buttons
self.addEventListener("notificationclick", e => {
  const n = e.notification, d = n.data || {}, act = e.action;
  n.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const msg = { type: "routine-action", action: act || "open", id: d.id };
    if (act === "done" || act === "snooze") {
      // page is still running: let it handle the button quietly
      if (list.length) { list.forEach(c => c.postMessage(msg)); return; }
      // page was closed: open it so it can save the result
      return self.clients.openWindow("./?act=" + act + "&id=" + encodeURIComponent(d.id));
    }
    for (const c of list) { if ("focus" in c) { c.postMessage(msg); return c.focus(); } }
    return self.clients.openWindow("./");
  })());
});
