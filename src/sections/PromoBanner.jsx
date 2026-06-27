import React from 'react';

export default function PromoBanner() {
  return (
    <section className="bg-fashion-cream my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-87.5">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover object-center border-4 border-white shadow-lg" alt="Promo" />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Limited Time Offers</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-fashion-brown mt-2 mb-4 leading-tight">25% Off All Fashion Favorites - Limited Time!</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="bg-fashion-brown text-white px-6 py-3 text-xs uppercase font-bold tracking-widest hover:bg-opacity-90 transition-all w-max rounded-3xl">Shop Now →</button>
        </div>
      </div>
    </section>
  );
}