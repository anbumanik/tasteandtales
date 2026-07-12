"use client";

/**
 * Custom 404 page — Taste & Tales
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/commerce/CartDrawer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <div className="bg-ivory min-h-[80vh] flex items-center justify-center py-20">
          <motion.div
            variants={stagger(0.1, 0.12)}
            initial="hidden"
            animate="visible"
            className="text-center max-w-lg mx-auto px-5"
          >
            <motion.p
              variants={staggerItem}
              className="font-display text-[8rem] leading-none text-sand font-bold"
              aria-hidden="true"
            >
              404
            </motion.p>

            <motion.div variants={staggerItem} className="flex justify-center mb-6 -mt-4">
              <div className="h-1 w-16 bg-gold/40 rounded-full" aria-hidden="true" />
            </motion.div>

            <motion.h1 variants={staggerItem} className="font-display text-display-lg text-espresso mb-4">
              This page went quiet.
            </motion.h1>

            <motion.p variants={staggerItem} className="font-sans text-body-lg text-gray mb-8">
              The page you're looking for may have moved, or perhaps it was never there.
              Let us take you somewhere more delicious.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center">
              <Button href="/" size="lg">Take Me Home</Button>
              <Button href="/shop" variant="secondary" size="lg">Browse the Store</Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </>
  );
}
