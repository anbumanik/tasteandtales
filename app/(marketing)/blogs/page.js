import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { BLOGS } from "@/data/blogs";

export const metadata = buildMetadata({
  title: "Stories & Journal",
  description: "Read about our heritage, recipes, and the stories behind Taste & Tales Indian sweets.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <div className="bg-ivory min-h-screen pt-16 pb-24">
      <PageContainer>
        <PageHeader
          title="Journal & Stories"
          subtitle="Heritage, recipes, and the people behind the sweets."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Stories" }
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col gap-4 rounded-3xl p-4 bg-white border border-sand hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="px-2 pt-2 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-label-xs text-olive uppercase tracking-wider bg-olive/10 px-2 py-1 rounded-md">
                    {blog.category}
                  </span>
                  <span className="font-sans text-body-xs text-gray">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h3 className="font-display text-display-xs text-espresso group-hover:text-olive transition-colors mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="font-sans text-body-sm text-gray line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
