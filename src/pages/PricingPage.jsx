import React from "react";
const PricingPage = ({ navigate }) => (
  <section className="py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4">Simple & Transparent Pricing</h2>
        <p className="text-slate-500">Fast delivery, High quality, No hidden charges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan, i) => {
          const savings = plan.oldPrice - plan.newPrice;
          return (
            <div key={i} className={`bg-white p-8 rounded-[2.5rem] border-2 flex flex-col relative transition-all hover:shadow-xl ${plan.highlight ? 'border-orange-500 scale-105 shadow-2xl shadow-orange-100 z-10' : 'border-slate-100'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">MOST POPULAR</div>
              )}
              <div className="mb-6">
                <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">{plan.tagline}</span>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black">₹{plan.newPrice}</span>
                  <span className="text-slate-400 line-through text-lg mb-1">₹{plan.oldPrice}</span>
                </div>
                <div className="text-green-600 text-xs font-black mt-2 bg-green-50 inline-block px-2 py-1 rounded uppercase tracking-tighter">
                  Save ₹{savings} Instant
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle size={18} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('order')}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bulk/3-Month Plan */}
      <div className="mt-16 bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-orange-400" />
            <span className="text-orange-400 font-bold tracking-widest uppercase text-xs">Best Value Plan</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">3 Month Growth Plan</h3>
          <p className="text-indigo-200 mb-6 max-w-md">Our most trusted plan for businesses looking for consistent marketing and priority support.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-indigo-100">
            <span className="flex items-center gap-2"><CheckCircle size={16} /> 5 Designs / Month</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} /> HD Print Files</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} /> Priority Support</span>
          </div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-5xl font-black mb-1">₹899</div>
          <div className="text-indigo-300 line-through mb-1">₹1999</div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black mb-6">SAVE ₹1100 TOTAL</div>
          <button onClick={() => navigate('order')} className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-orange-400 hover:text-white transition-all">Select Best Value</button>
        </div>
      </div>
    </div>
  </section>
);