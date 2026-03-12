import React from "react";
import { CheckCircle } from "lucide-react";

/* Entry Offers */
const ENTRY_OFFERS = [
  {
    tagline: "Fast Edit",
    name: "Starter Creative",
    oldPrice: 99,
    newPrice: 49,
    features: ["1 Pre-Existing Template Design", "Custom Text", "Quick Delivery"],
    button: "Order Now",
    highlight: false,
  },
  {
    tagline: "Custom Design",
    name: "Poster Edit",
    oldPrice: 299,
    newPrice: 149,
    features: ["Edit Existing Design", "Text/Image Changes", "Fast Delivery"],
    button: "Get Edit",
    highlight: true,
  },
];

/* Monthly Pricing Plans */
const PRICING_PLANS = [
  {
    name: "Starter",
    desc: "Perfect for small shops starting online presence",
    oldPrice: 799,
    newPrice: 499,
    features: [
      "8 Social Media Posters",
      "Festival Creatives",
      "Business Promotions",
      "WhatsApp Support",
    ],
    highlight: false,
    popular: false,
  },
  {
    name: "Growth",
    desc: "For businesses that post regularly",
    oldPrice:1499,
    newPice: 999,
    features: [
      "20 Social Media Posters",
      "Festival Creatives",
      "Product Promotions",
      "Priority Support",
    ],
    highlight: true,
    popular: true,
  },
  {
    name: "Pro",
    desc: "For brands that want consistent content",
    oldPrice: 2999,
    price: 1999,
    features: [
      "40 Social Media Posters",
      "Festival Creatives",
      "Custom Campaign Designs",
      "Priority Support",
    ],
    highlight: false,
    popular: false,
  },
];

/* FAQs */
const FAQS = [
  {
    q: "How do I place an order?",
    a: "Click on any button and you'll be redirected to WhatsApp to place your order.",
  },
  {
    q: "How fast will I receive my poster?",
    a: "Most posters are delivered within 30–60 minutes depending on complexity.",
  },
  {
    q: "Can I request custom text or offers?",
    a: "Yes, all posters can be customized with your business name, offers, and contact details.",
  },
  {
    q: "Is there any long-term contract?",
    a: "No. Monthly plans can be cancelled anytime.",
  },
];

/* WhatsApp redirect */
const openWhatsApp = (plan) => {
  const phone = "917428091729"; // replace with your number
  const message = `Hi PosterBabu, I want to order the ${plan} plan.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const PricingPage = () => {
  return (
    <section className="py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Simple & Transparent Pricing</h2>
          <p className="text-slate-500">
            High-quality creatives for your business. No hidden charges.
          </p>
        </div>

        {/* Entry Offers */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-slate-400">
              Try PosterBabu First
            </h3>
            <p className="text-slate-500 text-sm">
              Perfect for one-time needs before subscribing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ENTRY_OFFERS.map((offer, i) => (
              <div
                key={i}
                className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-lg flex flex-col ${
                  offer.highlight
                    ? "border-orange-500 shadow-xl shadow-orange-50"
                    : "border-slate-100"
                }`}
              >
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {offer.tagline}
                  </span>
                  <h3 className="text-2xl font-black mt-1 mb-2">{offer.name}</h3>
                  <div className="text-4xl font-black text-slate-900">
                    ₹{offer.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {offer.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 font-bold text-slate-600 text-sm"
                    >
                      <CheckCircle size={16} className="text-green-500 shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openWhatsApp(offer.name)}
                  className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${
                    offer.highlight
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {offer.button}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-slate-400">
            Monthly Content Plans
          </h3>
          <p className="text-slate-500 text-sm">
            Never run out of professional content for your shop
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={i}
              className={`bg-white p-10 rounded-[2.5rem] border-2 flex flex-col relative hover:shadow-xl transition-all ${
                plan.highlight
                  ? "border-orange-600 scale-105 z-10 shadow-2xl shadow-orange-100"
                  : "border-slate-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-black text-slate-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-slate-400 font-bold">/ mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow border-t pt-8 border-slate-50">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle size={18} className="text-green-500 shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openWhatsApp(plan.name)}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                  plan.highlight
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                Start {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Launch Offer Banner */}
        <div className="bg-orange-600 text-white rounded-[2rem] p-8 relative overflow-hidden group mb-24">
          <div className="absolute top-0 right-0 w-64 h-full bg-white/10 skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-700"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <h3 className="text-2xl font-black flex items-center gap-2">
                🚀 Launch Offer – Founder Pricing
              </h3>
              <p className="text-orange-100 font-bold mt-1">
                First 50 Businesses get lifetime discounts. Don't miss out!
              </p>
            </div>

            <div className="flex gap-8 text-center bg-black/10 px-8 py-4 rounded-3xl backdrop-blur-sm border border-white/10">
              <div>
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">
                  Starter
                </p>
                <p className="text-2xl font-black">₹399</p>
              </div>

              <div className="w-px bg-white/20"></div>

              <div>
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">
                  Growth
                </p>
                <p className="text-2xl font-black">₹799</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-12">
            Common Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
              >
                <h4 className="font-black text-slate-900 mb-4">{faq.q}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingPage;