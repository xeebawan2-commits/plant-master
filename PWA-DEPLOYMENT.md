# PlantMaster Pro PWA

## Files that must stay together

```text
index.html
manifest.webmanifest
service-worker.js
icons/
  icon-192.png
  icon-512.png
  maskable-512.png
```

## Important

A service worker cannot run when `index.html` is opened directly from Android storage with a `content://` or `file://` address. Deploy this folder to an HTTPS host such as Netlify, Cloudflare Pages, GitHub Pages, or your company web server.

## Install on Android

1. Open the HTTPS application URL in Chrome.
2. Log in with the assigned PIN.
3. Tap the **Install App** button when it appears, or use Chrome menu → **Install app** / **Add to Home screen**.

## Install on iPhone/iPad

1. Open the HTTPS URL in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.

## Install on Windows/macOS

Open the HTTPS URL in Chrome or Edge and click the install icon in the address bar.

## Supabase

The supplied Supabase URL and publishable key are preconfigured in `index.html`. The PWA does not cache Supabase API responses; application changes remain buffered in localStorage and upload automatically when connectivity returns.

## Updating the app

Change `CACHE_VERSION` in `service-worker.js` whenever deploying a new release, for example from `plantmaster-pro-v1.0.0` to `plantmaster-pro-v1.0.1`. This causes old app-shell files to be replaced.

## QR camera and media files

The live QR camera requires the deployed HTTPS URL and camera permission. Images/documents save offline in IndexedDB. Run the SQL in `MEDIA-SETUP.md` to synchronize original files through Supabase Storage across devices.
