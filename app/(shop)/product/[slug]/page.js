import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { buildMetadata, productSchema, breadcrumbSchema } from "@/lib/seo";
import PDPClient from "./PDPClient";

// ISR: revalidate every 5 minutes
export const revalidate = 300;

// Generate all PDP routes at build time
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per product
export async function generateMetadata({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.story,
    path: `/product/${product.slug}`,
    ogImage: `/api/og?title=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.images?.[0] || "")}`,
  });
}

export default function ProductPage({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const jsonLd = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Shop", url: "/shop" },
      { name: product.category, url: `/shop/${product.category}` },
      { name: product.name, url: `/product/${product.slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PDPClient product={product} related={related} />
    </>
  );
}
