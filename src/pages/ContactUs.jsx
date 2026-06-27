import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-16 font-sans text-neutral-800 overflow-x-hidden">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {/* Page Title Block Area */}
        <div className="text-center mb-10 md:mb-16 bg-neutral-50 p-6 md:p-8 rounded-2xl border border-neutral-100">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">Contact Us</h1>
          <p className="text-neutral-500 mt-2 text-xs md:text-sm">Home / Contact Us</p>
        </div>

        {/* Primary Responsive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Side: Form Container */}
          <div className="bg-white ordering-2 lg:order-1">
            <h2 className="text-2xl font-serif font-bold mb-2 text-neutral-900">Get in Touch</h2>
            <p className="text-xs text-neutral-400 mb-6 italic">Your email address will not be published. Required fields are marked *</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Your Name *</label>
                  <input type="text" required className="w-full p-3 text-sm border border-neutral-200 rounded-xl bg-neutral-50 focus:bg-white focus:border-[#3D2616] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Email *</label>
                  <input type="email" required className="w-full p-3 text-sm border border-neutral-200 rounded-xl bg-neutral-50 focus:bg-white focus:border-[#3D2616] outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Subject *</label>
                <input type="text" required className="w-full p-3 text-sm border border-neutral-200 rounded-xl bg-neutral-50 focus:bg-white focus:border-[#3D2616] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Your Message *</label>
                <textarea rows="5" required className="w-full p-3 text-sm border border-neutral-200 rounded-xl bg-neutral-50 focus:bg-white focus:border-[#3D2616] outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full sm:w-auto bg-[#3D2616] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-black transition-colors shadow-sm cursor-pointer">
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side: Contact Details Card Panel (Replaced custom token with explicit hex color bg-[#FAF7F2]) */}
          <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-xs order-1 lg:order-2">
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="font-bold text-neutral-900 text-base md:text-lg mb-1 md:mb-2">Address</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">#114 Russian Blvd Corner St.259 Tuk Laak 1 Phnom Penh, 12156</p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base md:text-lg mb-1 md:mb-2">Contact</h3>
                <p className="text-neutral-600 text-sm">Phone : +855-972-042-302</p>
                <p className="text-neutral-600 text-sm mt-0.5">Email : example@gmail.com</p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base md:text-lg mb-1 md:mb-2">Open Time</h3>
                <p className="text-neutral-600 text-sm">Monday - Friday : 8:00am - 9:00pm</p>
                <p className="text-neutral-600 text-sm mt-0.5">Saturday - Sunday : 9:00am - 10:00pm</p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base md:text-lg mb-2">Stay Connected</h3>
                <div className="flex gap-4 mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33V22c4.78-.8 8.44-4.94 8.44-9.93z" />
                    </svg>
                  </a>

                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zm6.4-3.6a1.12 1.12 0 11-1.12 1.12A1.12 1.12 0 0118.4 4.6z" />
                    </svg>
                  </a>

                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.16 4.16 0 001.82-2.3 8.3 8.3 0 01-2.63 1 4.14 4.14 0 00-7.06 3.77A11.74 11.74 0 013 4.79a4.14 4.14 0 001.28 5.52c-.67-.02-1.3-.2-1.86-.5v.05a4.15 4.15 0 003.32 4.07c-.56.15-1.14.18-1.74.07a4.16 4.16 0 003.88 2.88A8.31 8.31 0 012 19.54a11.73 11.73 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.69l-.01-.53A8.35 8.35 0 0022.46 6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Google Map Wrapper Framework */}
        <motion.div variants={itemVariants} className="w-full mt-12 h-64 sm:h-80 md:h-100 rounded-2xl overflow-hidden grayscale border border-neutral-100 hover:grayscale-0 transition-all duration-700 shadow-xs">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.835158671607!2d104.915729!3d11.562108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951052601736b%3A0xe5772396e95267a5!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1680000000000!5m2!1sen!2skh" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Phnom Penh Location"
          ></iframe>
        </motion.div>

      </motion.div>
    </div>
  );
}