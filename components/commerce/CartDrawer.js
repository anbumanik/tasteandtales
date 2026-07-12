"use client";

/**
 * @fileoverview CartDrawer — Taste & Tales
 * Slide-in cart drawer from the right. Shows cart items, coupon field,
 * order summary, and checkout CTA.
 */

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { slideFromRight, overlay } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { couponSchema } from "@/lib/validators";
import { QuantityStepper } from "@/components/ui/ProductWidgets";
import { Divider } from "@/components/ui/ProductWidgets";
import Button from "@/components/ui/Button";

// ─── Cart Line Item ───────────────────────────────────────────────────────────

function CartLineItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 py-4 border-b border-sand last:border-0">
      {/* Product image */}
      <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-sand">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={24} className="text-brown/30" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-body-sm text-espresso line-clamp-2">
          {item.name}
        </p>
        {item.variant && (
          <p className="font-sans text-body-xs text-brown/60 mt-0.5">{item.variant}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <QuantityStepper
            value={item.quantity}
            size="sm"
            onChange={(qty) => updateQuantity(item.id, item.variant, qty)}
          />
          <p className="font-display text-body-md font-bold text-espresso">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => {
          removeItem(item.id, item.variant);
          toast.success(`${item.name} removed from your box.`);
        }}
        className="p-1.5 text-brown/40 hover:text-red-500 transition-colors self-start rounded-full hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Coupon Input ─────────────────────────────────────────────────────────────

function CouponInput() {
  const { couponCode, applyCoupon, removeCoupon, couponDiscount } = useCartStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(couponSchema),
  });

  const onApply = async (data) => {
    try {
      const { validateCoupon } = await import("@/lib/firebase");
      const coupon = await validateCoupon(data.code);
      if (!coupon) {
        toast.error("That code doesn't ring a bell. Try another?");
        return;
      }
      const discount = coupon.type === "fixed"
        ? coupon.value
        : Math.round((subtotal * coupon.value) / 100);
      applyCoupon(data.code, discount);
      toast.success(`Coupon "${data.code}" applied! You saved ₹${discount}.`);
    } catch {
      toast.error("Something went quiet. Try again?");
    }
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between bg-sage/10 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-sage" />
          <span className="font-sans text-body-sm font-semibold text-sage">
            {couponCode} applied
          </span>
          <span className="font-sans text-body-sm text-sage">
            (−{formatPrice(couponDiscount)})
          </span>
        </div>
        <button
          onClick={() => { removeCoupon(); toast.success("Coupon removed."); }}
          className="text-brown/50 hover:text-brown transition-colors font-sans text-body-xs underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onApply)} className="flex gap-2">
      <div className="flex-1">
        <input
          {...register("code")}
          type="text"
          placeholder="Have a gift code?"
          className={cn(
            "w-full bg-sand text-espresso border border-sand rounded-xl",
            "px-4 py-2.5 font-sans text-body-sm",
            "placeholder:text-brown/40 uppercase",
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
            errors.code && "border-red-400"
          )}
        />
      </div>
      <Button type="submit" size="sm" variant="secondary" loading={isSubmitting}>
        Apply
      </Button>
    </form>
  );
}

// ─── Main CartDrawer ──────────────────────────────────────────────────────────

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, shipping, total, couponDiscount } =
    useCartStore();

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping box"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-ivory shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-olive" />
                <h2 className="font-display text-display-xs text-espresso">
                  Your Box
                </h2>
                {itemCount > 0 && (
                  <span className="bg-gold text-espresso text-[11px] font-bold rounded-full px-2 py-0.5">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-sand transition-colors text-brown/70 hover:text-espresso focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-brown/30" />
                  </div>
                  <p className="font-display text-display-xs text-espresso mb-2">
                    Your box is waiting.
                  </p>
                  <p className="font-sans text-body-sm text-brown/60 mb-6">
                    Fill it with something worth remembering.
                  </p>
                  <Button href="/shop" size="sm" onClick={closeDrawer}>
                    Browse the Store
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  {items.map((item) => (
                    <CartLineItem key={`${item.id}-${item.variant}`} item={item} />
                  ))}

                  {/* Coupon */}
                  <div className="mt-4">
                    <CouponInput />
                  </div>
                </div>
              )}
            </div>

            {/* Footer — order summary + CTA */}
            {items.length > 0 && (
              <div className="border-t border-sand px-6 py-5 bg-ivory">
                {/* Shipping note */}
                {shipping === 0 ? (
                  <p className="font-sans text-body-xs text-sage text-center mb-4">
                    ✓ Free delivery unlocked on this order
                  </p>
                ) : (
                  <p className="font-sans text-body-xs text-brown/60 text-center mb-4">
                    Add {formatPrice(499 - subtotal)} more for free delivery
                  </p>
                )}

                {/* Summary */}
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    { label: "Subtotal", value: formatPrice(subtotal) },
                    ...(couponDiscount > 0
                      ? [{ label: "Coupon discount", value: `−${formatPrice(couponDiscount)}` }]
                      : []),
                    { label: "Delivery", value: shipping === 0 ? "Free" : formatPrice(shipping) },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="font-sans text-body-sm text-brown/70">{row.label}</span>
                      <span className="font-sans text-body-sm text-espresso font-semibold">
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-sand">
                    <span className="font-display text-body-lg text-espresso font-bold">Total</span>
                    <span className="font-display text-display-xs text-olive font-bold">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  href="/checkout"
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={closeDrawer}
                >
                  Proceed to Checkout →
                </Button>
                <button
                  onClick={closeDrawer}
                  className="w-full mt-3 font-sans text-body-sm text-brown/60 hover:text-brown transition-colors text-center"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
