import React from 'react';
import { blogs } from '../data/fashionData';

export default function Blogs() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <span className="text-xs text-gray-400 uppercase font-semibold">News & Blog</span>
        <h3 className="text-2xl font-serif font-bold text-fashion-brown mt-0.5">Our Latest News & Blogs</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="aspect-16/10 bg-gray-100 rounded-xl overflow-hidden relative mb-4">
              <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" alt={post.title} />
              <span className="absolute bottom-3 right-3 bg-fashion-gold text-white text-[10px] font-bold px-2 py-1 rounded-sm">{post.date}</span>
            </div>
            <h4 className="font-serif font-bold text-base text-fashion-brown group-hover:text-fashion-gold transition-colors leading-snug">{post.title}</h4>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{post.desc}</p>
            <button className="text-xs font-bold text-fashion-brown underline mt-3 inline-block hover:text-fashion-gold">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}