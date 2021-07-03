import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <div className="h-16 z-0"></div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
