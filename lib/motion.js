/**
 * @fileoverview Framer Motion animation variants — Taste & Tales
 * Centralised motion language: slow fades + gentle upward drift.
 * Apple-restraint, not playful. 200–400ms ease-out.
 *
 * Usage:
 *   import { fadeUp, stagger } from "@/lib/motion";
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} />
 */

// ─── Fade + drift upward (primary scroll-into-view animation) ─────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Fade in (no movement) ────────────────────────────────────────────────────
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Fade from left ───────────────────────────────────────────────────────────
export const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Fade from right ──────────────────────────────────────────────────────────
export const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Stagger container (apply to parent) ─────────────────────────────────────
export const stagger = (delayChildren = 0.1, staggerChildren = 0.12) => ({
  hidden:  {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

// ─── Stagger item (apply to children) ────────────────────────────────────────
export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Scale pop (for badges, chips) ───────────────────────────────────────────
export const scalePop = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Slide up (for modals, drawers, toasts) ───────────────────────────────────
export const slideUp = {
  hidden:  { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Slide from right (cart drawer) ──────────────────────────────────────────
export const slideFromRight = {
  hidden:  { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Hero image parallax ──────────────────────────────────────────────────────
export const heroImage = {
  hidden:  { opacity: 0, scale: 1.06, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
  },
};

// ─── Hero text sequence ───────────────────────────────────────────────────────
export const heroText = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.12,
    },
  }),
};

// ─── CTA button hover ─────────────────────────────────────────────────────────
export const buttonHover = {
  scale: 1.03,
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const buttonTap = {
  scale: 0.97,
};

// ─── Card hover ───────────────────────────────────────────────────────────────
export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── Overlay (modal backdrop) ─────────────────────────────────────────────────
export const overlay = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};
