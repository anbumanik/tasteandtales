"use client";

/**
 * @fileoverview StorySection — Taste & Tales
 * "Our Story" teaser section with alternating image+text layout.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/ProductWidgets";

const STORY_BEATS = [
  {
    id: "roots",
    overline: "Where it began",
    heading: "A grandmother's kitchen. A promise to never take shortcuts.",
    body: "In 1987, our founder's grandmother made a simple decision: if it can't be made with honest ingredients, it won't be made at all. Thirty-seven years later, that decision is still the only recipe that matters.",
    image: "/images/story/grandmother-kitchen.jpg",
    imageAlt: "Warm kitchen scene with traditional Indian brass vessels and fresh ingredients",
    imageSide: "right",
    cta: null,
  },
  {
    id: "millets",
    overline: "The ingredient choice",
    heading: "Millets, before millets were fashionable.",
    body: "We've been sourcing foxtail millet, ragi, and jowar from Tamil Nadu farmers since 2018 — not because it became a trend, but because they've always been the right choice. Nutritionally dense, environmentally gentle, and deeply rooted in South Indian cooking tradition.",
    image: "/images/story/millet-fields.jpg",
    imageAlt: "Golden foxtail millet fields in Tamil Nadu at golden hour",
    imageSide: "left",
    cta: { label: "Read our full story", href: "/our-story" },
  },
];

export default function StorySection() {
  return (
    <section className="bg-beige py-20 sm:py-28 overflow-hidden" aria-labelledby="story-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em] mb-3">
            ✦ &nbsp; The Taste & Tales story &nbsp; ✦
          </p>
          <h2
            id="story-heading"
            className="font-display text-display-lg sm:text-display-xl text-espresso text-balance"
          >
            Heritage has a recipe.
          </h2>
          <p className="font-sans text-body-lg text-gray max-w-xl mx-auto mt-4">
            We didn't invent anything. We just refused to let the old ways disappear.
          </p>
        </motion.div>

        {/* Story beats */}
        <div className="flex flex-col gap-20 sm:gap-28">
          {STORY_BEATS.map((beat, i) => (
            <div
              key={beat.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                beat.imageSide === "left" ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text */}
              <motion.div
                variants={beat.imageSide === "right" ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col gap-5"
              >
                <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em]">
                  {beat.overline}
                </p>
                <h3 className="font-display text-display-md sm:text-display-lg text-espresso text-balance">
                  {beat.heading}
                </h3>
                <p className="font-sans text-body-lg text-gray leading-relaxed">
                  {beat.body}
                </p>
                {beat.cta && (
                  <Button
                    href={beat.cta.href}
                    variant="secondary"
                    size="md"
                    trailingIcon={<ArrowRight size={16} />}
                    className="self-start"
                  >
                    {beat.cta.label}
                  </Button>
                )}
              </motion.div>

              {/* Image */}
              <motion.div
                variants={beat.imageSide === "right" ? fadeRight : fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-sand shadow-card-hover">
                  <Image
                    src={beat.image}
                    alt={beat.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent pointer-events-none" />
                </div>
                {/* Gold accent line */}
                <div className="mt-4 h-0.5 w-16 bg-gold/40 ml-4" aria-hidden="true" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
