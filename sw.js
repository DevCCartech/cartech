self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

// FAST REPEATING DOORBELL VIBRATION PATTERN
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CAR_WAITING_ALERT") {
    const title = "🚨 CARTECH: CAR WAITING OUTSIDE!";
    const options = {
      body: event.data.msg || "Fast Doorbell Alert: New vehicle waiting on floor!",
      icon: "team.jpg",
      badge: "team.jpg",
      // Rapid pulse pattern: [Ding-Dong, Ding-Dong, Ding-Dong]
      vibrate: [400, 100, 600, 150, 400, 100, 600, 200, 800],
      tag: "cartech-urgent-floor-alarm",
      renotify: true,
      requireInteraction: true,
      silent: false,
      timestamp: Date.now()
    };

    self.registration.showNotification(title, options);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("cartech") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("./index.html");
      }
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
