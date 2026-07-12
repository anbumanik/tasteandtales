"use client";

/**
 * @fileoverview Button atom — Taste & Tales
 * The primary interactive element. Wraps Framer Motion for brand-standard hover/tap.
 *
 * @example
 * <Button variant="primary" size="md" onClick={...}>Shop Sweets</Button>
 * <Button variant="secondary" href="/shop">Explore Gifts</Button>
 * <Button variant="ghost" icon={<LeafIcon />} />
 */

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover, buttonTap } from "@/lib/motion";

// ─── Variant styles ───────────────────────────────────────────────────────────

const variants = {
  primary:
    "bg-olive text-ivory border border-transparent hover:border-gold shadow-button hover:shadow-olive focus-visible:ring-gold",
  secondary:
    "bg-transparent text-brown border border-brown hover:border-gold hover:text-gold focus-visible:ring-gold",
  ghost:
    "bg-transparent text-espresso border border-transparent hover:bg-sand focus-visible:ring-gold",
  danger:
    "bg-transparent text-red-700 border border-red-300 hover:bg-red-50 focus-visible:ring-red-400",
  gold:
    "bg-gold text-espresso border border-transparent hover:shadow-gold focus-visible:ring-gold",
};

const sizes = {
  xs:  "px-3 py-1.5 text-label-sm rounded-lg gap-1",
  sm:  "px-4 py-2   text-label-md rounded-xl gap-1.5",
  md:  "px-6 py-3   text-label-lg rounded-full gap-2",
  lg:  "px-8 py-4   text-body-lg  rounded-full gap-2.5",
  xl:  "px-10 py-5  text-body-xl  rounded-full gap-3",
  icon:"p-2 rounded-full",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {"primary"|"secondary"|"ghost"|"danger"|"gold"} [props.variant="primary"]
 * @param {"xs"|"sm"|"md"|"lg"|"xl"|"icon"} [props.size="md"]
 * @param {string} [props.href]          - If set, renders as Next.js <Link>
 * @param {boolean} [props.loading]      - Shows spinner, disables interaction
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.fullWidth]
 * @param {React.ReactNode} [props.icon]       - Leading icon
 * @param {React.ReactNode} [props.trailingIcon] - Trailing icon
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    trailingIcon,
    className,
    children,
    onClick,
    type = "button",
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  const classes = cn(
    // Base
    "inline-flex items-center justify-center font-sans font-semibold",
    "transition-all duration-300 ease-brand",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "select-none whitespace-nowrap",
    // Variant
    variants[variant],
    // Size
    sizes[size],
    // State modifiers
    fullWidth && "w-full",
    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      ) : (
        icon && <span aria-hidden="true">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {trailingIcon && !loading && (
        <span aria-hidden="true">{trailingIcon}</span>
      )}
    </>
  );

  // ── Render as Link ──────────────────────────────────────────────────────────
  if (href && !isDisabled) {
    return (
      <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
        <Link href={href} ref={ref} className={classes} {...rest}>
          {content}
        </Link>
      </motion.div>
    );
  }

  // ── Render as button ────────────────────────────────────────────────────────
  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? {} : buttonHover}
      whileTap={isDisabled ? {} : buttonTap}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
