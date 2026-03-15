import React from "react";
import { MessageCircle, Zap, CheckCircle, Star, Store, Tag } from "lucide-react";

/* ENTRY OFFERS */

const ENTRY_OFFERS = [
{
name: "Fast Edit",
oldPrice: 99,
newPrice: 49,
tagline: "Perfect for quick updates",
features: [
"Edit existing poster",
"Text or offer update",
"Delivered fast"
],
button: "Edit My Poster"
},
{
name: "Custom Poster",
oldPrice: 299,
newPrice: 149,
tagline: "Designed for your business",
features: [
"Custom poster design",
"Instagram / WhatsApp size",
"HD file delivery",
"Delivered within an hour"
],
button: "Create My Poster",
highlight: true
}
];

/* TESTIMONIALS */

const TESTIMONIALS = [
{
name: "Rahul",
biz: "Gym Owner",
text: "PosterBabu made my gym posters in 10 minutes. Extremely professional.",
rating: 5
},
{
name: "Sushma",
biz: "Salon Owner",
text: "I just send a WhatsApp message and get beautiful designs instantly.",
rating: 5
},
{
name: "Amit",
biz: "Cafe Owner",
text: "Very affordable and quick. Perfect for small businesses.",
rating: 5
}
];

const GALLERY = [
"/templates/salon-opening.png",
"/templates/salon-makeup.png",
"/templates/gym-offer.png",
"/templates/gym-membership.png",
"/templates/catering-service.png",
"/templates/sweets-menu.png",
"/templates/kirana-sale.png",
"/templates/coaching-admission.png"
];

/* WHATSAPP */

const openWhatsApp = (context = "") => {

const baseMessage = context
? `Hi PosterBabu! I'm interested in: ${context}.\n\nBusiness Name:\nPoster Details:`
: "Hi PosterBabu! I want to order a poster for my business.";

window.open(
`https://wa.me/917428091729?text=${encodeURIComponent(baseMessage)}`,
"_blank"
);

};

