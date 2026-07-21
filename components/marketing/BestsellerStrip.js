"use client";

/**
 * @fileoverview BestsellerStrip — Taste & Tales
 * Horizontal scrollable product carousel + grid of bestsellers.
 */

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import ProductCard from "@/components/commerce/ProductCard";
import { Divider } from "@/components/ui/ProductWidgets";
import Button from "@/components/ui/Button";

/**
 * @param {Object} props
 * @param {import('@/data/products').Product[]} props.products
 */
export default function BestsellerStrip({ products }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="bestsellers-heading"
    >
      <div className="w-full px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em] mb-2">
              ✦ &nbsp; Made with patience &nbsp; ✦
            </p>
            <h2
              id="bestsellers-heading"
              className="font-display text-display-lg sm:text-display-xl text-espresso text-balance"
            >
              The ones they come back for.
            </h2>
          </div>

          {/* Desktop: View all + carousel arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              className="p-2 rounded-full border border-sand hover:border-gold hover:text-gold text-brown/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2 rounded-full border border-sand hover:border-gold hover:text-gold text-brown/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
            <Button href="/shop" variant="secondary" size="sm" trailingIcon={<ArrowRight size={14} />}>
              View all
            </Button>
          </div>
        </motion.div>

        {/* Desktop: 4-col grid */}
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="hidden lg:grid grid-cols-4 gap-5"
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Mobile/Tablet: horizontal scroll */}
        <div
          ref={scrollRef}
          className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2"
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-[46vw] max-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile: View all CTA */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Button href="/shop" variant="secondary" trailingIcon={<ArrowRight size={14} />}>
            View all products
          </Button>
        </div>

        {/* Gold divider */}
        <Divider className="mt-14" />
      </div>
    </section>
  );
}
