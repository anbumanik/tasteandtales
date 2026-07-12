"use client";

/**
 * @fileoverview CorporateGiftingBanner — Taste & Tales
 * Full-bleed B2B CTA banner on the home page.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import Button from "@/components/ui/Button";

const STATS = [
  { value: "500+", label: "Corporate clients" },
  { value: "25+", label: "Minimum order" },
  { value: "48hr", label: "Catalogue dispatch" },
  { value: "PAN India", label: "Delivery" },
];

export default function CorporateGiftingBanner() {
  return (
    <section
      className="bg-espresso relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="corporate-heading"
    >
      {/* Decorative gold circle */}
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-16 bottom-0 h-64 w-64 rounded-full border border-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            variants={stagger(0.1, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={staggerItem} className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-gold" />
              <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em]">
                Corporate & Bulk Gifting
              </p>
            </motion.div>

            <motion.h2
              id="corporate-heading"
              variants={staggerItem}
              className="font-display text-display-lg sm:text-display-xl text-ivory text-balance"
            >
              Your clients deserve better than a bouquet.
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="font-sans text-body-lg text-ivory/70 mt-4 mb-8 max-w-lg"
            >
              Custom-branded gift boxes for Diwali, onboarding kits, milestone celebrations, and
              everything in between. MOQ 25 boxes. Pan-India delivery. A story with every box.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Button href="/corporate-gifting" size="lg" variant="gold">
                Explore Corporate Gifting
              </Button>
              <Button
                href="/corporate-gifting/enquiry"
                size="lg"
                variant="ghost"
                className="text-ivory hover:bg-ivory/10 border-ivory/20 hover:border-gold"
                trailingIcon={<ArrowRight size={16} />}
              >
                Get a quote
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-5"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="bg-ivory/5 border border-ivory/10 rounded-2xl p-6"
              >
                <p className="font-display text-display-md text-gold font-bold">
                  {stat.value}
                </p>
                <p className="font-sans text-label-md text-ivory/60 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
