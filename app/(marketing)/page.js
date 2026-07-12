/**
 * Home page — Taste & Tales
 * Rendered as SSG (static at build time).
 * All sections are client components for animation/interactivity.
 */

import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { getTrendingProducts } from "@/lib/recommendations";

// Components
import HeroBanner from "@/components/marketing/HeroBanner";
import BestsellerStrip from "@/components/marketing/BestsellerStrip";
import StorySection from "@/components/marketing/StorySection";
import CorporateGiftingBanner from "@/components/marketing/CorporateGiftingBanner";
import TestimonialCarousel from "@/components/marketing/TestimonialCarousel";
import NewsletterCapture from "@/components/marketing/NewsletterCapture";
import { FeatureStrip } from "@/components/layout/Footer";
import { ProductCardSkeleton } from "@/components/ui/ProductWidgets";

// ─── SEO ────────────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: null, // uses site default: "Taste & Tales — Sips. Bites. Memories."
  description:
    "Premium handcrafted Indian sweets, savouries & gift boxes made with millets, palm jaggery, and no preservatives. Shop online, PAN India delivery.",
  path: "/",
});

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const trendingProducts = getTrendingProducts(PRODUCTS, 6);

  return (
    <>
      {/* Hero — The first impression must be unforgettable */}
      <HeroBanner />

      {/* Feature strip — 4-icon dark olive band (matches poster) */}
      <FeatureStrip />

      {/* Bestsellers / Trending strip */}
      <Suspense
        fallback={
          <div className="bg-ivory py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((i) => <ProductCardSkeleton key={i} />)}
              </div>
            </div>
          </div>
        }
      >
        <BestsellerStrip products={trendingProducts} />
      </Suspense>

      {/* Our Story teaser */}
      <StorySection />

      {/* Corporate Gifting CTA band */}
      <CorporateGiftingBanner />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Newsletter */}
      <NewsletterCapture />
    </>
  );
}
