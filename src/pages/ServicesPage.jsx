import React from "react";
import { Store, Instagram, Zap, Printer } from "lucide-react";

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

const ServicesPage = () => (

<section className="py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

<div className="max-w-6xl mx-auto">

{/* HEADER */}

<div className="text-center mb-16">

<h2 className="text-4xl font-black mb-4">
What We Design for You
</h2>

<div className="flex justify-center mb-6">

<div className="relative group">

<div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full blur opacity-60 animate-pulse"></div>

<div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
⚡ Posters starting at just ₹49
</div>

</div>

</div>

<p className="text-slate-500 max-w-xl mx-auto">
From street banners to viral social media posts, we handle every visual need of your business.
</p>

</div>

{/* SERVICES GRID */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

{SERVICE_CATEGORIES.map((cat, i) => (

<div
key={i}
className="bg-white border rounded-3xl p-8 hover:border-orange-500 transition-all group shadow-sm"
>

<div className="flex items-start gap-6">

<div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors shrink-0">
{React.cloneElement(cat.icon, { size: 32 })}
</div>

<div>

<h3 className="text-2xl font-bold mb-3">
{cat.title}
</h3>

<p className="text-slate-500 text-sm mb-6 leading-relaxed">
{cat.desc}
</p>

<div className="flex flex-wrap gap-2">

{cat.items.map((item, j) => (

<span
key={j}
className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold"

>

{item} </span>

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

export default ServicesPage;
