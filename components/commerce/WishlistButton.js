"use client";

/**
 * @fileoverview WishlistButton — Taste & Tales
 * Standalone animated heart button for adding/removing from wishlist.
 * Used on PDP and product cards.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/store";

/**
 * @param {Object} props
 * @param {string} props.productId
 * @param {string} props.productName
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {"ghost"|"pill"|"floating"} [props.variant="ghost"]
 * @param {string} [props.className]
 */
export default function WishlistButton({
  productId,
  productName,
  size = "md",
  variant = "ghost",
  className,
}) {
  const { toggle, isWishlisted } = useWishlistStore();
  const active = isWishlisted(productId);

  const handleToggle = () => {
    toggle(productId);
    toast.success(
      active
        ? `Removed from wishlist`
        : `${productName} saved to your wishlist 💛`
    );
  };

  const sizes = {
    sm: { wrapper: "p-1.5", icon: 14 },
    md: { wrapper: "p-2.5", icon: 20 },
    lg: { wrapper: "p-3",   icon: 24 },
  };

  const variants = {
    ghost:    "bg-transparent hover:bg-sand",
    pill:     "bg-ivory/90 backdrop-blur-sm hover:bg-ivory shadow-card",
    floating: "bg-ivory shadow-card-hover hover:shadow-gold border border-sand hover:border-gold",
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={cn(
        "rounded-full transition-all duration-200 flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        sizes[size].wrapper,
        variants[variant],
        className
      )}
      whileTap={{ scale: 0.85 }}
      aria-label={
        active
          ? `Remove ${productName} from wishlist`
          : `Save ${productName} to wishlist`
      }
      aria-pressed={active}
    >
      <motion.div
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Heart
          size={sizes[size].icon}
          strokeWidth={active ? 0 : 1.5}
          className={cn(
            "transition-colors duration-200",
            active ? "fill-gold text-gold" : "text-brown/60"
          )}
        />
      </motion.div>
    </motion.button>
  );
}
