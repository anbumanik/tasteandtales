import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/commerce/CartDrawer";
import WhatsAppFloatingButton from "@/components/marketing/WhatsAppFloatingButton";

/**
 * Marketing layout — wraps all public-facing pages.
 * Server Component (Header/Footer are client, but layout itself can be server).
 */
export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      <WhatsAppFloatingButton />
    </>
  );
}
