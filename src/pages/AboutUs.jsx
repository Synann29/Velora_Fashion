import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutUs() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <div className="bg-[#FBFBFA] min-h-screen pt-24 font-serif text-neutral-800">
      
      {/* 1. HERO SECTION */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-normal text-neutral-900 uppercase tracking-tight">
          Timeless Elegance. <br /> <span className="text-[#C5A059] italic">Modern Soul.</span>
        </h1>
        <p className="mt-6 text-neutral-500 font-sans max-w-2xl mx-auto">
          We bridge the gap between historic craftsmanship and contemporary minimalism.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} className="mt-10 px-10 py-4 bg-neutral-900 text-[#FBFBFA] uppercase text-xs tracking-[0.2em] hover:bg-[#C5A059] transition-colors duration-500">
          Explore Collection
        </motion.button>
      </motion.div>

      {/* 2. NEW SECTION: OUR PROCESS (បន្ថែមថ្មី) */}
      <div className="max-w-7xl mx-auto px-8 py-20 bg-white">
        <h3 className="text-3xl text-center mb-16">The Art of Creation</h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { step: "01", title: "Concept", desc: "Minimalist blueprints inspired by architectural geometry." },
            { step: "02", title: "Sourcing", desc: "Organic, ethically harvested fibers from heritage mills." },
            { step: "03", title: "Craft", msg: "Precision tailoring that honors the natural human form." }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-8 border border-neutral-100 shadow-sm">
              <span className="text-[#C5A059] font-bold text-xl">{item.step}</span>
              <h4 className="text-xl my-4">{item.title}</h4>
              <p className="text-sm text-neutral-500">{item.desc || item.msg}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. IMAGE & STORY GRID */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl">Crafted with Purpose</h2>
          <p className="text-neutral-500 leading-relaxed">We blend traditional tailoring with contemporary aesthetics to ensure you look timeless.</p>
          <button className="border-b-2 border-[#C5A059] pb-1 uppercase text-xs hover:text-[#C5A059]">Read Our Story</button>
        </div>
      </div>

      {/* 4. VALUES SECTION (បន្ថែមថ្មី) */}
      <div className="py-20 bg-[#F5F5F3]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-3xl mb-10">Our Guiding Values</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-l-4 border-[#C5A059]">
              <h4 className="font-bold">Sustainability</h4>
              <p className="text-sm mt-2">Zero waste, 100% conscious production.</p>
            </div>
            <div className="p-6 bg-white border-l-4 border-[#C5A059]">
              <h4 className="font-bold">Transparency</h4>
              <p className="text-sm mt-2">Ethical supply chain, fair wages always.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FINAL CTA */}
      <motion.div className="py-24 text-center px-8">
        <h4 className="text-xl uppercase tracking-widest mb-8">Ready to elevate your wardrobe?</h4>
        <motion.button whileHover={{ scale: 1.05 }} className="px-12 py-5 bg-[#C5A059] text-white uppercase text-sm hover:bg-neutral-900 transition-all">
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
}