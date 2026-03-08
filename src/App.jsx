import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Zap, 
  CheckCircle, 
  Smartphone, 
  Clock, 
  Languages, 
  Printer, 
  ChevronRight,
  User,
  Store,
  FileText,
  Youtube,
  Instagram,
  Image as ImageIcon,
  Palette,
  Star,
  IndianRupee,
  Mail,
  MapPin,
  Menu,
  X,
  Layout,
  Send,
  Facebook,
  Award,
  TrendingUp,
  Users,
  ThumbsUp
} from 'lucide-react';

// --- Data Constants ---

const SERVICE_CATEGORIES = [
  {
    id: "shop",
    title: "Shop Posters",
    desc: "Sale posters, Opening announcements, Discount offers, Retail promotions.",
    icon: <Store />,
    items: ["Grand Opening Banners", "Flash Sale Flyers", "Product Price Lists"]
  },
  {
    id: "social",
    title: "Social Media Designs",
    desc: "Instagram posts, Facebook posts, Offer creatives, Festival greetings.",
    icon: <Instagram />,
    items: ["Daily Status Updates", "Engagement Posts", "Festival Wishes"]
  },
  {
    id: "business",
    title: "Business Promotions",
    desc: "Tuition admission posters, Gym membership promotions, Cafe menu offers, Salon packages.",
    icon: <Zap />,
    items: ["Admission Open Flyers", "Menu Design", "Service Catalogues"]
  },
  {
    id: "print",
    title: "Print Designs",
    desc: "A4 flyers, Shop posters, Menu cards, Event posters.",
    icon: <Printer />,
    items: ["High-Res Banners", "Visiting Cards", "Pamphlets"]
  }
];

const PRICING_PLANS = [
  {
    name: "Fast Draft",
    oldPrice: 99,
    newPrice: 49,
    tagline: "Launch Offer",
    features: [
      "Template-based design",
      "Text + logo edits",
      "15–20 min delivery",
      "1 revision",
      "WhatsApp delivery"
    ],
    buttonText: "Order Draft",
    highlight: false
  },
  {
    name: "Custom Design",
    oldPrice: 199,
    newPrice: 99,
    tagline: "Best Seller",
    features: [
      "Fully customized design",
      "Premium layout",
      "HD export (Print Ready)",
      "2 revisions",
      "Poster or flyer format"
    ],
    buttonText: "Order Custom",
    highlight: true
  },
  {
    name: "Monthly Plan",
    oldPrice: 899,
    newPrice: 399,
    tagline: "Monthly Growth",
    features: [
      "5 designs monthly",
      "Fast Draft + Custom mix",
      "HD print-ready files",
      "Priority delivery",
      "WhatsApp Support"
    ],
    buttonText: "Join Monthly",
    highlight: false
  }
];

