"use client";

/**
 * @fileoverview TestimonialCarousel — Taste & Tales
 * Auto-advancing testimonial carousel with brand-voiced reviews.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/ProductWidgets";
import { Divider } from "@/components/ui/ProductWidgets";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Menon",
    location: "Bengaluru",
    rating: 5,
    body: "I ordered the Heritage Diwali Hamper for my team of 30. Every single person texted me asking where I got it from. The packaging alone made an impression — and the millet ladoos? Gone in seconds.",
    product: "Heritage Diwali Hamper",
    avatar: "PM",
  },
  {
    id: 2,
    name: "Rohan Krishnamurthy",
    location: "Chennai",
    rating: 5,
    body: "My mother, who hasn't complimented store-bought mithai in 40 years, tasted the Kaju Katli and said — and I quote — 'this is how it used to taste.' That's all the review Taste & Tales needs.",
    product: "Kaju Katli — Palm Jaggery",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Aishwarya Reddy",
    location: "Hyderabad",
    rating: 5,
    body: "As someone who watches ingredients obsessively, discovering a brand that uses palm jaggery and no preservatives felt like finding a secret. The Ragi Barfi is my weekly guilty-not-guilty pleasure.",
    product: "Ragi Barfi with Saffron",
    avatar: "AR",
  },
  {
    id: 4,
    name: "Vivek Nair",
    location: "Mumbai",
    rating: 5,
    body: "Sent boxes to 50 clients this Diwali. Three of them asked for the vendor info to reorder for their own gifting. That's never happened with any corporate gift we've sent before.",
    product: "Corporate Gift Box — Classic",
    avatar: "VN",
  },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="bg-beige py-20 sm:py-28 overflow-hidden" aria-label="Customer testimonials">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em] mb-3">
            ✦ &nbsp; Stories from our community &nbsp; ✦
          </p>
          <h2 className="font-display text-display-lg sm:text-display-xl text-espresso">
            What they remember
          </h2>
        </div>

        {/* Quote card */}
        <div className="relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              {/* Quote glyph */}
              <Quote
                size={40}
                className="text-gold/30 mb-6"
                aria-hidden="true"
              />

              {/* Body */}
              <blockquote className="font-display text-display-sm sm:text-display-md text-espresso italic leading-relaxed max-w-3xl">
                &quot;{t.body}&quot;
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <StarRating value={t.rating} size="sm" />
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-olive flex items-center justify-center">
                    <span className="font-sans font-bold text-label-sm text-ivory">{t.avatar}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-sans font-semibold text-body-sm text-espresso">{t.name}</p>
                    <p className="font-sans text-body-xs text-brown/60">
                      {t.location} · {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-sand hover:border-gold hover:text-gold text-brown/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "bg-olive w-6" : "bg-sand w-1.5 hover:bg-gold/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-sand hover:border-gold hover:text-gold text-brown/60 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
