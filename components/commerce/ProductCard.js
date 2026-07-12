"use client";

/**
 * @fileoverview ProductCard — Taste & Tales
 * The primary product listing card. Used in grids, carousels, and search results.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import { cn, formatPrice, discountPercent, shimmerPlaceholder } from "@/lib/utils";
import { cardHover, staggerItem } from "@/lib/motion";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { StarRating, PriceTag } from "@/components/ui/ProductWidgets";
import { DiscountBadge, Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/**
 * @param {Object} props
 * @param {import('@/data/products').Product} props.product
 * @param {"grid"|"list"} [props.layout="grid"]
 * @param {boolean} [props.featured]   - Larger card in featured/hero position
 * @param {string} [props.className]
 */
export default function ProductCard({ product, layout = "grid", featured = false, className }) {
  const { addItem, openDrawer } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
    });
    openDrawer();
    toast.success(`Added to your box!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product.id);
    toast.success(
      isWishlisted(product.id)
        ? `Removed from wishlist`
        : `Saved to your wishlist 💛`
    );
  };

  if (layout === "list") {
    return (
      <motion.div
        variants={staggerItem}
        whileHover={cardHover}
        className={cn("product-card flex gap-4", className)}
      >
        <Link href={`/product/${product.slug}`} className="flex gap-4 flex-1 p-4">
          <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-beige">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="96px"
                placeholder="blur"
                blurDataURL={shimmerPlaceholder(96, 96)}
              />
            )}
            {hasDiscount && <DiscountBadge percent={discountPercent(product.compareAtPrice, product.price)} className="top-1 left-1" />}
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <p className="font-display text-body-lg text-espresso font-semibold line-clamp-1">
                {product.name}
              </p>
              <p className="font-sans text-body-sm text-gray line-clamp-2 mt-1">
                {product.story}
              </p>
              {product.ratingCount > 0 && (
                <StarRating value={product.ratingAvg} count={product.ratingCount} size="sm" className="mt-1" />
              )}
            </div>
            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
        </Link>
        <div className="flex flex-col items-end justify-between p-4 pl-0">
          <button onClick={handleWishlist} className="p-1.5 rounded-full hover:bg-beige transition-colors" aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}>
            <Heart size={16} className={wishlisted ? "fill-gold stroke-gold" : "stroke-brown/40"} />
          </button>
          <Button size="sm" onClick={handleAddToCart} disabled={isOutOfStock}>
            {isOutOfStock ? "Resting…" : "Add"}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={cardHover}
      className={cn("product-card group relative", className)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className={cn(
          "relative overflow-hidden bg-beige",
          featured ? "aspect-[4/3] sm:aspect-[4/3]" : "aspect-square"
        )}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              placeholder="blur"
              blurDataURL={shimmerPlaceholder()}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-beige to-sand flex items-center justify-center">
              <span className="font-display text-display-sm text-brown/20">T&T</span>
            </div>
          )}

          {/* Overlays */}
          <DiscountBadge percent={discountPercent(product.compareAtPrice, product.price)} />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-ivory/70 flex items-center justify-center">
              <span className="font-sans text-label-md text-brown font-semibold">
                Taking a rest — back soon
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full",
              "bg-ivory/90 backdrop-blur-sm",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "hover:bg-ivory focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-gold",
              "focus-visible:outline-none"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart
              size={16}
              className={wishlisted ? "fill-gold stroke-gold" : "stroke-brown"}
            />
          </button>

          {/* Quick add — hover reveal */}
          {!isOutOfStock && (
            <div className={cn(
              "absolute bottom-0 inset-x-0 p-3",
              "translate-y-full group-hover:translate-y-0",
              "transition-transform duration-300 ease-brand"
            )}>
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-olive text-ivory rounded-xl font-sans font-semibold text-label-md hover:bg-espresso transition-colors"
              >
                Add to Box
              </button>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          {/* Category */}
          <p className="font-sans text-label-sm text-gold uppercase tracking-wider mb-1">
            {product.category.replace("-", " ")}
          </p>

          {/* Name */}
          <h3 className="font-display text-display-xs text-espresso line-clamp-2 mb-1">
            {product.name}
          </h3>

          {/* Rating */}
          {product.ratingCount > 0 && (
            <StarRating
              value={product.ratingAvg}
              count={product.ratingCount}
              size="sm"
              className="mb-2"
            />
          )}

          {/* Price */}
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />

          {/* Tags */}
          {(product.tags || []).includes("bestseller") && (
            <Badge variant="olive" className="mt-2 text-[11px]">Bestseller</Badge>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
