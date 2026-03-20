import React, { useState, useEffect } from "react";
import { MessageCircle, CheckCircle, Clock, Star, Package } from "lucide-react";
import { supabase } from "../supabaseClient";

const PLAN_LIMITS = {
  "Starter - Special Discount (₹399)": 8,
  "Growth - Special Discount (₹799)":  20,
  "Starter (₹499)":                    8,
  "Growth (₹999)":                     20,
  "Pro (₹1999)":                       40,
  "Starter":  8,
  "Growth":   20,
  "Pro":      40,
};

const PLAN_COLORS = {
  "Starter - Special Discount (₹399)": "#22c55e",
  "Growth - Special Discount (₹799)":  "#D05B37",
  "Starter (₹499)":                    "#9895B0",
  "Growth (₹999)":                     "#D05B37",
  "Pro (₹1999)":                       "#a78bfa",
  "Starter": "#9895B0",
  "Growth":  "#D05B37",
  "Pro":     "#a78bfa",
};

const getPhone = () => new URLSearchParams(window.location.search).get("ph");

const DashboardPage = () => {
  const [phone, setPhone]         = useState(getPhone() || "");
  const [inputPhone, setInputPhone] = useState("");
  const [sub, setSub]             = useState(null);
  const [payments, setPayments]   = useState([]);
  const [loading, setLoading]     = useState(!!getPhone());
  const [error, setError]         = useState(null);

  useEffect(() => {
    if (getPhone()) fetchDashboard(getPhone());
  }, []);

  const fetchDashboard = async (ph) => {
    setLoading(true);
    setError(null);
    const clean = ph.replace(/\D/g, "").slice(-10);

    const { data: subData, error: subErr } = await supabase
      .from("subscriptions")
      .select("*")
      .ilike("phone", `%${clean}`)
      .eq("status", "active")
      .single();

    if (subErr || !subData) {
      setError("No active subscription found for this number.");
      setLoading(false);
      return;
    }

    const { data: payData } = await supabase
      .from("payments")
      .select("*")
      .eq("subscription_id", subData.id)
      .order("paid_at", { ascending: false });

    setSub(subData);
    setPayments(payData || []);
    setPhone(ph);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchDashboard(inputPhone);
  };

  const daysLeft = sub
    ? Math.max(0, Math.ceil((new Date(sub.renew_date) - new Date()) / 86400000))
    : 0;

  const postersLeft = sub ? sub.posters_limit - sub.posters_used : 0;
  const progress    = sub ? (sub.posters_used / sub.posters_limit) * 100 : 0;

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const formatAmount = (a) => `₹${a.toLocaleString("en-IN")}`;

  return (
    <div style={{ background: "#060517", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", padding: "48px max(24px,5vw)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .db-card{background:#1A1830;border:1px solid #2E2B45;border-radius:20px;padding:24px;}
        .db-inp{width:100%;background:#0C0A1E;border:1px solid #2E2B45;color:#F5F0E8;padding:13px 16px;border-radius:12px;font-size:15px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s;}
        .db-inp:focus{border-color:#D05B37;}
        .db-inp::placeholder{color:#9895B0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeup{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .db-fade{animation:fadeup 0.4s ease both;}
        @media(max-width:600px){.db-stats{grid-template-columns:1fr 1fr!important;}}
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>P</div>
            <span style={{ fontWeight: 900, fontSize: 18 }}>Poster<span style={{ color: "#D05B37" }}>Babu</span></span>
          </div>
          <p style={{ color: "#9895B0", fontSize: 13, marginTop: 6 }}>Subscription Dashboard</p>
        </div>

        {/* Phone login */}
        {!sub && !loading && (
          <div className="db-card db-fade">
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, marginBottom: 6 }}>
              View your <span style={{ color: "#D05B37" }}>subscription</span>
            </h2>
            <p style={{ color: "#9895B0", fontSize: 14, marginBottom: 24 }}>
              Enter the WhatsApp number you used to subscribe
            </p>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                className="db-inp"
                placeholder="e.g. 9876543210"
                value={inputPhone}
                onChange={e => setInputPhone(e.target.value)}
                type="tel"
                required
              />
              {error && <p style={{ color: "#E24B4A", fontSize: 13 }}>{error}</p>}
              <button type="submit" style={{ background: "#D05B37", color: "#F5F0E8", border: "none", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                View My Dashboard
              </button>
            </form>
            <p style={{ color: "#9895B0", fontSize: 12, marginTop: 16, textAlign: "center" }}>
              Don't have a subscription?{" "}
              <span
                style={{ color: "#D05B37", cursor: "pointer", fontWeight: 700 }}
                onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to subscribe to a monthly plan.", "_blank")}
              >
                WhatsApp us →
              </span>
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ width: 36, height: 36, border: "3px solid #2E2B45", borderTopColor: "#D05B37", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "#9895B0" }}>Loading your dashboard...</p>
          </div>
        )}

        {/* Dashboard */}
        {sub && !loading && (
          <div className="db-fade" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Welcome card */}
            <div className="db-card" style={{ background: "#D05B37", border: "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 12, color: "rgba(245,240,232,0.7)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Welcome back</p>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 900, color: "#F5F0E8", marginBottom: 4 }}>{sub.customer}</h2>
                  <p style={{ fontSize: 14, color: "rgba(245,240,232,0.75)" }}>{sub.business}</p>
                </div>
                <div style={{ background: "rgba(6,5,23,0.25)", border: "1px solid rgba(245,240,232,0.2)", borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
                  <p style={{ fontSize: 11, color: "rgba(245,240,232,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Your plan</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>{sub.plan}</p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="db-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { label: "Posters left", value: postersLeft, color: postersLeft <= 2 ? "#E24B4A" : "#22c55e", sub: `of ${sub.posters_limit}` },
                { label: "Days to renew", value: daysLeft, color: daysLeft <= 5 ? "#E24B4A" : "#D05B37", sub: "days" },
                { label: "Posters used", value: sub.posters_used, color: "#9895B0", sub: "this month" },
              ].map(s => (
                <div key={s.label} className="db-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#9895B0", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#9895B0" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Usage bar */}
            <div className="db-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 700 }}>Poster usage this month</p>
                <p style={{ fontSize: 13, color: "#9895B0" }}>{sub.posters_used} / {sub.posters_limit}</p>
              </div>
              <div style={{ background: "#2E2B45", borderRadius: 100, height: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 100,
                  background: progress >= 90 ? "#E24B4A" : progress >= 70 ? "#D05B37" : "#22c55e",
                  width: `${Math.min(progress, 100)}%`,
                  transition: "width 0.6s ease",
                }} />
              </div>
              {postersLeft <= 2 && (
                <p style={{ fontSize: 12, color: "#E24B4A", marginTop: 10 }}>
                  ⚠️ Only {postersLeft} poster{postersLeft !== 1 ? "s" : ""} left!{" "}
                  <span
                    style={{ color: "#D05B37", cursor: "pointer", fontWeight: 700 }}
                    onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to upgrade my plan.", "_blank")}
                  >
                    Upgrade plan →
                  </span>
                </p>
              )}
            </div>

            {/* Subscription details */}
            <div className="db-card">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Subscription details</h3>
              {[
                { label: "Plan",         value: sub.plan },
                { label: "Status",       value: sub.status === "active" ? "✅ Active" : "❌ Inactive" },
                { label: "Started on",   value: formatDate(sub.start_date) },
                { label: "Renews on",    value: formatDate(sub.renew_date) },
                { label: "Phone",        value: sub.phone },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #2E2B45" }}>
                  <span style={{ fontSize: 13, color: "#9895B0" }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Payment history */}
            <div className="db-card">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Payment history</h3>
              {payments.length === 0 ? (
                <p style={{ color: "#9895B0", fontSize: 13 }}>No payments recorded yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {payments.map(p => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2E2B45" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700 }}>{p.plan}</p>
                        <p style={{ fontSize: 11, color: "#9895B0" }}>{formatDate(p.paid_at)} · {p.payment_method}</p>
                        {p.note && <p style={{ fontSize: 11, color: "#9895B0", fontStyle: "italic" }}>{p.note}</p>}
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 900, color: "#22c55e", fontFamily: "'Playfair Display',serif" }}>
                        {formatAmount(p.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to order a poster for this month.", "_blank")}
                style={{ flex: 1, background: "#22c55e", color: "#F5F0E8", border: "none", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <MessageCircle size={16} /> Order a poster
              </button>
              <button
                onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to upgrade my subscription plan.", "_blank")}
                style={{ flex: 1, background: "transparent", color: "#F5F0E8", border: "1px solid #2E2B45", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
              >
                Upgrade plan
              </button>
            </div>

            {/* Switch account */}
            <p style={{ textAlign: "center", fontSize: 12, color: "#9895B0" }}>
              Not you?{" "}
              <span style={{ color: "#D05B37", cursor: "pointer", fontWeight: 700 }} onClick={() => { setSub(null); setPayments([]); setError(null); }}>
                Switch account
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
