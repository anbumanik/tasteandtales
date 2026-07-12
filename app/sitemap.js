import { PRODUCTS } from "@/data/products";
import { BLOGS } from "@/data/blogs";
import { CATEGORIES } from "@/data/categories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tasteandtales.in";

/**
 * Dynamic sitemap.xml route handler.
 * Pulls product and blog slugs from seed data (replace with Firebase reads in production).
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: "/",                  priority: 1.0,  changeFrequency: "weekly"  },
    { url: "/shop",              priority: 0.9,  changeFrequency: "daily"   },
    { url: "/our-story",         priority: 0.8,  changeFrequency: "monthly" },
    { url: "/corporate-gifting", priority: 0.85, changeFrequency: "weekly"  },
    { url: "/blogs",             priority: 0.8,  changeFrequency: "weekly"  },
    { url: "/faq",               priority: 0.7,  changeFrequency: "monthly" },
    { url: "/contact",           priority: 0.7,  changeFrequency: "monthly" },
    { url: "/wishlist",          priority: 0.4,  changeFrequency: "never"   },
  ].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/shop/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.createdAt ? new Date(product.createdAt) : now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes = BLOGS.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: blog.publishedAt ? new Date(blog.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
