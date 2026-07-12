/**
 * PWA Manifest — Taste & Tales
 * Enables add-to-home-screen on iOS/Android.
 */
export default function manifest() {
  return {
    name: "Taste & Tales",
    short_name: "T&T",
    description:
      "Sips. Bites. Memories. — Premium handcrafted Indian sweets & gift boxes.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#3F4A22",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    categories: ["food", "shopping"],
    lang: "en-IN",
    dir: "ltr",
    screenshots: [
      {
        src: "/screenshots/home.jpg",
        sizes: "390x844",
        type: "image/jpeg",
        form_factor: "narrow",
      },
    ],
  };
}
