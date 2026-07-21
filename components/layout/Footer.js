"use client";

/**
 * @fileoverview Footer — Taste & Tales
 * Brand footer with:
 *   - UtilityBar (PAN India / Corporate / WhatsApp)
 *   - FeatureStrip (4-icon dark olive band)
 *   - Full footer with logo, nav links, social links, newsletter
 *   - Legal links strip
 */

import Link from "next/link";
import {
  Package, Briefcase, MessageCircle, Wheat, ScrollText, Gift, Leaf,
  Instagram, Facebook, Youtube, MapPin, Phone, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";

// ─── Utility Bar ─────────────────────────────────────────────────────────────

const UTILITY_ITEMS = [
  { icon: <Package size={16} />, text: "PAN India Delivery" },
  { icon: <Briefcase size={16} />, text: "Corporate Orders Welcome" },
  {
    icon: <MessageCircle size={16} />,
    text: "WhatsApp: +91 XXXXX XXXXX",
    href: "https://wa.me/91XXXXXXXXXX",
  },
];

export function UtilityBar() {
  return (
    <div className="bg-espresso py-3">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="flex items-center justify-center sm:justify-between gap-4 flex-wrap">
          {UTILITY_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-label-md text-ivory/80 hover:text-gold transition-colors"
                >
                  <span className="text-gold" aria-hidden="true">{item.icon}</span>
                  {item.text}
                </a>
              ) : (
                <div className="flex items-center gap-2 font-sans text-label-md text-ivory/80">
                  <span className="text-gold" aria-hidden="true">{item.icon}</span>
                  {item.text}
                </div>
              )}
              {i < UTILITY_ITEMS.length - 1 && (
                <span className="hidden sm:block ml-4 text-gold/30 text-label-sm">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Feature Strip ────────────────────────────────────────────────────────────

const FEATURE_ITEMS = [
  { icon: <Wheat size={28} />,      title: "Wholesome Ingredients",   desc: "Millets, palm jaggery & A2 ghee" },
  { icon: <ScrollText size={28} />, title: "Traditional Recipes",     desc: "Crafted from generational wisdom" },
  { icon: <Gift size={28} />,       title: "Thoughtful Gifting",      desc: "Every box tells a story" },
  { icon: <Leaf size={28} />,       title: "Sustainable Choices",     desc: "Earth-first, always" },
];

export function FeatureStrip() {
  return (
    <div className="bg-olive py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {FEATURE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-3"
            >
              <span className="text-gold" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="font-sans font-bold text-label-lg text-ivory">
                  {item.title}
                </p>
                <p className="font-sans text-body-sm text-ivory/60 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Footer links ─────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  Shop: [
    ...CATEGORIES.map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
    { label: "All Products", href: "/shop" },
    { label: "Bestsellers",  href: "/shop?sort=bestsellers" },
  ],
  Company: [
    { label: "Our Story",          href: "/our-story" },
    { label: "Corporate Gifting",  href: "/corporate-gifting" },
    { label: "Stories & Recipes",  href: "/blogs" },
    { label: "Contact Us",         href: "/contact" },
    { label: "FAQ",                href: "/faq" },
  ],
  Legal: [
    { label: "Shipping Policy",  href: "/legal/shipping" },
    { label: "Returns & Refunds",href: "/legal/returns" },
    { label: "Privacy Policy",   href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

const SOCIAL_LINKS = [
  { href: "https://instagram.com/tasteandtales", icon: <Instagram size={18} />, label: "Instagram" },
  { href: "https://facebook.com/tasteandtales",  icon: <Facebook size={18} />,  label: "Facebook"  },
  { href: "https://youtube.com/@tasteandtales",  icon: <Youtube size={18} />,   label: "YouTube"   },
];

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer role="contentinfo">
      <UtilityBar />

      {/* Main footer body */}
      <div className="bg-espresso">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" aria-label="Taste & Tales — Home">
                <div className="mb-4">
                  <p className="font-display text-display-sm text-ivory font-bold">
                    Taste & Tales
                  </p>
                  <p className="font-sans text-label-sm text-gold tracking-widest uppercase mt-1">
                    Sips. Bites. Memories.
                  </p>
                </div>
              </Link>
              <p className="font-sans text-body-sm text-ivory/60 max-w-xs leading-relaxed mb-6">
                Handcrafted Indian sweets & savouries made with millets, palm jaggery, and
                three generations of patience. No shortcuts. No artificial anything.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-2 mb-6">
                {[
                  { icon: <Mail size={14} />, text: "hello@tasteandtales.in", href: "mailto:hello@tasteandtales.in" },
                  { icon: <Phone size={14} />, text: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
                  { icon: <MapPin size={14} />, text: "Chennai, India" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gold/70 shrink-0" aria-hidden="true">{item.icon}</span>
                    {item.href ? (
                      <a href={item.href} className="font-sans text-body-xs text-ivory/60 hover:text-gold transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-sans text-body-xs text-ivory/60">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="p-2.5 rounded-full bg-ivory/5 text-ivory/60 hover:text-gold hover:bg-ivory/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h3 className="font-sans font-bold text-label-lg text-ivory uppercase tracking-wider mb-4">
                  {group}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-body-sm text-ivory/60 hover:text-gold transition-colors focus-visible:text-gold focus-visible:outline-none"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal strip */}
        <div className="border-t border-ivory/5">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-body-xs text-ivory/40 text-center sm:text-left">
              © {new Date().getFullYear()} Taste & Tales. All rights reserved. Made with love in India.
            </p>
            <div className="flex items-center gap-1">
              <span className="font-sans text-body-xs text-ivory/40">
                Crafted with
              </span>
              <span className="text-gold text-body-xs mx-1">✦</span>
              <span className="font-sans text-body-xs text-ivory/40">
                and palm jaggery.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav spacer */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
