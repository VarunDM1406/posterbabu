import React, { useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, Instagram, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi PosterBabu!\n\nName: ${formData.name}\nContact: ${formData.contact}\n\nMessage:\n${formData.message}`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .cp-input{width:100%;background:#0C0A1E;border:1px solid #2E2B45;color:#F5F0E8;padding:14px 18px;border-radius:14px;font-size:15px;font-family:'DM Sans',sans-serif;font-weight:500;outline:none;transition:border-color 0.2s;}
        .cp-input:focus{border-color:#D05B37;}
        .cp-input::placeholder{color:#9895B0;}
        .cp-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#9895B0;display:block;margin-bottom:8px;}
        .cp-info-row{display:flex;align-items:center;gap:14px;padding:18px 0;border-bottom:1px solid #2E2B45;}
        .cp-info-row:last-child{border-bottom:none;}
        .cp-icon-box{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .cp-fire-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(208,91,55,0.15);border:1px solid rgba(208,91,55,0.3);color:#E87A57;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
        .cp-card{background:#1A1830;border:1px solid #2E2B45;border-radius:24px;padding:32px;}
        @media(max-width:768px){.cp-grid{grid-template-columns:1fr!important;}}
      `}</style>

      {/* ── HEADER ── */}
      <section style={{ padding: "72px max(24px,5vw) 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="cp-fire-tag">Get in touch</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, margin: "18px 0 14px" }}>
            We're here to <span style={{ color: "#D05B37" }}>help.</span>
          </h1>
          <div style={{ width: 40, height: 3, background: "#D05B37", borderRadius: 2, marginBottom: 20 }} />
          <p style={{ color: "#9895B0", fontSize: 17, lineHeight: 1.8, maxWidth: 480 }}>
            Have a question or want to place a custom order? Reach out — we respond fast.
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section style={{ padding: "0 max(24px,5vw) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="cp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24 }}>

            {/* ── LEFT: Contact info ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Contact details card */}
              <div className="cp-card">
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F5F0E8", marginBottom: 4 }}>Contact details</h3>
                <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 20 }}>Reach us on any of these channels</p>

                <div className="cp-info-row">
                  <div className="cp-icon-box" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)" }}>
                    <MessageCircle size={18} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>WhatsApp</p>
                    <a href="https://wa.me/917428091729" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8", textDecoration: "none" }}>+91 74280 91729</a>
                  </div>
                </div>

                <div className="cp-info-row">
                  <div className="cp-icon-box" style={{ background: "rgba(208,91,55,0.15)", border: "1px solid rgba(208,91,55,0.25)" }}>
                    <Mail size={18} style={{ color: "#D05B37" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Email</p>
                    <a href="mailto:help.posterbabu@gmail.com" style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8", textDecoration: "none" }}>help.posterbabu@gmail.com</a>
                  </div>
                </div>

                <div className="cp-info-row">
                  <div className="cp-icon-box" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>
                    <Instagram size={18} style={{ color: "#a855f7" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Instagram</p>
                    <a href="https://www.instagram.com/posterbabu_official/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8", textDecoration: "none" }}>@posterbabu_official</a>
                  </div>
                </div>

                <div className="cp-info-row">
                  <div className="cp-icon-box" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)" }}>
                    <MapPin size={18} style={{ color: "#0ea5e9" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Location</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8" }}>New Delhi, India</p>
                  </div>
                </div>
              </div>

              {/* Business hours card */}
              <div className="cp-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <Clock size={16} style={{ color: "#D05B37" }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F5F0E8" }}>Business hours</h3>
                </div>
                {[
                  { day: "Monday – Saturday", time: "10 AM – 8 PM", highlight: false },
                  { day: "Sunday", time: "Special requests only", highlight: true },
                ].map(h => (
                  <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #2E2B45" }}>
                    <span style={{ fontSize: 14, color: "#9895B0" }}>{h.day}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: h.highlight ? "#D05B37" : "#F5F0E8" }}>{h.time}</span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: "#9895B0", marginTop: 16, lineHeight: 1.6 }}>
                  Need something urgent outside hours? WhatsApp us — we try our best to respond.
                </p>
              </div>

              {/* Quick WhatsApp CTA */}
              <button
                onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I have a question.", "_blank")}
                style={{ width: "100%", background: "#22c55e", color: "#F5F0E8", border: "none", padding: "16px", borderRadius: 16, fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#16a34a"}
                onMouseLeave={e => e.currentTarget.style.background = "#22c55e"}
              >
                <MessageCircle size={20} fill="currentColor" /> Chat on WhatsApp now
              </button>
            </div>

            {/* ── RIGHT: Contact form ── */}
            <div className="cp-card">
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: "#F5F0E8", marginBottom: 12 }}>
                    Message sent!
                  </h3>
                  <p style={{ color: "#9895B0", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                    Your WhatsApp should have opened with your message pre-filled. We'll reply shortly!
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ background: "rgba(208,91,55,0.15)", color: "#E87A57", border: "1px solid rgba(208,91,55,0.3)", padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F5F0E8", marginBottom: 6 }}>Send a quick message</h3>
                  <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 28 }}>This will open WhatsApp with your message pre-filled.</p>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label className="cp-label">Your name</label>
                      <input
                        required
                        className="cp-input"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="cp-label">Email or phone</label>
                      <input
                        required
                        className="cp-input"
                        placeholder="How should we reach you?"
                        value={formData.contact}
                        onChange={e => setFormData({ ...formData, contact: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="cp-label">Message</label>
                      <textarea
                        required
                        rows={5}
                        className="cp-input"
                        placeholder="Write your question or request..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        style={{ resize: "vertical" }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ width: "100%", background: "#D05B37", color: "#F5F0E8", border: "none", padding: "16px", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background 0.2s, transform 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#B84E2E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#D05B37"; e.currentTarget.style.transform = ""; }}
                    >
                      <Send size={18} /> Send via WhatsApp
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
