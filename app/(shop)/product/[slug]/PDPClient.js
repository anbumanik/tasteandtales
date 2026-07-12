"use client";

/**
 * @fileoverview PDPClient — Taste & Tales Product Detail Page
 * Gallery, story tab, ingredients, nutrition, reviews, QR, sticky add-to-cart.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, QrCode, ChevronLeft, Leaf, Shield } from "lucide-react";
import toast from "react-hot-toast";

import { cn, formatPrice, shimmerPlaceholder } from "@/lib/utils";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import { useCartStore } from "@/lib/store";
import { StarRating, PriceTag, QuantityStepper, Divider } from "@/components/ui/ProductWidgets";
import { TrustChipRail, Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Overlays";
import WishlistButton from "@/components/commerce/WishlistButton";
import ProductCard from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

// ─── Product Gallery ──────────────────────────────────────────────────────────

function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto scrollbar-hide sm:max-h-[520px]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-sand border-2 transition-colors",
                i === active ? "border-gold" : "border-transparent hover:border-sand"
              )}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image
                src={img}
                alt={`${name} — image ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-sand">
        {images[active] ? (
          <Image
            src={images[active]}
            alt={name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
            placeholder="blur"
            blurDataURL={shimmerPlaceholder()}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-beige to-sand flex items-center justify-center">
            <span className="font-display text-display-2xl text-brown/20">T&T</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QR Story Card ────────────────────────────────────────────────────────────

function QRStoryCard({ product }) {
  return (
    <div className="flex items-start gap-4 bg-beige rounded-2xl p-4 border border-sand">
      <div className="h-14 w-14 shrink-0 bg-olive rounded-xl flex items-center justify-center">
        <QrCode size={28} className="text-gold" />
      </div>
      <div>
        <p className="font-sans font-semibold text-body-sm text-espresso">
          Scan to hear this recipe&apos;s story
        </p>
        <p className="font-sans text-body-xs text-gray mt-0.5">
          Every product has an origin. This one goes back further than you&apos;d expect.
        </p>
      </div>
    </div>
  );
}

// ─── Nutrition Table ─────────────────────────────────────────────────────────

function NutritionTable({ nutrition }) {
  if (!nutrition || Object.keys(nutrition).length === 0) {
    return <p className="font-sans text-body-md text-gray">Nutritional info varies by variant. Contact us for details.</p>;
  }
  const rows = [
    { label: "Energy",     value: `${nutrition.calories} kcal` },
    { label: "Protein",    value: `${nutrition.protein}g` },
    { label: "Carbs",      value: `${nutrition.carbs}g` },
    { label: "Fat",        value: `${nutrition.fat}g` },
    { label: "Fibre",      value: `${nutrition.fibre}g` },
  ];
  return (
    <div className="rounded-xl overflow-hidden border border-sand">
      <p className="bg-sand px-4 py-2 font-sans text-label-md text-brown uppercase tracking-wider">
        Per 100g serving
      </p>
      {rows.map((row, i) => (
        <div key={row.label} className={cn("flex justify-between px-4 py-3 font-sans text-body-sm", i % 2 === 0 ? "bg-ivory" : "bg-sand/40")}>
          <span className="text-gray">{row.label}</span>
          <span className="text-espresso font-semibold">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main PDP Client ──────────────────────────────────────────────────────────

export default function PDPClient({ product, related }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openDrawer } = useCartStore();

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity,
    });
    openDrawer();
    toast.success(`Added ${quantity} × ${product.name} to your box!`);
  };

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="prose prose-sm max-w-none">
          <p className="font-sans text-body-md text-gray leading-relaxed">{product.story}</p>
          <div className="mt-6">
            <TrustChipRail variant="dark" className="flex-wrap" />
          </div>
        </div>
      ),
    },
    {
      id: "ingredients",
      label: "Ingredients & Nutrition",
      content: (
        <div className="flex flex-col gap-6">
          {product.ingredients?.length > 0 && (
            <div>
              <h3 className="font-sans font-semibold text-body-md text-espresso mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="bg-sand text-espresso px-3 py-1.5 rounded-full font-sans text-body-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-sans font-semibold text-body-md text-espresso mb-3">Nutrition</h3>
            <NutritionTable nutrition={product.nutrition} />
          </div>
        </div>
      ),
    },
    {
      id: "story",
      label: "The Story Behind It",
      content: (
        <div className="flex flex-col gap-6">
          <p className="font-display text-display-sm text-espresso italic leading-relaxed">
            &quot;{product.story}&quot;
          </p>
          <QRStoryCard product={product} />
        </div>
      ),
    },
    {
      id: "reviews",
      label: `Reviews${product.ratingCount > 0 ? ` (${product.ratingCount})` : ""}`,
      content: (
        <div>
          {product.ratingCount > 0 ? (
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <p className="font-display text-display-xl text-espresso">{product.ratingAvg}</p>
                <StarRating value={product.ratingAvg} size="md" />
                <p className="font-sans text-body-xs text-gray mt-1">out of 5</p>
              </div>
            </div>
          ) : (
            <p className="font-sans text-body-md text-gray">
              No reviews yet. Be the first to share your experience.
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Gallery */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <ProductGallery images={product.images || []} name={product.name} />
          </motion.div>

          {/* Right: Product info */}
          <motion.div
            variants={stagger(0.05, 0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Category + badges */}
            <motion.div variants={staggerItem} className="flex items-center gap-2">
              <p className="font-sans text-label-sm text-gold uppercase tracking-wider">
                {product.category.replace("-", " ")}
              </p>
              {(product.tags || []).includes("bestseller") && (
                <Badge variant="olive" className="text-[11px]">Bestseller</Badge>
              )}
            </motion.div>

            {/* Name */}
            <motion.h1 variants={staggerItem} className="font-display text-display-lg sm:text-display-xl text-espresso">
              {product.name}
            </motion.h1>

            {/* Rating */}
            {product.ratingCount > 0 && (
              <motion.div variants={staggerItem}>
                <StarRating value={product.ratingAvg} count={product.ratingCount} size="md" />
              </motion.div>
            )}

            {/* Price */}
            <motion.div variants={staggerItem}>
              <PriceTag
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="lg"
              />
            </motion.div>

            {/* Short description */}
            <motion.p variants={staggerItem} className="font-sans text-body-lg text-gray">
              {product.story?.split(".")[0]}.
            </motion.p>

            {/* Trust chips */}
            <motion.div variants={staggerItem}>
              <TrustChipRail variant="dark" />
            </motion.div>

            <Divider />

            {/* Quantity + Add to cart */}
            <motion.div variants={staggerItem} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                  size="md"
                />
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  variant="pill"
                  size="md"
                />
              </div>

              <Button
                fullWidth
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? "Taking a rest — back soon" : `Add to Box — ${formatPrice(product.price * quantity)}`}
              </Button>

              {product.isCorporate && (
                <Button
                  href="/corporate-gifting"
                  variant="secondary"
                  fullWidth
                  size="md"
                >
                  Need 25+ boxes? Corporate pricing →
                </Button>
              )}
            </motion.div>

            {/* QR card */}
            <motion.div variants={staggerItem}>
              <QRStoryCard product={product} />
            </motion.div>
          </motion.div>
        </div>

        {/* Product detail tabs */}
        <div className="mt-16 mb-16">
          <Tabs tabs={tabs} defaultTab="description" />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-display-md text-espresso mb-8">
              You might also love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile add to cart bar */}
      <div className="fixed bottom-16 inset-x-0 z-20 lg:hidden bg-ivory/95 backdrop-blur-md border-t border-sand px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-body-md text-espresso truncate">{product.name}</p>
          <PriceTag price={product.price} size="sm" />
        </div>
        <Button size="md" disabled={isOutOfStock} onClick={handleAddToCart}>
          {isOutOfStock ? "Resting…" : "Add to Box"}
        </Button>
      </div>
    </div>
  );
}
