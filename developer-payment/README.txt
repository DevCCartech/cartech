CARTECH DEVELOPER PAYMENT — ANDROID PWA v1

WHAT THIS IS
An installable Android Progressive Web App connected to the same CARTECH
Supabase Developer Payment backend. It manages payment requests, discounted
top-ups, licenses, plan prices/stock, expiry, payment pause, and bonus time.

INSTALL / DEPLOY
1. Upload every file and the icons folder to one HTTPS website folder.
2. Keep index.html, sw.js, manifest.webmanifest, and icons/ together.
3. Open index.html through the HTTPS website in Chrome on Android.
4. Tap Install app. If the button is unavailable, open Chrome's menu and tap
   Install app or Add to Home screen.
5. Open CARTECH Pay, enter the private manager secret, and tap Load requests.

GITHUB PAGES
Upload the folder contents to the selected GitHub Pages folder. Service workers
do not install from a local file:// address; the app must be served through
HTTPS (or localhost during development).

DATA AND EGRESS
- Live Supabase records are not stored in the offline cache.
- The app loads once at startup only if this private device has a remembered
  manager secret.
- There is no background polling. Use Refresh data when needed.
- Receipt images load only when opened, reducing egress.

SECURITY
- Install this only on the developer's private Android device.
- Never publish or pre-fill the manager secret.
- Use the Remember option only on a locked personal phone.
- Always verify the real GCash transaction before approving payment.

NOTIFICATIONS
Browser notifications work while the PWA is running. Reliable notifications
after Android fully closes the app require a separate Web Push server and push
subscription setup; this package does not claim background push support.

UPDATE BEHAVIOR
The service worker uses network-first loading for index.html, so online launches
receive the newest deployed code. If a hosting CDN is slow to publish a GitHub
update, close and reopen the app after the deployment is complete.
