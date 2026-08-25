// CARTECH HARDWARE BACKGROUND SERVICE WORKER
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

// DISCORD-STYLE PERSISTENT HARDWARE NOTIFICATION & VIBRATION
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CAR_WAITING_ALERT") {
    const title = "🚨 CARTECH: CAR DISPATCHED ON FLOOR!";
    const options = {
      body: event.data.msg || "New vehicle waiting for service. Open app to accept into Bay.",
      icon: "team.jpg",
      badge: "team.jpg",
      // Heavy Discord-style repeating vibration pulses: [Vibrate, Pause, Vibrate, Pause...]
      vibrate: [1000, 250, 1000, 250, 1000, 500, 1500, 300, 1500],
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
