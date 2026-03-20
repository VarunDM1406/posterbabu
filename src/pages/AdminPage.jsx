import React, { useState, useEffect } from "react";
import { MessageCircle, Plus, RefreshCw, CheckCircle, Copy, Trash2, Download, Users, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../supabaseClient";

const ADMIN_PASSWORD = "posterbabu2024";
const MAKE_WEBHOOK_URL = ""; // paste your Make webhook URL here

const STATUS_LABELS = ["", "Received", "Designing", "Review Sent", "Delivered"];
const STATUS_COLORS = ["", "#9895B0", "#D05B37", "#a78bfa", "#22c55e"];

const PLAN_CONFIG = {
  "Starter - Special Discount (₹399)": { limit: 8,  price: 399  },
  "Growth - Special Discount (₹799)":  { limit: 20, price: 799  },
  "Starter (₹499)":                    { limit: 8,  price: 499  },
  "Growth (₹999)":                     { limit: 20, price: 999  },
  "Pro (₹1999)":                       { limit: 40, price: 1999 },
};

const generateId = (prefix = "PB") => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

const AdminPage = () => {
  const [authed, setAuthed]           = useState(false);
  const [password, setPassword]       = useState("");
  const [pwError, setPwError]         = useState(false);
  const [tab, setTab]                 = useState("orders"); // orders | subscriptions
  const [orders, setOrders]           = useState([]);
  const [subs, setSubs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [creating, setCreating]       = useState(false);
  const [creatingPayment, setCreatingPayment] = useState(null);
  const [copied, setCopied]           = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [notes, setNotes]             = useState({});

  const [newOrder, setNewOrder] = useState({ customer: "", business: "", poster_type: "Fast Edit (₹49)", details: "" });
  const [newSub, setNewSub]     = useState({ customer: "", business: "", phone: "", plan: "Starter - Special Discount (₹399)", renew_days: 30 });
  const [newPayment, setNewPayment] = useState({ amount: "", note: "" });

  useEffect(() => { if (authed) { fetchOrders(); fetchSubs(); } }, [authed]);

  const login = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  // ── ORDERS ──────────────────────────────────────────────────
  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    const noteMap = {};
    (data || []).forEach(o => { if (o.notes) noteMap[o.id] = o.notes; });
    setNotes(noteMap);
    setLoading(false);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const id = generateId("PB");
    const orderData = { id, ...newOrder, status: 1 };
    const { error } = await supabase.from("orders").insert(orderData);
    if (!error) {
      if (MAKE_WEBHOOK_URL) {
        fetch(MAKE_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...orderData, created_at: new Date().toISOString() }) }).catch(() => {});
      }
      setNewOrder({ customer: "", business: "", poster_type: "Fast Edit (₹49)", details: "" });
      setCreating(false);
      fetchOrders();
    }
  };

  const updateStatus = async (id, newStatus) => {
    await supabase.from("orders").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const saveNote = async (id) => {
    await supabase.from("orders").update({ notes: notes[id] || "" }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, notes: notes[id] } : o));
  };

  const deleteOrder = async (id) => {
    await supabase.from("orders").delete().eq("id", id);
    setOrders(prev => prev.filter(o => o.id !== id));
    setDeleteConfirm(null);
  };

  const exportCSV = () => {
    const headers = ["Order ID", "Customer", "Business", "Service", "Details", "Notes", "Status", "Created At"];
    const rows = orders.map(o => [o.id, o.customer, o.business, o.poster_type, o.details || "", o.notes || "", STATUS_LABELS[o.status], new Date(o.created_at).toLocaleString("en-IN")]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `orders-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const copyTrackLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}?page=track&id=${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendTrackLink = (order) => {
    const link = `${window.location.origin}?page=track&id=${order.id}`;
    const msg = `Hi ${order.customer}! 👋\n\nYour poster order is confirmed.\n\nTrack your order here:\n${link}\n\n— PosterBabu 🎨`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendReviewRequest = (order) => {
    const msg = `Hey ${order.customer}! 🙌\n\nHope you loved your ${order.business} poster!\n\nLeave us a quick Google review:\nhttps://g.page/posterbabu/review\n\nThank you! 🙏 — PosterBabu`;
    navigator.clipboard.writeText(msg);
    alert("Review message copied! Paste in WhatsApp.");
  };

  // ── SUBSCRIPTIONS ────────────────────────────────────────────
  const fetchSubs = async () => {
    const { data } = await supabase.from("subscriptions").select("*, payments(*)").order("created_at", { ascending: false });
    setSubs(data || []);
  };

  const createSub = async (e) => {
    e.preventDefault();
    const id = generateId("SUB");
    const plan = newSub.plan;
    const config = PLAN_CONFIG[plan];
    const renewDate = new Date();
    renewDate.setDate(renewDate.getDate() + parseInt(newSub.renew_days));

    const { error } = await supabase.from("subscriptions").insert({
      id,
      customer:      newSub.customer,
      business:      newSub.business,
      phone:         newSub.phone,
      plan:          plan.split(" ")[0],
      posters_limit: config.limit,
      posters_used:  0,
      renew_date:    renewDate.toISOString(),
      status:        "active",
    });

    if (!error) {
      // Auto-record payment
      await supabase.from("payments").insert({
        id:              generateId("PAY"),
        subscription_id: id,
        amount:          config.price,
        plan:            plan.split(" ")[0],
        payment_method:  "UPI",
        note:            "Initial subscription payment",
      });
      setNewSub({ customer: "", business: "", phone: "", plan: "Starter (₹499)", renew_days: 30 });
      setCreating(false);
      fetchSubs();

      // Send dashboard link via WhatsApp
      const dashLink = `${window.location.origin}?page=dashboard&ph=${newSub.phone}`;
      const msg = `Hi ${newSub.customer}! 🎉\n\nYour PosterBabu ${plan.split(" ")[0]} subscription is now active!\n\nView your dashboard here:\n${dashLink}\n\nYou can track your poster usage and renewal date anytime. — PosterBabu 🎨`;
      window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();
    const sub = subs.find(s => s.id === creatingPayment);
    if (!sub) return;
    const renewDate = new Date(sub.renew_date);
    renewDate.setDate(renewDate.getDate() + 30);

    await supabase.from("payments").insert({
      id:              generateId("PAY"),
      subscription_id: sub.id,
      amount:          parseInt(newPayment.amount),
      plan:            sub.plan,
      payment_method:  "UPI",
      note:            newPayment.note || "Renewal payment",
    });

    await supabase.from("subscriptions").update({
      renew_date:   renewDate.toISOString(),
      posters_used: 0,
      status:       "active",
    }).eq("id", sub.id);

    setNewPayment({ amount: "", note: "" });
    setCreatingPayment(null);
    fetchSubs();
  };

  const markPosterUsed = async (sub) => {
    const newUsed = sub.posters_used + 1;
    await supabase.from("subscriptions").update({ posters_used: newUsed }).eq("id", sub.id);
    setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, posters_used: newUsed } : s));
  };

  const cancelSub = async (id) => {
    await supabase.from("subscriptions").update({ status: "cancelled" }).eq("id", id);
    setSubs(prev => prev.map(s => s.id === id ? { ...s, status: "cancelled" } : s));
    setDeleteConfirm(null);
  };

  const copyDashLink = (phone) => {
    navigator.clipboard.writeText(`${window.location.origin}?page=dashboard&ph=${phone}`);
    setCopied(phone);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendDashLink = (sub) => {
    const link = `${window.location.origin}?page=dashboard&ph=${sub.phone}`;
    const msg  = `Hi ${sub.customer}! Here's your PosterBabu dashboard link:\n${link}\n\nCheck your poster usage and renewal date anytime! 🎨`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const formatTime = (ts) => new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const daysLeft = (renew) => Math.max(0, Math.ceil((new Date(renew) - new Date()) / 86400000));

  // ── PASSWORD SCREEN ──────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ background: "#060517", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", padding: 24 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');*{box-sizing:border-box;}`}</style>
        <div style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 380, textAlign: "center" }}>
          <div style={{ width: 48, height: 48, background: "#D05B37", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#F5F0E8" }}>P</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, color: "#F5F0E8", marginBottom: 6 }}>Admin Panel</h2>
          <p style={{ color: "#9895B0", fontSize: 14, marginBottom: 28 }}>PosterBabu — internal use only</p>
          <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", background: "#0C0A1E", border: `1px solid ${pwError ? "#E24B4A" : "#2E2B45"}`, color: "#F5F0E8", padding: "13px 16px", borderRadius: 12, fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none", marginBottom: 12 }} />
          {pwError && <p style={{ color: "#E24B4A", fontSize: 13, marginBottom: 12 }}>Wrong password.</p>}
          <button onClick={login} style={{ width: "100%", background: "#D05B37", color: "#F5F0E8", border: "none", padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Login</button>
        </div>
      </div>
    );
  }

  // ── MAIN ADMIN ───────────────────────────────────────────────
  return (
    <div style={{ background: "#060517", minHeight: "100vh", color: "#F5F0E8", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;}
        .adm-card{background:#1A1830;border:1px solid #2E2B45;border-radius:16px;padding:20px;}
        .adm-inp{width:100%;background:#0C0A1E;border:1px solid #2E2B45;color:#F5F0E8;padding:11px 14px;border-radius:10px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;}
        .adm-inp:focus{border-color:#D05B37;}
        .adm-inp::placeholder{color:#9895B0;}
        .adm-btn{border:none;padding:9px 16px;border-radius:9px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;display:inline-flex;align-items:center;gap:6px;transition:opacity 0.2s;}
        .adm-btn:hover{opacity:0.85;}
        .status-btn{padding:5px 12px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;transition:opacity 0.2s;}
        .status-btn:hover{opacity:0.75;}
        .del-btn{border:none;padding:8px;border-radius:8px;cursor:pointer;background:rgba(226,75,74,0.1);color:#E24B4A;display:inline-flex;align-items:center;justify-content:center;}
        .del-btn:hover{background:rgba(226,75,74,0.25);}
        .tab-btn{padding:10px 20px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;display:flex;align-items:center;gap:8px;transition:all 0.2s;}
        @keyframes fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .row-anim{animation:fadeup 0.3s ease both;}
        .note-inp{width:100%;background:#0C0A1E;border:1px solid #2E2B45;color:#9895B0;padding:8px 12px;border-radius:8px;font-size:12px;font-family:'DM Sans',sans-serif;outline:none;resize:none;}
        .note-inp:focus{border-color:#D05B37;color:#F5F0E8;}
        @media(max-width:768px){.two-col{grid-template-columns:1fr!important;}.adm-header{flex-wrap:wrap!important;gap:10px!important;}.action-wrap{flex-direction:column!important;align-items:flex-start!important;}}
      `}</style>

      {/* Header */}
      <div style={{ background: "#0C0A1E", borderBottom: "1px solid #2E2B45", padding: "0 max(24px,5vw)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }} className="adm-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>P</div>
            <span style={{ fontWeight: 900, fontSize: 17 }}>Poster<span style={{ color: "#D05B37" }}>Babu</span> <span style={{ color: "#9895B0", fontSize: 13, fontWeight: 500 }}>Admin</span></span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="adm-btn" onClick={() => { fetchOrders(); fetchSubs(); }} style={{ background: "#1A1830", color: "#9895B0", border: "1px solid #2E2B45" }}><RefreshCw size={14} /> Refresh</button>
            {tab === "orders" && <button className="adm-btn" onClick={exportCSV} style={{ background: "#1A1830", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}><Download size={14} /> Export CSV</button>}
            <button className="adm-btn" onClick={() => setCreating(true)} style={{ background: "#D05B37", color: "#F5F0E8" }}><Plus size={14} /> {tab === "orders" ? "New Order" : "New Subscription"}</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px max(24px,5vw)" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <button className="tab-btn" onClick={() => { setTab("orders"); setCreating(false); }}
            style={{ background: tab === "orders" ? "#D05B37" : "#1A1830", color: tab === "orders" ? "#F5F0E8" : "#9895B0", border: tab === "orders" ? "none" : "1px solid #2E2B45" }}>
            <ShoppingBag size={16} /> Orders ({orders.length})
          </button>
          <button className="tab-btn" onClick={() => { setTab("subscriptions"); setCreating(false); }}
            style={{ background: tab === "subscriptions" ? "#D05B37" : "#1A1830", color: tab === "subscriptions" ? "#F5F0E8" : "#9895B0", border: tab === "subscriptions" ? "none" : "1px solid #2E2B45" }}>
            <Users size={16} /> Subscriptions ({subs.filter(s => s.status === "active").length} active)
          </button>
        </div>

        {/* ── ORDERS TAB ── */}
        {tab === "orders" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Total",      value: orders.length },
                { label: "In progress",value: orders.filter(o => o.status === 2).length, color: "#D05B37" },
                { label: "Review sent",value: orders.filter(o => o.status === 3).length, color: "#a78bfa" },
                { label: "Delivered",  value: orders.filter(o => o.status === 4).length, color: "#22c55e" },
              ].map(s => (
                <div key={s.label} className="adm-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: s.color || "#F5F0E8", fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9895B0", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* New order form */}
            {creating && (
              <div className="adm-card" style={{ marginBottom: 16, border: "1px solid rgba(208,91,55,0.4)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>New Order</h3>
                <form onSubmit={createOrder}>
                  <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Customer</label>
                      <input required className="adm-inp" placeholder="e.g. Rahul Sharma" value={newOrder.customer} onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Business</label>
                      <input required className="adm-inp" placeholder="e.g. Iron Fitness" value={newOrder.business} onChange={e => setNewOrder({ ...newOrder, business: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Service</label>
                      <select className="adm-inp" value={newOrder.poster_type} onChange={e => setNewOrder({ ...newOrder, poster_type: e.target.value })}>
                        <option>Fast Edit (₹49)</option><option>Custom Design (₹149)</option><option>Starter Plan (₹499)</option><option>Growth Plan (₹999)</option><option>Business Plan (₹1799)</option>
                      </select></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Details</label>
                      <input className="adm-inp" placeholder="Any notes..." value={newOrder.details} onChange={e => setNewOrder({ ...newOrder, details: e.target.value })} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" className="adm-btn" style={{ background: "#D05B37", color: "#F5F0E8" }}><Plus size={14} /> Create</button>
                    <button type="button" className="adm-btn" onClick={() => setCreating(false)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45" }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders list */}
            {loading ? <div style={{ textAlign: "center", padding: 60, color: "#9895B0" }}>Loading...</div> :
             orders.length === 0 ? <div className="adm-card" style={{ textAlign: "center", padding: 48 }}><p style={{ fontSize: 32, marginBottom: 12 }}>📭</p><p style={{ color: "#9895B0" }}>No orders yet.</p></div> :
             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
               {orders.map((order, idx) => (
                 <div key={order.id} className="adm-card row-anim" style={{ animationDelay: `${idx * 0.04}s` }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                     <div style={{ flex: 1, minWidth: 180 }}>
                       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                         <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 900 }}>{order.id}</span>
                         <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${STATUS_COLORS[order.status]}22`, color: STATUS_COLORS[order.status] }}>{STATUS_LABELS[order.status]}</span>
                       </div>
                       <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{order.customer} · {order.business}</p>
                       <p style={{ fontSize: 11, color: "#9895B0" }}>{order.poster_type} · {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                       {order.details && <p style={{ fontSize: 11, color: "#9895B0", fontStyle: "italic", marginTop: 2 }}>"{order.details}"</p>}
                     </div>
                     <div className="action-wrap" style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                       <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                         {[1,2,3,4].map(s => (
                           <button key={s} className="status-btn" onClick={() => updateStatus(order.id, s)}
                             style={{ background: order.status === s ? STATUS_COLORS[s] : "transparent", color: order.status === s ? "#F5F0E8" : "#9895B0", border: `1px solid ${order.status === s ? STATUS_COLORS[s] : "#2E2B45"}` }}>
                             {STATUS_LABELS[s]}
                           </button>
                         ))}
                       </div>
                       <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
                         <button className="adm-btn" onClick={() => copyTrackLink(order.id)} style={{ background: "#0C0A1E", color: copied === order.id ? "#22c55e" : "#9895B0", border: "1px solid #2E2B45" }}>
                           {copied === order.id ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy link</>}
                         </button>
                         <button className="adm-btn" onClick={() => sendTrackLink(order)} style={{ background: "#22c55e", color: "#F5F0E8" }}><MessageCircle size={13} /> Send</button>
                         {order.status === 4 && <button className="adm-btn" onClick={() => sendReviewRequest(order)} style={{ background: "#D05B37", color: "#F5F0E8" }}>⭐ Review</button>}
                         <button className="adm-btn" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} style={{ background: "#0C0A1E", color: "#9895B0", border: "1px solid #2E2B45" }}>
                           {expandedOrder === order.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />} Notes
                         </button>
                         {deleteConfirm === order.id ? (
                           <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                             <span style={{ fontSize: 11, color: "#E24B4A", fontWeight: 600 }}>Sure?</span>
                             <button className="adm-btn" onClick={() => deleteOrder(order.id)} style={{ background: "#E24B4A", color: "#F5F0E8", padding: "7px 10px" }}>Yes</button>
                             <button className="adm-btn" onClick={() => setDeleteConfirm(null)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45", padding: "7px 10px" }}>No</button>
                           </div>
                         ) : (
                           <button className="del-btn" onClick={() => setDeleteConfirm(order.id)}><Trash2 size={14} /></button>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Notes panel */}
                   {expandedOrder === order.id && (
                     <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #2E2B45" }}>
                       <label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Internal notes (only you see this)</label>
                       <textarea
                         className="note-inp"
                         rows={2}
                         placeholder="e.g. Customer wants red background, logo attached..."
                         value={notes[order.id] || ""}
                         onChange={e => setNotes({ ...notes, [order.id]: e.target.value })}
                       />
                       <button className="adm-btn" onClick={() => saveNote(order.id)} style={{ background: "#D05B37", color: "#F5F0E8", marginTop: 8, padding: "7px 14px", fontSize: 12 }}>
                         Save note
                       </button>
                     </div>
                   )}
                 </div>
               ))}
             </div>
            }
          </>
        )}

        {/* ── SUBSCRIPTIONS TAB ── */}
        {tab === "subscriptions" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Active",    value: subs.filter(s => s.status === "active").length,    color: "#22c55e" },
                { label: "Cancelled", value: subs.filter(s => s.status === "cancelled").length, color: "#E24B4A" },
                { label: "Expiring soon", value: subs.filter(s => s.status === "active" && daysLeft(s.renew_date) <= 5).length, color: "#D05B37" },
                { label: "Total revenue", value: `₹${subs.flatMap(s => s.payments || []).reduce((a,p) => a + p.amount, 0).toLocaleString("en-IN")}`, color: "#a78bfa" },
              ].map(s => (
                <div key={s.label} className="adm-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: s.label === "Total revenue" ? 18 : 26, fontWeight: 900, color: s.color, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9895B0", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* New subscription form */}
            {creating && (
              <div className="adm-card" style={{ marginBottom: 16, border: "1px solid rgba(208,91,55,0.4)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>New Subscription</h3>
                <form onSubmit={createSub}>
                  <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Customer name</label>
                      <input required className="adm-inp" placeholder="e.g. Rahul Sharma" value={newSub.customer} onChange={e => setNewSub({ ...newSub, customer: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Business name</label>
                      <input required className="adm-inp" placeholder="e.g. Iron Fitness" value={newSub.business} onChange={e => setNewSub({ ...newSub, business: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>WhatsApp number</label>
                      <input required className="adm-inp" placeholder="e.g. 9876543210" value={newSub.phone} onChange={e => setNewSub({ ...newSub, phone: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Plan</label>
                      <select className="adm-inp" value={newSub.plan} onChange={e => setNewSub({ ...newSub, plan: e.target.value })}>
                        {Object.keys(PLAN_CONFIG).map(p => <option key={p}>{p}</option>)}
                      </select></div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" className="adm-btn" style={{ background: "#D05B37", color: "#F5F0E8" }}><Plus size={14} /> Activate & Send Link</button>
                    <button type="button" className="adm-btn" onClick={() => setCreating(false)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45" }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Add payment form */}
            {creatingPayment && (
              <div className="adm-card" style={{ marginBottom: 16, border: "1px solid rgba(34,197,94,0.4)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Record Renewal Payment</h3>
                <form onSubmit={addPayment}>
                  <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Amount (₹)</label>
                      <input required className="adm-inp" placeholder="e.g. 999" value={newPayment.amount} onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })} /></div>
                    <div><label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Note (optional)</label>
                      <input className="adm-inp" placeholder="e.g. Paid via GPay" value={newPayment.note} onChange={e => setNewPayment({ ...newPayment, note: e.target.value })} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" className="adm-btn" style={{ background: "#22c55e", color: "#F5F0E8" }}>Record Payment & Renew</button>
                    <button type="button" className="adm-btn" onClick={() => setCreatingPayment(null)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45" }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Subscriptions list */}
            {subs.length === 0 ? (
              <div className="adm-card" style={{ textAlign: "center", padding: 48 }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>👥</p>
                <p style={{ color: "#9895B0" }}>No subscriptions yet. Create your first one above.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {subs.map((sub, idx) => {
                  const dl = daysLeft(sub.renew_date);
                  const progress = (sub.posters_used / sub.posters_limit) * 100;
                  const isExpiring = dl <= 5 && sub.status === "active";
                  return (
                    <div key={sub.id} className="adm-card row-anim" style={{ animationDelay: `${idx * 0.04}s`, borderColor: isExpiring ? "rgba(226,75,74,0.4)" : sub.status === "cancelled" ? "rgba(226,75,74,0.2)" : "#2E2B45", opacity: sub.status === "cancelled" ? 0.6 : 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                        <div style={{ flex: 1, minWidth: 180 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 900 }}>{sub.customer}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: sub.status === "active" ? "rgba(34,197,94,0.15)" : "rgba(226,75,74,0.15)", color: sub.status === "active" ? "#22c55e" : "#E24B4A" }}>
                              {sub.status === "active" ? "Active" : "Cancelled"}
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "rgba(208,91,55,0.15)", color: "#D05B37" }}>{sub.plan}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "#9895B0", marginBottom: 2 }}>{sub.business} · {sub.phone}</p>
                          <p style={{ fontSize: 11, color: isExpiring ? "#E24B4A" : "#9895B0" }}>
                            Renews: {formatTime(sub.renew_date)} {isExpiring ? `⚠️ ${dl} days left!` : `(${dl} days)`}
                          </p>
                        </div>
                        <div className="action-wrap" style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                            <button className="adm-btn" onClick={() => markPosterUsed(sub)} style={{ background: "#D05B37", color: "#F5F0E8" }} disabled={sub.status !== "active"}>
                              +1 Poster used
                            </button>
                            <button className="adm-btn" onClick={() => { setCreatingPayment(sub.id); setCreating(false); }} style={{ background: "#22c55e", color: "#F5F0E8" }}>
                              💰 Renew
                            </button>
                            <button className="adm-btn" onClick={() => copyDashLink(sub.phone)} style={{ background: "#0C0A1E", color: copied === sub.phone ? "#22c55e" : "#9895B0", border: "1px solid #2E2B45" }}>
                              {copied === sub.phone ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Dashboard</>}
                            </button>
                            <button className="adm-btn" onClick={() => sendDashLink(sub)} style={{ background: "#1A1830", color: "#9895B0", border: "1px solid #2E2B45" }}>
                              <MessageCircle size={13} /> Send link
                            </button>
                            {sub.status === "active" && (
                              deleteConfirm === sub.id ? (
                                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                  <span style={{ fontSize: 11, color: "#E24B4A", fontWeight: 600 }}>Cancel sub?</span>
                                  <button className="adm-btn" onClick={() => cancelSub(sub.id)} style={{ background: "#E24B4A", color: "#F5F0E8", padding: "7px 10px" }}>Yes</button>
                                  <button className="adm-btn" onClick={() => setDeleteConfirm(null)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45", padding: "7px 10px" }}>No</button>
                                </div>
                              ) : (
                                <button className="del-btn" onClick={() => setDeleteConfirm(sub.id)}><Trash2 size={14} /></button>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Usage bar */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: "#9895B0" }}>Posters used</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#F5F0E8" }}>{sub.posters_used} / {sub.posters_limit}</span>
                        </div>
                        <div style={{ background: "#2E2B45", borderRadius: 100, height: 6, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 100, background: progress >= 90 ? "#E24B4A" : progress >= 70 ? "#D05B37" : "#22c55e", width: `${Math.min(progress, 100)}%`, transition: "width 0.4s ease" }} />
                        </div>
                      </div>

                      {/* Payment history */}
                      {sub.payments && sub.payments.length > 0 && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #2E2B45" }}>
                          <p style={{ fontSize: 11, color: "#9895B0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Payment history</p>
                          {sub.payments.map(p => (
                            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0" }}>
                              <span style={{ color: "#9895B0" }}>{formatTime(p.paid_at)} · {p.payment_method} {p.note ? `· ${p.note}` : ""}</span>
                              <span style={{ fontWeight: 700, color: "#22c55e" }}>₹{p.amount.toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
