/**
 * @fileoverview Seed product data — Taste & Tales
 * Used for development, ISR fallback, and Storybook.
 * Mirrors the Firebase /products schema exactly.
 *
 * @typedef {Object} Product
 * @property {string}   id
 * @property {string}   slug
 * @property {string}   name
 * @property {string}   category         - matches /categories key
 * @property {number}   price            - INR
 * @property {number}   [compareAtPrice] - original price (for sale badge)
 * @property {string[]} images           - Firebase Storage URLs
 * @property {string}   story            - Heritage/origin narrative
 * @property {string[]} ingredients
 * @property {Object}   nutrition        - { calories, protein, carbs, fat, fibre }
 * @property {string[]} tags             - e.g. ['bestseller', 'diwali', 'vegan']
 * @property {number}   stock
 * @property {number}   ratingAvg
 * @property {number}   ratingCount
 * @property {boolean}  isCorporate      - Suitable for bulk/corporate orders
 * @property {string}   createdAt        - ISO date string
 */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: "p001",
    slug: "millet-ladoo-assorted",
    name: "Millet Ladoo — Assorted Box",
    category: "sweets",
    price: 449,
    compareAtPrice: 549,
    images: ["/images/products/millet-ladoo-1.jpg", "/images/products/millet-ladoo-2.jpg"],
    story:
      "Born in a grandmother's kitchen in Thanjavur, these ladoos carry the warmth of three generations. Rolled by hand with foxtail millet, palm jaggery, and roasted sesame, each bite is a quiet return to something familiar.",
    ingredients: [
      "Foxtail Millet Flour",
      "Palm Jaggery",
      "Roasted Sesame Seeds",
      "Ghee (A2 Cow)",
      "Cardamom",
      "Rock Salt (trace)",
    ],
    nutrition: { calories: 148, protein: 3.2, carbs: 22, fat: 5.8, fibre: 2.1 },
    tags: ["bestseller", "vegan-friendly", "no-preservatives", "millet", "gifting"],
    stock: 84,
    ratingAvg: 4.8,
    ratingCount: 127,
    isCorporate: true,
    createdAt: "2024-10-01T00:00:00Z",
  },
  {
    id: "p002",
    slug: "ragi-barfi-saffron",
    name: "Ragi Barfi with Saffron",
    category: "sweets",
    price: 399,
    compareAtPrice: null,
    images: ["/images/products/ragi-barfi-1.jpg", "/images/products/ragi-barfi-2.jpg"],
    story:
      "Ragi — the ancient grain of South Indian farmlands — meets the golden warmth of Kashmiri saffron in this delicate barfi. No sugar. No shortcuts. Only palm jaggery and the patience of slow cooking.",
    ingredients: [
      "Finger Millet (Ragi) Flour",
      "Palm Jaggery",
      "Saffron (Kashmiri)",
      "Ghee (A2 Cow)",
      "Milk Solids",
      "Cardamom",
    ],
    nutrition: { calories: 162, protein: 4.1, carbs: 24, fat: 6.2, fibre: 3.4 },
    tags: ["premium", "saffron", "millet", "no-sugar-added"],
    stock: 52,
    ratingAvg: 4.9,
    ratingCount: 89,
    isCorporate: true,
    createdAt: "2024-10-05T00:00:00Z",
  },
  {
    id: "p003",
    slug: "jowar-chakli",
    name: "Jowar Chakli — Classic",
    category: "savouries",
    price: 299,
    compareAtPrice: null,
    images: ["/images/products/jowar-chakli-1.jpg"],
    story:
      "The spiral that started countless family evenings in Pune's Peth households. Our chakli swaps refined flour for whole jowar, fried in cold-pressed groundnut oil. Crisp, honest, unapologetically nostalgic.",
    ingredients: [
      "Sorghum (Jowar) Flour",
      "Rice Flour",
      "Sesame Seeds",
      "Cumin",
      "Cold-pressed Groundnut Oil",
      "Rock Salt",
      "Asafoetida",
    ],
    nutrition: { calories: 138, protein: 2.8, carbs: 19, fat: 5.6, fibre: 1.9 },
    tags: ["savoury", "gluten-free", "millet", "tea-time"],
    stock: 120,
    ratingAvg: 4.7,
    ratingCount: 203,
    isCorporate: false,
    createdAt: "2024-09-15T00:00:00Z",
  },
  {
    id: "p004",
    slug: "millet-mixture",
    name: "Millet Mixture — Spiced",
    category: "savouries",
    price: 249,
    compareAtPrice: null,
    images: ["/images/products/millet-mixture-1.jpg"],
    story:
      "A Deepavali staple reinvented. Our mixture replaces puffed rice with puffed foxtail millet and kodo millet — lighter, nuttier, and far more interesting than the original.",
    ingredients: [
      "Puffed Foxtail Millet",
      "Puffed Kodo Millet",
      "Roasted Peanuts",
      "Curry Leaves",
      "Mustard Seeds",
      "Turmeric",
      "Red Chilli",
      "Cold-pressed Coconut Oil",
      "Rock Salt",
    ],
    nutrition: { calories: 124, protein: 3.6, carbs: 16, fat: 4.8, fibre: 2.7 },
    tags: ["savoury", "vegan", "millet", "diwali", "tea-time"],
    stock: 200,
    ratingAvg: 4.6,
    ratingCount: 341,
    isCorporate: true,
    createdAt: "2024-09-20T00:00:00Z",
  },
  {
    id: "p005",
    slug: "diwali-hamper-heritage",
    name: "Heritage Diwali Hamper",
    category: "gift-boxes",
    price: 1299,
    compareAtPrice: 1599,
    images: ["/images/products/diwali-hamper-1.jpg", "/images/products/diwali-hamper-2.jpg"],
    story:
      "Eight handpicked bites, one open-lid gift box, and a handwritten note card that reads the story of every sweet inside. This is not a gift. It is a memory, waiting to be made.",
    ingredients: [], // curated collection
    nutrition: {},
    tags: ["bestseller", "diwali", "gifting", "hamper", "corporate"],
    stock: 40,
    ratingAvg: 5.0,
    ratingCount: 56,
    isCorporate: true,
    createdAt: "2024-10-10T00:00:00Z",
  },
  {
    id: "p006",
    slug: "foxtail-millet-bites-choco",
    name: "Foxtail Millet Bites — Dark Chocolate",
    category: "millet-bites",
    price: 349,
    compareAtPrice: null,
    images: ["/images/products/millet-choco-bites-1.jpg"],
    story:
      "What happens when a millet farmer's daughter meets a Coorg chocolatier? These bites. Foxtail millet popped and coated in 70% dark chocolate from single-origin Coorg cacao.",
    ingredients: [
      "Foxtail Millet (Puffed)",
      "70% Dark Chocolate (Coorg Cacao)",
      "Palm Jaggery",
      "Vanilla (Madagascar)",
      "Sea Salt (trace)",
    ],
    nutrition: { calories: 172, protein: 3.9, carbs: 20, fat: 8.4, fibre: 3.1 },
    tags: ["millet-bites", "chocolate", "gifting", "premium"],
    stock: 76,
    ratingAvg: 4.9,
    ratingCount: 142,
    isCorporate: false,
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    id: "p007",
    slug: "corporate-gift-box-classic",
    name: "Corporate Gift Box — Classic (MOQ 25)",
    category: "gift-boxes",
    price: 699,
    compareAtPrice: null,
    images: ["/images/products/corporate-classic-1.jpg"],
    story:
      "A curated selection of 4 bestsellers, branded with your company name on the lid. Delivered pan-India with a personalised note for each recipient.",
    ingredients: [],
    nutrition: {},
    tags: ["corporate", "gifting", "bulk", "branded"],
    stock: 999,
    ratingAvg: 4.8,
    ratingCount: 28,
    isCorporate: true,
    createdAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "p008",
    slug: "kaju-katli-palm-jaggery",
    name: "Kaju Katli — Palm Jaggery",
    category: "sweets",
    price: 599,
    compareAtPrice: null,
    images: ["/images/products/kaju-katli-1.jpg"],
    story:
      "The most beloved mithai in India, made honestly. We swap refined sugar for Neduvasal palm jaggery sourced directly from Tamil Nadu farmers. The result is a softer, more complex katli with a faint caramel whisper.",
    ingredients: [
      "Cashews (W320)",
      "Palm Jaggery (Neduvasal)",
      "Ghee (A2 Cow)",
      "Rose Water",
      "Edible Silver Varak (optional)",
    ],
    nutrition: { calories: 194, protein: 5.2, carbs: 21, fat: 10.8, fibre: 0.8 },
    tags: ["premium", "bestseller", "gifting", "diwali", "no-sugar-added"],
    stock: 68,
    ratingAvg: 4.9,
    ratingCount: 189,
    isCorporate: true,
    createdAt: "2024-10-08T00:00:00Z",
  },
];

export default PRODUCTS;
