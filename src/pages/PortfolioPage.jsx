import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { BeforeAfterSlider } from "../NoDBFeatures";

const PORTFOLIO_ITEMS = [
  { id: 1,  cat: "Salon",    title: "Glow Salon Opening",         img: "/templates/salon-opening.png" },
  { id: 2,  cat: "Salon",    title: "Bridal Makeup Pack",         img: "/templates/salon-makeup.png" },
  { id: 3,  cat: "Gym",      title: "Iron Fitness 50% Off",       img: "/templates/gym-offer.png" },
  { id: 4,  cat: "Gym",      title: "New Year Membership Offer",  img: "/templates/gym-membership.png" },
  { id: 5,  cat: "Cafe",     title: "Catering Service",           img: "/templates/catering-service.png" },
  { id: 6,  cat: "Cafe",     title: "Sweets Menu",                img: "/templates/sweets-menu.png" },
  { id: 7,  cat: "Retail",   title: "Kirana Big Sale",            img: "/templates/kirana-sale.png" },
  { id: 8,  cat: "Retail",   title: "Electronics Dhamaka",        img: "/templates/retail-sale.png" },
  { id: 9,  cat: "Coaching", title: "Maths Admission Open",       img: "/templates/coaching-admission.png" },
  { id: 10, cat: "Coaching", title: "English Speaking Classes",   img: "/templates/coaching-crashcourse.png" },
  { id: 11, cat: "Festival", title: "Holi Wishes",                img: "/templates/holi-wish.png" },
  { id: 12, cat: "Festival", title: "Diwali Sale Poster",         img: "/templates/diwali-sale.png" },
  { id: 13, cat: "Retail",   title: "Shyam Manufacturers Poster", img: "/templates/shyam_manufacturers.png" },
  { id: 14, cat: "Coaching", title: "Expert Classes Banner",      img: "/templates/expert_classes.jpg" },
  { id: 15, cat: "Festival", title: "Navratari Special",          img: "/templates/navratari.png" },
];

const CATEGORIES = ["All", "Salon", "Gym", "Cafe", "Retail", "Coaching", "Festival"];

const PortfolioPage = () => {
  const [filter, setFilter]   = useState("All");
  const [preview, setPreview] = useState(null);

  const filtered = filter === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(i => i.cat === filter);

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .pp-filter-btn{padding:8px 18px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:1px solid #2E2B45;background:transparent;color:#9895B0;transition:all 0.2s;}
        .pp-filter-btn:hover{border-color:rgba(208,91,55,0.4);color:#F5F0E8;}
        .pp-filter-btn.active{background:#D05B37;color:#F5F0E8;border-color:#D05B37;}
        .pp-grid-item{background:#1A1830;border:1px solid #2E2B45;border-radius:20px;padding:12px;cursor:pointer;transition:transform 0.3s,border-color 0.2s,box-shadow 0.3s;position:relative;}
        .pp-grid-item:hover{transform:translateY(-6px);border-color:rgba(208,91,55,0.4);box-shadow:0 20px 40px rgba(0,0,0,0.4);}
        .pp-grid-item img{width:100%;height:100%;object-fit:cover;border-radius:12px;display:block;transition:transform 0.5s;}
        .pp-grid-item:hover img{transform:scale(1.04);}
        .pp-fire-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(208,91,55,0.15);border:1px solid rgba(208,91,55,0.3);color:#E87A57;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
        @media(max-width:768px){.pp-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "72px max(24px,5vw) 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="pp-fire-tag">Our portfolio</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, margin: "18px 0 14px" }}>
            Real posters for <span style={{ color: "#D05B37" }}>real businesses</span>
          </h1>
          <div style={{ width: 40, height: 3, background: "#D05B37", borderRadius: 2, marginBottom: 20 }} />
          <p style={{ color: "#9895B0", fontSize: 17, lineHeight: 1.8, maxWidth: 520 }}>
            Every poster below was made for an actual local business. Browse and pick a style — we'll customise it for yours.
          </p>
          <div style={{ marginTop: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#D05B37" }}>🔥 All templates customised for just ₹49</span>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER SLIDER ── */}
      <BeforeAfterSlider
        beforeSrc="/templates/blank-poster.png"
        afterSrc="/templates/gym-offer.png"
        beforeLabel="Blank template"
        afterLabel="After — PosterBabu"
      />

      {/* ── FILTER + GRID ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40, justifyContent: "center" }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`pp-filter-btn ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >{c}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="pp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {filtered.map(item => (
              <div key={item.id} className="pp-grid-item" onClick={() => setPreview(item)}>
                {/* Price badge */}
                <div style={{ position: "absolute", top: 18, right: 18, background: "#D05B37", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#F5F0E8", zIndex: 2 }}>
                  🔥 ₹49
                </div>
                {/* Image */}
                <div style={{ aspectRatio: "3/4", borderRadius: 12, overflow: "hidden", marginBottom: 12, background: "#0C0A1E" }}>
                  <img src={item.img} alt={item.title} />
                </div>
                {/* Meta */}
                <div style={{ padding: "0 4px 4px" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#D05B37", display: "block", marginBottom: 4 }}>{item.cat}</span>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8", lineHeight: 1.4 }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW MODAL ── */}
      {preview && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(6,5,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 999, backdropFilter: "blur(6px)" }}
          onClick={() => setPreview(null)}
        >
          <div
            style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 24, padding: 28, maxWidth: 420, width: "100%", textAlign: "center" }}
            onClick={e => e.stopPropagation()}
          >
            <img src={preview.img} alt={preview.title} style={{ width: "100%", borderRadius: 16, marginBottom: 20, display: "block" }} />
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#D05B37" }}>{preview.cat}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F5F0E8", margin: "8px 0 20px" }}>{preview.title}</h3>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => window.open(`https://wa.me/917428091729?text=${encodeURIComponent(`Hello PosterBabu! I want a poster like "${preview.title}"`)}`)}
                style={{ background: "#22c55e", color: "#F5F0E8", border: "none", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", gap: 8 }}
              >
                <MessageCircle size={16} /> Order this poster
              </button>
              <button
                onClick={() => setPreview(null)}
                style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PortfolioPage;
