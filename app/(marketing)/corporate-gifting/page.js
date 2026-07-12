import { buildMetadata } from "@/lib/seo";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import CorporateGiftingBanner from "@/components/marketing/CorporateGiftingBanner";
import EnquiryForm from "./EnquiryForm";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "Corporate Gifting",
  description: "Premium Indian sweets and gift boxes for corporate clients, employee onboarding, and festive gifting. Bulk orders available.",
  path: "/corporate-gifting",
});

const BENEFITS = [
  "Custom branding & sleeve options",
  "Dedicated account manager",
  "PAN-India direct-to-recipient shipping",
  "No preservatives, longer shelf life naturally",
  "Premium, plastic-free packaging",
  "Special volume pricing",
];

export default function CorporateGiftingPage() {
  return (
    <>
      <div className="bg-ivory pt-16 pb-20">
        <PageContainer>
          <PageHeader
            title="Corporate & Bulk Gifting"
            subtitle="Gifts that leave an impression long after the box is empty."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Corporate Gifting" }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
            {/* Left: Image & details */}
            <div className="flex flex-col gap-8">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-sand shadow-card">
                <Image
                  src="/images/products/corporate-classic-1.jpg"
                  alt="Taste & Tales Corporate Gift Box"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <h3 className="font-display text-display-sm text-espresso mb-4">
                  Why partner with us?
                </h3>
                <ul className="flex flex-col gap-3">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-olive shrink-0 mt-0.5" />
                      <span className="font-sans text-body-md text-gray">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-sand">
              <h2 className="font-display text-display-md text-espresso mb-2">Request a Quote</h2>
              <p className="font-sans text-body-sm text-gray mb-8">
                Tell us about your gifting needs, and our team will get back to you within 24 hours. (MOQ: 25 boxes)
              </p>
              <EnquiryForm />
            </div>
          </div>
        </PageContainer>
      </div>

      <CorporateGiftingBanner />
    </>
  );
}
