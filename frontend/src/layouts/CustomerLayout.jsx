// src/layouts/CustomerLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";
import NavBarTop from "../components/NavBarTop";

export default function CustomerLayout({ children }) {
  return (
    <>
      <NavBarTop />
      <Outlet />
      <main>{children}</main>
      <FooterFull />
      <Footer />
    </>
  );
}