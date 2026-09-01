self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const data = event.notification.data || {};

  event.waitUntil((async () => {
    const openClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (openClients.length > 0) {
      const target = openClients.find(client => 'focus' in client) || openClients[0];
      await target.focus();
      target.postMessage({
        type: 'OPEN_CARTECH_ALERT',
        jobId: data.jobId || null,
        alertType: data.alertType || 'message'
      });
      return;
    }

    const url = new URL('./', self.location.href);
    if (data.jobId) url.searchParams.set('alertJob', data.jobId);
    if (data.alertType) url.searchParams.set('alertType', data.alertType);
    await self.clients.openWindow(url.href);
  })());
});
