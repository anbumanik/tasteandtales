"use client";

/**
 * @fileoverview Header — Taste & Tales
 * Sticky minimal header with logo, search, wishlist, cart drawer trigger, account.
 * Transparent on hero scroll, solid on scroll-past.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, Heart, ShoppingBag, User, X, Menu,
  Leaf, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useWishlistStore, useUIStore } from "@/lib/store";
import { CATEGORIES } from "@/data/categories";
import { fadeIn, slideUp } from "@/lib/motion";

// ─── Navigation links ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Shop",       href: "/shop",             hasMega: true },
  { label: "Our Story",  href: "/our-story" },
  { label: "Gifting",    href: "/corporate-gifting" },
  { label: "Stories",    href: "/blogs" },
];

// ─── MegaMenu ─────────────────────────────────────────────────────────────────

function MegaMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute left-0 right-0 top-full z-40 bg-ivory border-t border-sand shadow-card-hover"
          onMouseLeave={onClose}
        >
          <div className="mx-auto max-w-7xl px-10 py-8">
            <div className="grid grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  onClick={onClose}
                  className="group flex flex-col gap-3 p-4 rounded-2xl hover:bg-beige transition-colors"
                >
                  <div className="aspect-square w-full rounded-xl bg-sand overflow-hidden">
                    {/* Image placeholder — replace with actual category images */}
                    <div className="w-full h-full bg-gradient-to-br from-beige to-sand flex items-center justify-center">
                      <Leaf size={32} className="text-gold/40" />
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-display-xs text-espresso group-hover:text-olive transition-colors">
                      {cat.name}
                    </p>
                    <p className="font-sans text-body-sm text-gray mt-0.5">
                      {cat.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Bottom strip */}
            <div className="mt-6 pt-6 border-t border-sand flex items-center justify-between">
              <p className="font-sans text-body-sm text-brown/70 italic">
                "Some gifts get opened. Some become memories."
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="font-sans text-body-sm font-semibold text-olive hover:text-gold transition-colors flex items-center gap-1"
              >
                View all products →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.nav
            variants={slideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 bottom-0 z-50 bg-ivory rounded-t-3xl shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-sand">
              <span className="font-display text-display-xs text-espresso">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-sand transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3.5 font-sans font-semibold text-body-lg text-espresso hover:text-olive transition-colors border-b border-sand/60 last:border-0"
                >
                  {link.label}
                  <span className="text-gold text-body-xs">→</span>
                </Link>
              ))}
              {/* Category sub-links */}
              <div className="mt-4">
                <p className="font-sans text-label-sm text-brown/50 uppercase tracking-widest mb-3">
                  Shop by category
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 py-2.5 font-sans text-body-md text-gray hover:text-olive transition-colors"
                  >
                    <Leaf size={14} className="text-gold" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

import AnnouncementBar from "@/components/marketing/AnnouncementBar";

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu, openSearch } = useUIStore();
  const { openDrawer } = useCartStore();

  // Cart count from Zustand (computed)
  const cartItemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <div className="sticky top-0 inset-x-0 z-40 flex flex-col">
        <AnnouncementBar />
        
        <header
          className={cn(
            "transition-all duration-400 ease-brand w-full",
            scrolled
              ? "bg-ivory/95 backdrop-blur-md shadow-card border-b border-sand"
              : "bg-ivory lg:bg-transparent" // solid bg on mobile always for readability
          )}
          role="banner"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Mobile menu trigger */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 rounded-full text-espresso hover:bg-sand transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center sm:items-start group"
              aria-label="Taste & Tales — Home"
            >
              <span className="font-display text-display-xs sm:text-display-sm text-olive font-bold leading-none tracking-tight group-hover:text-espresso transition-colors">
                Taste & Tales
              </span>
              <span className="font-sans text-label-sm text-gold tracking-[0.15em] uppercase hidden sm:block">
                Sips. Bites. Memories.
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.hasMega && setMegaOpen(true)}
                  onMouseLeave={() => link.hasMega && setMegaOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full",
                      "font-sans font-semibold text-label-lg text-gray",
                      "hover:text-olive hover:bg-sand transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    )}
                    aria-haspopup={link.hasMega ? "true" : undefined}
                  >
                    {link.label}
                    {link.hasMega && <ChevronDown size={14} className="text-gold" />}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Icon actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={openSearch}
                className="p-2.5 rounded-full text-gray hover:text-olive hover:bg-sand transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-gray hover:text-olive hover:bg-sand transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-espresso rounded-full text-[10px] font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex p-2.5 rounded-full text-gray hover:text-olive hover:bg-sand transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={openDrawer}
                className="relative flex items-center gap-2 ml-1 px-4 py-2 bg-olive text-ivory rounded-full font-sans font-semibold text-label-md hover:bg-espresso transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label={`Cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ""}`}
                aria-live="polite"
              >
                <ShoppingBag size={17} />
                <span className="hidden sm:inline">
                  {cartItemCount > 0 ? `${cartItemCount} item${cartItemCount > 1 ? "s" : ""}` : "Box"}
                </span>
                {cartItemCount > 0 && (
                  <span
                    className="sm:hidden absolute -top-1 -right-1 h-4.5 w-4.5 bg-gold text-espresso rounded-full text-[10px] font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu — desktop only */}
        <div
          className="hidden lg:block relative"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
        </div>
      </header>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Header height spacer — prevents content going under fixed header */}
      <div className="h-16 sm:h-18" aria-hidden="true" />
    </>
  );
}
