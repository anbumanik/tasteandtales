"use client";

/**
 * @fileoverview Badge / TrustChip atoms — Taste & Tales
 *
 * <Badge>   — general purpose label (category, status, discount)
 * <TrustChip> — the 4 canonical brand trust badges
 */

import { cn } from "@/lib/utils";
import { Leaf, Palette, Zap, Star, CheckCircle2, Package } from "lucide-react";

// ─── Badge ────────────────────────────────────────────────────────────────────

const badgeVariants = {
  gold:     "bg-gold/10 text-gold border border-gold/20",
  olive:    "bg-olive text-ivory",
  sage:     "bg-sage/10 text-sage border border-sage/20",
  sand:     "bg-sand text-brown border border-sand",
  espresso: "bg-espresso text-ivory",
  brown:    "bg-brown/10 text-brown border border-brown/20",
  discount: "bg-gold text-espresso font-bold",
};

/**
 * @param {Object} props
 * @param {"gold"|"olive"|"sage"|"sand"|"espresso"|"brown"|"discount"} [props.variant="gold"]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Badge({ variant = "gold", icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full",
        "font-sans text-label-md font-semibold",
        badgeVariants[variant],
        className
      )}
    >
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

// ─── TrustChip ────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  {
    id: "no-preservatives",
    label: "No Preservatives",
    icon: <Leaf size={12} strokeWidth={2} />,
  },
  {
    id: "no-artificial-colours",
    label: "No Artificial Colours",
    icon: <Palette size={12} strokeWidth={2} />,
  },
  {
    id: "no-shortcuts",
    label: "No Shortcuts",
    icon: <Zap size={12} strokeWidth={2} />,
  },
  {
    id: "honest-ingredients",
    label: "Just Honest Ingredients",
    icon: <CheckCircle2 size={12} strokeWidth={2} />,
  },
];

/**
 * A single trust chip.
 * @param {Object} props
 * @param {"dark"|"light"} [props.variant="dark"] - "dark" for use on ivory/beige, "light" for olive bg
 * @param {React.ReactNode} props.icon
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function TrustChip({ variant = "dark", icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "font-sans font-semibold text-label-sm tracking-wide",
        variant === "dark"
          ? "bg-olive text-ivory"
          : "bg-ivory/10 text-ivory border border-ivory/20",
        className
      )}
    >
      {icon && <span className="text-gold shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

/**
 * The full rail of 4 canonical trust chips.
 * @param {Object} props
 * @param {"dark"|"light"} [props.variant="dark"]
 * @param {string} [props.className]
 */
export function TrustChipRail({ variant = "dark", className }) {
  return (
    <div
      role="list"
      aria-label="Our brand promises"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {TRUST_ITEMS.map((item) => (
        <TrustChip key={item.id} variant={variant} icon={item.icon} role="listitem">
          {item.label}
        </TrustChip>
      ))}
    </div>
  );
}

// ─── DiscountBadge ────────────────────────────────────────────────────────────

/**
 * Shows a percentage discount badge.
 * @param {Object} props
 * @param {number} props.percent
 * @param {string} [props.className]
 */
export function DiscountBadge({ percent, className }) {
  if (!percent || percent <= 0) return null;
  return (
    <Badge variant="discount" className={cn("absolute top-3 left-3 z-10", className)}>
      −{percent}%
    </Badge>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

const STATUS_MAP = {
  pending:    { label: "Pending",     variant: "sand"    },
  confirmed:  { label: "Confirmed",   variant: "olive"   },
  processing: { label: "Processing",  variant: "gold"    },
  shipped:    { label: "Shipped",     variant: "brown"   },
  delivered:  { label: "Delivered",   variant: "sage"    },
  cancelled:  { label: "Cancelled",   variant: "espresso"},
};

/**
 * Order status badge.
 * @param {Object} props
 * @param {"pending"|"confirmed"|"processing"|"shipped"|"delivered"|"cancelled"} props.status
 * @param {string} [props.className]
 */
export function StatusBadge({ status, className }) {
  const config = STATUS_MAP[status] || { label: status, variant: "sand" };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

export default Badge;
