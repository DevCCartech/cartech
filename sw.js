self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

// Hardware background notification with high-priority vibration channel
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CAR_WAITING_ALERT") {
    const title = "🚨 CARTECH: CAR WAITING ON FLOOR!";
    const options = {
      body: event.data.msg || "New vehicle dispatched to workshop. Open app to accept into bay.",
      icon: "team.jpg",
      badge: "team.jpg",
      // Distinct heavy vibration pulses: Vibrate 1s, Pause 0.2s, Vibrate 1s, Pause 0.2s, Vibrate 1.5s
      vibrate: [1000, 200, 1000, 200, 1500, 300, 1500],
      tag: "cartech-urgent-floor-alarm",
      renotify: true,
      requireInteraction: true,
      silent: false,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
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
