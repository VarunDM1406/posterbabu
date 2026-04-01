import React, { useState } from "react";
import { CheckCircle, MessageCircle, ChevronDown, Zap, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const openWhatsApp = (plan = "") => {
  const msg = plan
    ? `Hi PosterBabu! I want to order the ${plan} plan.`
    : "Hi PosterBabu! I want to order a design.";
  window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
};

// WhatsApp SVG icon component
const WhatsAppIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: "inline", verticalAlign: "middle" }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FAQS = [
  {
    q: "What if I don't like the design?",
    a: "We revise until you're happy. Just tell us what to change on WhatsApp — no forms, no tickets. Most revisions are done in under 30 minutes.",
  },
  {
    q: "Do I need to send content every time?",
    a: "No. Share your business details once — offer, product name, any text you want — and we handle the rest. You don't need to be creative.",
  },
  {
    q: "How fast will I get my design?",
    a: "Fast Edit orders: 15–30 minutes. Custom designs: 1–2 hours. Monthly plan posts are delivered on a consistent schedule so your feed stays active.",
  },
  {
    q: "Do I need to pay upfront?",
    a: "We take a 50% advance to start. Once we send the first draft, the advance is non-refundable. You pay the rest after you're satisfied.",
  },
  {
    q: "What format will I get?",
    a: "High-resolution PNG or JPG, sized and ready for Instagram, WhatsApp, or print. No extra steps needed.",
  },
  {
    q: "Can I cancel my monthly plan anytime?",
    a: "Yes — no long-term contract, no lock-in. Plans are non-refundable once purchased, and unused posts don't carry forward.",
  },
];

