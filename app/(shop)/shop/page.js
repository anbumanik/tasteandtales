import { Suspense } from "react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import ShopClient from "./ShopClient";
import { ProductCardSkeleton } from "@/components/ui/ProductWidgets";

// ISR: revalidate every 5 minutes
export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Shop All Products",
  description:
    "Browse our full range of handcrafted Indian sweets, savouries, millet bites, and gift boxes. No preservatives, no shortcuts.",
  path: "/shop",
});

export default function ShopPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Suspense
        fallback={
          <div className="bg-ivory min-h-screen py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            </div>
          </div>
        }
      >
        <ShopClient products={PRODUCTS} categories={CATEGORIES} />
      </Suspense>
    </>
  );
}
