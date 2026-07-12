"use client";

/**
 * @fileoverview StarRating, PriceTag, QuantityStepper atoms — Taste & Tales
 */

import { useState } from "react";
import { Star } from "lucide-react";
import { cn, formatPrice, discountPercent } from "@/lib/utils";

// ─── StarRating ───────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {number} [props.value=0]         - Current rating (0-5, supports .5)
 * @param {boolean} [props.interactive]    - If true, allows clicking to rate
 * @param {number} [props.count]           - Review count to display alongside
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {Function} [props.onChange]      - Called with new rating value
 * @param {string} [props.className]
 */
export function StarRating({
  value = 0,
  interactive = false,
  count,
  size = "md",
  onChange,
  className,
}) {
  const [hovered, setHovered] = useState(0);

  const starSizes = { sm: 12, md: 16, lg: 20 };
  const starSize = starSizes[size];
  const display = interactive ? (hovered || value) : value;

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${value} out of 5 stars${count ? `, ${count} reviews` : ""}`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          role={interactive ? "radio" : undefined}
          aria-checked={interactive ? value === star : undefined}
          className={cn(
            "transition-transform duration-150",
            interactive && "hover:scale-110 focus-visible:scale-110 cursor-pointer",
            !interactive && "cursor-default"
          )}
          onClick={interactive ? () => onChange?.(star) : undefined}
          onMouseEnter={interactive ? () => setHovered(star) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
          aria-label={interactive ? `Rate ${star} star${star > 1 ? "s" : ""}` : undefined}
        >
          <Star
            size={starSize}
            strokeWidth={1.5}
            className={cn(
              display >= star
                ? "fill-gold stroke-gold"
                : display >= star - 0.5
                ? "fill-gold/40 stroke-gold"
                : "fill-transparent stroke-sand"
            )}
          />
        </button>
      ))}
      {count !== undefined && (
        <span className="ml-1 font-sans text-body-sm text-brown/70">
          ({count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}

// ─── PriceTag ─────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {number} props.price
 * @param {number} [props.compareAtPrice]
 * @param {"sm"|"md"|"lg"|"xl"} [props.size="md"]
 * @param {string} [props.className]
 */
export function PriceTag({ price, compareAtPrice, size = "md", className }) {
  const salePercent = discountPercent(compareAtPrice, price);

  const priceClasses = {
    sm: "text-body-md",
    md: "text-display-xs",
    lg: "text-display-sm",
    xl: "text-display-md",
  };

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span
        className={cn(
          "font-display text-espresso font-bold",
          priceClasses[size]
        )}
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <>
          <span className="font-sans text-body-sm text-brown/50 line-through">
            {formatPrice(compareAtPrice)}
          </span>
          {salePercent > 0 && (
            <span className="font-sans text-label-sm font-bold text-sage bg-sage/10 px-2 py-0.5 rounded-full">
              {salePercent}% off
            </span>
          )}
        </>
      )}
    </div>
  );
}

// ─── QuantityStepper ──────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {number} props.value
 * @param {number} [props.min=1]
 * @param {number} [props.max=99]
 * @param {Function} props.onChange
 * @param {"sm"|"md"} [props.size="md"]
 * @param {string} [props.className]
 */
export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  className,
}) {
  const sizeClasses = {
    sm: { wrap: "h-8 rounded-xl", btn: "px-2.5 text-body-sm", num: "w-8 text-body-sm" },
    md: { wrap: "h-10 rounded-xl", btn: "px-3 text-body-md", num: "w-10 text-body-md" },
  };
  const s = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center bg-sand border border-sand",
        s.wrap,
        className
      )}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        className={cn(
          "font-sans font-bold text-brown transition-colors",
          "hover:text-olive focus-visible:text-olive",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "h-full flex items-center",
          s.btn
        )}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        className={cn(
          "text-center font-sans font-semibold text-espresso",
          "flex items-center justify-center h-full",
          s.num
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <button
        type="button"
        className={cn(
          "font-sans font-bold text-brown transition-colors",
          "hover:text-olive focus-visible:text-olive",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "h-full flex items-center",
          s.btn
        )}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

// ─── Ornamental Divider ───────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {string} [props.glyph="✦"]
 * @param {string} [props.className]
 */
export function Divider({ glyph = "✦", className }) {
  return (
    <div
      className={cn("flex items-center gap-3 text-gold my-6", className)}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/60" />
      <span className="text-label-lg">{glyph}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {string} [props.className]
 */
export function Skeleton({ className }) {
  return (
    <div
      className={cn("skeleton", className)}
      aria-hidden="true"
      role="presentation"
    />
  );
}

/**
 * Product card skeleton.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-sand rounded-2xl overflow-hidden" aria-label="Loading product">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-6 w-1/3 mt-2" />
      </div>
    </div>
  );
}
