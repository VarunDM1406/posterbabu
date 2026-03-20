import React, { useState, useEffect } from "react";
import { Zap, Menu, X, MessageCircle, Mail, MapPin, Instagram } from "lucide-react";

import Homepage     from "./pages/Homepage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage  from "./pages/PricingPage";
import OrderPage    from "./pages/OrderPage";
import ContactPage  from "./pages/ContactPage";

import { TrustBar, LanguageProvider, LangToggle } from "./NoDBFeatures";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen]   = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const navigate = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case "home":      return <Homepage navigate={navigate} />;
      case "services":  return <ServicesPage />;
      case "portfolio": return <PortfolioPage />;
      case "pricing":   return <PricingPage navigate={navigate} />;
      case "order":     return <OrderPage />;
      case "contact":   return <ContactPage />;
      default:          return <Homepage navigate={navigate} />;
    }
  };

  const navLinks = [
    { id: "home",      label: "Home" },
    { id: "services",  label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing",   label: "Pricing" },
    { id: "order",     label: "Order" },
    { id: "contact",   label: "Contact" },
  ];

  return (
    <LanguageProvider>
      <div style={{ background: "#060517", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
          *{box-sizing:border-box;margin:0;padding:0;}
          body{background:#060517;}
          .app-nav-link{background:none;border:none;color:#9895B0;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;padding:4px 0;position:relative;transition:color 0.2s;}
          .app-nav-link:hover{color:#F5F0E8;}
          .app-nav-link.active{color:#F5F0E8;}
          .app-nav-link.active::after{content:'';position:absolute;bottom:-4px;left:0;width:100%;height:2px;background:#D05B37;border-radius:2px;}
          .app-order-btn{background:#D05B37;color:#F5F0E8;border:none;padding:10px 22px;border-radius:100px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s;}
          .app-order-btn:hover{background:#B84E2E;}
          .app-mobile-link{width:100%;text-align:left;background:none;border:none;color:#9895B0;font-size:16px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;padding:14px 20px;border-radius:12px;transition:background 0.2s,color 0.2s;}
          .app-mobile-link:hover,.app-mobile-link.active{background:rgba(208,91,55,0.12);color:#F5F0E8;}
          @keyframes app-slide-down{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
          .app-mobile-menu{animation:app-slide-down 0.25s ease both;}
        `}</style>

        {/* ── NAVBAR ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(6,5,23,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2E2B45",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 max(24px,5vw)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* Logo */}
            <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={16} color="#F5F0E8" fill="#F5F0E8" />
              </div>
              <span style={{ fontWeight: 900, fontSize: 18, color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.3px" }}>
                Poster<span style={{ color: "#D05B37" }}>Babu</span>
              </span>
            </button>

            {/* Desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  className={`app-nav-link ${currentPage === link.id ? "active" : ""}`}
                  onClick={() => navigate(link.id)}
                >
                  {link.label}
                </button>
              ))}
              <LangToggle />
              <button className="app-order-btn" onClick={() => navigate("order")}>Order Now</button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: "rgba(208,91,55,0.12)", border: "1px solid rgba(208,91,55,0.2)", borderRadius: 10, padding: 8, cursor: "pointer", color: "#D05B37", display: "none" }}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="app-mobile-menu" style={{ borderTop: "1px solid #2E2B45", background: "#0C0A1E", padding: "12px 16px 20px" }}>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  className={`app-mobile-link ${currentPage === link.id ? "active" : ""}`}
                  onClick={() => navigate(link.id)}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ padding: "12px 20px 4px", display: "flex", gap: 10, flexWrap: "wrap" }}>
                <LangToggle />
                <button className="app-order-btn" onClick={() => navigate("order")} style={{ flex: 1 }}>
                  Order Now
                </button>
              </div>
            </div>
          )}

          {/* Responsive styles */}
          <style>{`
            @media(max-width:768px){
              .desktop-nav{display:none!important;}
              .mobile-menu-btn{display:flex!important;}
            }
          `}</style>
        </nav>

        {/* ── TRUST BAR ── */}
        <TrustBar />

        {/* ── PAGE CONTENT ── */}
        <main>{renderPage()}</main>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#0C0A1E", borderTop: "1px solid #2E2B45", padding: "48px max(24px,5vw)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>

              {/* Brand */}
              <div style={{ maxWidth: 300 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={14} color="#F5F0E8" fill="#F5F0E8" />
                  </div>
                  <span style={{ fontWeight: 900, fontSize: 17, color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif" }}>
                    Poster<span style={{ color: "#D05B37" }}>Babu</span>
                  </span>
                </div>
                <p style={{ color: "#9895B0", fontSize: 14, lineHeight: 1.7 }}>
                  Fast, affordable poster design for local businesses across India. Starting at ₹49.
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                  <a href="https://www.instagram.com/posterbabu_official/" target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#9895B0", transition: "color 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#D05B37"; e.currentTarget.style.borderColor = "rgba(208,91,55,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9895B0"; e.currentTarget.style.borderColor = "#2E2B45"; }}
                  >
                    <Instagram size={16} />
                  </a>
                  <a href="https://wa.me/917428091729" target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#9895B0", transition: "color 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#22c55e"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9895B0"; e.currentTarget.style.borderColor = "#2E2B45"; }}
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#9895B0", marginBottom: 16 }}>Pages</p>
                  {navLinks.map(link => (
                    <button key={link.id} onClick={() => navigate(link.id)}
                      style={{ display: "block", background: "none", border: "none", color: "#9895B0", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", padding: "5px 0", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#F5F0E8"}
                      onMouseLeave={e => e.currentTarget.style.color = "#9895B0"}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#9895B0", marginBottom: 16 }}>Contact</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <a href="mailto:help.posterbabu@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "#9895B0", fontSize: 14, textDecoration: "none" }}>
                      <Mail size={13} /> help.posterbabu@gmail.com
                    </a>
                    <a href="https://wa.me/917428091729" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "#9895B0", fontSize: 14, textDecoration: "none" }}>
                      <MessageCircle size={13} /> +91 74280 91729
                    </a>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#9895B0", fontSize: 14 }}>
                      <MapPin size={13} /> New Delhi, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid #2E2B45", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontSize: 13, color: "#9895B0" }}>© {new Date().getFullYear()} PosterBabu. All rights reserved.</p>
              <p style={{ fontSize: 13, color: "#9895B0" }}>Made with ❤️ for local businesses in India</p>
            </div>
          </div>
        </footer>

        {/* ── FLOATING WHATSAPP ── */}
        {currentPage !== "order" && (
          <button
            onClick={() => window.open("https://wa.me/917428091729")}
            style={{ position: "fixed", bottom: 28, right: 28, width: 56, height: 56, background: "#22c55e", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 999, boxShadow: "0 8px 24px rgba(34,197,94,0.35)", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <MessageCircle color="white" size={24} />
          </button>
        )}

      </div>
    </LanguageProvider>
  );
}

export default App;