const PORTFOLIO_ITEMS = [
  { id: 1, cat: "Salon", title: "Glow Salon Opening", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" },
  { id: 2, cat: "Gym", title: "Iron Fitness 50% Off", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
  { id: 3, cat: "Cafe", title: "Chai Chaska Menu", img: "https://images.unsplash.com/photo-1501339817302-ee4f89db0fe0?auto=format&fit=crop&w=600&q=80" },
  { id: 4, cat: "Retail", title: "Kirana Big Sale", img: "https://images.unsplash.com/photo-1604719312563-8912e9223c6a?auto=format&fit=crop&w=600&q=80" },
  { id: 5, cat: "Coaching", title: "Maths Admission Open", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" },
  { id: 6, cat: "Festival", title: "Diwali Special Offer", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" },
  { id: 7, cat: "Salon", title: "Bridal Makeup Pack", img: "https://images.unsplash.com/photo-1522337363553-5605d99345bc?auto=format&fit=crop&w=600&q=80" },
  { id: 8, cat: "Gym", title: "New Year Membership", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80" },
  { id: 9, cat: "Cafe", title: "Fresh Burger Combo", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80" },
  { id: 10, cat: "Retail", title: "Electronics Dhamaka", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80" },
  { id: 11, cat: "Coaching", title: "English Speaking Class", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" },
  { id: 12, cat: "Festival", title: "Happy Holi Wishes", img: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80" },
];

const TESTIMONIALS = [
  { name: "Rahul", biz: "Gym Owner", text: "PosterBabu made my gym posters in 10 minutes! Really professional work.", rating: 5 },
  { name: "Sushma", biz: "Salon Owner", text: "I just send a WhatsApp and get beautiful designs for my parlor. Best service.", rating: 5 },
  { name: "Amit", biz: "Cafe Owner", text: "Very affordable and fast. They understand local customers very well.", rating: 5 },
];

// --- Sub-Components (Pages) ---

const HomePage = ({ navigate }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero Grid */}
    <section className="pt-12 md:pt-20 pb-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-20">
        <div className="text-center md:text-left">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6">
            FASTER THAN ORDERING CHAI ☕
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Need a Poster for <br/><span className="text-orange-600 font-extrabold italic">Your Shop?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
            Send Details on WhatsApp. Get Design in <span className="text-slate-900 font-bold underline decoration-orange-400 decoration-2">15 Minutes</span>. Starting at just <span className="font-black text-slate-900">₹49</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => window.open("https://wa.me/917428091729")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <MessageCircle fill="currentColor" /> Order on WhatsApp
            </button>
            <button 
              onClick={() => navigate('portfolio')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-5 rounded-2xl font-bold text-lg transition-all"
            >
              See Our Designs
            </button>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 text-center md:text-left mt-16 border-t pt-10">
            <div>
              <p className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-1">500+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Posters Delivered</p>
            </div>
            <div className="border-x">
              <p className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-1">120+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Local Businesses</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-600 flex items-center justify-center md:justify-start gap-1">4.9★</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative group flex justify-center">
          <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0"></div>
          <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-xs sm:max-w-sm overflow-hidden rotate-2 group-hover:rotate-0 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" 
              alt="Sample Salon Poster"
              className="rounded-[2rem] object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border w-[80%] text-center">
              <p className="text-[10px] font-black uppercase text-orange-600 mb-1">Live Sample</p>
              <p className="font-bold text-sm text-slate-900 leading-tight">Glow Beauty Salon Opening</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Samples Grid */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-12">Popular Designs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PORTFOLIO_ITEMS.slice(0, 4).map(item => (
            <div key={item.id} className="group relative bg-white p-3 rounded-3xl shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              </div>
              <div className="px-2 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1 block">{item.cat}</span>
                <div className="font-bold text-sm leading-tight text-slate-800">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigate('portfolio')} className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto hover:bg-orange-600 transition-all">
            View Complete Portfolio <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>

    {/* WhatsApp Testimonials */}
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative">
              <div className="flex gap-1 mb-4 text-orange-500">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 font-medium italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">{t.biz}</div>
                </div>
              </div>
              <div className="absolute top-6 right-8 opacity-10">
                <MessageCircle size={48} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

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

const ContactPage = () => (
  <section className="py-16 px-4 animate-in fade-in duration-500">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4 tracking-tight">We're Here to Help</h2>
        <p className="text-slate-500">Building trust through 24/7 support and local understanding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Contact Details</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-slate-100">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                  <p className="font-bold text-slate-800">help.posterbabu@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp</p>
                  <p className="font-bold text-slate-800">+91 7428091729</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Business Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Monday – Saturday</span>
                <span className="font-bold">10 AM – 8 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Sunday</span>
                <span className="font-bold text-orange-600">Special Requests Only</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border p-8 md:p-10 rounded-[2.5rem] shadow-lg">
          <h3 className="text-xl font-bold mb-8">Quick Query</h3>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400">Full Name</label>
              <input className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400">Email/Phone</label>
              <input className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium" placeholder="How to reach you?" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400">Message</label>
              <textarea rows="4" className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium" placeholder="Write your message..."></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App Component ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // SEO and Page change effects
  useEffect(() => {
    document.title = "PosterBabu | Fast Poster Design for Local Businesses";
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const navigate = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage navigate={navigate} />;
      case 'services': return <ServicesPage />;
      case 'portfolio': return <PortfolioPage />;
      case 'pricing': return <PricingPage navigate={navigate} />;
      case 'order': return <OrderPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'order', label: 'Order' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="bg-orange-600 text-white p-1.5 rounded-lg shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter text-orange-600 uppercase">POSTER<span className="text-slate-900">BABU</span></span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => navigate(link.id)}
                className={`hover:text-orange-600 transition-colors relative ${currentPage === link.id ? 'text-orange-600' : ''}`}
              >
                {link.label}
                {currentPage === link.id && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 rounded-full"></div>}
              </button>
            ))}
          </div>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('order')}
              className="hidden md:flex bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-slate-200"
            >
              Order Now
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b absolute top-16 left-0 w-full animate-in slide-in-from-top duration-300">
            <div className="p-4 space-y-4 font-bold text-slate-600">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => navigate(link.id)}
                  className={`block w-full text-left p-3 rounded-xl transition-colors ${currentPage === link.id ? 'bg-orange-50 text-orange-600' : 'hover:bg-slate-50'}`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => navigate('order')}
                className="w-full bg-orange-600 text-white p-4 rounded-xl font-black text-center"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="bg-orange-600 text-white p-1 rounded">
                  <Zap size={20} fill="currentColor" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">PosterBabu</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 mx-auto md:mx-0">Empowering local Indian businesses with world-class design services delivered in minutes via WhatsApp.</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"><Instagram size={20} /></div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"><Facebook size={20} /></div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"><MessageCircle size={20} /></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white underline decoration-orange-600 decoration-2 underline-offset-4">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button onClick={() => navigate(link.id)} className="hover:text-orange-500 transition-colors">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white underline decoration-orange-600 decoration-2 underline-offset-4">Contact</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li className="flex items-center gap-2 justify-center md:justify-start"><Mail size={16} /> help.posterbabu@gmail.com</li>
                <li className="flex items-center gap-2 justify-center md:justify-start"><MessageCircle size={16} /> +91 7428091729</li>
                <li className="flex items-center gap-2 justify-center md:justify-start"><MapPin size={16} /> New Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} PosterBabu Design Studio • Proudly Desi 🇮🇳
          </div>
        </div>
      </footer>

      {/* Floating Action - Direct WhatsApp Contact */}
      {currentPage !== 'order' && (
        <button 
          onClick={() => window.open("https://wa.me/917428091729")}
          className="fixed bottom-6 right-6 z-40 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-4 border-white font-bold"
        >
          <MessageCircle size={24} fill="currentColor" /> <span className="hidden sm:inline">Chat Now</span>
        </button>
      )}
    </div>
  );
};

export default App;