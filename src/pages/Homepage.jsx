import React from "react";
import { MessageCircle, Zap, CheckCircle, Star, Store, Tag, ArrowRight } from "lucide-react";
import { FestivalCalendar, WhatsAppTestimonials } from "../NoDBFeatures";

const ENTRY_OFFERS = [
  {
    name: "Fast Edit",
    oldPrice: 99,
    newPrice: 49,
    tagline: "Quick template edit",
    features: ["Edit existing poster", "Text or offer update", "Delivered fast"],
    button: "Edit My Poster",
  },
  {
    name: "Custom Poster",
    oldPrice: 299,
    newPrice: 149,
    tagline: "Built for your business",
    features: ["Custom poster design", "Instagram / WhatsApp size", "HD file delivery", "Delivered within an hour"],
    button: "Create My Poster",
    highlight: true,
  },
];

const GALLERY = [
  "/templates/salon-opening.png",
  "/templates/salon-makeup.png",
  "/templates/gym-offer.png",
  "/templates/gym-membership.png",
  "/templates/catering-service.png",
  "/templates/sweets-menu.png",
  "/templates/kirana-sale.png",
  "/templates/coaching-admission.png",
];

const openWhatsApp = (context = "") => {
  const msg = context
    ? `Hi PosterBabu! I'm interested in: ${context}.\n\nBusiness Name:\nDetails:`
    : "Hi PosterBabu! I want to order a poster for my business.";
  window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
};

