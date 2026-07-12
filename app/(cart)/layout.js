import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/commerce/CartDrawer";

export default function CartLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </>
  );
}
