// src/layouts/CustomerLayout.jsx
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";
import NavBarTop from "../components/NavBarTop";

export default function CustomerLayout({children}) {
    return (
        <><NavBarTop />
        <main>{children}</main>
        <FooterFull />
        <Footer />
        </>
    )
}