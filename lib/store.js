/**
 * @fileoverview Zustand store — Taste & Tales
 * Manages cart + wishlist state, persisted to localStorage,
 * and synced to Firebase when the user is authenticated.
 *
 * Architecture:
 *   - useCartStore   → cart items, quantities, coupon, totals
 *   - useWishlistStore → saved product IDs
 *   - useUIStore     → header state, drawer open/close
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Cart Store ───────────────────────────────────────────────────────────────

/**
 * @typedef {Object} CartItem
 * @property {string} id          - Product ID
 * @property {string} slug        - Product slug
 * @property {string} name        - Product name
 * @property {number} price       - Unit price (INR)
 * @property {string} image       - Primary image URL
 * @property {string} [variant]   - Variant label (e.g. "500g")
 * @property {number} quantity    - Quantity in cart
 */

export const useCartStore = create(
  persist(
    (set, get) => ({
      /** @type {CartItem[]} */
      items: [],
      couponCode: "",
      couponDiscount: 0,
      isDrawerOpen: false,

      // ── Actions ──────────────────────────────────────────────────────────

      /** Add a product to cart, or increment quantity if already present */
      addItem: (product) => {
        const { items } = get();
        const existing = items.find(
          (i) => i.id === product.id && i.variant === product.variant
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id && i.variant === product.variant
                ? { ...i, quantity: i.quantity + (product.quantity || 1) }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: product.quantity || 1 }] });
        }
      },

      /** Remove a product from cart entirely */
      removeItem: (id, variant) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variant === variant)
          ),
        })),

      /** Update quantity of a specific cart item */
      updateQuantity: (id, variant, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, quantity } : i
          ),
        }));
      },

      /** Clear the entire cart */
      clearCart: () => set({ items: [], couponCode: "", couponDiscount: 0 }),

      /** Apply a coupon — validation done server-side via Firebase */
      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      /** Remove applied coupon */
      removeCoupon: () => set({ couponCode: "", couponDiscount: 0 }),

      /** Open/close cart drawer */
      openDrawer:  () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),

      // ── Computed ─────────────────────────────────────────────────────────

      /** Total number of items (accounting for quantities) */
      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      /** Subtotal before discounts */
      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      /** Order total after coupon */
      get total() {
        const { subtotal, couponDiscount } = get();
        const shipping = subtotal >= 499 ? 0 : 60;
        return Math.max(0, subtotal - couponDiscount + shipping);
      },

      /** Shipping cost */
      get shipping() {
        return get().subtotal >= 499 ? 0 : 60;
      },
    }),
    {
      name: "tt-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : null
      ),
      // Only persist items & coupon — not UI state
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);

// ─── Wishlist Store ───────────────────────────────────────────────────────────

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      /** @type {string[]} */
      ids: [],

      /** Toggle a product in/out of wishlist */
      toggle: (id) => {
        const { ids } = get();
        set({
          ids: ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id],
        });
      },

      /** Check if a product is wishlisted */
      isWishlisted: (id) => get().ids.includes(id),

      /** Clear entire wishlist */
      clear: () => set({ ids: [] }),

      /** Sync wishlist from Firebase (called on login) */
      syncFromFirebase: (firebaseIds) => set({ ids: firebaseIds || [] }),
    }),
    {
      name: "tt-wishlist",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : null
      ),
    }
  )
);

// ─── UI Store ────────────────────────────────────────────────────────────────

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  searchQuery: "",
  activeToast: null,

  openMobileMenu:  () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  openSearch:  () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  showToast: (toast) => set({ activeToast: toast }),
  clearToast: () => set({ activeToast: null }),
}));
