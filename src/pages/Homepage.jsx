import React from "react";
import { MessageCircle, ChevronRight, Star, User } from "lucide-react";

const PORTFOLIO_ITEMS = [
{ id:1, cat:"Salon", title:"Glow Salon Opening", img:"/templates/salon-opening.png"},
{ id:2, cat:"Salon", title:"Bridal Makeup Pack", img:"/templates/salon-makeup.png"},
{ id:3, cat:"Gym", title:"Iron Fitness 50% Off", img:"/templates/gym-offer.png"},
{ id:4, cat:"Gym", title:"New Year Membership Offer", img:"/templates/gym-membership.png"}
];

const TESTIMONIALS = [
{ name:"Rohit Sharma", biz:"Salon Owner", text:"Amazing design and super fast delivery!", rating:5 },
{ name:"Amit Gupta", biz:"Gym Owner", text:"PosterBabu helped my gym attract more customers.", rating:5 },
{ name:"Priya Verma", biz:"Cafe Owner", text:"Great designs and affordable pricing.", rating:5 }
];

const Homepage = ({ navigate }) => (

<div className="animate-in fade-in duration-500">

{/* HERO SECTION */}

<section className="pt-12 md:pt-20 pb-24 px-4">

<div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-20">

<div className="text-center md:text-left">

<div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6">
FASTER THAN ORDERING CHAI ☕
</div>

<h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
Need a Poster for <br/>
<span className="text-orange-600 font-extrabold italic">
Your Business?
</span>
</h1>

<p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
Send Details on WhatsApp. Get Design in
<span className="text-slate-900 font-bold underline decoration-orange-400 decoration-2">
 15 Minutes
</span>. Starting at just
<span className="font-black text-slate-900"> ₹49 - Launch Offer 🔥</span>.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

<button
onClick={() => window.open("https://wa.me/917428091729")}
className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-95"

>

<MessageCircle fill="currentColor" />
Order on WhatsApp
</button>

<button
onClick={() => navigate("portfolio")}
className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-5 rounded-2xl font-bold text-lg transition-all"

>

See Our Designs </button>

</div>

{/* TRUST STATS */}

<div className="grid grid-cols-3 text-center md:text-left mt-16 border-t pt-10">

<div>
<p className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-1">
100+
</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Posters Delivered
</p>
</div>

<div className="border-x">
<p className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-1">
120+
</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Local Businesses
</p>
</div>

<div>
<p className="text-3xl font-black text-orange-600 flex items-center justify-center md:justify-start gap-1">
4.9★
</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Customer Rating
</p>
</div>

</div>

</div>

{/* HERO POSTER CARD */}

<div className="relative group flex justify-center">

<div className="absolute -inset-4 bg-orange-100 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0"></div>

<div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-xs sm:max-w-sm overflow-hidden rotate-2 group-hover:rotate-0 transition-transform">

<img
src="/templates/salon-opening.png"
alt="Sample Poster"
className="rounded-[2rem] object-cover w-full h-[400px]"
/>

<div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border w-[80%] text-center">

<p className="text-[10px] font-black uppercase text-orange-600 mb-1">
Live Sample
</p>

<p className="font-bold text-sm text-slate-900 leading-tight">
Glow Beauty Salon Opening
</p>

</div>

</div>

</div>

</div>

</section>

{/* PORTFOLIO PREVIEW */}

<section className="py-20 bg-slate-50">

<div className="max-w-6xl mx-auto px-4">

<h2 className="text-3xl font-black text-center mb-12">
Popular Designs
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{PORTFOLIO_ITEMS.slice(0,4).map((item) => (

<div
key={item.id}
className="group relative bg-white p-3 rounded-3xl shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all"
>

<div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">

<img
src={item.img}
alt={item.title}
className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
/>

</div>

<div className="px-2 pb-2">

<span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1 block">
{item.cat}
</span>

<div className="font-bold text-sm leading-tight text-slate-800">
{item.title}
</div>

</div>

</div>

))}

</div>

<div className="text-center mt-12">

<button
onClick={() => navigate("portfolio")}
className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto hover:bg-orange-600 transition-all"

>

View Complete Portfolio

<ChevronRight size={18} />

</button>

</div>

</div>

</section>

{/* TESTIMONIALS */}

<section className="py-20 px-4">

<div className="max-w-6xl mx-auto">

<h2 className="text-3xl font-black text-center mb-16">
What Our Clients Say
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

{TESTIMONIALS.map((t,i)=>(

<div
key={i}
className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative"
>

<div className="flex gap-1 mb-4 text-orange-500">

{[...Array(t.rating)].map((_,j)=>( <Star key={j} size={16} fill="currentColor"/>
))}

</div>

<p className="text-slate-700 font-medium italic mb-6">
"{t.text}"
</p>

<div className="flex items-center gap-3">

<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
<User size={20}/>
</div>

<div>

<div className="font-bold text-slate-900">
{t.name}
</div>

<div className="text-xs text-orange-600 font-bold uppercase tracking-wider">
{t.biz}
</div>

</div>

</div>

<div className="absolute top-6 right-8 opacity-10">
<MessageCircle size={48}/>
</div>

</div>

))}

</div>

</div>

</section>

</div>

);

export default Homepage;
