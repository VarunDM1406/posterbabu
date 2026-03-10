import React from "react";
import { Store, Instagram, Zap, Printer } from "lucide-react";

const SERVICE_CATEGORIES = [
{
id:"shop",
title:"Shop Posters",
desc:"Sale posters, opening announcements, discount offers, retail promotions.",
icon:<Store/>,
items:["Grand Opening Banners","Flash Sale Flyers","Product Price Lists"]
},
{
id:"social",
title:"Social Media Designs",
desc:"Instagram posts, Facebook creatives, festival greetings and promotions.",
icon:<Instagram/>,
items:["Daily Status Updates","Engagement Posts","Festival Wishes"]
},
{
id:"business",
title:"Business Promotions",
desc:"Posters for gyms, salons, cafes, tuition centers and local brands.",
icon:<Zap/>,
items:["Admission Flyers","Menu Posters","Service Catalogues"]
},
{
id:"print",
title:"Print Designs",
desc:"High quality print ready posters, flyers and banners.",
icon:<Printer/>,
items:["HD Banners","Visiting Cards","Pamphlets"]
}
];

const ServicesPage = () => (

<section className="py-20 px-4 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500">

<div className="max-w-6xl mx-auto">

{/* Header */}

<div className="text-center mb-16">

<h2 className="text-4xl font-black mb-4">
What We Design for You
</h2>

<p className="text-slate-500 max-w-xl mx-auto">
From street banners to viral social media posts, we handle every visual need of your business.
</p>

</div>

{/* Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

{SERVICE_CATEGORIES.map((cat,i)=>(

<div
key={i}
className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

<div className="flex items-start gap-6">

{/* Icon */}

<div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
{React.cloneElement(cat.icon,{size:28})}
</div>

{/* Content */}

<div>

<h3 className="text-2xl font-bold mb-3">
{cat.title}
</h3>

<p className="text-slate-500 text-sm mb-6 leading-relaxed">
{cat.desc}
</p>

<div className="flex flex-wrap gap-2">

{cat.items.map((item,j)=>(
<span
key={j}
className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold"

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