const PricingPage = ({ navigate }) => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const ENTRY_OFFERS = [
    {
      tag: "QUICK EDIT",
      name: "Fast Edit",
      oldPrice: 199,
      newPrice: 99,
      delivery: "Ready in 15–30 mins",
      features: [
        "1 post/design (template-based)",
        "Text or offer update",
        "Delivered within hours",
        "1 revision included",
      ],
      button: "Try My First Design",
      highlight: false,
    },
    {
      tag: "FULLY CUSTOM",
      name: "Custom Design",
      oldPrice: 299,
      newPrice: 199,
      delivery: "Ready in 1–2 hours",
      features: [
        "Fully custom post/design",
        "Instagram & WhatsApp ready",
        "HD file delivery",
        "Delivered within hours",
      ],
      button: "Get My Custom Design",
      highlight: true,
    },
  ];

  const PRICING_PLANS = [
    {
      name: "Starter",
      desc: "For businesses that want to look active and consistent",
      oldPrice: 1499,
      newPrice: 999,
      posts: "8 posts/month",
      freq: "2 per week",
      features: [
        "8 posts/designs per month (2/week)",
        "Festival creatives included",
        "Template-based designs",
        "WhatsApp support",
        "Delivered within hours",
      ],
      button: "Start Starter Plan",
      highlight: false,
      popular: false,
      anchor: null,
    },
    {
      name: "Growth",
      desc: "For businesses that want real visibility and more customers",
      oldPrice: 3499,
      newPrice: 2499,
      posts: "16 posts/month",
      freq: "4 per week",
      features: [
        "16 posts/designs per month (4/week)",
        "Mix of custom + templates",
        "Offers, promotions & festivals",
        "Priority delivery",
        "WhatsApp support",
      ],
      noEffort: [
        "No need to think about ideas",
        "No need to design anything",
        "We handle most of it for you",
      ],
      button: "Get My Content Started",
      highlight: true,
      popular: true,
      anchor: "Less than ₹85/day for your business marketing",
    },
    {
      name: "Pro",
      desc: "For serious brands that want to stand out every week",
      oldPrice: 4999,
      newPrice: 3499,
      posts: "24 posts/month",
      freq: "5–6 per week",
      features: [
        "24 posts/designs per month (5–6/week)",
        "Fully custom designs",
        "Campaign & offer creatives",
        "Same-day delivery",
        "Priority support",
      ],
      button: "Start My Monthly Plan",
      highlight: false,
      popular: false,
      anchor: null,
    },
  ];

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
        *{box-sizing:border-box;}

        .price-card{background:#1A1830;border:1px solid #2E2B45;border-radius:24px;padding:36px;display:flex;flex-direction:column;transition:border-color 0.2s,transform 0.2s;position:relative;}
        .price-card:hover{border-color:rgba(208,91,55,0.4);transform:translateY(-4px);}
        .price-card.highlight{background:#D05B37;border-color:#D05B37;transform:scale(1.03);}
        .price-card.highlight:hover{transform:scale(1.03) translateY(-4px);}

        .plan-card{background:#1A1830;border:1px solid #2E2B45;border-radius:24px;padding:32px;display:flex;flex-direction:column;transition:border-color 0.2s,transform 0.2s;position:relative;}
        .plan-card:hover{border-color:rgba(208,91,55,0.4);}
        .plan-card.highlight{border-color:#D05B37;border-width:2px;}

        .fire-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(208,91,55,0.15);border:1px solid rgba(208,91,55,0.3);color:#E87A57;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
        .fire-btn{background:#D05B37;color:#F5F0E8;border:none;padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;}
        .fire-btn:hover{background:#B84E2E;}
        .ghost-btn{background:rgba(6,5,23,0.25);color:#F5F0E8;border:1.5px solid rgba(245,240,232,0.25);padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:opacity 0.2s;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;}
        .ghost-btn:hover{opacity:0.85;}
        .slate-btn{background:#0C0A1E;color:#F5F0E8;border:1px solid #2E2B45;padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:border-color 0.2s;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;}
        .slate-btn:hover{border-color:#D05B37;}

        .trust-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#9895B0;}
        .trust-badge svg{color:#D05B37;}

        .faq-item{background:#1A1830;border:1px solid #2E2B45;border-radius:16px;overflow:hidden;transition:border-color 0.2s;}
        .faq-item:hover{border-color:rgba(208,91,55,0.3);}
        .faq-q{width:100%;background:none;border:none;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;color:#F5F0E8;text-align:left;}
        .divline{width:40px;height:3px;background:#D05B37;border-radius:2px;margin:12px 0 0;}

        .compare-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-bottom:1px solid #2E2B45;}
        .compare-row:last-child{border-bottom:none;}
        .compare-cell{padding:14px 20px;font-size:14px;}

        @media(max-width:768px){
          .entry-grid{grid-template-columns:1fr!important;}
          .plans-grid{grid-template-columns:1fr!important;}
          .plans-grid .plan-card.highlight{transform:none!important;}
          .compare-row{grid-template-columns:1fr 1fr 1fr;}
          .compare-cell{padding:10px 12px;font-size:12px;}
          .founder-inner{flex-direction:column!important;align-items:flex-start!important;}
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "72px max(24px,5vw) 48px", textAlign: "center" }}>
        <span className="fire-tag">PRICING</span>
        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(32px,5vw,54px)",
            fontWeight: 900,
            marginTop: 20,
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Get daily content for your business —{" "}
          <span style={{ color: "#D05B37" }}>without hiring a designer</span>
        </h1>
        <div className="divline" style={{ margin: "0 auto 20px" }} />
        <p style={{ color: "#9895B0", fontSize: 18, maxWidth: 520, margin: "0 auto 16px" }}>
          We design, you grow. Stay consistent on Instagram & WhatsApp and attract more customers — without the stress.
        </p>
        <p
          style={{
            color: "#6B6884",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Perfect for shops, salons, cafes, gyms & local businesses
        </p>
      </section>

      {/* ── ONE-TIME ORDERS ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#9895B0",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: 8,
              }}
            >
              ONE-TIME ORDERS
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(24px,3.5vw,38px)",
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              Try PosterBabu in just{" "}
              <span style={{ color: "#D05B37" }}>₹99</span>
            </h2>
            <p style={{ color: "#9895B0", fontSize: 14 }}>
              No risk. No commitment. See the quality first.
            </p>
          </div>

          <div
            className="entry-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {ENTRY_OFFERS.map((offer, i) => (
              <div key={i} className={`price-card ${offer.highlight ? "highlight" : ""}`}>
                <div style={{ marginBottom: 24 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: offer.highlight ? "rgba(245,240,232,0.6)" : "#9895B0",
                    }}
                  >
                    {offer.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#F5F0E8",
                      marginTop: 6,
                      marginBottom: 4,
                    }}
                  >
                    {offer.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: offer.highlight ? "rgba(245,240,232,0.7)" : "#D05B37",
                      marginBottom: 16,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    ⚡ {offer.delivery}
                  </p>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 52,
                        fontWeight: 900,
                        color: "#F5F0E8",
                        lineHeight: 1,
                      }}
                    >
                      ₹{offer.newPrice}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        textDecoration: "line-through",
                        marginLeft: 10,
                        color: offer.highlight ? "rgba(245,240,232,0.45)" : "#9895B0",
                      }}
                    >
                      ₹{offer.oldPrice}
                    </span>
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  {offer.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 14,
                        fontWeight: 500,
                        color: offer.highlight ? "#F5F0E8" : "#9895B0",
                      }}
                    >
                      <CheckCircle
                        size={16}
                        style={{
                          color: offer.highlight ? "#F5F0E8" : "#D05B37",
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Trust badges */}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 20,
                    paddingTop: 16,
                    borderTop: offer.highlight
                      ? "1px solid rgba(245,240,232,0.2)"
                      : "1px solid #2E2B45",
                  }}
                >
                  {["No contract", "No commitment", "Pay once"].map((badge) => (
                    <span key={badge} className="trust-badge">
                      <CheckCircle size={12} />
                      {badge}
                    </span>
                  ))}
                </div>

                {offer.highlight ? (
                  <button className="ghost-btn" onClick={() => openWhatsApp(offer.name)}>
                    <WhatsAppIcon size={16} />
                    {offer.button}
                  </button>
                ) : (
                  <button className="fire-btn" onClick={() => openWhatsApp(offer.name)}>
                    <WhatsAppIcon size={16} />
                    {offer.button}
                  </button>
                )}

                {i === 0 && (
                  <p
                    style={{
                      fontSize: 11,
                      color: "#9895B0",
                      textAlign: "center",
                      marginTop: 12,
                      fontStyle: "italic",
                    }}
                  >
                    No signup. No hassle. Just WhatsApp & get your design.
                  </p>
                )}
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#6B6884",
              fontSize: 13,
              marginTop: 24,
              fontStyle: "italic",
            }}
          >
            Most customers start with ₹99 and upgrade to monthly after seeing the quality.
          </p>
        </div>
      </section>

      {/* ── CONTENT STARTER PACK ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              background: "#1A1830",
              border: "1px solid #2E2B45",
              borderRadius: 24,
              padding: "36px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#D05B37",
                }}
              >
                NEED MULTIPLE POSTS?
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#F5F0E8",
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                Content Starter Pack
              </h3>
              <p style={{ color: "#9895B0", fontSize: 14, lineHeight: 1.7 }}>
                Stay active for the whole week — sorted in one order.
                Better value than single orders, no subscription needed.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#F5F0E8",
                    lineHeight: 1,
                  }}
                >
                  ₹499
                </div>
                <div style={{ color: "#9895B0", fontSize: 13, marginTop: 4 }}>
                  5 posts/designs · one-time
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["5 posts/designs included", "Mix of templates + custom", "Delivered within hours", "Valid for 30 days"].map(
                  (f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        color: "#9895B0",
                      }}
                    >
                      <CheckCircle size={14} style={{ color: "#D05B37", flexShrink: 0 }} />
                      {f}
                    </div>
                  )
                )}
              </div>
              <button
                className="fire-btn"
                style={{ width: "auto", padding: "14px 28px", whiteSpace: "nowrap" }}
                onClick={() => openWhatsApp("Content Starter Pack ₹499")}
              >
                <WhatsAppIcon size={16} />
                Get 5 Designs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONTHLY PLANS ── */}
      <section style={{ padding: "80px max(24px,5vw)", background: "#0C0A1E" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span className="fire-tag">MONTHLY PLANS</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 900,
                marginTop: 16,
                marginBottom: 10,
              }}
            >
              We handle your{" "}
              <span style={{ color: "#D05B37" }}>business content</span>
            </h2>
            <p style={{ color: "#9895B0", fontSize: 15, maxWidth: 480, margin: "0 auto 8px" }}>
              Stay active. Stay visible. Get more customers — consistently.
            </p>
            <p style={{ color: "#6B6884", fontSize: 13, fontStyle: "italic" }}>
              You don't need to send content daily — we handle most of it.
            </p>
          </div>

          {/* Founder pricing banner */}
          <div
            style={{
              background: "rgba(208,91,55,0.1)",
              border: "1px solid rgba(208,91,55,0.3)",
              borderRadius: 14,
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              maxWidth: 600,
              margin: "32px auto 48px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Zap size={16} style={{ color: "#D05B37", flexShrink: 0 }} />
            <p style={{ color: "#E87A57", fontSize: 13, fontWeight: 700, margin: 0 }}>
              Founder Pricing — Limited to first 50 businesses. Price will increase after.
              Lock in your rate for 12 months.
            </p>
          </div>

          <div
            className="plans-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
              alignItems: "start",
            }}
          >
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.highlight ? "highlight" : ""}`}>
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#D05B37",
                      color: "#F5F0E8",
                      padding: "5px 18px",
                      borderRadius: 100,
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⭐ Most Popular
                  </div>
                )}

                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 26,
                      fontWeight: 900,
                      color: "#F5F0E8",
                      marginBottom: 8,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#9895B0",
                      marginBottom: 20,
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 48,
                        fontWeight: 900,
                        color: "#F5F0E8",
                        lineHeight: 1,
                      }}
                    >
                      ₹{plan.newPrice}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#9895B0",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{plan.oldPrice}
                      </div>
                      <div style={{ fontSize: 12, color: "#9895B0" }}>/month</div>
                    </div>
                  </div>
                  {plan.anchor && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#D05B37",
                        fontWeight: 700,
                        marginTop: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {plan.anchor}
                    </p>
                  )}
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginBottom: plan.noEffort ? 16 : 28,
                    flex: plan.noEffort ? 0 : 1,
                    paddingTop: 20,
                    borderTop: "1px solid #2E2B45",
                  }}
                >
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#9895B0",
                      }}
                    >
                      <CheckCircle size={16} style={{ color: "#D05B37", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.noEffort && (
                  <div
                    style={{
                      background: "rgba(208,91,55,0.08)",
                      border: "1px solid rgba(208,91,55,0.2)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      marginBottom: 28,
                      flex: 1,
                    }}
                  >
                    {plan.noEffort.map((line) => (
                      <div
                        key={line}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: "#E87A57",
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        <X size={12} style={{ color: "#9895B0", flexShrink: 0 }} />
                        {line}
                      </div>
                    ))}
                  </div>
                )}

                {plan.highlight ? (
                  <button className="fire-btn" onClick={() => openWhatsApp(plan.name)}>
                    <WhatsAppIcon size={16} />
                    {plan.button}
                  </button>
                ) : (
                  <button className="slate-btn" onClick={() => openWhatsApp(plan.name)}>
                    <WhatsAppIcon size={16} />
                    {plan.button}
                  </button>
                )}

                {i === 2 && (
                  <p
                    style={{
                      fontSize: 11,
                      color: "#6B6884",
                      textAlign: "center",
                      marginTop: 12,
                      fontStyle: "italic",
                    }}
                  >
                    Higher-volume plans available for growing brands
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIRING VS POSTERBABU ── */}
      <section style={{ padding: "80px max(24px,5vw)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="fire-tag">THE MATH</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(24px,3.5vw,38px)",
                fontWeight: 900,
                marginTop: 16,
              }}
            >
              Hiring a designer vs{" "}
              <span style={{ color: "#D05B37" }}>PosterBabu</span>
            </h2>
          </div>
          <div
            style={{
              background: "#1A1830",
              border: "1px solid #2E2B45",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: "#0C0A1E",
                borderBottom: "1px solid #2E2B45",
              }}
            >
              {["", "In-house Designer", "PosterBabu"].map((h, i) => (
                <div
                  key={i}
                  className="compare-cell"
                  style={{
                    fontWeight: 800,
                    fontSize: 13,
                    color: i === 2 ? "#D05B37" : "#F5F0E8",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {[
              ["Monthly cost", "₹15,000+/month", "₹2,499/month"],
              ["Turnaround", "Days of back-and-forth", "Hours"],
              ["Festival creatives", "Extra work", "Included"],
              ["Contract", "Salary + notice period", "Cancel anytime"],
              ["Getting started", "Hire, train, onboard", "WhatsApp us today"],
            ].map(([label, bad, good], i) => (
              <div
                key={i}
                className="compare-row"
                style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
              >
                <div className="compare-cell" style={{ color: "#9895B0", fontWeight: 600 }}>
                  {label}
                </div>
                <div className="compare-cell" style={{ color: "#6B6884" }}>
                  {bad}
                </div>
                <div
                  className="compare-cell"
                  style={{ color: "#D05B37", fontWeight: 700 }}
                >
                  {good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL EXAMPLE ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              background: "#1A1830",
              border: "1px solid #2E2B45",
              borderRadius: 20,
              padding: "36px 40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 200,
                height: "100%",
                background: "rgba(208,91,55,0.04)",
                clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#D05B37",
              }}
            >
              REAL EXAMPLE
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#F5F0E8",
                marginTop: 10,
                marginBottom: 12,
              }}
            >
              How a local salon uses PosterBabu
            </h3>
            <p style={{ color: "#9895B0", fontSize: 15, lineHeight: 1.8, maxWidth: 580 }}>
              A salon in our city posts 4 times a week — offers, festival creatives, and service
              highlights. Their customers see them regularly on WhatsApp and Instagram. New walk-ins
              mention they found them online. They spend ₹2,499/month. They don't think about content at all.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY BUSINESSES CHOOSE US ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px", background: "#0C0A1E", paddingTop: 80 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <span className="fire-tag">WHY POSTERBABU</span>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(24px,3.5vw,38px)",
              fontWeight: 900,
              marginTop: 16,
              marginBottom: 48,
            }}
          >
            Why local businesses choose us
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
            }}
          >
            {[
              { icon: "🚫", title: "No hiring headache", desc: "No salary. No training. No notice period." },
              { icon: "🎨", title: "No design skills needed", desc: "Just tell us what you want. We handle everything." },
              { icon: "⚡", title: "Fast delivery", desc: "Most posts/designs delivered within hours, not days." },
              { icon: "💰", title: "Affordable & consistent", desc: "Less than your monthly electricity bill." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1A1830",
                  border: "1px solid #2E2B45",
                  borderRadius: 20,
                  padding: "28px 24px",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 17,
                    fontWeight: 900,
                    color: "#F5F0E8",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ color: "#9895B0", fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px max(24px,5vw)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="fire-tag">FAQ</span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,42px)",
                fontWeight: 900,
                marginTop: 16,
              }}
            >
              Questions you probably have
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
                      color: "#D05B37",
                      flexShrink: 0,
                      marginLeft: 16,
                      transition: "transform 0.25s",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "#9895B0",
                      lineHeight: 1.8,
                      borderTop: "1px solid #2E2B45",
                      paddingTop: 16,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          padding: "80px max(24px,5vw)",
          background: "#0C0A1E",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            Ready to try?{" "}
            <span style={{ color: "#D05B37" }}>Your first design is just ₹99.</span>
          </h2>
          <p style={{ color: "#9895B0", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Try one design. If you love it, upgrade anytime and let us handle your content completely.
          </p>
          <button
            onClick={() => openWhatsApp("Fast Edit ₹99")}
            style={{
              background: "#D05B37",
              color: "#F5F0E8",
              border: "none",
              padding: "16px 40px",
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <WhatsAppIcon size={20} />
            Try My First Design — ₹99
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            {["No signup needed", "No commitment", "Just WhatsApp us"].map((b) => (
              <span key={b} className="trust-badge">
                <CheckCircle size={12} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
