/**
 * @fileoverview Seed blog data — Taste & Tales
 *
 * @typedef {Object} Blog
 * @property {string}   id
 * @property {string}   slug
 * @property {string}   title
 * @property {string}   excerpt
 * @property {string}   body        - Markdown/MDX content
 * @property {string}   coverImage
 * @property {string}   author
 * @property {string[]} tags
 * @property {string}   publishedAt  - ISO date string
 * @property {string}   [category]   - 'tradition' | 'recipe' | 'festival' | 'sourcing'
 */

/** @type {Blog[]} */
export const BLOGS = [
  {
    id: "b001",
    slug: "why-palm-jaggery-not-sugar",
    title: "Why We'll Never Use Refined Sugar",
    excerpt:
      "Palm jaggery isn't a trend for us. It's a choice made in 1987 by a grandmother who never needed a reason beyond taste. Here's the story.",
    coverImage: "/images/blogs/palm-jaggery-cover.jpg",
    author: "Meera Krishnan",
    tags: ["ingredients", "palm-jaggery", "tradition"],
    category: "sourcing",
    publishedAt: "2024-10-20T00:00:00Z",
    body: `## The Sweet That Refuses to Compromise\n\nIn the villages around Neduvasal, Tamil Nadu, the palm tree is not a tree. It is a family member...`,
  },
  {
    id: "b002",
    slug: "millet-revolution-india",
    title: "The Quiet Millet Revolution Happening in Indian Kitchens",
    excerpt:
      "From UN's International Year of Millets to your grandmother's chakli — why ancient grains are finding their way back to the table.",
    coverImage: "/images/blogs/millet-revolution-cover.jpg",
    author: "Arjun Nair",
    tags: ["millets", "nutrition", "sustainability"],
    category: "tradition",
    publishedAt: "2024-11-05T00:00:00Z",
    body: `## An Ancient Grain Returns\n\nForget quinoa. India's own supergrains have been waiting patiently in the terraces of Odisha and the farms of Karnataka...`,
  },
  {
    id: "b003",
    slug: "diwali-gifting-guide-2024",
    title: "The Taste & Tales Diwali Gifting Guide",
    excerpt:
      "Not every gift needs to be expensive. Some just need to be thoughtful. Our Diwali curation for every budget, every relationship.",
    coverImage: "/images/blogs/diwali-guide-cover.jpg",
    author: "Priya Sharma",
    tags: ["diwali", "gifting", "guide"],
    category: "festival",
    publishedAt: "2024-10-25T00:00:00Z",
    body: `## Gifts That Outlast the Festival\n\nDiwali is a time for light. But the most memorable gifts are the ones that carry a story...`,
  },
  {
    id: "b004",
    slug: "how-we-make-millet-ladoo",
    title: "How We Make Our Millet Ladoo: A Recipe (and a Confession)",
    excerpt:
      "We tried to automate the rolling process. Three machines and two engineers later, we went back to rolling them by hand. Here's why.",
    coverImage: "/images/blogs/millet-ladoo-process.jpg",
    author: "Meera Krishnan",
    tags: ["recipe", "millet", "process", "handmade"],
    category: "recipe",
    publishedAt: "2024-11-12T00:00:00Z",
    body: `## The Machine That Couldn't Roll a Perfect Sphere\n\nA perfect ladoo is, geometrically speaking, a sphere. But it is also...`,
  },
];

export default BLOGS;
