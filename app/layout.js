import { Fraunces, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { organizationSchema } from "@/lib/seo";
import { Toaster } from "react-hot-toast";

// ─── Font loading ─────────────────────────────────────────────────────────────

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// ─── Root Metadata ────────────────────────────────────────────────────────────

export const metadata = {
  title: {
    default: "Taste & Tales — Sips. Bites. Memories.",
    template: "%s | Taste & Tales",
  },
  description:
    "Premium handcrafted Indian sweets, savouries & gift boxes made with millets, palm jaggery, and no preservatives. PAN India delivery.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tasteandtales.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tasteandtales.in",
    siteName: "Taste & Tales",
    images: [
      {
        url: "/og-fallback.jpg",
        width: 1200,
        height: 630,
        alt: "Taste & Tales — Sips. Bites. Memories.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tasteandtales",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization JSON-LD — global, appears on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-ivory font-sans text-gray antialiased">
        {/* Toast notifications */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#2A1E17",
              color: "#FAF7F2",
              fontFamily: "var(--font-manrope)",
              fontSize: "0.875rem",
              borderRadius: "12px",
              padding: "12px 18px",
              border: "1px solid #C9A66B",
            },
            success: {
              iconTheme: { primary: "#7C8F5A", secondary: "#FAF7F2" },
            },
            error: {
              iconTheme: { primary: "#C9A66B", secondary: "#FAF7F2" },
            },
          }}
        />

        {/* Main app content — layouts wrap this via Route Groups */}
        {children}
      </body>
    </html>
  );
}
