import React from "react";
const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    type: 'Shop Poster (₹149)',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello PosterBabu 👋\n\n*Name:* ${formData.name}\n*Business:* ${formData.business}\n*Poster Type:* ${formData.type}\n*Details:* ${formData.details}`;
    window.open(`https://wa.me/917428091729?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 px-4 animate-in fade-in duration-500">
      <div className="max-w-xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border shadow-2xl shadow-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3">Start Your Order</h2>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-black mb-6">
               <Zap size={14} fill="currentColor" /> MOST ORDERS DELIVERED IN UNDER 20 MINS
            </div>
            <p className="text-slate-500">Opening WhatsApp will not charge you. Draft first, pay later!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Your Name</label>
              <input 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all font-medium"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Business Name</label>
              <input 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all font-medium"
                placeholder="e.g. Sharma Kirana Store"
                value={formData.business}
                onChange={e => setFormData({...formData, business: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Service Type</label>
              <select 
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold appearance-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Fast Draft (₹49)</option>
                <option>Shop Poster (₹149)</option>
                <option>YT Thumbnail (₹99)</option>
                <option>IG Post (₹79)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Poster Details</label>
              <textarea 
                required
                rows="4"
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all font-medium"
                placeholder="What do you want to write on the poster?"
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
              ></textarea>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-black text-xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all active:scale-95">
              <MessageCircle fill="currentColor" /> Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};