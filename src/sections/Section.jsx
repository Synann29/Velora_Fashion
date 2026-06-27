import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto text-center px-4 py-16">
        <span className="text-xs text-gray-400 uppercase font-semibold">Our Newsletter</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-fashion-brown mt-1 mb-2">Subscribe to Our Newsletter to Get Updates</h3>
        <p className="text-gray-400 text-xs mb-6">Get 20% off on your first order just by subscribing to our newsletter.</p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 items-center border border-gray-100 p-1.5 rounded-lg bg-white shadow-xs">
          <div className="flex items-center gap-2 px-3 text-fashion-gold text-sm w-full"><i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Enter Email Address" className="outline-none text-xs text-gray-700 w-full" />
          </div>
          <button className="bg-fashion-brown text-white text-xs font-bold px-5 py-3 rounded-md w-full sm:w-auto hover:bg-opacity-90 transition-all cursor-pointer">Subscribe</button>
        </div>
      </div>

      {/* Main Big Footer Container */}
      <div className="bg-fashion-brown text-white/90 text-xs py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-white/10 pb-12">
          {/* Logo & Info Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-white mb-4">
              <span className="bg-white text-fashion-brown rounded-full w-6 h-6 flex items-center justify-center text-xs font-sans font-bold">C</span> Clothing.
            </div>
            <p className="text-white/60 leading-relaxed max-w-xs mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex gap-4 text-base text-white/80">
              <a href="#" className="hover:text-white"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-white"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-white"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="hover:text-white"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>
          {/* Links Columns */}
          <div><h4 className="font-bold mb-4 text-white">Company</h4><ul className="space-y-2 text-white/60"><li>About Us</li><li>Blog</li><li>Contact Us</li><li>Career</li></ul></div>
          <div><h4 className="font-bold mb-4 text-white">Customer Services</h4><ul className="space-y-2 text-white/60"><li>My Account</li><li>Track Your Order</li><li>Return</li><li>FAQ</li></ul></div>
          <div><h4 className="font-bold mb-4 text-white">Contact Info</h4><ul className="space-y-2 text-white/60"><li>+0123-456-789</li><li>example@gmail.com</li><li className="leading-normal">6502 Preston Rd. Inglewood, Maine 98380</li></ul></div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-white/40 text-[11px] gap-4">
          <p>© Copyright 2026 Clothing Website Design. All Rights Reserved.</p>
          <div className="flex gap-4"><span>English <i className="fa-solid fa-chevron-down text-[9px] ml-0.5"></i></span><span>USD <i className="fa-solid fa-chevron-down text-[9px] ml-0.5"></i></span></div>
        </div>
      </div>
    </footer>
  );
}