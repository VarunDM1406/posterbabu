import React, { useState } from "react";
import { Store, Instagram, Zap, Printer, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const openWhatsApp = (service = "") => {
  const msg = service ? `Hi PosterBabu! I need help with: ${service}.` : "Hi PosterBabu! I want to order a poster.";
  window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
};

const ServicesPage = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);

  const SERVICE_CATEGORIES = [
    { id: "shop",     title: t("svcCat1Title"), desc: t("svcCat1Desc"), icon: <Store />,     color: "#D05B37", items: ["Grand Opening Banners", "Flash Sale Flyers", "Product Price Lists"] },
    { id: "social",   title: t("svcCat2Title"), desc: t("svcCat2Desc"), icon: <Instagram />, color: "#7C3AED", items: ["Daily Status Updates", "Engagement Posts", "Festival Wishes"] },
    { id: "business", title: t("svcCat3Title"), desc: t("svcCat3Desc"), icon: <Zap />,       color: "#0891B2", items: ["Admission Flyers", "Menu Posters", "Service Catalogues"] },
    { id: "print",    title: t("svcCat4Title"), desc: t("svcCat4Desc"), icon: <Printer />,   color: "#059669", items: ["HD Banners", "Visiting Cards", "Pamphlets"] },
  ];

  const PROCESS_STEPS = [
    { num: "01", title: t("svcStep1Title"), desc: t("svcStep1Desc") },
    { num: "02", title: t("svcStep2Title"), desc: t("svcStep2Desc") },
    { num: "03", title: t("svcStep3Title"), desc: t("svcStep3Desc") },
  ];

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .svc-card{background:#1A1830;border:1px solid #2E2B45;border-radius:24px;padding:32px;cursor:pointer;transition:border-color 0.2s,transform 0.2s;}
        .svc-card:hover,.svc-card.active{border-color:rgba(208,91,55,0.6);transform:translateY(-4px);}
        .svc-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(208,91,55,0.15);border:1px solid rgba(208,91,55,0.3);color:#E87A57;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
        .fire-btn{background:#D05B37;color:#F5F0E8;border:none;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:10px;transition:background 0.2s,transform 0.15s;}
        .fire-btn:hover{background:#B84E2E;transform:translateY(-2px);}
        .ghost-btn{background:transparent;color:#F5F0E8;border:1.5px solid #2E2B45;padding:13px 28px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:10px;transition:border-color 0.2s;}
        .ghost-btn:hover{border-color:#D05B37;}
        .pill{background:rgba(208,91,55,0.1);border:1px solid rgba(208,91,55,0.2);color:#E87A57;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700;}
        .step-card{background:#1A1830;border:1px solid #2E2B45;border-radius:20px;padding:28px;flex:1;}
        .divline{width:40px;height:3px;background:#D05B37;border-radius:2px;margin:12px 0 20px;}
        @media(max-width:768px){.services-grid{grid-template-columns:1fr!important;}.process-row{flex-direction:column!important;}.cta-row{flex-direction:column!important;text-align:center!important;}}
      `}</style>

      <section style={{ padding: "72px max(24px,5vw) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: "10%", width: 360, height: 360, background: "radial-gradient(circle,rgba(208,91,55,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="svc-tag">{t("svcTag")}</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, lineHeight: 1.1, marginTop: 20, marginBottom: 20, maxWidth: 700 }}>
            {t("svcTitle")} <span style={{ color: "#D05B37" }}>{t("svcTitleHL")}</span>
          </h1>
          <div className="divline" />
          <p style={{ color: "#9895B0", fontSize: 18, lineHeight: 1.8, maxWidth: 560, marginBottom: 36 }}>{t("svcSub")}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="fire-btn" onClick={() => openWhatsApp()}><MessageCircle size={18} /> {t("svcOrderBtn")}</button>
            <button className="ghost-btn" onClick={() => openWhatsApp()}>{t("svcViewPricing")} <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.id} className={`svc-card ${activeId === cat.id ? "active" : ""}`} onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${cat.color}22`, border: `1px solid ${cat.color}44`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color, flexShrink: 0 }}>
                    {React.cloneElement(cat.icon, { size: 24 })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F5F0E8", marginBottom: 8 }}>{cat.title}</h3>
                    <p style={{ color: "#9895B0", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{cat.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{cat.items.map(item => <span key={item} className="pill">{item}</span>)}</div>
                  </div>
                </div>
                {activeId === cat.id && (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #2E2B45", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "#9895B0" }}>{t("svcStartingFrom")} <strong style={{ color: "#D05B37" }}>₹99</strong></span>
                    <button className="fire-btn" style={{ padding: "10px 20px", fontSize: 13 }} onClick={(e) => { e.stopPropagation(); openWhatsApp(cat.title); }}>
                      <MessageCircle size={15} /> {t("svcOrderThis")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "#9895B0", fontSize: 13, marginTop: 20 }}>{t("svcClickHint")}</p>
        </div>
      </section>

      <section style={{ padding: "80px max(24px,5vw)", background: "#0C0A1E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span className="svc-tag">{t("svcHowTag")}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, marginTop: 16 }}>
              {t("svcHowTitle")} <span style={{ color: "#D05B37" }}>{t("svcHowTitleHL")}</span>
            </h2>
            <div className="divline" />
          </div>
          <div className="process-row" style={{ display: "flex", gap: 20 }}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={i} className="step-card">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D05B37", fontWeight: 900, fontSize: 16, fontFamily: "'Playfair Display',serif", marginBottom: 18 }}>{s.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#9895B0", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px max(24px,5vw)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="svc-tag">{t("svcWhoTag")}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, marginTop: 16 }}>
              {t("svcWhoTitle")} <span style={{ color: "#D05B37" }}>{t("svcWhoTitleHL")}</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14 }}>
            {[{ emoji: "💇", label: "Salons" },{ emoji: "🏋️", label: "Gyms" },{ emoji: "☕", label: "Cafes" },{ emoji: "🛒", label: "Kirana Stores" },{ emoji: "📚", label: "Coaching Centers" },{ emoji: "🍽️", label: "Restaurants" },{ emoji: "👗", label: "Boutiques" },{ emoji: "🏥", label: "Clinics" }].map(b => (
              <div key={b.label} style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 16, padding: "20px 16px", textAlign: "center", transition: "border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(208,91,55,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2E2B45"; e.currentTarget.style.transform = ""; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{b.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "#D05B37", borderRadius: 28, padding: "56px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
            <div className="cta-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, position: "relative" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, color: "#F5F0E8", marginBottom: 10 }}>{t("svcCtaTitle")}</h2>
                <p style={{ color: "rgba(245,240,232,0.75)", fontSize: 16 }}>{t("svcCtaSub")}</p>
              </div>
              <button onClick={() => openWhatsApp()} style={{ background: "#060517", color: "#F5F0E8", border: "none", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap", transition: "transform 0.2s", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                <MessageCircle size={18} /> {t("svcCtaBtn")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
