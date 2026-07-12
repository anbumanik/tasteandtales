"use client";

/**
 * @fileoverview PageContainer layout component — Taste & Tales
 * Wraps page content with consistent max-width and horizontal padding.
 * Also provides the section rhythm wrapper.
 */

import { cn } from "@/lib/utils";

/**
 * Full-width container with max-width and brand padding.
 * @param {Object} props
 * @param {"sm"|"md"|"lg"|"xl"|"2xl"|"full"} [props.size="xl"]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function PageContainer({ size = "xl", className, children }) {
  const maxWidths = {
    sm:   "max-w-2xl",
    md:   "max-w-4xl",
    lg:   "max-w-5xl",
    xl:   "max-w-7xl",
    "2xl": "max-w-[1440px]",
    full: "max-w-none",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-5 sm:px-6 lg:px-10",
        maxWidths[size],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section wrapper with top/bottom padding and optional background.
 * @param {Object} props
 * @param {"ivory"|"beige"|"olive"|"espresso"|"sand"} [props.bg="ivory"]
 * @param {"sm"|"md"|"lg"|"xl"} [props.padding="lg"]
 * @param {string} [props.className]
 * @param {string} [props.id]
 * @param {React.ReactNode} props.children
 */
export function Section({ bg = "ivory", padding = "lg", className, id, children }) {
  const bgClasses = {
    ivory:    "bg-ivory",
    beige:    "bg-beige",
    olive:    "bg-olive",
    espresso: "bg-espresso",
    sand:     "bg-sand",
  };

  const paddingClasses = {
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-20",
    lg: "py-20 sm:py-28",
    xl: "py-28 sm:py-36",
  };

  return (
    <section
      id={id}
      className={cn(bgClasses[bg], paddingClasses[padding], className)}
    >
      {children}
    </section>
  );
}

/**
 * Page header with title, breadcrumb slot, and optional subtitle.
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.breadcrumbs]
 * @param {React.ReactNode} [props.actions]
 * @param {string} [props.className]
 */
export function PageHeader({ title, subtitle, breadcrumbs, actions, className }) {
  return (
    <div className={cn("mb-10 sm:mb-14", className)}>
      {breadcrumbs && (
        <div className="mb-4">
          {Array.isArray(breadcrumbs) ? (
            <Breadcrumbs items={breadcrumbs} />
          ) : (
            breadcrumbs
          )}
        </div>
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-display-lg sm:text-display-xl text-espresso text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 font-sans text-body-lg text-gray max-w-prose">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

/**
 * Breadcrumbs navigation.
 * @param {Object} props
 * @param {Array<{label: string, href?: string}>} props.items
 * @param {string} [props.className]
 */
export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1.5 flex-wrap" role="list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-brown/30 font-sans text-body-xs" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span
                  className="font-sans text-body-xs text-brown font-semibold"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="font-sans text-body-xs text-brown/60 hover:text-olive transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default PageContainer;
