"use client";

/**
 * @fileoverview Modal, Toast, Accordion, Tabs, Tooltip UI atoms — Taste & Tales
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { overlay, slideUp, fadeUp } from "@/lib/motion";

// ─── Modal ────────────────────────────────────────────────────────────────────

/**
 * Accessible modal dialog with backdrop, focus trap, Escape key close.
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} [props.title]
 * @param {"sm"|"md"|"lg"|"xl"} [props.size="md"]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Modal({ isOpen, onClose, title, size = "md", className, children }) {
  const dialogRef = useRef(null);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-espresso/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            className={cn(
              "fixed z-50 inset-x-4 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
              "bg-ivory rounded-t-3xl sm:rounded-3xl shadow-2xl",
              "w-full sm:w-auto",
              sizeClasses[size],
              className
            )}
          >
            <div className="flex items-start justify-between p-6 pb-4">
              {title && (
                <h2 id="modal-title" className="font-display text-display-xs text-espresso">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className={cn(
                  "ml-auto p-1.5 rounded-full text-brown/70 hover:text-espresso hover:bg-sand",
                  "transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                )}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {Array<{id: string, title: string, content: React.ReactNode}>} props.items
 * @param {boolean} [props.allowMultiple=false]
 * @param {string} [props.className]
 */
export function Accordion({ items, allowMultiple = false, className }) {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-sand", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center justify-between py-4 text-left",
                "font-sans font-semibold text-body-md text-espresso",
                "hover:text-olive transition-colors",
                "focus-visible:outline-none focus-visible:text-olive"
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              {item.title}
              <span className="shrink-0 text-gold ml-4">
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 font-sans text-body-md text-gray">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {Array<{id: string, label: string, content: React.ReactNode}>} props.tabs
 * @param {string} [props.defaultTab]
 * @param {string} [props.className]
 */
export function Tabs({ tabs, defaultTab, className }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        className="flex gap-1 border-b border-sand overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-5 py-3 font-sans font-semibold text-body-sm whitespace-nowrap",
              "border-b-2 -mb-px transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
              active === tab.id
                ? "text-olive border-olive"
                : "text-brown/70 border-transparent hover:text-espresso"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          className="py-6"
        >
          {active === tab.id && tab.content}
        </div>
      ))}
    </div>
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {string} props.content
 * @param {"top"|"bottom"|"left"|"right"} [props.placement="top"]
 * @param {React.ReactNode} props.children
 */
export function Tooltip({ content, placement = "top", children }) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className={cn(
              "absolute z-50 pointer-events-none",
              "bg-espresso text-ivory rounded-lg px-3 py-1.5",
              "font-sans text-body-xs whitespace-nowrap",
              "shadow-lg",
              positions[placement]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
