import React from "react";
const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Salon', 'Gym', 'Cafe', 'Retail', 'Coaching', 'Festival'];
  
  const filteredItems = filter === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.cat === filter);

  return (
    <section className="py-16 px-4 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Our Best Work</h2>
          <p className="text-slate-500">Real designs delivered to local shop owners across India.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === c ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative bg-white p-3 rounded-3xl border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
              </div>
              <div className="px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block mb-1">{item.cat}</span>
                <div className="font-bold text-sm leading-tight text-slate-900">{item.title}</div>
              </div>
              <div className="absolute inset-0 bg-orange-600/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <button onClick={() => window.open("https://wa.me/917428091729")} className="bg-white text-orange-600 px-4 py-2 rounded-full text-xs font-black shadow-xl scale-90 group-hover:scale-100 transition-transform">Get Style Like This</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};