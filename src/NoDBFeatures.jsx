import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight, Globe } from "lucide-react";

// ── SHARED STYLES (inject once in your app's global CSS or _app.jsx) ──────────
// Colors: Chilean Fire #D05B37 | Mystic Black #060517 | Ash #1A1830 | Smoke #2E2B45 | Mist #9895B0 | Cream #F5F0E8

const openWhatsApp = (msg = "") => {
  const text = msg || "Hi PosterBabu! I want to order a poster.";
  window.open(`https://wa.me/917428091729?text=${encodeURIComponent(text)}`, "_blank");
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. LIVE TRUST BAR
//    Place right below the navbar on Homepage.
//    Numbers animate up on mount. "Orders today" slowly ticks every ~40s.
// ─────────────────────────────────────────────────────────────────────────────
export function TrustBar() {
  const [ordersToday, setOrdersToday] = useState(0);
  const [totalPosters, setTotalPosters] = useState(0);

  // Animate count up
  function animateTo(setter, target, duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start = Math.min(start + step, target);
      setter(Math.round(start));
      if (start >= target) clearInterval(t);
    }, 16);
  }

  useEffect(() => {
    animateTo(setOrdersToday, 7, 1200);
    animateTo(setTotalPosters, 347, 1800);

    // Simulate a new order trickling in every ~40 seconds
    const ticker = setInterval(() => {
      setOrdersToday((n) => n + 1);
      setTotalPosters((n) => n + 1);
    }, 40000);
    return () => clearInterval(ticker);
  }, []);

  const stats = [
    { value: ordersToday, suffix: "", label: "Orders today", live: true, color: "#D05B37" },
    { value: "18", suffix: " min", label: "Avg. delivery", live: false, color: "#D05B37" },
    { value: totalPosters, suffix: "+", label: "Posters delivered", live: false, color: "#D05B37" },
    { value: "4.9", suffix: "★", label: "Customer rating", live: false, color: "#D05B37" },
    { value: "₹49", suffix: "", label: "Starting price", live: false, color: "#22c55e" },
  ];

  return (
    <div style={{
      background: "#0C0A1E",
      borderBottom: "1px solid #2E2B45",
      padding: "12px max(24px, 5vw)",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {stats.map((s, i) => (
          <React.Fragment key={s.label}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {s.live && (
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                  display: "inline-block",
                  animation: "pb-pulse 1.4s ease-in-out infinite",
                }} />
              )}
              <span style={{
                fontSize: 18,
                fontWeight: 900,
                color: s.color,
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.5px",
              }}>
                {typeof s.value === "number" ? s.value : s.value}{s.suffix}
              </span>
              <span style={{ fontSize: 12, color: "#9895B0", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                {s.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div style={{ width: 1, height: 24, background: "#2E2B45" }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <style>{`@keyframes pb-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. FESTIVAL CALENDAR
//    Add to Homepage after the gallery section.
//    Dates are hardcoded — update once a year.
// ─────────────────────────────────────────────────────────────────────────────
const FESTIVALS_2026 = [
  { name: "Holi",           date: new Date("2026-03-29"), emoji: "🎨" },
  { name: "Eid-ul-Fitr",   date: new Date("2026-03-31"), emoji: "🌙" },
  { name: "Baisakhi",      date: new Date("2026-04-14"), emoji: "🌾" },
  { name: "Eid-ul-Adha",   date: new Date("2026-06-17"), emoji: "🐑" },
  { name: "Independence Day", date: new Date("2026-08-15"), emoji: "🇮🇳" },
  { name: "Ganesh Chaturthi", date: new Date("2026-08-22"), emoji: "🐘" },
  { name: "Navratri",      date: new Date("2026-10-09"), emoji: "🪔" },
  { name: "Dussehra",      date: new Date("2026-10-19"), emoji: "🏹" },
  { name: "Diwali",        date: new Date("2026-10-30"), emoji: "✨" },
  { name: "Christmas",     date: new Date("2026-12-25"), emoji: "🎄" },
];

export function FestivalCalendar() {
  const today = new Date();

  const upcoming = FESTIVALS_2026
    .map((f) => ({ ...f, daysLeft: Math.ceil((f.date - today) / 86400000) }))
    .filter((f) => f.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  return (
    <section style={{ padding: "80px max(24px, 5vw)", background: "#0C0A1E" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)",
              color: "#E87A57", padding: "5px 12px", borderRadius: 100,
              fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
            }}>
              🗓 Festival calendar
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, color: "#F5F0E8", marginTop: 16 }}>
              Upcoming festivals — <span style={{ color: "#D05B37" }}>order early</span>
            </h2>
            <div style={{ width: 40, height: 3, background: "#D05B37", borderRadius: 2, margin: "12px 0 0" }} />
          </div>
          <p style={{ color: "#9895B0", fontSize: 14, maxWidth: 260 }}>
            Every festival is a chance to promote your business. Don't miss out.
          </p>
        </div>

        {/* Festival cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {upcoming.map((f) => {
            const isUrgent = f.daysLeft <= 14;
            const isToday  = f.daysLeft === 0;
            return (
              <div key={f.name} style={{
                display: "flex", alignItems: "center", gap: 20,
                background: "#1A1830",
                border: `1px solid ${isUrgent ? "rgba(208,91,55,0.5)" : "#2E2B45"}`,
                borderRadius: 16, padding: "16px 20px",
                transition: "transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >
                {/* Emoji + date */}
                <div style={{ fontSize: 28, lineHeight: 1, minWidth: 40, textAlign: "center" }}>{f.emoji}</div>
                <div style={{ minWidth: 52 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                    {f.date.getDate()}
                  </div>
                  <div style={{ fontSize: 11, color: "#9895B0", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                    {f.date.toLocaleString("en-IN", { month: "short" })}
                  </div>
                </div>

                {/* Name + days */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F5F0E8" }}>{f.name}</div>
                  <div style={{ fontSize: 13, marginTop: 3, color: isUrgent ? "#E87A57" : "#9895B0" }}>
                    {isToday ? "Today!" : `${f.daysLeft} days away${isUrgent ? " — order now!" : ""}`}
                  </div>
                </div>

                {/* Badge */}
                {isUrgent && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, background: "#D05B37", color: "#F5F0E8",
                    padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.8px",
                  }}>
                    {isToday ? "Today!" : "Urgent"}
                  </span>
                )}

                {/* Order button */}
                <button
                  onClick={() => openWhatsApp(`Hi PosterBabu! I want a ${f.name} poster for my business.`)}
                  style={{
                    background: isUrgent ? "#D05B37" : "transparent",
                    color: "#F5F0E8",
                    border: isUrgent ? "none" : "1px solid #2E2B45",
                    padding: "10px 18px", borderRadius: 10,
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => !isUrgent && (e.currentTarget.style.borderColor = "#D05B37")}
                  onMouseLeave={e => !isUrgent && (e.currentTarget.style.borderColor = "#2E2B45")}
                >
                  Order poster
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BEFORE / AFTER SLIDER
//    Drop anywhere in Portfolio or Homepage.
//    Props: beforeSrc, afterSrc, beforeLabel, afterLabel
// ─────────────────────────────────────────────────────────────────────────────
export function BeforeAfterSlider({
  beforeSrc = "/templates/blank-poster.png",
  afterSrc  = "/templates/gym-offer.png",
  beforeLabel = "Before",
  afterLabel  = "After — PosterBabu",
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  const onMouseMove = (e) => { if (dragging) updatePos(e.clientX); };
  const onTouchMove = (e) => updatePos(e.touches[0].clientX);

  return (
    <section style={{ padding: "80px max(24px, 5vw)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{
            display: "inline-block",
            background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)",
            color: "#E87A57", padding: "5px 12px", borderRadius: 100,
            fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
          }}>The transformation</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, color: "#F5F0E8", marginTop: 16 }}>
            Drag to see the <span style={{ color: "#D05B37" }}>difference</span>
          </h2>
        </div>

        {/* Slider container */}
        <div
          ref={containerRef}
          style={{
            position: "relative", aspectRatio: "4/3", borderRadius: 24,
            overflow: "hidden", cursor: "ew-resize", userSelect: "none",
            border: "1px solid #2E2B45",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* AFTER (full width, behind) */}
          <img src={afterSrc} alt="After" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

          {/* BEFORE (clipped) */}
          <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={beforeSrc} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Divider line */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: `${pos}%`,
            width: 2, background: "#D05B37", transform: "translateX(-50%)",
          }}>
            {/* Handle */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44, height: 44, borderRadius: "50%",
              background: "#D05B37",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(208,91,55,0.5)",
            }}>
              <span style={{ color: "#F5F0E8", fontSize: 18, letterSpacing: -2, fontWeight: 900 }}>⇔</span>
            </div>
          </div>

          {/* Labels */}
          <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(6,5,23,0.75)", backdropFilter: "blur(6px)", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#9895B0" }}>
            {beforeLabel}
          </div>
          <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(208,91,55,0.85)", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#F5F0E8" }}>
            {afterLabel}
          </div>
        </div>

        {/* CTA below */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button
            onClick={() => openWhatsApp("I want a custom poster for my business")}
            style={{
              background: "#D05B37", color: "#F5F0E8", border: "none",
              padding: "14px 32px", borderRadius: 14, fontSize: 16, fontWeight: 700,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}
          >
            <MessageCircle size={18} /> Get this for my business
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. LIVE DELIVERY TIMER  (Order page)
//    Shows on the OrderPage after form submission.
//    Starts counting from 0 to give the customer a sense of urgency.
//    Props: startedAt — pass Date.now() when order is submitted
// ─────────────────────────────────────────────────────────────────────────────
export function DeliveryTimer({ startedAt }) {
  const [elapsed, setElapsed] = useState(0);
  const TARGET_MINUTES = 20;

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [startedAt]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const progress = Math.min((elapsed / (TARGET_MINUTES * 60)) * 100, 100);
  const isDone = progress >= 100;

  return (
    <div style={{
      background: "#1A1830", border: `1px solid ${isDone ? "#22c55e" : "rgba(208,91,55,0.4)"}`,
      borderRadius: 20, padding: 28, textAlign: "center", marginTop: 24,
    }}>
      <p style={{ fontSize: 12, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
        {isDone ? "✅ Your poster should be ready!" : "⏱ Designer is working on your poster"}
      </p>

      {/* Big timer */}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: isDone ? "#22c55e" : "#D05B37", letterSpacing: -2, lineHeight: 1 }}>
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
      <p style={{ color: "#9895B0", fontSize: 13, margin: "8px 0 20px" }}>
        {isDone ? "Check your WhatsApp!" : `Target: ${TARGET_MINUTES} minutes`}
      </p>

      {/* Progress bar */}
      <div style={{ background: "#2E2B45", borderRadius: 100, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100,
          background: isDone ? "#22c55e" : "#D05B37",
          width: `${progress}%`,
          transition: "width 1s linear",
        }} />
      </div>

      {/* Nudge */}
      {!isDone && (
        <p style={{ color: "#9895B0", fontSize: 12, marginTop: 16 }}>
          Haven't heard from us?{" "}
          <span
            style={{ color: "#D05B37", cursor: "pointer", fontWeight: 700 }}
            onClick={() => openWhatsApp("Hi! I placed an order and checking on the status.")}
          >
            Ping us on WhatsApp →
          </span>
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HINDI LANGUAGE TOGGLE
//    Wrap your page in <LanguageProvider> and use useLanguage() hook.
//    Then replace hardcoded strings with t("key").
// ─────────────────────────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    heroHeading:   "Professional Posters for Your Business,",
    heroHighlight: "Delivered Fast.",
    heroSubtitle:  "Marketing creatives for salons, gyms, cafes, kirana stores — delivered via WhatsApp in minutes.",
    orderBtn:      "Order on WhatsApp",
    viewPricing:   "View Pricing",
    deliveredStat: "Posters Delivered",
    avgDelivery:   "Avg. Delivery",
    rating:        "Customer Rating",
    startingPrice: "Starting Price",
    ordersToday:   "Orders Today",
    portfolioTitle:"Poster Gallery",
    portfolioSub:  "Examples created for real businesses",
    pricingTitle:  "Try PosterBabu today",
    pricingSub:    "No commitment. No contracts. Just great posters.",
    ctaHeading:    "Ready to promote your business?",
    ctaSub:        "Get your first poster in under 30 minutes.",
    ctaBtn:        "Order Now — Starting ₹49",
  },
  hi: {
    heroHeading:   "अपने बिज़नेस के लिए प्रोफेशनल पोस्टर,",
    heroHighlight: "तुरंत डिलीवर।",
    heroSubtitle:  "सैलून, जिम, कैफे, किराना स्टोर — WhatsApp पर मिनटों में पोस्टर पाएं।",
    orderBtn:      "WhatsApp पर ऑर्डर करें",
    viewPricing:   "प्राइसिंग देखें",
    deliveredStat: "पोस्टर डिलीवर",
    avgDelivery:   "औसत डिलीवरी",
    rating:        "ग्राहक रेटिंग",
    startingPrice: "शुरुआती कीमत",
    ordersToday:   "आज के ऑर्डर",
    portfolioTitle:"पोस्टर गैलरी",
    portfolioSub:  "असली बिज़नेस के लिए बनाए गए पोस्टर",
    pricingTitle:  "PosterBabu आज़माएं",
    pricingSub:    "कोई कमिटमेंट नहीं। सिर्फ बेहतरीन पोस्टर।",
    ctaHeading:    "अपने बिज़नेस को प्रमोट करने के लिए तैयार हैं?",
    ctaSub:        "30 मिनट में पहला पोस्टर पाएं।",
    ctaBtn:        "अभी ऑर्डर करें — सिर्फ ₹49 से",
  },
};

const LanguageContext = React.createContext({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
}

// The toggle button itself — place in Navbar
export function LangToggle() {
  const { lang, setLang } = useLanguage();
  const isHindi = lang === "hi";

  return (
    <button
      onClick={() => setLang(isHindi ? "en" : "hi")}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(208,91,55,0.12)", border: "1px solid rgba(208,91,55,0.3)",
        borderRadius: 100, padding: "6px 14px",
        color: "#E87A57", fontSize: 13, fontWeight: 700,
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(208,91,55,0.22)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(208,91,55,0.12)"}
    >
      <Globe size={14} />
      {isHindi ? "English" : "हिंदी"}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. WHATSAPP SCREENSHOT TESTIMONIALS
//    Drop in place of the current text-only testimonials.
//    Pass real screenshot images as props, OR use the fallback card design.
// ─────────────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    biz: "Iron Fitness Gym, Delhi",
    text: "Yaar poster 10 minute mein aa gaya! Ekdum mast design. Highly recommended 🔥",
    rating: 5,
    initial: "RV",
    screenshotSrc: null, // Replace with "/screenshots/rahul-review.jpg" if you have it
  },
  {
    name: "Sushma Patel",
    biz: "Glow Salon, Surat",
    text: "Ek WhatsApp message kiya aur itna accha poster mila. Bahut fast service hai!",
    rating: 5,
    initial: "SP",
    screenshotSrc: null,
  },
  {
    name: "Amit Sharma",
    biz: "Sharma Dhaba, Jaipur",
    text: "₹149 mein itna professional poster? Koi agency itna sasta nahi deti. Superb!",
    rating: 5,
    initial: "AS",
    screenshotSrc: null,
  },
];

export function WhatsAppTestimonials() {
  return (
    <section style={{ padding: "80px max(24px, 5vw)", background: "#0C0A1E" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-block",
            background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)",
            color: "#E87A57", padding: "5px 12px", borderRadius: 100,
            fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
          }}>Real reviews</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, color: "#F5F0E8", marginTop: 16 }}>
            What clients <span style={{ color: "#D05B37" }}>actually said</span>
          </h2>
          <div style={{ width: 40, height: 3, background: "#D05B37", borderRadius: 2, margin: "12px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name}>
              {t.screenshotSrc ? (
                // Real screenshot — just show image
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #2E2B45" }}>
                  <img src={t.screenshotSrc} alt={`Review by ${t.name}`} style={{ width: "100%", display: "block" }} />
                </div>
              ) : (
                // Fallback: WhatsApp-style chat bubble card
                <div style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 20, padding: 24 }}>
                  {/* WhatsApp header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid #2E2B45" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(208,91,55,0.2)", border: "1px solid rgba(208,91,55,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 800, color: "#D05B37",
                    }}>{t.initial}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#9895B0" }}>{t.biz}</div>
                    </div>
                    {/* WhatsApp icon */}
                    <div style={{ marginLeft: "auto", width: 28, height: 28, background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MessageCircle size={14} color="white" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} style={{ color: "#D05B37", fontSize: 14 }}>★</span>
                    ))}
                  </div>

                  {/* Message bubble */}
                  <div style={{
                    background: "#252240", borderRadius: "4px 16px 16px 16px",
                    padding: "12px 16px",
                    fontSize: 14, color: "#C8C4D8", lineHeight: 1.7,
                    fontStyle: "italic",
                  }}>
                    "{t.text}"
                  </div>

                  {/* Delivered tick */}
                  <div style={{ textAlign: "right", marginTop: 8, fontSize: 11, color: "#9895B0" }}>
                    ✓✓ via WhatsApp
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA to leave review */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "#9895B0", fontSize: 14, marginBottom: 16 }}>
            Happy customer? Share your experience!
          </p>
          <button
            onClick={() => openWhatsApp("Hi PosterBabu! I wanted to share feedback about my poster.")}
            style={{
              background: "transparent", color: "#D05B37",
              border: "1.5px solid rgba(208,91,55,0.4)",
              padding: "12px 24px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Send us a review →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USAGE GUIDE
// ─────────────────────────────────────────────────────────────────────────────
//
// In your App.jsx or main layout:
//
// import {
//   TrustBar, FestivalCalendar, BeforeAfterSlider,
//   DeliveryTimer, LanguageProvider, LangToggle, useLanguage,
//   WhatsAppTestimonials
// } from "./NoDBFeatures";
//
// 1. Wrap app in <LanguageProvider> for Hindi toggle to work
// 2. Add <TrustBar /> just below your <Navbar />
// 3. Add <FestivalCalendar /> after the gallery on Homepage
// 4. Add <BeforeAfterSlider /> on Portfolio page
// 5. Add <DeliveryTimer startedAt={Date.now()} /> on OrderPage after submit
// 6. Replace old testimonials section with <WhatsAppTestimonials />
// 7. Add <LangToggle /> inside your Navbar component
//
// To use translations in any component:
// const { t } = useLanguage();
// <h1>{t("heroHeading")}</h1>
