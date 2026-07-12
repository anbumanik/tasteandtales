"use client";

/**
 * @fileoverview NewsletterCapture — Taste & Tales
 * Email signup form with Firebase newsletter write.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Leaf } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { newsletterSchema } from "@/lib/validators";
import Button from "@/components/ui/Button";

export default function NewsletterCapture() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data) => {
    try {
      const { subscribeNewsletter } = await import("@/lib/firebase");
      await subscribeNewsletter(data.email);
      toast.success("Welcome to the story! Check your inbox for a warm hello 🌿");
      reset();
    } catch (err) {
      toast.error("Something went quiet. Try again?");
    }
  };

  return (
    <section className="bg-olive py-20 sm:py-28" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 text-center">

        {/* Icon */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="h-14 w-14 rounded-full bg-ivory/10 flex items-center justify-center">
            <Mail size={24} className="text-gold" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="font-sans text-label-sm text-gold uppercase tracking-[0.2em] mb-3">
            ✦ &nbsp; Join the story &nbsp; ✦
          </p>
          <h2 id="newsletter-heading" className="font-display text-display-lg sm:text-display-xl text-ivory text-balance mb-4">
            Some stories are best told in your inbox.
          </h2>
          <p className="font-sans text-body-lg text-ivory/70 mb-8">
            Festival recipes, ingredient sourcing diaries, early access to new drops,
            and the occasional handwritten note from our kitchen. No spam. We promise.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              autoComplete="email"
              className={cn(
                "w-full bg-ivory/10 text-ivory border border-ivory/20",
                "rounded-full px-5 py-3.5 font-sans text-body-md",
                "placeholder:text-ivory/40",
                "focus:outline-none focus:border-gold focus:bg-ivory/15",
                "transition-colors",
                errors.email && "border-red-400/60"
              )}
            />
            {errors.email && (
              <p role="alert" className="mt-1.5 font-sans text-body-xs text-red-300">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="gold"
            size="md"
            loading={isSubmitting}
            className="shrink-0"
          >
            {isSubmitSuccessful ? "You're in! ✓" : "Join the story"}
          </Button>
        </motion.form>

        {/* Micro-copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex items-center justify-center gap-1.5 font-sans text-body-xs text-ivory/40 mt-4"
        >
          <Leaf size={12} aria-hidden="true" />
          Unsubscribe any time. We&apos;ll miss you, but we&apos;ll understand.
        </motion.p>
      </div>
    </section>
  );
}
