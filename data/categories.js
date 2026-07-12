/**
 * @fileoverview Seed category data — Taste & Tales
 *
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} tagline
 * @property {string} image
 * @property {string} description
 */

/** @type {Category[]} */
export const CATEGORIES = [
  {
    id: "cat-sweets",
    slug: "sweets",
    name: "Sweets",
    tagline: "Traditions, rolled by hand.",
    image: "/images/categories/sweets.jpg",
    description:
      "Mithai made the old way — palm jaggery, A2 ghee, and nothing else. No shortcuts, no preservatives, no apologies.",
  },
  {
    id: "cat-savouries",
    slug: "savouries",
    name: "Savouries",
    tagline: "Crisp, honest, unapologetic.",
    image: "/images/categories/savouries.jpg",
    description:
      "Ancient grains meet cold-pressed oils and kitchen spices. Chakli, mixture, and bites that taste like someone made them for you.",
  },
  {
    id: "cat-millet-bites",
    slug: "millet-bites",
    name: "Millet Bites",
    tagline: "Small bites, big stories.",
    image: "/images/categories/millet-bites.jpg",
    description:
      "Popped millets + dark chocolate + palm jaggery. The snack that makes you feel good about reaching for a second.",
  },
  {
    id: "cat-gift-boxes",
    slug: "gift-boxes",
    name: "Gift Boxes",
    tagline: "Some gifts get opened. Some become memories.",
    image: "/images/categories/gift-boxes.jpg",
    description:
      "Curated hampers for Diwali, weddings, corporate milestones, and every occasion that deserves something more considered than a coupon code.",
  },
];

export default CATEGORIES;
