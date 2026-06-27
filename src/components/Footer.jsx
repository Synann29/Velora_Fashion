import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 w-full overflow-hidden">
      
      {/* Newsletter Section - Center responsive block matching image_26473b.png */}
      <div className="max-w-4xl mx-auto text-center px-4 py-16">
        <span className="text-xs text-neutral-400 uppercase font-semibold tracking-wider">Our Newsletter</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3D2616] mt-1 mb-2">
          Subscribe to Our Newsletter to Get Updates
        </h3>
        <p className="text-neutral-400 text-xs mb-6">
          Get 20% off on your first order just by subscribing to our newsletter.
        </p>
        
        {/* Dynamic Inner Input Bar Block */}
        <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-2 items-center border border-neutral-200 p-1.5 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-2 px-3 text-[#E5B56A] text-sm w-full">
            <i className="fa-solid fa-envelope"></i>
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              className="outline-none text-xs text-neutral-700 w-full py-2 bg-transparent" 
            />
          </div>
          <button className="bg-[#3D2616] text-white text-xs font-bold px-6 py-3 rounded-lg w-full sm:w-auto hover:bg-black transition-all cursor-pointer whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Big Footer Container matching brand dark styling specs */}
      <div className="bg-[#3D2616] text-white/90 text-xs py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-white/10 pb-12">
          
          {/* Logo & Info Column - Full width on mobile grid screens */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-white mb-4">
              <span className="bg-white text-[#3D2616] rounded-full w-6 h-6 flex items-center justify-center text-xs font-sans font-bold">
                C
              </span> 
              Clothing.
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4 text-base text-white/80">
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

          {/* Links Columns - Neatly packed 2-by-2 on mobile */}
          <div className="col-span-1">
            <h4 className="font-bold mb-4 text-white text-sm">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Career</li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-4 text-white text-sm">Customer Services</h4>
            <ul className="space-y-2 text-white/60">
              <li className="hover:text-white cursor-pointer transition-colors">My Account</li>
              <li className="hover:text-white cursor-pointer transition-colors">Track Your Order</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-4 text-white text-sm">Contact Info</h4>
            <ul className="space-y-2 text-white/60">
              <li>+0123-456-789</li>
              <li>example@gmail.com</li>
              <li className="leading-normal">6502 Preston Rd. Inglewood, Maine 98380</li>
            </ul>
          </div>

        </div>

        {/* Lower Metadata Bottom Alignment Bar Block */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-white/40 text-[11px] gap-4">
          <p className="text-center sm:text-left">© Copyright 2026 Clothing Website Design. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white transition-colors">
              English <i className="fa-solid fa-chevron-down text-[9px] ml-0.5"></i>
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              USD <i className="fa-solid fa-chevron-down text-[9px] ml-0.5"></i>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}