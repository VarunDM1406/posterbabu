import React, { useState } from "react";

const PORTFOLIO_ITEMS = [
{ id:1, cat:"Salon", title:"Glow Salon Opening", img:"/templates/salon-opening.png"},
{ id:2, cat:"Salon", title:"Bridal Makeup Pack", img:"/templates/salon-makeup.png"},
{ id:3, cat:"Gym", title:"Iron Fitness 50% Off", img:"/templates/gym-offer.png"},
{ id:4, cat:"Gym", title:"New Year Membership Offer", img:"/templates/gym-membership.png"},
{ id:5, cat:"Cafe", title:"Catering Service", img:"/templates/catering-service.png"},
{ id:6, cat:"Cafe", title:"Sweets Menu", img:"/templates/sweets-menu.png"},
{ id:7, cat:"Retail", title:"Kirana Big Sale", img:"/templates/kirana-sale.png"},
{ id:8, cat:"Retail", title:"Electronics Dhamaka", img:"/templates/retail-sale.png"},
{ id:9, cat:"Coaching", title:"Maths Admission Open", img:"/templates/coaching-admission.png"},
{ id:10, cat:"Coaching", title:"English Speaking Classes", img:"/templates/coaching-crashcourse.png"},
{ id:11, cat:"Festival", title:"Holi Wishes", img:"/templates/holi-wish.png"},
{ id:12, cat:"Festival", title:"Diwali Sale Poster", img:"/templates/diwali-sale.png"}
];

const PortfolioPage = () => {

const [filter,setFilter] = useState("All");
const [preview,setPreview] = useState(null);
const categories = ["All","Salon","Gym","Cafe","Retail","Coaching","Festival"];

const filteredItems =
filter==="All"
?PORTFOLIO_ITEMS
:PORTFOLIO_ITEMS.filter(item=>item.cat===filter);

return (

<section className="py-16 px-4 animate-in fade-in duration-500">

<div className="max-w-6xl mx-auto">

{/* header */}

<div className="text-center mb-12">

<h2 className="text-4xl font-black mb-3">
Our Best Work
</h2>

<p className="text-slate-500">
Real posters delivered to local businesses across India.
</p>

<p className="text-orange-600 font-bold mt-2">
🔥 All templates available at just ₹49
</p>

</div>

{/* category filter */}

<div className="flex flex-wrap justify-center gap-2 mb-12">

{categories.map(c=>(

<button
key={c}
onClick={()=>setFilter(c)}
className={`px-4 py-2 rounded-full text-sm font-bold transition-all
${filter===c
? "bg-orange-600 text-white shadow-lg"
:"bg-slate-100 text-slate-600 hover:bg-slate-200"}
`}

>

{c}

</button>

))}

</div>

{/* grid */}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{filteredItems.map(item=>(

<div
key={item.id}
onClick={()=>setPreview(item)}
className="group relative cursor-pointer bg-white p-3 rounded-3xl border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

{/* price badge */}

<div className="absolute top-3 right-3 bg-black-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
🔥 ₹49
</div>

{/* image */}

<div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-100">

<img
src={item.img}
alt={item.title}
className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
/>

</div>

{/* text */}

<div className="px-2">

<span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block mb-1">
{item.cat}
</span>

<div className="font-bold text-sm leading-tight text-slate-900">
{item.title}
</div>

</div>

</div>

))}

</div>

</div>

{/* preview modal */}

{preview && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">

<div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">

<img
src={preview.img}
alt={preview.title}
className="rounded-xl mb-4"
/>

<h3 className="font-bold text-lg mb-4">
{preview.title}
</h3>

<button
onClick={() =>
window.open(
`https://wa.me/917428091729?text=Hello PosterBabu I want a poster like "${preview.title}"`
)
}
className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold"

>

Order This Poster

</button>

<button
onClick={()=>setPreview(null)}
className="bg-black-200 text-white px-6 py-3 rounded-xl font-bold"

>

Close

</button>

</div>

</div>

)}

</section>

);

};

export default PortfolioPage;
