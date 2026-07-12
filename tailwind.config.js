/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Color Palette ───────────────────────────────────────────────
      colors: {
        ivory:    "#FAF7F2", // primary background
        beige:    "#F2E8DA", // section alt background
        olive:    "#3F4A22", // primary brand / CTA / footer
        gold:     "#C9A66B", // accents, dividers, price highlights, badges
        brown:    "#6D4C41", // secondary text on light, borders
        espresso: "#2A1E17", // headline text, dark mode base
        gray:     "#555555", // body copy
        sand:     "#E5D8C8", // cards, input backgrounds
        sage:     "#7C8F5A", // success states, eco/sustainable tags
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans:    ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.015em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "display-xs":  ["1.5rem",  { lineHeight: "1.3",  letterSpacing: "-0.01em" }],
        // Body scale
        "body-xl":     ["1.25rem", { lineHeight: "1.75" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.75" }],
        "body-md":     ["1rem",    { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.6"  }],
        "body-xs":     ["0.75rem", { lineHeight: "1.6"  }],
        // Label scale
        "label-lg":    ["0.9375rem",{ lineHeight: "1.5", letterSpacing: "0.06em" }],
        "label-md":    ["0.8125rem",{ lineHeight: "1.5", letterSpacing: "0.06em" }],
        "label-sm":    ["0.6875rem",{ lineHeight: "1.4", letterSpacing: "0.08em" }],
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "38":  "9.5rem",
        "42":  "10.5rem",
        "46":  "11.5rem",
        "50":  "12.5rem",
        "58":  "14.5rem",
        "66":  "16.5rem",
        "74":  "18.5rem",
        "82":  "20.5rem",
        "90":  "22.5rem",
        "98":  "24.5rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Shadows ───────────────────────────────────────────────────────────
      boxShadow: {
        "card":     "0 2px 16px 0 rgba(42, 30, 23, 0.07)",
        "card-hover": "0 8px 32px 0 rgba(42, 30, 23, 0.13)",
        "gold":     "0 4px 24px 0 rgba(201, 166, 107, 0.25)",
        "olive":    "0 4px 24px 0 rgba(63, 74, 34, 0.25)",
        "button":   "0 2px 8px 0 rgba(63, 74, 34, 0.18)",
      },

      // ─── Animation / Transition ─────────────────────────────────────────────
      transitionTimingFunction: {
        "ease-brand": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },

      // ─── Background gradients ──────────────────────────────────────────────
      backgroundImage: {
        "gold-shimmer": "linear-gradient(90deg, #C9A66B 0%, #E8C98A 50%, #C9A66B 100%)",
        "olive-to-espresso": "linear-gradient(135deg, #3F4A22 0%, #2A1E17 100%)",
        "ivory-fade": "linear-gradient(180deg, #FAF7F2 0%, #F2E8DA 100%)",
      },

      // ─── Max width ─────────────────────────────────────────────────────────
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },

      // ─── Aspect ratio ──────────────────────────────────────────────────────
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [],
};
