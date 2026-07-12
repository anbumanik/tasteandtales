"use client";

/**
 * @fileoverview WhatsAppFloatingButton — Taste & Tales
 * Persistent floating WhatsApp CTA. Deferred render for performance.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WA_NUMBER = "91XXXXXXXXXX"; // Replace with actual number
const WA_MESSAGE = encodeURIComponent(
  "Hi! I'd like to know more about Taste & Tales products and gifting options."
);

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);

  // Defer render by 3s for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      // Show tooltip after 6s if not dismissed
      const tipTimer = setTimeout(() => {
        if (!tipDismissed) setTipOpen(true);
      }, 3000);
      return () => clearTimeout(tipTimer);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismissTip = () => {
    setTipOpen(false);
    setTipDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-20 right-5 z-20 lg:bottom-8 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <AnimatePresence>
            {tipOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ivory rounded-2xl shadow-card-hover border border-sand px-4 py-3 max-w-[200px]"
              >
                <button
                  onClick={handleDismissTip}
                  className="absolute -top-2 -right-2 h-5 w-5 bg-brown rounded-full text-ivory flex items-center justify-center"
                  aria-label="Dismiss WhatsApp suggestion"
                >
                  <X size={10} />
                </button>
                <p className="font-sans text-body-xs text-espresso font-semibold">
                  Questions about gifting?
                </p>
                <p className="font-sans text-body-xs text-gray mt-0.5">
                  We're just a WhatsApp away 🌿
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB */}
          <motion.a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setTipOpen(false)}
            aria-label="Chat with us on WhatsApp"
            className={cn(
              "h-14 w-14 rounded-full",
              "bg-[#25D366] text-white",
              "flex items-center justify-center",
              "shadow-[0_4px_24px_rgba(37,211,102,0.35)]",
              "focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:outline-none"
            )}
          >
            <MessageCircle size={28} fill="white" strokeWidth={0} />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
