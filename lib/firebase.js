/**
 * @fileoverview Firebase initialization for Taste & Tales
 * Project: taste-b1c4f | Region: asia-southeast1
 * All sensitive values are loaded from .env.local — never hardcode here.
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set, get, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ─── App singleton (prevents re-init on hot reload) ──────────────────────────
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getDatabase(app);
export const storage = getStorage(app);

export default app;

// ─── Analytics (client-only, lazy-loaded) ────────────────────────────────────
/**
 * Call this inside a useEffect to initialise Analytics on the client.
 * @returns {Promise<import('firebase/analytics').Analytics>}
 */
export async function getAnalytics() {
  if (typeof window === "undefined") return null;
  const { getAnalytics: _get, isSupported } = await import("firebase/analytics");
  const supported = await isSupported();
  if (!supported) return null;
  return _get(app);
}

// ─── Database helpers ─────────────────────────────────────────────────────────

/**
 * Write a newsletter signup to /newsletter.
 * @param {string} email
 */
export async function subscribeNewsletter(email) {
  const newsletterRef = ref(db, "newsletter");
  await push(newsletterRef, {
    email: email.toLowerCase().trim(),
    subscribedAt: Date.now(),
  });
}

/**
 * Write a corporate enquiry to /enquiries.
 * @param {Object} data - validated enquiry form data
 */
export async function submitEnquiry(data) {
  const enquiriesRef = ref(db, "enquiries");
  await push(enquiriesRef, {
    ...data,
    status: "new",
    createdAt: Date.now(),
  });
}

/**
 * Write an order to /orders.
 * @param {Object} orderData
 * @returns {string} orderId
 */
export async function createOrder(orderData) {
  const ordersRef = ref(db, "orders");
  const newRef = push(ordersRef);
  await set(newRef, {
    ...orderData,
    status: "pending",
    statusHistory: [{ status: "pending", timestamp: Date.now() }],
    createdAt: Date.now(),
  });
  return newRef.key;
}

/**
 * Fetch all products from /products.
 * @returns {Promise<Object[]>}
 */
export async function fetchProducts() {
  const snap = await get(ref(db, "products"));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
}

/**
 * Fetch a single product by slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function fetchProductBySlug(slug) {
  const q = query(ref(db, "products"), orderByChild("slug"), equalTo(slug));
  const snap = await get(q);
  if (!snap.exists()) return null;
  const [id, data] = Object.entries(snap.val())[0];
  return { id, ...data };
}

/**
 * Validate a coupon code.
 * @param {string} code
 * @returns {Promise<Object|null>} coupon data or null if invalid
 */
export async function validateCoupon(code) {
  const snap = await get(ref(db, `coupons/${code.toUpperCase()}`));
  if (!snap.exists()) return null;
  const coupon = snap.val();
  if (!coupon.active) return null;
  if (coupon.expiresAt && coupon.expiresAt < Date.now()) return null;
  return coupon;
}

/**
 * Fetch orders for a user.
 * @param {string} userId
 */
export async function fetchUserOrders(userId) {
  const q = query(ref(db, "orders"), orderByChild("userId"), equalTo(userId));
  const snap = await get(q);
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }));
}
