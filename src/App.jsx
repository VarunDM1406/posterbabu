import React, { useState, useEffect } from "react";
import { Zap, Menu, X, MessageCircle, Mail, MapPin, Instagram, Facebook } from "lucide-react";

import Homepage from "./pages/Homepage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import OrderPage from "./pages/OrderPage";
import ContactPage from "./pages/ContactPage";

function App() {

  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {

    switch(currentPage){

      case "home":
        return <Homepage navigate={navigate} />;

      case "services":
        return <ServicesPage />;

      case "portfolio":
        return <PortfolioPage />;

      case "pricing":
        return <PricingPage navigate={navigate} />;

      case "order":
        return <OrderPage />;

      case "contact":
        return <ContactPage />;

      default:
        return <Homepage navigate={navigate} />;

    }

  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "order", label: "Order" },
    { id: "contact", label: "Contact" },
  ];

  return (

    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* Navbar */}

      <nav className="bg-white border-b sticky top-0 z-50">

        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <Zap className="text-orange-600" />
            <span className="text-xl font-black text-orange-600">
              POSTER<span className="text-slate-900">BABU</span>
            </span>
          </button>

          <div className="hidden md:flex gap-6 font-bold text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className="hover:text-orange-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className="block w-full text-left p-4 hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

      </nav>

      <main>
        {renderPage()}
      </main>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <p className="mb-4 font-bold text-lg">
            PosterBabu Design Studio
          </p>

          <div className="flex justify-center gap-4 mb-4">
            <Instagram />
            <Facebook />
            <MessageCircle />
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PosterBabu
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Mail size={14} /> help.posterbabu@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> New Delhi, India
            </span>
          </div>

        </div>
      </footer>

      {/* WhatsApp Button */}

      {currentPage !== "order" && (
        <button
          onClick={() => window.open("https://wa.me/917428091729")}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <MessageCircle size={20} />
          Chat Now
        </button>
      )}

    </div>
  );
}

export default App;