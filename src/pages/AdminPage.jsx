import React, { useState, useEffect } from "react";
import { MessageCircle, Plus, RefreshCw, CheckCircle, Copy, Trash2, Download } from "lucide-react";
import { supabase } from "../supabaseClient";

const ADMIN_PASSWORD = "posterbabu2024";

// ── Optional: paste your Make webhook URL here to auto-sync to Google Sheets
// Leave as empty string "" if you haven't set it up yet
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/mujzjctt5he038xxxto8arrcs6yzjrv5";

const STATUS_LABELS = ["", "Received", "Designing", "Review Sent", "Delivered"];
const STATUS_COLORS = ["", "#9895B0", "#D05B37", "#a78bfa", "#22c55e"];

const generateId = () => `PB-${Math.floor(1000 + Math.random() * 9000)}`;

const AdminPage = () => {
  const [authed, setAuthed]         = useState(false);
  const [password, setPassword]     = useState("");
  const [pwError, setPwError]       = useState(false);
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [creating, setCreating]     = useState(false);
  const [copied, setCopied]         = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newOrder, setNewOrder]     = useState({ customer: "", business: "", poster_type: "Fast Edit (₹49)", details: "" });

  useEffect(() => { if (authed) fetchOrders(); }, [authed]);

  const login = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const id = generateId();
    const orderData = {
      id,
      customer:    newOrder.customer,
      business:    newOrder.business,
      poster_type: newOrder.poster_type,
      details:     newOrder.details,
      status:      1,
    };
    const { error } = await supabase.from("orders").insert(orderData);
    if (!error) {
      // ── Auto-sync to Google Sheets via Make webhook (if configured)
      if (MAKE_WEBHOOK_URL) {
        fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderData, created_at: new Date().toISOString() }),
        }).catch(() => {}); // silent fail — don't block the UI
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

  const deleteOrder = async (id) => {
    await supabase.from("orders").delete().eq("id", id);
    setOrders(prev => prev.filter(o => o.id !== id));
    setDeleteConfirm(null);
  };

  // ── Export all orders as a CSV file
  const exportCSV = () => {
    const headers = ["Order ID", "Customer", "Business", "Service", "Details", "Status", "Created At"];
    const rows = orders.map(o => [
      o.id,
      o.customer,
      o.business,
      o.poster_type,
      o.details || "",
      STATUS_LABELS[o.status],
      new Date(o.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `posterbabu-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTrackLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}?page=track&id=${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendTrackLink = (order) => {
    const link = `${window.location.origin}?page=track&id=${order.id}`;
    const msg  = `Hi ${order.customer}! 👋\n\nYour poster order is confirmed.\n\nTrack your order status here:\n${link}\n\nWe'll update it as we progress. — PosterBabu 🎨`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendReviewRequest = (order) => {
    const msg = `Hey ${order.customer}! 🙌\n\nHope you loved your ${order.business} poster!\n\nIt would mean a lot if you left us a quick Google review — takes just 30 seconds:\nhttps://g.page/posterbabu/review\n\nThank you! 🙏 — PosterBabu`;
    navigator.clipboard.writeText(msg);
    alert("Review message copied! Paste it in WhatsApp.");
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) + " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  // ── Password screen ──
  if (!authed) {
    return (
      <div style={{ background: "#060517", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", padding: 24 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');*{box-sizing:border-box;}`}</style>
        <div style={{ background: "#1A1830", border: "1px solid #2E2B45", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 380, textAlign: "center" }}>
          <div style={{ width: 48, height: 48, background: "#D05B37", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#F5F0E8" }}>P</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, color: "#F5F0E8", marginBottom: 6 }}>Admin Panel</h2>
          <p style={{ color: "#9895B0", fontSize: 14, marginBottom: 28 }}>PosterBabu — internal use only</p>
          <input type="password" placeholder="Enter password" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", background: "#0C0A1E", border: `1px solid ${pwError ? "#E24B4A" : "#2E2B45"}`, color: "#F5F0E8", padding: "13px 16px", borderRadius: 12, fontSize: 15, fontFamily: "'DM Sans',sans-serif", outline: "none", marginBottom: 12 }}
          />
          {pwError && <p style={{ color: "#E24B4A", fontSize: 13, marginBottom: 12 }}>Wrong password. Try again.</p>}
          <button onClick={login} style={{ width: "100%", background: "#D05B37", color: "#F5F0E8", border: "none", padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Login</button>
        </div>
      </div>
    );
  }

  // ── Main admin panel ──
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
        .del-btn{border:none;padding:8px;border-radius:8px;cursor:pointer;background:rgba(226,75,74,0.1);color:#E24B4A;display:inline-flex;align-items:center;justify-content:center;transition:background 0.2s;}
        .del-btn:hover{background:rgba(226,75,74,0.25);}
        @keyframes fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .order-row{animation:fadeup 0.3s ease both;}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        .confirm-del{animation:shake 0.3s ease;}
        @media(max-width:768px){.order-grid{grid-template-columns:1fr!important;}.adm-header{flex-direction:column!important;gap:12px!important;}.action-row{flex-direction:column!important;align-items:flex-start!important;}}
      `}</style>

      {/* Header */}
      <div style={{ background: "#0C0A1E", borderBottom: "1px solid #2E2B45", padding: "0 max(24px,5vw)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }} className="adm-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "#D05B37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#F5F0E8", fontFamily: "'Playfair Display',serif" }}>P</div>
            <span style={{ fontWeight: 900, fontSize: 17 }}>Poster<span style={{ color: "#D05B37" }}>Babu</span> <span style={{ color: "#9895B0", fontSize: 13, fontWeight: 500 }}>Admin</span></span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="adm-btn" onClick={fetchOrders} style={{ background: "#1A1830", color: "#9895B0", border: "1px solid #2E2B45" }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="adm-btn" onClick={exportCSV} style={{ background: "#1A1830", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
              <Download size={14} /> Export CSV
            </button>
            <button className="adm-btn" onClick={() => setCreating(true)} style={{ background: "#D05B37", color: "#F5F0E8" }}>
              <Plus size={14} /> New Order
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px max(24px,5vw)" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total orders", value: orders.length },
            { label: "In progress",  value: orders.filter(o => o.status === 2).length, color: "#D05B37" },
            { label: "Review sent",  value: orders.filter(o => o.status === 3).length, color: "#a78bfa" },
            { label: "Delivered",    value: orders.filter(o => o.status === 4).length, color: "#22c55e" },
          ].map(s => (
            <div key={s.label} className="adm-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color || "#F5F0E8", fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#9895B0", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Google Sheets notice if webhook not set */}
        {!MAKE_WEBHOOK_URL && (
          <div style={{ background: "rgba(208,91,55,0.08)", border: "1px solid rgba(208,91,55,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 16 }}>📊</span>
            <p style={{ fontSize: 13, color: "#9895B0" }}>
              Want orders to auto-sync to Google Sheets? Set up a Make webhook and paste the URL in <code style={{ color: "#D05B37", background: "rgba(208,91,55,0.1)", padding: "1px 6px", borderRadius: 4 }}>MAKE_WEBHOOK_URL</code> at the top of AdminPage.jsx.
            </p>
          </div>
        )}

        {/* New order form */}
        {creating && (
          <div className="adm-card" style={{ marginBottom: 20, border: "1px solid rgba(208,91,55,0.4)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New Order</h3>
            <form onSubmit={createOrder}>
              <div className="order-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Customer name</label>
                  <input required className="adm-inp" placeholder="e.g. Rahul Sharma" value={newOrder.customer} onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Business name</label>
                  <input required className="adm-inp" placeholder="e.g. Iron Fitness Gym" value={newOrder.business} onChange={e => setNewOrder({ ...newOrder, business: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Service type</label>
                  <select className="adm-inp" value={newOrder.poster_type} onChange={e => setNewOrder({ ...newOrder, poster_type: e.target.value })}>
                    <option>Fast Edit (₹49)</option>
                    <option>Custom Design (₹149)</option>
                    <option>Starter Plan (₹499)</option>
                    <option>Growth Plan (₹999)</option>
                    <option>Business Plan (₹1799)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#9895B0", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Details (optional)</label>
                  <input className="adm-inp" placeholder="Any notes..." value={newOrder.details} onChange={e => setNewOrder({ ...newOrder, details: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="adm-btn" style={{ background: "#D05B37", color: "#F5F0E8" }}><Plus size={14} /> Create Order</button>
                <button type="button" className="adm-btn" onClick={() => setCreating(false)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Orders list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#9895B0" }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="adm-card" style={{ textAlign: "center", padding: 48 }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
            <p style={{ color: "#9895B0" }}>No orders yet. Create your first one above.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.map((order, idx) => (
              <div key={order.id} className="adm-card order-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>

                  {/* Left: order info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 900, color: "#F5F0E8" }}>{order.id}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${STATUS_COLORS[order.status]}22`, color: STATUS_COLORS[order.status] }}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#F5F0E8", marginBottom: 2 }}>{order.customer} · {order.business}</p>
                    <p style={{ fontSize: 12, color: "#9895B0" }}>{order.poster_type} · {formatTime(order.created_at)}</p>
                    {order.details && <p style={{ fontSize: 12, color: "#9895B0", marginTop: 4, fontStyle: "italic" }}>"{order.details}"</p>}
                  </div>

                  {/* Right: actions */}
                  <div className="action-row" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>

                    {/* Status buttons */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {[1,2,3,4].map(s => (
                        <button key={s} className="status-btn" onClick={() => updateStatus(order.id, s)}
                          style={{ background: order.status === s ? STATUS_COLORS[s] : "transparent", color: order.status === s ? "#F5F0E8" : "#9895B0", border: `1px solid ${order.status === s ? STATUS_COLORS[s] : "#2E2B45"}` }}>
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
                      <button className="adm-btn" onClick={() => copyTrackLink(order.id)} style={{ background: "#0C0A1E", color: copied === order.id ? "#22c55e" : "#9895B0", border: "1px solid #2E2B45" }}>
                        {copied === order.id ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy link</>}
                      </button>
                      <button className="adm-btn" onClick={() => sendTrackLink(order)} style={{ background: "#22c55e", color: "#F5F0E8" }}>
                        <MessageCircle size={13} /> Send link
                      </button>
                      {order.status === 4 && (
                        <button className="adm-btn" onClick={() => sendReviewRequest(order)} style={{ background: "#D05B37", color: "#F5F0E8" }}>
                          ⭐ Ask review
                        </button>
                      )}

                      {/* Delete button — shows confirm on first click */}
                      {deleteConfirm === order.id ? (
                        <div className="confirm-del" style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 12, color: "#E24B4A", fontWeight: 600 }}>Sure?</span>
                          <button className="adm-btn" onClick={() => deleteOrder(order.id)} style={{ background: "#E24B4A", color: "#F5F0E8", padding: "8px 12px" }}>Yes, delete</button>
                          <button className="adm-btn" onClick={() => setDeleteConfirm(null)} style={{ background: "transparent", color: "#9895B0", border: "1px solid #2E2B45", padding: "8px 12px" }}>Cancel</button>
                        </div>
                      ) : (
                        <button className="del-btn" onClick={() => setDeleteConfirm(order.id)} title="Delete order">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
