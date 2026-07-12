"use client";

/**
 * Cart page — Taste & Tales
 * Full cart page view (desktop alternative to drawer).
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { cn, formatPrice } from "@/lib/utils";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import { useCartStore } from "@/lib/store";
import { QuantityStepper, PriceTag, Divider } from "@/components/ui/ProductWidgets";
import { PageContainer } from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const {
    items, removeItem, updateQuantity, clearCart,
    subtotal, shipping, total, couponCode, couponDiscount,
  } = useCartStore();

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[70vh] flex items-center justify-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center py-20"
        >
          <div className="h-24 w-24 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-brown/30" />
          </div>
          <h1 className="font-display text-display-lg text-espresso mb-3">
            Your box is waiting to be filled.
          </h1>
          <p className="font-sans text-body-lg text-gray mb-8">
            Discover sweets and savouries made with intention.
          </p>
          <Button href="/shop" size="lg">
            Browse the Store
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 lg:py-14 pb-32 lg:pb-14">
      <PageContainer>
        <h1 className="font-display text-display-xl text-espresso mb-8">
          Your Box ({itemCount} item{itemCount !== 1 ? "s" : ""})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={stagger(0.05, 0.08)}
              initial="hidden"
              animate="visible"
              className="flex flex-col divide-y divide-sand"
            >
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.variant}`}
                  variants={staggerItem}
                  className="flex gap-5 py-5"
                >
                  <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden bg-sand">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="w-full h-full bg-beige flex items-center justify-center">
                        <ShoppingBag size={24} className="text-brown/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} className="font-display text-display-xs text-espresso hover:text-olive transition-colors">
                      {item.name}
                    </Link>
                    {item.variant && <p className="font-sans text-body-sm text-gray mt-0.5">{item.variant}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, item.variant, qty)}
                        max={99}
                      />
                      <PriceTag price={item.price * item.quantity} size="md" />
                    </div>
                  </div>
                  <button
                    onClick={() => { removeItem(item.id, item.variant); toast.success("Removed from your box."); }}
                    className="self-start p-2 text-brown/40 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-4 flex justify-between">
              <Link href="/shop" className="flex items-center gap-1.5 font-sans text-body-sm text-brown/60 hover:text-olive transition-colors">
                <ArrowLeft size={14} />
                Continue shopping
              </Link>
              <button
                onClick={() => { clearCart(); toast.success("Your box has been cleared."); }}
                className="font-sans text-body-sm text-brown/40 hover:text-red-500 transition-colors"
              >
                Clear box
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-beige rounded-3xl p-6 sticky top-24">
              <h2 className="font-display text-display-xs text-espresso mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 mb-5">
                {[
                  { label: "Subtotal",    value: formatPrice(subtotal) },
                  ...(couponDiscount > 0 ? [{ label: `Coupon (${couponCode})`, value: `−${formatPrice(couponDiscount)}` }] : []),
                  { label: "Delivery",   value: shipping === 0 ? "Free" : formatPrice(shipping) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between font-sans text-body-sm">
                    <span className="text-gray">{row.label}</span>
                    <span className="text-espresso font-semibold">{row.value}</span>
                  </div>
                ))}
                <Divider className="my-1" />
                <div className="flex justify-between">
                  <span className="font-display text-body-lg text-espresso font-bold">Total</span>
                  <span className="font-display text-display-xs text-olive font-bold">{formatPrice(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="font-sans text-body-xs text-brown/60 mb-4 text-center">
                  Add {formatPrice(499 - subtotal)} more for free delivery
                </p>
              )}
              {shipping === 0 && (
                <p className="font-sans text-body-xs text-sage mb-4 text-center">
                  ✓ Free delivery unlocked!
                </p>
              )}

              <Button href="/checkout" fullWidth size="lg" trailingIcon={<ArrowRight size={16} />}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
