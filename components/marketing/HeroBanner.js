"use client";

/**
 * @fileoverview HeroBanner — Taste & Tales
 * Full-screen hero layout. The hero image covers the entire section background
 * with a subtle gradient overlay to ensure text readability.
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { heroText, stagger, staggerItem } from "@/lib/motion";
import { TrustChipRail } from "@/components/ui/Badge";

export default function HeroBanner() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Parallax effect on the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center bg-espresso"
      aria-labelledby="hero-headline"
    >
      {/* ── Background Image with Parallax ──────────────────────────────────────── */}
      <motion.div 
        style={{ y: imageY, opacity }} 
        className="absolute inset-0 w-full h-[120%]"
      >
        <Image
          src="/images/hero/gift-box-hero.jpg"
          alt="Open Taste & Tales gift box with assorted sweets and savouries"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Subtle Gradient Overlays for text legibility without hiding the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-ivory/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-transparent md:hidden" />

      {/* ── Foreground Text Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 w-full">
        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-xl lg:max-w-2xl pt-16 md:pt-0"
        >
          {/* Overline */}
          <motion.p
            variants={staggerItem}
            className="font-sans text-label-sm text-gold uppercase tracking-[0.2em]"
          >
            ✦ &nbsp; Handcrafted with intention &nbsp; ✦
          </motion.p>

          {/* Headline */}
          <motion.h1
            id="hero-headline"
            variants={staggerItem}
            className="font-display text-display-xl sm:text-display-2xl text-espresso leading-[1.05]"
          >
            Some gifts get opened.
            <br />
            <span className="text-olive italic">Some become memories.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={staggerItem}
            className="font-sans text-body-lg text-gray leading-relaxed max-w-lg"
          >
            Premium Indian sweets & savouries crafted with millets, palm jaggery,
            and three generations of patience. No preservatives. No shortcuts.
            Just honest ingredients.
          </motion.p>

          {/* Trust chips */}
          <motion.div variants={staggerItem} className="pt-4">
            <TrustChipRail variant="dark" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
