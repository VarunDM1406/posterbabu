import React, { useEffect, useState } from "react";
import { MessageCircle, CheckCircle, Clock, Package, Send, Star } from "lucide-react";
import { supabase } from "../supabaseClient";

// Read order ID from URL: posterbabu.shop/track?id=PB-2847
const getOrderId = () => new URLSearchParams(window.location.search).get("id");

const STEPS = [
  { label: "Order received",       sub: "Your request came through WhatsApp",      icon: <Package size={16} /> },
  { label: "Designer working",     sub: "We're creating your poster right now",     icon: <Clock size={16} /> },
  { label: "Draft sent for review",sub: "Check your WhatsApp for the draft",        icon: <Send size={16} /> },
  { label: "Delivered!",           sub: "Final HD file sent to your WhatsApp",      icon: <CheckCircle size={16} /> },
];

const STATUS_META = [
  { badge: "Order placed",  bg: "#1A1830", tc: "#9895B0" },
  { badge: "In progress",   bg: "rgba(208,91,55,0.2)", tc: "#E87A57" },
  { badge: "Review sent",   bg: "rgba(124,58,237,0.2)", tc: "#a78bfa" },
  { badge: "Delivered! 🎉", bg: "rgba(34,197,94,0.2)",  tc: "#22c55e" },
];

const TrackOrderPage = () => {
  const [order, setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const orderId = getOrderId();

  useEffect(() => {
    if (!orderId) { setError("No order ID found in the URL."); setLoading(false); return; }
    fetchOrder();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) { setError("Order not found. Please check your link."); }
    else        { setOrder(data); }
    setLoading(false);
  };

  const openWhatsApp = () =>
    window.open("https://wa.me/917428091729?text=Hi PosterBabu! I have a question about my order " + orderId, "_blank");

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", padding: "48px max(24px,5vw)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .track-card{background:#1A1830;border:1px solid #2E2B45;border-radius:20px;padding:28px;animation:fadeup 0.5s ease both;}
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(208,91,55,0.4)}50%{box-shadow:0 0 0 8px rgba(208,91,55,0)}}
      `}</style>

      <div style={{ maxWidth: 520, margin: "0 auto" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>P</div>
            <span style={{ fontWeight: 900, fontSize: 18, color: "#F5F0E8" }}>Poster<span style={{ color: "#D05B37" }}>Babu</span></span>
          </div>
          <p style={{ color: "#9895B0", fontSize: 13, marginTop: 8 }}>Order Tracker</p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ width: 36, height: 36, border: "3px solid #2E2B45", borderTopColor: "#D05B37", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "#9895B0" }}>Loading your order...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="track-card" style={{ textAlign: "center", padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, marginBottom: 10 }}>Order not found</h2>
            <p style={{ color: "#9895B0", marginBottom: 24 }}>{error}</p>
            <button onClick={openWhatsApp} style={{ background: "#22c55e", color: "#F5F0E8", border: "none", padding: "12px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MessageCircle size={16} /> Contact us on WhatsApp
            </button>
          </div>
        )}

        {/* Order found */}
        {order && (
          <>
            {/* Order header card */}
            <div className="track-card" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Order ID</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#F5F0E8" }}>{order.id}</p>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20,
                  background: STATUS_META[order.status - 1]?.bg,
                  color: STATUS_META[order.status - 1]?.tc,
                }}>
                  {STATUS_META[order.status - 1]?.badge}
                </span>
              </div>
              <div style={{ borderTop: "1px solid #2E2B45", paddingTop: 14, display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: 11, color: "#9895B0", marginBottom: 3 }}>Customer</p>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{order.customer}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#9895B0", marginBottom: 3 }}>Business</p>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{order.business}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#9895B0", marginBottom: 3 }}>Service</p>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{order.poster_type}</p>
                </div>
              </div>
            </div>

            {/* Steps tracker card */}
            <div className="track-card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Progress</h3>
              {STEPS.map((step, i) => {
                const stepNum  = i + 1;
                const isDone   = stepNum < order.status;
                const isActive = stepNum === order.status;
                const isPending= stepNum > order.status;
                const isLast   = i === STEPS.length - 1;

                return (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    {/* Dot + line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700,
                        background: isDone ? "#22c55e" : isActive ? "#D05B37" : "#2E2B45",
                        color: isPending ? "#9895B0" : "#F5F0E8",
                        animation: isActive ? "pulse-dot 2s ease-in-out infinite" : "none",
                      }}>
                        {isDone ? "✓" : stepNum}
                      </div>
                      {!isLast && (
                        <div style={{ width: 2, height: 28, background: isDone ? "#22c55e" : "#2E2B45", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ paddingBottom: isLast ? 0 : 8, paddingTop: 6, flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: isPending ? "#9895B0" : "#F5F0E8", marginBottom: 3 }}>{step.label}</p>
                      {!isPending && <p style={{ fontSize: 12, color: "#9895B0" }}>{step.sub}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ETA / done message */}
            <div className="track-card" style={{ marginBottom: 16, background: order.status === 4 ? "rgba(34,197,94,0.1)" : "#1A1830", borderColor: order.status === 4 ? "rgba(34,197,94,0.3)" : "#2E2B45" }}>
              {order.status === 4 ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 28, marginBottom: 8 }}>🎉</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>Your poster is delivered!</p>
                  <p style={{ fontSize: 13, color: "#9895B0" }}>Check your WhatsApp for the final HD file.</p>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "#9895B0", marginBottom: 4 }}>Estimated delivery</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#D05B37" }}>
                      {order.status === 1 ? "~20 minutes" : order.status === 2 ? "~10 minutes" : "~2 minutes"}
                    </p>
                  </div>
                  <div style={{ fontSize: 11, color: "#9895B0", textAlign: "right" }}>
                    <p>Auto-refreshes</p>
                    <p>every 30 seconds</p>
                  </div>
                </div>
              )}
            </div>

            {/* Review prompt — only show when delivered */}
            {order.status === 4 && (
              <div className="track-card" style={{ marginBottom: 16, textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Happy with your poster? ⭐</p>
                <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 16 }}>Leave us a quick Google review — it helps us a lot!</p>
                <a
                  href="https://g.page/posterbabu/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#D05B37", color: "#F5F0E8", padding: "11px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <Star size={15} fill="currentColor" /> Leave a review
                </a>
              </div>
            )}

            {/* WhatsApp help */}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 10 }}>Have a question?</p>
              <button onClick={openWhatsApp} style={{ background: "transparent", border: "1px solid #2E2B45", color: "#F5F0E8", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <MessageCircle size={15} style={{ color: "#22c55e" }} /> Message us on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
