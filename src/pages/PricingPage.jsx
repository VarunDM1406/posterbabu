import React, { useState } from "react";
import { CheckCircle, MessageCircle, ChevronDown, Zap } from "lucide-react";

const ENTRY_OFFERS = [
  {
    tagline: "Quick template edit",
    name: "Fast Edit",
    oldPrice: 99,
    newPrice: 49,
    features: ["1 pre-existing template", "Custom text & details", "Delivered fast"],
    button: "Edit My Poster",
    highlight: false,
  },
  {
    tagline: "Built for your business",
    name: "Custom Poster",
    oldPrice: 299,
    newPrice: 149,
    features: ["Fully custom design", "Text & image changes", "Instagram / WhatsApp size", "HD file delivery"],
    button: "Create My Poster",
    highlight: true,
  },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    desc: "Perfect for small shops starting online",
    oldPrice: 799,
    newPrice: 499,
    features: [
      "8 social media posters / month",
      "Festival creatives",
      "Business promotions",
      "WhatsApp support",
    ],
    highlight: false,
    popular: false,
  },
  {
    name: "Growth",
    desc: "For businesses that post regularly",
    oldPrice: 1499,
    newPrice: 999,
    features: [
      "20 social media posters / month",
      "Festival creatives",
      "Product promotions",
      "Priority support",
    ],
    highlight: true,
    popular: true,
  },
  {
    name: "Pro",
    desc: "For brands that want consistent content",
    oldPrice: 2999,
    newPrice: 1999,
    features: [
      "40 social media posters / month",
      "Festival creatives",
      "Custom campaign designs",
      "Priority support",
    ],
    highlight: false,
    popular: false,
  },
];

const FAQS = [
  { q: "How do I place an order?", a: "Click any button and you'll be taken to WhatsApp where you can send your details. We'll confirm and start designing immediately." },
  { q: "How fast will I receive my poster?", a: "Fast Edit orders are typically done in 10–20 minutes. Custom designs take 30–60 minutes depending on complexity." },
  { q: "Can I request changes to the design?", a: "Yes — one round of revisions is included with every order. Just tell us what to change on WhatsApp." },
  { q: "Do I need to pay upfront?", a: "No. We send you the draft first. You pay only after you're happy with it." },
  { q: "What format will I receive the file in?", a: "You'll get a high-resolution PNG or JPG, ready to post on Instagram, WhatsApp, or print." },
  { q: "Is there any long-term contract?", a: "None at all. Monthly plans can be cancelled anytime with no questions asked." },
];

const openWhatsApp = (plan = "") => {
  const msg = plan
    ? `Hi PosterBabu! I want to order the ${plan} plan.`
    : "Hi PosterBabu! I want to order a poster.";
  window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
};

