"use client";

/**
 * @fileoverview AnnouncementBar — Taste & Tales
 * A dismissible top banner for promotions.
 */

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-olive text-ivory relative z-50 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-2.5">
            <div className="flex items-center justify-center sm:justify-between gap-4">
              <div className="flex-1 flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-gold hidden sm:block" />
                <p className="font-sans text-label-sm sm:text-body-sm font-medium text-center">
                  <span className="text-gold font-bold">Festive Pre-orders open!</span> Free shipping PAN-India on orders above ₹499.
                </p>
                <Sparkles size={14} className="text-gold hidden sm:block" />
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="hidden sm:flex shrink-0 p-1 rounded-full text-ivory/60 hover:text-ivory hover:bg-ivory/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Dismiss announcement"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
