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
    // icons and screenshots omitted because assets do not exist yet
    categories: ["food", "shopping"],
    lang: "en-IN",
    dir: "ltr",
  };
}
