import React from "react";
const ServicesPage = () => (
  <section className="py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4">What We Design for You</h2>
        <p className="text-slate-500 max-w-xl mx-auto">From street banners to viral social media posts, we handle every visual need of your business.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <div key={i} className="bg-white border rounded-3xl p-8 hover:border-orange-500 transition-all group shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors shrink-0">
                {React.cloneElement(cat.icon, { size: 32 })}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{cat.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <span key={j} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);