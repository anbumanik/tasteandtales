"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/store";
import { fetchProducts } from "@/lib/firebase";
import ProductCard from "@/components/commerce/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        const wishlisted = allProducts.filter((p) => ids.includes(p.id));
        setProducts(wishlisted);
      } catch (error) {
        console.error("Failed to fetch wishlist products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [ids]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Heart size={40} className="text-sand mb-4" />
          <p className="text-brown/50 font-medium">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 min-h-[70vh]">
      <div className="flex items-center gap-4 mb-10 border-b border-sand pb-6">
        <div className="p-3 bg-sand/30 rounded-2xl text-gold">
          <Heart size={28} />
        </div>
        <div>
          <h1 className="font-display text-4xl text-espresso tracking-tight">Your Wishlist</h1>
          <p className="text-brown/70 mt-1">{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-ivory rounded-3xl border border-sand">
          <div className="w-20 h-20 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-6 text-gold/40">
            <Heart size={36} />
          </div>
          <h2 className="font-serif text-2xl text-espresso mb-3">Your wishlist is empty</h2>
          <p className="text-brown/70 mb-8 max-w-md mx-auto">Found something you like but not ready to buy? Save it here to find it easily later.</p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-olive hover:bg-olive/90 text-white px-8 py-3.5 rounded-full font-medium transition-colors"
          >
            Explore our collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
