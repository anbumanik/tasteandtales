import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOGS } from "@/data/blogs";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const blog = BLOGS.find((b) => b.slug === params.slug);
  if (!blog) return {};
  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${blog.slug}`,
    image: `/api/og?title=${encodeURIComponent(blog.title)}&subtitle=Stories`,
  });
}

export function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }));
}

export default function BlogPost({ params }) {
  const blog = BLOGS.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  return (
    <article className="bg-ivory min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 font-sans text-body-sm text-brown/60 hover:text-olive transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Stories
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-label-sm text-olive uppercase tracking-widest">
              {blog.category}
            </span>
            <span className="text-sand">•</span>
            <span className="font-sans text-body-sm text-gray">
              {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="text-sand">•</span>
            <span className="font-sans text-body-sm text-gray">
              {blog.author}
            </span>
          </div>
          <h1 className="font-display text-display-xl md:text-display-2xl text-espresso leading-[1.1] mb-6">
            {blog.title}
          </h1>
          <p className="font-sans text-body-xl text-gray leading-relaxed">
            {blog.excerpt}
          </p>
        </header>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-6 mb-16">
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-card">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <div
          className="prose prose-brand prose-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        <div className="mt-20 pt-10 border-t border-sand flex justify-center">
          <Link
            href="/shop"
            className="font-sans font-semibold text-label-lg text-ivory bg-olive px-8 py-4 rounded-full hover:bg-espresso transition-colors"
          >
            Explore our sweets
          </Link>
        </div>
      </div>
    </article>
  );
}