const Homepage = ({ navigate }) => (
  <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
      *{box-sizing:border-box;}
      .hp-fire-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(208,91,55,0.15);border:1px solid rgba(208,91,55,0.3);color:#E87A57;padding:6px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
      .hp-btn-fire{background:#D05B37;color:#F5F0E8;border:none;padding:16px 32px;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:10px;transition:background 0.2s,transform 0.15s;}
      .hp-btn-fire:hover{background:#B84E2E;transform:translateY(-2px);}
      .hp-btn-ghost{background:transparent;color:#F5F0E8;border:1.5px solid #2E2B45;padding:15px 32px;border-radius:14px;font-size:16px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:10px;transition:border-color 0.2s;}
      .hp-btn-ghost:hover{border-color:#D05B37;}
      .hp-card{background:#1A1830;border:1px solid #2E2B45;border-radius:20px;padding:28px;transition:border-color 0.2s,transform 0.2s;}
      .hp-card:hover{border-color:rgba(208,91,55,0.5);transform:translateY(-4px);}
      .hp-gallery-item{border-radius:16px;overflow:hidden;aspect-ratio:3/4;background:#1A1830;position:relative;transition:transform 0.4s,box-shadow 0.4s;}
      .hp-gallery-item:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(208,91,55,0.2);}
      .hp-gallery-item img{width:100%;height:100%;object-fit:cover;display:block;}
      .hp-price-card{background:#1A1830;border:1px solid #2E2B45;border-radius:24px;padding:36px;display:flex;flex-direction:column;transition:border-color 0.2s,transform 0.2s;}
      .hp-price-card:hover{border-color:rgba(208,91,55,0.4);transform:translateY(-4px);}
      .hp-price-card.hl{background:#D05B37;border-color:#D05B37;}
      .hp-divline{width:40px;height:3px;background:#D05B37;border-radius:2px;margin:12px 0 20px;}
      @keyframes hp-float{0%,100%{transform:translateY(0px) rotate(2deg);}50%{transform:translateY(-10px) rotate(2deg);}}
      .hp-float{animation:hp-float 5s ease-in-out infinite;}
      @keyframes hp-fadeup{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
      .hp-f1{animation:hp-fadeup 0.7s ease both;}
      .hp-f2{animation:hp-fadeup 0.7s 0.15s ease both;}
      .hp-f3{animation:hp-fadeup 0.7s 0.3s ease both;}
      .hp-f4{animation:hp-fadeup 0.7s 0.45s ease both;}
      @media(max-width:768px){.hp-hero-img{display:none!important;}.hp-hero-row{flex-direction:column!important;}.hp-stats-row{flex-wrap:wrap!important;}.hp-pricing-row{flex-direction:column!important;}.hp-steps-row{flex-direction:column!important;}.hp-gallery-grid{grid-template-columns:repeat(2,1fr)!important;}.hp-what-grid{grid-template-columns:1fr!important;}}
    `}</style>

    {/* ── HERO ── */}
    <section style={{ padding: "80px max(24px,5vw) 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "15%", width: 400, height: 400, background: "radial-gradient(circle,rgba(208,91,55,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div className="hp-hero-row" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 80 }}>

        {/* Left */}
        <div style={{ flex: 1 }}>
          <div className="hp-fire-tag hp-f1"><Zap size={12} fill="currentColor" /> Fast Poster Design</div>
          <h1 className="hp-f2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, lineHeight: 1.1, margin: "20px 0 20px", color: "#F5F0E8" }}>
            Professional Posters<br />for Your Business,<br /><span style={{ color: "#D05B37" }}>Delivered Fast.</span>
          </h1>
          <p className="hp-f3" style={{ color: "#9895B0", fontSize: 18, lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
            Marketing creatives for salons, gyms, cafes, kirana stores — delivered via WhatsApp in minutes.
          </p>
          <div className="hp-f4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="hp-btn-fire" onClick={() => openWhatsApp("Poster Order")} style={{ fontSize: 17 }}>
              <MessageCircle size={18} /> Order on WhatsApp
            </button>
            <button className="hp-btn-ghost" onClick={() => navigate("pricing")}>
              View Pricing <ArrowRight size={16} />
            </button>
          </div>
          <div className="hp-f4" style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
            {["⚡ 10–30 min delivery", "★ 4.9 rating", "100+ posters done"].map(t => (
              <span key={t} style={{ fontSize: 13, color: "#9895B0", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div className="hp-hero-img" style={{ flex: "0 0 360px", position: "relative" }}>
          <div className="hp-float" style={{ background: "#1A1830", borderRadius: 32, border: "1px solid #2E2B45", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
            <img src="/templates/navratari.png" alt="Poster sample" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(6,5,23,0.88)", backdropFilter: "blur(8px)", borderRadius: 14, padding: "12px 16px", border: "1px solid #2E2B45" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#D05B37", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Navratri Special</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>Shyam Manufacturers</p>
            </div>
          </div>
          <div style={{ position: "absolute", top: -16, right: -16, background: "#D05B37", borderRadius: 16, padding: "12px 18px", boxShadow: "0 12px 32px rgba(208,91,55,0.4)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,0.7)", textTransform: "uppercase", letterSpacing: 1 }}>From</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>₹49</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section style={{ padding: "0 max(24px,5vw) 80px" }}>
      <div className="hp-stats-row" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 16 }}>
        {[
          { val: "347+", label: "Posters Delivered" },
          { val: "18 min", label: "Avg. Delivery" },
          { val: "4.9★", label: "Customer Rating" },
          { val: "₹49", label: "Starting Price", green: true },
        ].map(s => (
          <div key={s.label} className="hp-card" style={{ flex: 1, minWidth: 100, textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.green ? "#22c55e" : "#D05B37", fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#9895B0", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ── WHAT IS POSTERBABU ── */}
    <section style={{ padding: "80px max(24px,5vw)", background: "#0C0A1E" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <span className="hp-fire-tag">What we do</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginTop: 20, marginBottom: 12 }}>
            Marketing visuals for <span style={{ color: "#D05B37" }}>local India.</span>
          </h2>
          <div className="hp-divline" />
          <p style={{ color: "#9895B0", fontSize: 17, lineHeight: 1.8 }}>
            PosterBabu helps local businesses promote offers and services with professional marketing posters — without needing a designer or agency.
          </p>
        </div>
        <div className="hp-what-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            { icon: <Store size={22} />, title: "Local business focus", desc: "Built for salons, gyms, cafes, kirana stores, coaching centres — not big corporates." },
            { icon: <Zap size={22} />, title: "Fast delivery", desc: "Send a WhatsApp, get your poster back in 10–30 minutes. No back-and-forth." },
            { icon: <Tag size={22} />, title: "Affordable pricing", desc: "Professional designs starting at ₹49. No hidden fees, no subscriptions required." },
          ].map(c => (
            <div key={c.title} className="hp-card">
              <div style={{ width: 44, height: 44, background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.25)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#D05B37", marginBottom: 18 }}>{c.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8", marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "#9895B0", lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── GALLERY ── */}
    <section style={{ padding: "80px max(24px,5vw)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="hp-fire-tag">Our work</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, marginTop: 16 }}>Poster Gallery</h2>
            <div className="hp-divline" />
          </div>
          <button className="hp-btn-ghost" onClick={() => navigate("portfolio")}>View all <ArrowRight size={16} /></button>
        </div>
        <div className="hp-gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {GALLERY.map((img, i) => (
            <div key={i} className="hp-gallery-item">
              <img src={img} alt="Poster sample" />
              <div style={{ position: "absolute", top: 10, right: 10, background: "#D05B37", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#F5F0E8" }}>🔥 ₹49</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FESTIVAL CALENDAR ── */}
    <FestivalCalendar />

    {/* ── PRICING ── */}
    <section style={{ padding: "80px max(24px,5vw)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="hp-fire-tag">Pricing</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginTop: 20, marginBottom: 10 }}>
            Try PosterBabu <span style={{ color: "#D05B37" }}>today</span>
          </h2>
          <p style={{ color: "#9895B0", fontSize: 15 }}>No commitment. No contracts. Just great posters.</p>
        </div>
        <div className="hp-pricing-row" style={{ display: "flex", gap: 20 }}>
          {ENTRY_OFFERS.map((offer, i) => (
            <div key={i} className={`hp-price-card ${offer.highlight ? "hl" : ""}`} style={{ flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: offer.highlight ? "rgba(245,240,232,0.6)" : "#9895B0" }}>{offer.tagline}</span>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 900, color: "#F5F0E8", margin: "8px 0 16px" }}>{offer.name}</h3>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 900, color: "#F5F0E8" }}>₹{offer.newPrice}</span>
                <span style={{ fontSize: 18, color: offer.highlight ? "rgba(245,240,232,0.5)" : "#9895B0", textDecoration: "line-through", marginLeft: 10 }}>₹{offer.oldPrice}</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flex: 1 }}>
                {offer.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, color: offer.highlight ? "#F5F0E8" : "#9895B0" }}>
                    <CheckCircle size={16} style={{ color: offer.highlight ? "#F5F0E8" : "#D05B37", flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openWhatsApp(offer.name)}
                style={{ width: "100%", padding: 16, borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: offer.highlight ? "rgba(6,5,23,0.25)" : "#D05B37", color: "#F5F0E8", border: offer.highlight ? "1.5px solid rgba(245,240,232,0.3)" : "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >{offer.button}</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button onClick={() => navigate("pricing")} style={{ background: "none", border: "none", color: "#D05B37", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
            View all monthly plans →
          </button>
        </div>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section style={{ padding: "80px max(24px,5vw)", background: "#0C0A1E" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="hp-fire-tag">Simple process</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, margin: "20px 0 48px" }}>
          How PosterBabu <span style={{ color: "#D05B37" }}>works</span>
        </h2>
        <div className="hp-steps-row" style={{ display: "flex", gap: 24 }}>
          {[
            { num: "01", title: "WhatsApp us", desc: "Send your business name, what you want on the poster, and any details." },
            { num: "02", title: "We design", desc: "Our designer gets to work immediately and creates your poster in minutes." },
            { num: "03", title: "Receive & post", desc: "Get the HD file on WhatsApp — ready to post on Instagram or print." },
          ].map((s, i) => (
            <div key={i} className="hp-card" style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D05B37", fontWeight: 900, fontSize: 16, fontFamily: "'Playfair Display',serif", margin: "0 auto 18px" }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#9895B0", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <button className="hp-btn-fire" onClick={() => openWhatsApp()} style={{ fontSize: 17 }}>
            <MessageCircle size={18} /> Start on WhatsApp
          </button>
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <WhatsAppTestimonials />

    {/* ── CTA BANNER ── */}
    <section style={{ padding: "80px max(24px,5vw)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: "#D05B37", borderRadius: 28, padding: "64px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: -40, width: 280, height: 280, borderRadius: "50%", background: "rgba(6,5,23,0.12)", pointerEvents: "none" }} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#F5F0E8", marginBottom: 16, position: "relative" }}>
            Ready to promote your business?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(245,240,232,0.75)", marginBottom: 36, position: "relative" }}>Get your first poster in under 30 minutes.</p>
          <button
            onClick={() => navigate("order")}
            style={{ background: "#060517", color: "#F5F0E8", border: "none", padding: "18px 40px", borderRadius: 14, fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", position: "relative", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Order Now — Starting ₹49
          </button>
        </div>
      </div>
    </section>

  </div>
);

export default Homepage;
