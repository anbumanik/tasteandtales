import { buildMetadata } from "@/lib/seo";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import StorySection from "@/components/marketing/StorySection";
import TestimonialCarousel from "@/components/marketing/TestimonialCarousel";
import NewsletterCapture from "@/components/marketing/NewsletterCapture";

export const metadata = buildMetadata({
  title: "Our Story",
  description: "The Taste & Tales heritage. Handcrafted Indian sweets and savouries using millets and palm jaggery, built on three generations of patience.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-ivory pt-16 pb-20 border-b border-sand">
        <PageContainer>
          <PageHeader
            title="Our Story"
            subtitle="We didn't invent anything. We just refused to let the old ways disappear."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Our Story" }
            ]}
            className="mb-0"
          />
        </PageContainer>
      </div>

      {/* Main content from existing component */}
      <StorySection />

      {/* Full-width quote */}
      <section className="bg-espresso py-24 px-5 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-display-lg sm:text-display-xl text-ivory italic leading-relaxed text-balance">
            "If it can't be made with honest ingredients, it won't be made at all."
          </p>
          <p className="font-sans text-label-md text-gold mt-6 uppercase tracking-[0.2em]">
            — Our Grandmother's Rule
          </p>
        </div>
      </section>

      <TestimonialCarousel />
      <NewsletterCapture />
    </>
  );
}