const PricingPage = ({ navigate }) => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      style={{
        background: "#060517",
        color: "#F5F0E8",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .price-card {
          background: #1A1830; border: 1px solid #2E2B45;
          border-radius: 24px; padding: 36px;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
        }
        .price-card:hover { border-color: rgba(208,91,55,0.4); transform: translateY(-4px); }
        .price-card.highlight { background: #D05B37; border-color: #D05B37; transform: scale(1.03); }
        .price-card.highlight:hover { transform: scale(1.03) translateY(-4px); }
        .plan-card {
          background: #1A1830; border: 1px solid #2E2B45;
          border-radius: 24px; padding: 32px;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
        }
        .plan-card:hover { border-color: rgba(208,91,55,0.4); }
        .plan-card.highlight { border-color: #D05B37; border-width: 2px; }
        .fire-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(208,91,55,0.15); border: 1px solid rgba(208,91,55,0.3);
          color: #E87A57; padding: 5px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
        }
        .fire-btn {
          background: #D05B37; color: #F5F0E8; border: none;
          padding: 14px; border-radius: 12px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s; width: 100%;
        }
        .fire-btn:hover { background: #B84E2E; }
        .ghost-btn {
          background: rgba(6,5,23,0.25); color: #F5F0E8;
          border: 1.5px solid rgba(245,240,232,0.25);
          padding: 14px; border-radius: 12px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s; width: 100%;
        }
        .ghost-btn:hover { opacity: 0.85; }
        .slate-btn {
          background: #0C0A1E; color: #F5F0E8; border: 1px solid #2E2B45;
          padding: 14px; border-radius: 12px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s; width: 100%;
        }
        .slate-btn:hover { border-color: #D05B37; }
        .faq-item {
          background: #1A1830; border: 1px solid #2E2B45;
          border-radius: 16px; overflow: hidden; transition: border-color 0.2s;
        }
        .faq-item:hover { border-color: rgba(208,91,55,0.3); }
        .faq-q {
          width: 100%; background: none; border: none; padding: 20px 24px;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 700; color: #F5F0E8; text-align: left;
        }
        .divline { width: 40px; height: 3px; background: #D05B37; border-radius: 2px; margin: 12px 0 0; }
        @media (max-width: 768px) {
          .entry-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .plans-grid .plan-card.highlight { transform: none !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <section style={{ padding: "72px max(24px, 5vw) 64px", textAlign: "center" }}>
        <span className="fire-tag">Pricing</span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 900, marginTop: 20, marginBottom: 16,
          }}
        >
          Simple & transparent <span style={{ color: "#D05B37" }}>pricing</span>
        </h1>
        <div className="divline" style={{ margin: "0 auto 20px" }} />
        <p style={{ color: "#9895B0", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>
          High-quality creatives for your business. No hidden charges. No contracts.
        </p>
      </section>

      {/* ── ENTRY OFFERS ── */}
      <section style={{ padding: "0 max(24px, 5vw) 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#9895B0", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 8 }}>
              Try PosterBabu first
            </p>
            <p style={{ color: "#9895B0", fontSize: 14 }}>One-time orders — no subscription needed</p>
          </div>

          <div
            className="entry-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {ENTRY_OFFERS.map((offer, i) => (
              <div key={i} className={`price-card ${offer.highlight ? "highlight" : ""}`}>
                <div style={{ marginBottom: 24 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: offer.highlight ? "rgba(245,240,232,0.6)" : "#9895B0",
                  }}>
                    {offer.tagline}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28, fontWeight: 900, color: "#F5F0E8",
                      marginTop: 6, marginBottom: 16,
                    }}
                  >
                    {offer.name}
                  </h3>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 52, fontWeight: 900, color: "#F5F0E8", lineHeight: 1,
                      }}
                    >
                      ₹{offer.newPrice}
                    </span>
                    <span style={{
                      fontSize: 18, textDecoration: "line-through", marginLeft: 10,
                      color: offer.highlight ? "rgba(245,240,232,0.45)" : "#9895B0",
                    }}>
                      ₹{offer.oldPrice}
                    </span>
                  </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flex: 1 }}>
                  {offer.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, color: offer.highlight ? "#F5F0E8" : "#9895B0" }}>
                      <CheckCircle size={16} style={{ color: offer.highlight ? "#F5F0E8" : "#D05B37", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {offer.highlight
                  ? <button className="ghost-btn" onClick={() => openWhatsApp(offer.name)}>{offer.button}</button>
                  : <button className="fire-btn" onClick={() => openWhatsApp(offer.name)}>{offer.button}</button>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MONTHLY PLANS ── */}
      <section style={{ padding: "0 max(24px, 5vw) 80px", background: "#0C0A1E", paddingTop: 80 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="fire-tag">Monthly plans</span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900, marginTop: 16, marginBottom: 10,
              }}
            >
              Never run out of <span style={{ color: "#D05B37" }}>content</span>
            </h2>
            <p style={{ color: "#9895B0", fontSize: 15 }}>Subscribe and get fresh posters every month</p>
          </div>

          <div
            className="plans-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}
          >
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.highlight ? "highlight" : ""}`}>
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "#D05B37", color: "#F5F0E8",
                    padding: "5px 18px", borderRadius: 100,
                    fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px",
                    whiteSpace: "nowrap",
                  }}>
                    Most popular
                  </div>
                )}

                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 26, fontWeight: 900, color: "#F5F0E8", marginBottom: 8,
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 20, lineHeight: 1.6 }}>{plan.desc}</p>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 48, fontWeight: 900, color: "#F5F0E8", lineHeight: 1,
                    }}>
                      ₹{plan.newPrice}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, color: "#9895B0", textDecoration: "line-through" }}>₹{plan.oldPrice}</div>
                      <div style={{ fontSize: 12, color: "#9895B0" }}>/ month</div>
                    </div>
                  </div>
                </div>

                <ul style={{
                  listStyle: "none", display: "flex", flexDirection: "column", gap: 14,
                  marginBottom: 28, flex: 1, paddingTop: 20,
                  borderTop: "1px solid #2E2B45",
                }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, color: "#9895B0" }}>
                      <CheckCircle size={16} style={{ color: "#D05B37", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.highlight
                  ? <button className="fire-btn" onClick={() => openWhatsApp(plan.name)}>Start {plan.name}</button>
                  : <button className="slate-btn" onClick={() => openWhatsApp(plan.name)}>Start {plan.name}</button>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER OFFER BANNER ── */}
      <section style={{ padding: "80px max(24px, 5vw)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "#D05B37", borderRadius: 24, padding: "40px 48px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 32, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 260, height: "100%", background: "rgba(255,255,255,0.06)", clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Zap size={20} color="#F5F0E8" fill="#F5F0E8" />
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(245,240,232,0.7)" }}>
                  Launch offer — founder pricing
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: "#F5F0E8", marginBottom: 8 }}>
                First 50 businesses get lifetime discounts
              </h3>
              <p style={{ color: "rgba(245,240,232,0.75)", fontSize: 14 }}>Lock in your rate before we raise prices. No catch.</p>
            </div>
            <div style={{
              display: "flex", gap: 24, background: "rgba(6,5,23,0.2)",
              padding: "20px 32px", borderRadius: 20, border: "1px solid rgba(245,240,232,0.15)",
              position: "relative",
            }}>
              {[{ label: "Starter", price: "₹399" }, { label: "Growth", price: "₹799" }].map((item, i) => (
                <React.Fragment key={item.label}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "rgba(245,240,232,0.6)", marginBottom: 6, letterSpacing: "1px" }}>{item.label}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#F5F0E8" }}>{item.price}</p>
                  </div>
                  {i === 0 && <div style={{ width: 1, background: "rgba(245,240,232,0.2)" }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "0 max(24px, 5vw) 80px", background: "#0C0A1E", paddingTop: 80 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="fire-tag">FAQ</span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900, marginTop: 16,
              }}
            >
              Common <span style={{ color: "#D05B37" }}>questions</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "#D05B37", flexShrink: 0, marginLeft: 16,
                      transition: "transform 0.25s",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: "0 24px 20px",
                    fontSize: 14, color: "#9895B0", lineHeight: 1.8,
                    borderTop: "1px solid #2E2B45", paddingTop: 16,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "80px max(24px, 5vw)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, marginBottom: 16 }}>
            Still not sure? <span style={{ color: "#D05B37" }}>Try ₹49 first.</span>
          </h2>
          <p style={{ color: "#9895B0", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            Order a single Fast Edit for ₹49. If you love it, subscribe. If not, no hard feelings.
          </p>
          <button
            onClick={() => openWhatsApp("Fast Edit ₹49")}
            style={{
              background: "#D05B37", color: "#F5F0E8", border: "none",
              padding: "16px 40px", borderRadius: 14, fontSize: 17, fontWeight: 800,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              display: "inline-flex", alignItems: "center", gap: 12,
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <MessageCircle size={20} /> Get my ₹49 poster now
          </button>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
