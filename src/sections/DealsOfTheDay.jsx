import React from 'react';
import { dealsOfTheDay } from '../data/fashionData';

export default function DealsOfTheDay() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-8">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today Deals</span>
        <h2 className="text-3xl font-serif font-bold text-fashion-brown mt-1">Deals of the Day</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {dealsOfTheDay.map((deal) => (
          <div key={deal.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 p-4 gap-6">
            <div className="w-full sm:w-[40%] aspect-3/4 bg-gray-50 rounded-lg overflow-hidden relative">
              <img src={deal.image} className="w-full h-full object-cover" alt={deal.name} />
              <span className="absolute top-2 left-2 bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-sm">{deal.discount}</span>
            </div>
            <div className="w-full sm:w-[60%] flex flex-col justify-center py-2">
              <span className="text-xs text-gray-400">{deal.category}</span>
              <h3 className="font-serif font-bold text-lg text-fashion-brown mt-1">{deal.name}</h3>
              <div className="flex items-center gap-1 text-fashion-gold text-xs my-1"><i className="fa-solid fa-star"></i> <span>{deal.rating}</span></div>
              <p className="text-xs text-gray-400 my-2 leading-relaxed">{deal.desc}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-fashion-brown">${deal.price.toFixed(2)}</span>
                <span className="text-xs text-gray-400 line-through">${deal.oldPrice.toFixed(2)}</span>
              </div>
              <button className="text-xs font-bold text-fashion-brown uppercase border-b border-fashion-brown pb-0.5 w-max hover:text-fashion-gold hover:border-fashion-gold transition-colors">Shop Now →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Two Small Collection Banners underneath */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-8 rounded-2xl flex justify-between items-center h-65 relative overflow-hidden bg-cover bg-right" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603252109360-909baaf261c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
          <div className="z-10 bg-white/90 p-4 rounded-lg backdrop-blur-xs max-w-50">
            <span className="text-[10px] uppercase font-bold text-teal-600">Flat 20% Discount</span>
            <h4 className="font-serif font-bold text-base text-fashion-brown mt-1">Men's Latest Collection</h4>
            <button className="bg-fashion-brown text-white text-[10px] font-bold px-3 py-1.5 mt-3 rounded-sm">Shop Now →</button>
          </div>
        </div>
        <div className="bg-gray-100 p-8 rounded-2xl flex justify-between items-center h-65 relative overflow-hidden bg-cover bg-right" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683143646131-92a439faca4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
          <div className="z-10 bg-white/90 p-4 rounded-lg backdrop-blur-xs max-w-50">
            <span className="text-[10px] uppercase font-bold text-amber-600">Flat 25% Discount</span>
            <h4 className="font-serif font-bold text-base text-fashion-brown mt-1">Women's Latest Fashion</h4>
            <button className="bg-fashion-brown text-white text-[10px] font-bold px-3 py-1.5 mt-3 rounded-sm">Shop Now →</button>
          </div>
        </div>
      </div>
    </section>
  );
}