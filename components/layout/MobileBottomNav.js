"use client";

/**
 * @fileoverview MobileBottomNav — Taste & Tales
 * Persistent bottom navigation bar on mobile (hidden on desktop).
 * Tabs: Home / Shop / Wishlist / Cart / Account
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/",          label: "Home",     icon: Home },
  { href: "/shop",      label: "Shop",     icon: Gift },
  { href: "/wishlist",  label: "Wishlist", icon: Heart },
  { href: "/cart",      label: "Box",      icon: ShoppingBag },
  { href: "/account",   label: "Account",  icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartItemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { user, role, openAuthModal } = useAuthStore();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 lg:hidden"
      aria-label="Mobile navigation"
      role="navigation"
    >
      {/* Glass blur bar */}
      <div className="bg-ivory/95 backdrop-blur-md border-t border-sand px-2 pb-safe">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            const badgeCount =
              href === "/cart"
                ? cartItemCount
                : href === "/wishlist"
                ? wishlistCount
                : 0;

            const isAccount = href === "/account";
            const actualHref = isAccount && user && role === 'admin' ? '/admin' : href;
            
            const content = (
              <>
                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2 : 1.5}
                    className={cn(
                      "transition-transform",
                      isActive && "text-olive scale-110"
                    )}
                    aria-hidden="true"
                  />
                  {badgeCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-gold text-espresso rounded-full text-[9px] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {badgeCount > 9 ? "9+" : badgeCount}
                    </span>
                  )}
                </span>
                <span className={cn(isActive ? "font-semibold" : "font-medium")}>
                  {label}
                </span>
                {/* Active dot */}
                {isActive && (
                  <span
                    className="absolute top-1.5 inset-x-3 h-0.5 rounded-full bg-olive"
                    aria-hidden="true"
                  />
                )}
              </>
            );

            const className = cn(
              "relative flex flex-col items-center gap-0.5 px-3 py-3",
              "font-sans text-label-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl",
              isActive ? "text-olive" : "text-brown/60 hover:text-brown"
            );

            if (isAccount && !user) {
              return (
                <button
                  key={href}
                  onClick={openAuthModal}
                  className={className}
                  aria-label="Log In"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={href}
                href={actualHref}
                className={className}
                aria-current={isActive ? "page" : undefined}
                aria-label={`${label}${badgeCount > 0 ? `, ${badgeCount} item${badgeCount > 1 ? "s" : ""}` : ""}`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
