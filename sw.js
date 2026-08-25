// CARTECH Background Notification & Wake-Lock Handler
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

// Urgent floor notification with high-priority vibration
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CAR_WAITING_ALERT") {
    const title = "🚨 CAR WAITING ON FLOOR!";
    const options = {
      body: event.data.msg || "New customer vehicle dispatched. Accept into Bay.",
      icon: "team.jpg",
      badge: "team.jpg",
      vibrate: [800, 300, 800, 300, 1200, 300, 1500],
      tag: "cartech-urgent-floor-alarm",
      renotify: true,
      requireInteraction: true,
      silent: false
    };

    self.registration.showNotification(title, options);
  }
});

// Keep fetch requests alive in background
self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
