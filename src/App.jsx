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
{ id: "contact", label: "Contact" }
];

return (

<div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">

{/* Navbar */}

<nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">

<div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

{/* Logo */}

<button onClick={() => navigate("home")} className="flex items-center gap-2 group">

<div className="bg-orange-600 text-white p-1.5 rounded-lg shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
<Zap size={20} fill="currentColor" />
</div>

<span className="text-xl font-black tracking-tighter text-orange-600 uppercase">
POSTER<span className="text-slate-900">BABU</span>
</span>

</button>

{/* Desktop Nav */}

<div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">

{navLinks.map(link => (

<button
key={link.id}
onClick={() => navigate(link.id)}
className={`hover:text-orange-600 transition-colors relative ${currentPage === link.id ? "text-orange-600" : ""}`}

>

{link.label}

{currentPage === link.id && (

<div className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 rounded-full"></div>
)}

</button>

))}

</div>

{/* CTA + Mobile */}

<div className="flex items-center gap-3">

<button
onClick={() => navigate("order")}
className="hidden md:flex bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-slate-200"

>

Order Now </button>

<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"

>

{isMenuOpen ? <X size={24}/> : <Menu size={24}/>} </button>

</div>

</div>

{/* Mobile Menu */}

{isMenuOpen && (

<div className="md:hidden bg-white border-b absolute top-16 left-0 w-full animate-in slide-in-from-top duration-300">

<div className="p-4 space-y-4 font-bold text-slate-600">

{navLinks.map(link => (

<button
key={link.id}
onClick={() => navigate(link.id)}
className={`block w-full text-left p-3 rounded-xl transition-colors ${currentPage === link.id ? "bg-orange-50 text-orange-600" : "hover:bg-slate-50"}`}

>

{link.label} </button>

))}

<button
onClick={() => navigate("order")}
className="w-full bg-orange-600 text-white p-4 rounded-xl font-black text-center"

>

Order Now </button>

</div>

</div>

)}

</nav>

{/* Page */}

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

<a
href="https://www.instagram.com/posterbabu_official/"
target="_blank"
rel="noopener noreferrer"
className="hover:text-orange-500 transition-colors"
>
<Instagram size={22}/>
</a>

{/* Facebook disabled until account is created */}

<a
href="https://wa.me/917428091729"
target="_blank"
rel="noopener noreferrer"
className="hover:text-orange-500 transition-colors"
>
<MessageCircle size={22}/>
</a>

</div>



<p className="text-sm text-slate-400">
© {new Date().getFullYear()} PosterBabu
</p>

<div className="flex justify-center gap-6 mt-4 text-sm text-slate-400">

<span className="flex items-center gap-2">
<Mail size={14}/> help.posterbabu@gmail.com
</span>

<span className="flex items-center gap-2">
<MapPin size={14}/> New Delhi, India
</span>

</div>

</div>

</footer>

{/* Floating WhatsApp */}

{currentPage !== "order" && (

<button
onClick={() => window.open("https://wa.me/917428091729")}
className="fixed bottom-6 right-6 z-40 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-4 border-white font-bold"

>

<MessageCircle size={24} fill="currentColor"/>

<span className="hidden sm:inline">
Chat Now
</span>

</button>

)}

</div>

);

}

export default App;
