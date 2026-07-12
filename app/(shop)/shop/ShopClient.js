"use client";

/**
 * @fileoverview ShopClient — Taste & Tales
 * Client-side shop with filters, sort, category chips, and grid.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { stagger, staggerItem, fadeUp } from "@/lib/motion";
import ProductCard from "@/components/commerce/ProductCard";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/layout/PageContainer";
import { ProductCardSkeleton } from "@/components/ui/ProductWidgets";

const SORT_OPTIONS = [
  { value: "popular",  label: "Most popular" },
  { value: "newest",   label: "Newest first" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "rating",   label: "Top rated" },
];

/**
 * @param {Object} props
 * @param {import('@/data/products').Product[]} props.products
 * @param {import('@/data/categories').Category[]} props.categories
 */
export default function ShopClient({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [layout, setLayout] = useState("grid");

  const filtered = useMemo(() => {
    let result = activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

    switch (sort) {
      case "newest":
        return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.ratingAvg - a.ratingAvg);
      default:
        return [...result].sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
    }
  }, [products, activeCategory, sort]);

  return (
    <div className="bg-ivory min-h-screen pb-20 lg:pb-10">
      {/* Hero strip */}
      <div className="bg-beige pt-8 pb-12 border-b border-sand">
        <PageContainer>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
            className="mb-4"
          />
          <h1 className="font-display text-display-xl sm:text-display-2xl text-espresso">
            Our Pantry.
          </h1>
          <p className="font-sans text-body-lg text-gray mt-2 max-w-lg">
            Everything made by hand, with patience, and without shortcuts.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="pt-8">
        {/* Category chips + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category filter chips */}
          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
            role="tablist"
            aria-label="Filter by category"
          >
            {[{ id: "all", name: "All", slug: "all" }, ...categories].map((cat) => (
              <button
                key={cat.id || cat.slug}
                role="tab"
                aria-selected={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full font-sans font-semibold text-label-md",
                  "transition-all duration-200 border",
                  "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
                  activeCategory === cat.slug
                    ? "bg-olive text-ivory border-olive"
                    : "bg-transparent text-brown border-sand hover:border-gold hover:text-gold"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort + layout toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-sand text-espresso border border-sand rounded-xl px-3 py-2 font-sans text-body-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Grid/List toggle — desktop only */}
            <div className="hidden sm:flex gap-1 bg-sand rounded-xl p-1">
              {[
                { id: "grid", icon: <Grid3x3 size={16} /> },
                { id: "list", icon: <List size={16} /> },
              ].map(({ id, icon }) => (
                <button
                  key={id}
                  onClick={() => setLayout(id)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    layout === id ? "bg-olive text-ivory" : "text-brown hover:text-espresso"
                  )}
                  aria-label={`${id} view`}
                  aria-pressed={layout === id}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="font-sans text-body-sm text-brown/60 mb-5">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} found
        </p>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sort}`}
            variants={stagger(0.04, 0.07)}
            initial="hidden"
            animate="visible"
            className={cn(
              layout === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
            )}
          >
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="font-display text-display-md text-espresso mb-2">
                  Nothing here just yet.
                </p>
                <p className="font-sans text-body-md text-gray">
                  Try a different category or sort.
                </p>
              </div>
            ) : (
              filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout={layout}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </PageContainer>
    </div>
  );
}
