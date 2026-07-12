/**
 * @fileoverview cn() utility — Taste & Tales
 * Merges Tailwind class names using clsx + tailwind-merge.
 * Avoids class conflicts from conditional / overridden classes.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely.
 * @param {...(string|Object|Array)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in Indian Rupees.
 * @param {number} amount
 * @returns {string} e.g. "₹499"
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date in a warm, readable format.
 * @param {string|number} dateInput
 * @returns {string} e.g. "12 July 2026"
 */
export function formatDate(dateInput) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateInput));
}

/**
 * Truncate text to a given length.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Generate a URL-friendly slug from a string.
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculate discount percentage.
 * @param {number} original
 * @param {number} sale
 * @returns {number} e.g. 20 (for 20%)
 */
export function discountPercent(original, sale) {
  if (!original || !sale || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Debounce a function.
 * @param {Function} fn
 * @param {number} delay ms
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if code is running on the server.
 * @returns {boolean}
 */
export const isServer = typeof window === "undefined";

/**
 * Check if code is running on the client.
 * @returns {boolean}
 */
export const isClient = !isServer;

/**
 * Generate a placeholder blur data URL for next/image.
 * @returns {string} base64 data URL
 */
export function shimmerPlaceholder(w = 700, h = 475) {
  const shimmer = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#F2E8DA" offset="20%" />
          <stop stop-color="#E5D8C8" offset="50%" />
          <stop stop-color="#F2E8DA" offset="70%" />
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <rect width="${w}" height="${h}" fill="#F2E8DA" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" filter="url(#blur)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.8s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
}
