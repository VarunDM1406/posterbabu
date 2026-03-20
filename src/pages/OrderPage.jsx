import React, { useState } from "react";
import { MessageCircle, Zap, ChevronDown } from "lucide-react";
import { DeliveryTimer } from "../NoDBFeatures";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    type: "Fast Edit (₹49)",
    details: "",
  });
  const [orderTime, setOrderTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderTime(Date.now());
    const message = `Hello PosterBabu!\nName: ${formData.name}\nBusiness: ${formData.business}\nPoster Type: ${formData.type}\nDetails: ${formData.details}`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", padding: "64px max(24px,5vw)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .op-input{width:100%;background:#1A1830;border:1px solid #2E2B45;color:#F5F0E8;padding:14px 18px;border-radius:14px;font-size:15px;font-family:'DM Sans',sans-serif;font-weight:500;outline:none;transition:border-color 0.2s;appearance:none;}
        .op-input:focus{border-color:#D05B37;}
        .op-input::placeholder{color:#9895B0;}
        .op-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#9895B0;display:block;margin-bottom:8px;}
        .op-select-wrap{position:relative;}
        .op-select-wrap svg{position:absolute;right:16px;top:50%;transform:translateY(-50%);pointer-events:none;color:#9895B0;}
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.3)", color: "#E87A57", padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            <Zap size={12} fill="currentColor" /> Fast poster design
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, margin: "16px 0 12px" }}>
            Start your <span style={{ color: "#D05B37" }}>order</span>
          </h1>
          <p style={{ color: "#9895B0", fontSize: 15, lineHeight: 1.7 }}>
            Most orders delivered in under 20 minutes. Draft first, pay after you're happy.
          </p>
        </div>

        {/* Form card */}
        <div style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 28, padding: "36px 32px" }}>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <div>
              <label className="op-label">Your name</label>
              <input
                required
                className="op-input"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="op-label">Business name</label>
              <input
                required
                className="op-input"
                placeholder="e.g. Sharma Kirana Store"
                value={formData.business}
                onChange={e => setFormData({ ...formData, business: e.target.value })}
              />
            </div>

            <div>
              <label className="op-label">
                Service type — for Fast Edit (₹49), pick a design from the Portfolio and we'll customise it for you
              </label>
              <div className="op-select-wrap">
                <select
                  className="op-input"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  style={{ paddingRight: 40 }}
                >
                  <option>Fast Edit (₹49)</option>
                  <option>Custom Design (₹149)</option>
                  <option>Starter Plan (₹499)</option>
                  <option>Growth Plan (₹999)</option>
                  <option>Business Plan (₹1799)</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </div>

            <div>
              <label className="op-label">Poster details — the more you tell us, the better the design 😎</label>
              <textarea
                required
                rows={4}
                className="op-input"
                placeholder="What do you want on the poster? Include your offer, phone number, address, etc."
                value={formData.details}
                onChange={e => setFormData({ ...formData, details: e.target.value })}
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              style={{ width: "100%", background: "#22c55e", color: "#F5F0E8", border: "none", padding: "18px", borderRadius: 14, fontWeight: 900, fontSize: 18, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "background 0.2s, transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.transform = ""; }}
            >
              <MessageCircle size={22} fill="currentColor" /> Send to WhatsApp
            </button>

          </form>
        </div>

        {/* Trust notes */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 20, flexWrap: "wrap" }}>
          {["No upfront payment", "Draft first, pay later", "HD file delivery"].map(t => (
            <span key={t} style={{ fontSize: 12, color: "#9895B0", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#D05B37" }}>✓</span> {t}
            </span>
          ))}
        </div>

        {/* Delivery Timer — appears after submit */}
        {orderTime && <DeliveryTimer startedAt={orderTime} />}

      </div>
    </div>
  );
};

export default OrderPage;
