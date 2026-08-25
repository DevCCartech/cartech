self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

// Hardware background notification with high-priority vibration
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CAR_WAITING_ALERT") {
    const title = "🚨 CAR WAITING ON FLOOR!";
    const options = {
      body: event.data.msg || "New vehicle dispatched to workshop. Open app to accept into bay.",
      icon: "team.jpg",
      badge: "team.jpg",
      vibrate: [600, 200, 600, 200, 1000, 400, 1000],
      tag: "cartech-urgent-floor-alarm",
      renotify: true,
      requireInteraction: true,
      silent: false
    };

    self.registration.showNotification(title, options);
  }
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
