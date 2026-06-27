import React from 'react';

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ខាងឆ្វេង: Women */}
      <div className="bg-fashion-cream p-8 rounded-2xl flex justify-between relative overflow-hidden h-105 group">
        <div className="max-w-50 z-10">
          <span className="text-xs text-gray-400 font-mono font-medium">2500+ Items</span>
          <h3 className="text-3xl font-serif font-bold text-fashion-brown mt-1">For Women's</h3>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className="text-xs text-gray-600 mt-4 space-y-1 font-medium">
            <li className="hover:text-fashion-gold cursor-pointer">Blazers</li>
            <li className="hover:text-fashion-gold cursor-pointer">T-Shirts & Blouses</li>
            <li className="hover:text-fashion-gold cursor-pointer">Dresses</li>
            <li className="hover:text-fashion-gold cursor-pointer">Jackets & Coats</li>
          </ul>
        </div>
        <img 
          src="https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          className="absolute right-0 bottom-0 w-[55%] h-[90%] object-cover object-top rounded-tl-3xl shadow-lg transition-transform duration-500 group-hover:scale-103"
          alt="Women Category"
        />
      </div>

      {/* ខាងស្តាំ: Men & Accessories Stacked */}
      <div className="flex flex-col gap-6">
        {/* Men */}
        <div className="bg-fashion-cream p-6 rounded-2xl flex justify-between items-center relative overflow-hidden h-49.25 group">
          <div className="z-10">
            <span className="text-xs text-gray-400 font-mono font-medium">1500+ Items</span>
            <h3 className="text-2xl font-serif font-bold text-fashion-brown mt-1">For Men's</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-45">Blazers, Shirts & Jackets, Jeans</p>
          </div>
          <img 
            src="https://media.istockphoto.com/id/2173114734/photo/a-stylish-man-showcases-vibrant-orange-attire-against-a-bold-backdrop-in-a-dynamic-pose.jpg?s=2048x2048&w=is&k=20&c=et8wFFNAVRTX52BcOvDBVAsOPkoAoJwyPWk75U6i4gM=" 
            className="absolute right-0 bottom-0 w-[45%] h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
            alt="Men Category"
          />
        </div>

        {/* Accessories */}
        <div className="bg-fashion-cream p-6 rounded-2xl flex justify-between items-center relative overflow-hidden h-49.25 group">
          <div className="z-10">
            <span className="text-xs text-gray-400 font-mono font-medium">800+ Items</span>
            <h3 className="text-2xl font-serif font-bold text-fashion-brown mt-1">Accessories</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-45">Handbags, Watches, Sunglasses, Hat</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" 
            className="absolute right-6 bottom-0 w-[38%] h-[90%] object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-103"
            alt="Accessories Category"
          />
        </div>
      </div>
    </section>
  );
}