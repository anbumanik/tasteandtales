/**
 * @fileoverview SEO utilities — Taste & Tales
 * Centralised metadata generation, JSON-LD schemas, and OG image helpers.
 * Used by generateMetadata() in each route.
 */

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || "https://tasteandtales.in";
const SITE_NAME = "Taste & Tales";
const SITE_DESCRIPTION =
  "Sips. Bites. Memories. — Premium handcrafted Indian sweets, savouries & gift boxes made with millets, palm jaggery, and no preservatives.";
const OG_IMAGE_DEFAULT = `${SITE_URL}/og-fallback.jpg`;

// ─── Base metadata helper ─────────────────────────────────────────────────────

/**
 * Generate base metadata for any page.
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @param {string} [opts.path]        - Relative path for canonical URL
 * @param {string} [opts.ogImage]     - Absolute URL of OG image
 * @param {boolean} [opts.noIndex]    - true for admin/private pages
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  ogImage = OG_IMAGE_DEFAULT,
  noIndex = false,
} = {}) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Sips. Bites. Memories.`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

/** Organization schema (global, in root layout) */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXXXXXXXX",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/tasteandtales",
    "https://www.facebook.com/tasteandtales",
  ],
};

/** LocalBusiness schema (for contact page) */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: "+91-XXXXXXXXXX",
  email: "hello@tasteandtales.in",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  priceRange: "₹₹",
  servesCuisine: "Indian Sweets",
  openingHours: "Mo-Sa 09:00-19:00",
};

/**
 * Product + AggregateRating JSON-LD for PDP
 * @param {Object} product
 */
export function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story || product.description,
    image: product.images || [],
    sku: product.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    ...(product.ratingCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratingAvg,
        reviewCount: product.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * BreadcrumbList JSON-LD
 * @param {Array<{name: string, url: string}>} items
 */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * FAQPage JSON-LD
 * @param {Array<{q: string, a: string}>} faqs
 */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * BlogPosting / Article JSON-LD
 * @param {Object} blog
 */
export function articleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    author: { "@type": "Person", name: blog.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blogs/${blog.slug}` },
  };
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE_DEFAULT };
