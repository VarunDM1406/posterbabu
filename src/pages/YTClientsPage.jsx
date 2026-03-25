// 📄 YTClientsPage.jsx
// Place this file in the same folder as your other pages (e.g. HomPage.jsx, ServicesPage.jsx)
// URL will be: posterbabu.shop/?page=yt-clients

import React from "react";

const YTClientsPage = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", scrollBehavior: "smooth" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .yt-body { background: #09090b; color: #f4f4f5; }

        /* NAV */
        .yt-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(9,9,11,0.85); backdrop-filter: blur(12px);
          border-bottom: 1px solid #27272a;
          padding: 0 max(24px, 5vw);
        }
        .yt-nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          height: 64px;
        }
        .yt-brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .yt-brand span { color: #f97316; }
        .yt-nav-links { display: flex; gap: 28px; font-size: 13px; font-weight: 600; }
        .yt-nav-links a { color: #a1a1aa; text-decoration: none; transition: color 0.2s; }
        .yt-nav-links a:hover { color: #f97316; }
        .yt-nav-cta {
          background: #f97316; color: #fff;
          padding: 9px 20px; border-radius: 100px;
          font-size: 13px; font-weight: 700;
          text-decoration: none; transition: background 0.2s;
          border: none; cursor: pointer;
        }
        .yt-nav-cta:hover { background: #ea580c; }

        /* HERO */
        .yt-hero {
          padding: 96px max(24px,5vw) 80px;
          text-align: center; position: relative; overflow: hidden;
        }
        .yt-hero::before {
          content: "";
          position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .yt-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.3);
          color: #fb923c; padding: 5px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .yt-hero h1 {
          font-size: clamp(36px, 7vw, 72px); font-weight: 800;
          line-height: 1.1; margin-bottom: 20px;
        }
        .yt-grad {
          background: linear-gradient(90deg, #f97316, #facc15);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .yt-hero p {
          color: #a1a1aa; font-size: 18px; max-width: 600px;
          margin: 0 auto 36px; line-height: 1.7;
        }
        .yt-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .yt-btn-primary {
          background: #fff; color: #09090b; padding: 14px 32px;
          border-radius: 12px; font-weight: 700; font-size: 16px;
          text-decoration: none; transition: background 0.2s, color 0.2s;
          border: none; cursor: pointer; font-family: 'Inter', sans-serif;
        }
        .yt-btn-primary:hover { background: #f97316; color: #fff; }
        .yt-btn-ghost {
          background: #18181b; border: 1px solid #27272a; color: #f4f4f5;
          padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;
          text-decoration: none; transition: background 0.2s;
          border: none; cursor: pointer; font-family: 'Inter', sans-serif;
        }
        .yt-btn-ghost:hover { background: #27272a; }

        /* SECTION BASE */
        .yt-section { padding: 80px max(24px,5vw); }
        .yt-section-dark { background: #0c0c0f; }
        .yt-container { max-width: 1200px; margin: 0 auto; }
        .yt-section-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px;
          text-transform: uppercase; color: #f97316; margin-bottom: 12px;
        }
        .yt-section-title {
          font-size: clamp(28px,4vw,40px); font-weight: 800; margin-bottom: 16px;
        }
        .yt-divider {
          width: 40px; height: 3px; background: #f97316;
          border-radius: 2px; margin-bottom: 24px;
        }

        /* BEFORE / AFTER SIDE BY SIDE */
        .yt-ba-section { padding: 64px max(24px,5vw); background: #0c0c0f; }
        .yt-ba-wrap { max-width: 1100px; margin: 0 auto; text-align: center; }
        .yt-ba-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px;
          text-transform: uppercase; color: #f97316; margin-bottom: 12px;
        }
        .yt-ba-title { font-size: clamp(22px,3vw,32px); font-weight: 800; margin-bottom: 8px; }
        .yt-ba-sub { font-size: 14px; color: #71717a; margin-bottom: 36px; }
        .yt-ba-grid {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center;
        }
        .yt-ba-card {
          border-radius: 20px; overflow: hidden; border: 1px solid #27272a;
          background: #18181b; position: relative;
        }
        .yt-ba-card img {
          width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover;
        }
        .yt-ba-pill {
          position: absolute; bottom: 14px; left: 14px;
          padding: 5px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .yt-ba-pill.before { background: rgba(0,0,0,0.7); color: #a1a1aa; border: 1px solid #3f3f46; }
        .yt-ba-pill.after  { background: #f97316; color: #fff; }
        .yt-ba-card-label {
          padding: 12px 16px 14px;
          font-size: 13px; font-weight: 700; color: #52525b; text-align: left;
        }
        .yt-ba-card-label.after-label { color: #fb923c; }
        .yt-ba-arrow-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; background: #18181b;
          border: 2px solid #f97316; border-radius: 50%; flex-shrink: 0;
          font-size: 20px; color: #f97316;
        }
        .yt-ba-improvements {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 28px;
        }
        .yt-ba-chip {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25);
          color: #fb923c; padding: 6px 14px; border-radius: 100px;
          font-size: 12px; font-weight: 700;
        }
        @media(max-width:600px) {
          .yt-ba-grid { grid-template-columns: 1fr; }
          .yt-ba-arrow-wrap { transform: rotate(90deg); margin: 0 auto; }
        }

        /* PROBLEM */
        .yt-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .yt-problem-list { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }
        .yt-problem-item { display: flex; align-items: flex-start; gap: 12px; color: #a1a1aa; font-size: 15px; }
        .yt-x { color: #ef4444; font-weight: 700; margin-top: 1px; }
        .yt-alert {
          background: rgba(239,68,68,0.08); border-left: 3px solid #ef4444;
          padding: 14px 18px; border-radius: 0 10px 10px 0; margin-top: 24px;
        }
        .yt-alert p { color: #f87171; font-weight: 700; font-size: 14px; }
        .yt-reality-card {
          background: #18181b; border: 1px solid #27272a;
          border-radius: 24px; padding: 32px; position: relative;
        }
        .yt-reality-tag {
          position: absolute; top: -14px; right: 20px;
          background: #f97316; color: #fff; font-size: 11px; font-weight: 700;
          padding: 6px 14px; border-radius: 8px;
        }
        .yt-ctr-bar { background: #27272a; border-radius: 100px; height: 8px; overflow: hidden; margin: 12px 0 4px; }
        .yt-ctr-fill { height: 100%; width: 22%; background: #ef4444; border-radius: 100px; }

        /* VALUE PROPS */
        .yt-vp-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .yt-vp-card {
          background: #18181b; border: 1px solid #27272a;
          border-radius: 20px; padding: 28px; text-align: center;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .yt-vp-card:hover {
          transform: translateY(-5px);
          border-color: rgba(249,115,22,0.4);
          box-shadow: 0 12px 32px rgba(249,115,22,0.12);
        }
        .yt-vp-icon { font-size: 28px; margin-bottom: 12px; }
        .yt-vp-card h4 { font-weight: 700; margin-bottom: 8px; }
        .yt-vp-card p { font-size: 13px; color: #71717a; line-height: 1.6; }

        /* PRICING */
        .yt-pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; align-items: start; }
        .yt-price-card {
          background: #18181b; border: 1px solid #27272a;
          border-radius: 24px; padding: 32px;
          display: flex; flex-direction: column;
          transition: border-color 0.2s;
        }
        .yt-price-card:hover { border-color: #3f3f46; }
        .yt-price-card.featured {
          border: 2px solid #f97316;
          box-shadow: 0 0 40px rgba(249,115,22,0.1);
          transform: scale(1.03);
        }
        .yt-rec-tag {
          background: #f97316; color: #000;
          font-size: 10px; font-weight: 800;
          padding: 3px 10px; border-radius: 0 0 8px 8px;
          position: absolute; top: 0; right: 24px;
          letter-spacing: 1px; text-transform: uppercase;
        }
        .yt-price-card-wrap { position: relative; }
        .yt-price-name { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .yt-price-sub { font-size: 13px; color: #71717a; margin-bottom: 20px; font-style: italic; }
        .yt-price-amt { font-size: 40px; font-weight: 800; margin-bottom: 4px; }
        .yt-price-unit { font-size: 16px; font-weight: 400; color: #71717a; }
        .yt-price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin: 24px 0 32px; flex: 1; }
        .yt-price-features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #d4d4d8; }
        .yt-check { color: #f97316; font-weight: 700; }
        .yt-price-btn {
          width: 100%; padding: 14px; border-radius: 12px;
          font-weight: 700; font-size: 15px; cursor: pointer;
          border: 1px solid #27272a; background: transparent; color: #f4f4f5;
          font-family: 'Inter', sans-serif; transition: background 0.2s;
        }
        .yt-price-btn:hover { background: #27272a; }
        .yt-price-btn.orange { background: #f97316; border: none; color: #fff; }
        .yt-price-btn.orange:hover { background: #ea580c; }

        /* PROCESS */
        .yt-process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; text-align: center; }
        .yt-process-num {
          width: 56px; height: 56px; border-radius: 50%;
          background: #18181b; border: 1px solid #27272a;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 800; color: #f97316;
          margin: 0 auto 20px;
        }
        .yt-process-title { font-weight: 700; margin-bottom: 8px; }
        .yt-process-desc { font-size: 13px; color: #71717a; line-height: 1.6; }

        /* WHY US */
        .yt-why-inner {
          background: #f97316; border-radius: 28px;
          padding: 56px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .yt-why-inner::before {
          content: ""; position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          background: rgba(255,255,255,0.07); pointer-events: none;
        }
        .yt-why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 640px; margin: 32px auto 0; }
        .yt-why-item {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 14px; padding: 16px;
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.8px;
        }

        /* CTA */
        .yt-cta-card {
          background: #18181b; border: 1px solid #27272a;
          border-radius: 28px; padding: 56px 48px;
          text-align: center; max-width: 760px; margin: 0 auto;
        }
        .yt-cta-card h2 { font-size: clamp(24px,4vw,40px); font-weight: 800; margin-bottom: 16px; }
        .yt-cta-card p { color: #71717a; font-size: 17px; margin-bottom: 36px; line-height: 1.6; }
        .yt-cta-btn {
          display: inline-block;
          background: #fff; color: #09090b;
          padding: 16px 48px; border-radius: 100px;
          font-weight: 800; font-size: 18px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .yt-cta-btn:hover { background: #f97316; color: #fff; transform: scale(1.04); }

        /* TERMS */
        .yt-terms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 48px; }
        .yt-term-label { font-weight: 700; color: #f4f4f5; font-size: 13px; margin-bottom: 6px; }
        .yt-term-val { font-size: 12px; color: #71717a; line-height: 1.7; }

        /* FOOTER */
        .yt-footer {
          background: #000; border-top: 1px solid #18181b;
          padding: 32px max(24px,5vw);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
        }
        .yt-footer p { font-size: 13px; color: #52525b; }

        /* RESPONSIVE */
        @media(max-width:768px) {
          .yt-nav-links { display: none; }
          .yt-problem-grid { grid-template-columns: 1fr; }
          .yt-vp-grid { grid-template-columns: 1fr 1fr; }
          .yt-pricing-grid { grid-template-columns: 1fr; }
          .yt-price-card.featured { transform: none; }
          .yt-process-grid { grid-template-columns: 1fr 1fr; }
          .yt-why-grid { grid-template-columns: 1fr 1fr; }
          .yt-terms-grid { grid-template-columns: 1fr; }
          .yt-cta-card { padding: 36px 24px; }
          .yt-why-inner { padding: 36px 24px; }
        }
      `}</style>

      <div className="yt-body">

        {/* NAV */}
        <nav className="yt-nav">
          <div className="yt-nav-inner">
            <div className="yt-brand">POSTER<span>BABU</span></div>
            <div className="yt-nav-links">
              <a href="#yt-problem">The Problem</a>
              <a href="#yt-pricing">Pricing</a>
              <a href="#yt-process">Process</a>
            </div>
            <a href="https://wa.me/917428091729?text=Hi PosterBabu! I want to get started with YouTube thumbnails." target="_blank" rel="noopener noreferrer" className="yt-nav-cta">
              Get Started
            </a>
          </div>
        </nav>

        {/* HERO */}
        <header className="yt-hero">
          <div className="yt-badge">🔥 We Design Clicks, Not Just Thumbnails</div>
          <h1>More Clicks. More Views.<br /><span className="yt-grad">More Growth.</span></h1>
          <p>In today's content-driven world, creating videos is not enough. PosterBabu helps creators grow through high-converting, performance-driven thumbnail designs.</p>
          <div className="yt-hero-btns">
            <button className="yt-btn-primary" onClick={() => document.getElementById("yt-pricing").scrollIntoView({ behavior: "smooth" })}>
              View Pricing
            </button>
            <a href="https://wa.me/917428091729?text=Hi PosterBabu! I want a YouTube thumbnail." target="_blank" rel="noopener noreferrer" className="yt-btn-ghost">
              WhatsApp Us
            </a>
          </div>
        </header>

        {/* BEFORE / AFTER SIDE BY SIDE */}
        <section className="yt-ba-section">
          <div className="yt-ba-wrap">
            <div className="yt-ba-label">🎬 Thumbnail Redesign</div>
            <h2 className="yt-ba-title">See the Difference We Make</h2>
            <p className="yt-ba-sub">Real client work — before and after PosterBabu</p>
            <div className="yt-ba-grid">
              <div className="yt-ba-card">
                <img src="/templates/before_cbse.png" alt="Before thumbnail" />
                <span className="yt-ba-pill before">Before</span>
                <div className="yt-ba-card-label">❌ Low CTR — bland, no hook</div>
              </div>
              <div className="yt-ba-arrow-wrap">→</div>
              <div className="yt-ba-card">
                <img src="/templates/after_cbse.jpg" alt="After thumbnail" />
                <span className="yt-ba-pill after">After ✨</span>
                <div className="yt-ba-card-label after-label">✅ High CTR — bold, eye-catching</div>
              </div>
            </div>
            <div className="yt-ba-improvements">
              {["✔ Clear & bold messaging", "✔ Strong visual hierarchy", "✔ High contrast readability", "✔ Designed to attract attention"].map(i => (
                <span key={i} className="yt-ba-chip">{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="yt-problem" className="yt-section yt-section-dark">
          <div className="yt-container">
            <div className="yt-problem-grid">
              <div>
                <div className="yt-section-label">⚠️ The Problem</div>
                <h2 className="yt-section-title">Why most videos don't get views</h2>
                <div className="yt-divider" />
                <div className="yt-problem-list">
                  <div className="yt-problem-item"><span className="yt-x">✕</span><span>Good content, but low clicks because of weak visuals.</span></div>
                  <div className="yt-problem-item"><span className="yt-x">✕</span><span>Thumbnails don't stand out in a crowded feed.</span></div>
                  <div className="yt-problem-item"><span className="yt-x">✕</span><span>No clear message or psychological hook.</span></div>
                  <div className="yt-problem-item"><span className="yt-x">✕</span><span>Viewers don't feel compelled to click immediately.</span></div>
                </div>
                <div className="yt-alert"><p>Result: Low CTR → Low Views → Slow Growth</p></div>
              </div>
              <div className="yt-reality-card">
                <div className="yt-reality-tag">Fact: Decisions happen in seconds</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, marginTop: 12 }}>The Harsh Reality</h4>
                <p style={{ color: "#a1a1aa", lineHeight: 1.7, marginBottom: 20 }}>
                  If people don't click, your content doesn't get seen. Your thumbnail is the <strong style={{ color: "#f4f4f5" }}>first impression</strong>. Weak thumbnails get ignored.
                </p>
                <div className="yt-ctr-bar"><div className="yt-ctr-fill" /></div>
                <p style={{ fontSize: 12, color: "#52525b", fontStyle: "italic" }}>Average CTR for ignored channels: ~2%</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="yt-section">
          <div className="yt-container">
            <h2 style={{ textAlign: "center", fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, marginBottom: 48 }}>A Strong Thumbnail Can...</h2>
            <div className="yt-vp-grid">
              {[
                { icon: "👀", title: "Grab Attention", desc: "Instantly stop the scroll with bold, psychology-driven visuals." },
                { icon: "📊", title: "Increase CTR", desc: "Statistically proven to drive significantly more clicks." },
                { icon: "🚀", title: "Boost Views", desc: "Trigger the algorithm with higher engagement and watch time." },
                { icon: "🧠", title: "Build Identity", desc: "Consistent branding that makes your channel recognizable." },
              ].map(v => (
                <div key={v.title} className="yt-vp-card">
                  <div className="yt-vp-icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 48, fontSize: 22, fontWeight: 800, color: "#f97316" }}>
              Better Thumbnail = More Clicks = More Growth
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section id="yt-pricing" className="yt-section yt-section-dark">
          <div className="yt-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 12 }}>Simple, Transparent Pricing</h2>
              <p style={{ color: "#71717a" }}>Choose a plan that fits your growth pace.</p>
            </div>
            <div className="yt-pricing-grid">
              {/* Single */}
              <div className="yt-price-card-wrap">
                <div className="yt-price-card">
                  <div className="yt-price-name">Single Shot</div>
                  <div className="yt-price-sub">Perfect for occasional videos</div>
                  <div className="yt-price-amt">₹700 <span className="yt-price-unit">/thumbnail</span></div>
                  <ul className="yt-price-features">
                    {["High-quality CTR design", "Tailored to your content", "02-04 hr delivery", "1 revisions included"].map(f => (
                      <li key={f}><span className="yt-check">✓</span> {f}</li>
                    ))}
                  </ul>
                  <button className="yt-price-btn" onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to order a single YouTube thumbnail.", "_blank")}>
                    Order Single
                  </button>
                </div>
              </div>

              {/* Monthly — Featured */}
              <div className="yt-price-card-wrap">
                <div className="yt-rec-tag">Recommended</div>
                <div className="yt-price-card featured">
                  <div className="yt-price-name">Creator Growth</div>
                  <div className="yt-price-sub" style={{ color: "#f97316" }}>Best for consistent creators</div>
                  <div className="yt-price-amt">₹6,500 <span className="yt-price-unit">/month</span></div>
                  <p style={{ fontSize: 12, color: "#71717a", marginBottom: 4 }}>10 thumbnails · Save ₹500/month</p>
                  <ul className="yt-price-features">
                    {["10 thumbnails per month", "Priority queue", "Monthly design strategy", "Dedicated support"].map(f => (
                      <li key={f}><span className="yt-check">✓</span> {f}</li>
                    ))}
                  </ul>
                  <button className="yt-price-btn orange" onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to subscribe to the monthly thumbnail plan.", "_blank")}>
                    Select Monthly
                  </button>
                </div>
              </div>

              {/* Social */}
              <div className="yt-price-card-wrap">
                <div className="yt-price-card">
                  <div className="yt-price-name">Social Creative</div>
                  <div className="yt-price-sub">Instagram, FB & Branding</div>
                  <div className="yt-price-amt">₹149 <span className="yt-price-unit">/post</span></div>
                  <ul className="yt-price-features">
                    {["Brand-consistent posts", "All social formats", "Modern visual styles", "Bulk plans available"].map(f => (
                      <li key={f}><span className="yt-check">✓</span> {f}</li>
                    ))}
                  </ul>
                  <button className="yt-price-btn" onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want social media creatives.", "_blank")}>
                    Inquire Socials
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="yt-process" className="yt-section">
          <div className="yt-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="yt-section-label" style={{ textAlign: "center" }}>How We Work</div>
              <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800 }}>Our Simple Process</h2>
            </div>
            <div className="yt-process-grid">
              {[
                { n: "01", t: "Understand", d: "We analyse your topic, title, and vision." },
                { n: "02", t: "Strategy", d: "We develop a strong hook to bait clicks." },
                { n: "03", t: "Design", d: "Bold, mobile-first visuals for max CTR." },
                { n: "04", t: "Deliver", d: "Refine based on feedback & ship in 02-04 hrs." },
              ].map(s => (
                <div key={s.n}>
                  <div className="yt-process-num">{s.n}</div>
                  <div className="yt-process-title">{s.t}</div>
                  <div className="yt-process-desc">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="yt-section yt-section-dark">
          <div className="yt-container">
            <div className="yt-why-inner">
              <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#fff" }}>Why Choose PosterBabu?</h2>
              <div className="yt-why-grid">
                {["⚡ Fast Delivery", "🎯 CTR-Focused", "💎 Consistent Quality", "💬 Smooth Chat", "🤝 Long-term Support", "🎨 Custom Direction"].map(w => (
                  <div key={w} className="yt-why-item">{w}</div>
                ))}
              </div>
              <p style={{ marginTop: 28, fontSize: 17, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>
                We don't just work for you — we grow with you.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="yt-section">
          <div className="yt-container">
            <div className="yt-cta-card">
              <h2>Ready to improve your video performance?</h2>
              <p>Don't leave your clicks to chance. Let's start with your next thumbnail today.</p>
              <button className="yt-cta-btn" onClick={() => window.open("https://wa.me/917428091729?text=Hi PosterBabu! I want to improve my YouTube thumbnail CTR.", "_blank")}>
                START MY PROJECT →
              </button>
            </div>
          </div>
        </section>

        {/* TERMS */}
        <section className="yt-section" style={{ borderTop: "1px solid #18181b" }}>
          <div className="yt-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Terms & Conditions</h3>
              <span style={{ fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: "1px" }}>Please read carefully</span>
            </div>
            <div className="yt-terms-grid">
              {[
                { l: "💰 Payment", v: "50% advance before starting · 50% after final delivery · Monthly plans paid 100% in advance." },
                { l: "🔁 Revisions", v: "1–2 revisions included. Additional revisions are chargeable." },
                { l: "⏱ Delivery", v: "Standard: 02-04 hours · Urgent delivery available at extra cost." },
                { l: "🚫 Refund Policy", v: "No refunds once work has started. Advance is non-refundable after initiation." },
                { l: "📅 Monthly Plan", v: "Fixed number of thumbnails per month. Unused designs do not carry forward." },
                { l: "📢 Usage Rights", v: "Full usage rights after final payment. PosterBabu may showcase work in portfolio." },
              ].map(t => (
                <div key={t.l}>
                  <div className="yt-term-label">{t.l}</div>
                  <div className="yt-term-val">{t.v}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 32, fontSize: 10, color: "#3f3f46", textAlign: "center", fontStyle: "italic", borderTop: "1px solid #18181b", paddingTop: 24 }}>
              Final design decisions will be made based on performance, clarity, and best practices. Professional conduct expected throughout.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="yt-footer">
          <div className="yt-brand" style={{ fontSize: 18 }}>POSTER<span style={{ color: "#f97316" }}>BABU</span></div>
          <p>© 2026 PosterBabu. We don't just design thumbnails — we design clicks.</p>
        </footer>

      </div>
    </div>
  );
};

export default YTClientsPage;