const Homepage = ({ navigate }) => {

return (

<div className="animate-in fade-in duration-500">

{/* HERO */}

<section className="pt-16 md:pt-28 pb-20 px-4">

<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

{/* LEFT */}

<div className="flex-1 text-center md:text-left">

<div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-8 uppercase">
<Zap size={14} fill="currentColor"/>
Fast Poster Design Service
</div>

<h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900">
Professional Posters <br/>
for Your Business in <span className="text-orange-600">Minutes</span>
</h1>

<p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
Promotional posters, offer creatives, and festival designs made for local businesses and delivered instantly via WhatsApp.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

<button
onClick={() => openWhatsApp("Poster Order")}
className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95"
>
<MessageCircle fill="currentColor"/>
Order on WhatsApp
</button>

<button
onClick={() => navigate("pricing")}
className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-10 py-5 rounded-2xl font-bold text-xl"
>
View Pricing
</button>

</div>

{/* TRUST */}

<div className="flex flex-col sm:flex-row gap-6 mt-8 text-sm text-slate-600 font-semibold">

<div className="flex items-center gap-2">
<Star size={16} fill="currentColor" className="text-orange-500"/>
4.9 Customer Rating
</div>

<div>
Trusted by 20+ Local Businesses
</div>

<div>
⚡ Delivered in 10–30 minutes
</div>

</div>

{/* STATS */}

<div className="grid grid-cols-3 text-center md:text-left mt-16 border-t pt-10">

<div>
<p className="text-3xl font-black text-slate-900">100+</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Posters Delivered
</p>
</div>

<div className="border-x">
<p className="text-3xl font-black text-slate-900">20+</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Businesses Served
</p>
</div>

<div>
<p className="text-3xl font-black text-orange-600">4.9★</p>
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
Customer Rating
</p>
</div>

</div>

</div>

{/* RIGHT HERO IMAGE */}

<div className="flex-1 relative hidden md:block">

<div className="relative bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">

<img
src="/templates/gym-offer.png"
alt="Poster Example"
className="rounded-[2.5rem] w-full h-[500px] object-cover"
/>

<div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-slate-100">

<p className="text-[10px] font-black text-orange-600 uppercase mb-1">
Sample Poster
</p>

<p className="font-bold text-slate-900 text-sm leading-tight">
Special 50% Off Gym Membership
</p>

</div>

</div>

</div>

</div>

</section>

{/* WHAT IS POSTERBABU */}

<section className="py-20 bg-gradient-to-b from-white to-gray-50">

<div className="max-w-6xl mx-auto px-6 text-center">

<h2 className="text-4xl font-bold text-gray-900">
What is PosterBabu?
</h2>

<div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6 rounded"></div>

<p className="text-gray-600 max-w-2xl mx-auto text-lg">
PosterBabu helps local businesses get professional promotional posters quickly.
Send your request on WhatsApp and receive ready-to-post designs within minutes.
</p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">

<div className="w-14 h-14 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full mx-auto mb-5">
<Store size={28}/>
</div>

<h3 className="text-xl font-semibold mb-3">
For Local Businesses
</h3>

<p className="text-gray-600">
Perfect for salons, gyms, cafes, shops, and coaching centers.
</p>

</div>

<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">

<div className="w-14 h-14 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full mx-auto mb-5">
<Zap size={28}/>
</div>

<h3 className="text-xl font-semibold mb-3">
Fast Delivery
</h3>

<p className="text-gray-600">
Get ready-to-post designs delivered to your WhatsApp in minutes.
</p>

</div>

<div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">

<div className="w-14 h-14 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full mx-auto mb-5">
<Tag size={28}/>
</div>

<h3 className="text-xl font-semibold mb-3">
Affordable Pricing
</h3>

<p className="text-gray-600">
Professional poster designs starting at just ₹49.
</p>

</div>

</div>

</div>

</section>

{/* POSTER GALLERY */}

<section className="py-24 px-4 bg-slate-50">

<div className="max-w-6xl mx-auto">

<div className="text-center mb-16">

<h2 className="text-4xl font-black mb-4">
Poster Gallery
</h2>

<p className="text-slate-500">
Examples of posters created for local businesses
</p>

</div>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{GALLERY.map((img,i)=>(

<div
key={i}
className="group rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
>

<img
src={img}
alt="Poster sample"
className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
/>

</div>

))}

</div>

</div>

</section>

{/* ENTRY OFFERS */}

<section className="py-24 bg-slate-50 px-4">

<div className="max-w-4xl mx-auto">

<div className="text-center mb-16">

<h2 className="text-4xl font-black mb-4">
Try PosterBabu Today
</h2>

<p className="text-slate-500 italic">
Affordable entry pricing. No commitment required.
</p>

</div>

<div className="grid md:grid-cols-2 gap-8">

{ENTRY_OFFERS.map((offer,i)=>(

<div
key={i}
className={`bg-white p-10 rounded-3xl border-2 flex flex-col ${
offer.highlight
? "border-orange-500 shadow-xl"
: "border-slate-100"
}`}
>

<span className="text-xs font-black uppercase tracking-widest text-slate-400">
{offer.tagline}
</span>

<h3 className="text-3xl font-black mt-2 mb-4">
{offer.name}
</h3>

<div className="text-5xl font-black mb-6">
₹{offer.newPrice}
<span className="text-xl text-slate-400 line-through ml-2">
₹{offer.oldPrice}
</span>
</div>

<ul className="space-y-3 mb-8">

{offer.features.map((f,j)=>(
<li key={j} className="flex items-center gap-3 text-slate-600 font-bold">
<CheckCircle size={18} className="text-green-500"/>
{f}
</li>
))}

</ul>

<button
onClick={()=>openWhatsApp(offer.name)}
className={`py-4 rounded-xl font-black ${
offer.highlight
? "bg-orange-600 text-white"
: "bg-slate-100"
}`}
>
{offer.button}
</button>

</div>

))}

</div>

</div>

</section>

{/* TESTIMONIALS */}

<section className="py-24 px-4">

<div className="max-w-6xl mx-auto">

<h2 className="text-3xl font-black text-center mb-16">
What Our Clients Say
</h2>

<div className="grid md:grid-cols-3 gap-8">

{TESTIMONIALS.map((t,i)=>(

<div key={i} className="bg-slate-50 p-8 rounded-2xl">

<div className="flex gap-1 text-orange-500 mb-4">

{[...Array(t.rating)].map((_,j)=>(
<Star key={j} size={14} fill="currentColor"/>
))}

</div>

<p className="italic mb-6">
"{t.text}"
</p>

<div className="font-bold">
{t.name}
</div>

<div className="text-xs text-orange-600 font-bold uppercase">
{t.biz}
</div>

</div>

))}

</div>

</div>

</section>

{/* FINAL CTA */}

<section className="py-24 px-6">

<div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl shadow-2xl p-14 text-center">

<h2 className="text-4xl md:text-5xl font-black mb-6">
Ready to Promote Your Business?
</h2>

<p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
Order your first promotional poster in minutes.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center">

<button
onClick={()=>navigate("services")}
className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition shadow-md"
>
View Services
</button>

<button
onClick={()=>navigate("pricing")}
className="bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition"
>
View Pricing
</button>

<button
onClick={()=>navigate("order")}
className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition shadow-lg"
>
Order Now
</button>

</div>

</div>

</section>

{/* FLOATING WHATSAPP */}

<button
onClick={()=>openWhatsApp()}
className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl z-50"
>
<MessageCircle/>
</button>

</div>

);

};

export default Homepage;