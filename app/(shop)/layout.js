import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/commerce/CartDrawer";
import WhatsAppFloatingButton from "@/components/marketing/WhatsAppFloatingButton";

export default function ShopLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      <WhatsAppFloatingButton />
    </>
  );
}
