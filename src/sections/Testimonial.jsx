import React from 'react';

export default function Testimonial() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs text-gray-400 uppercase font-semibold">Testimonial</span>
          <h3 className="text-2xl font-serif font-bold text-fashion-brown mt-0.5">What Our Clients Say</h3>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-sm bg-fashion-gold/20 text-fashion-brown flex items-center justify-center hover:bg-fashion-gold hover:text-white transition-colors cursor-pointer"><i className="fa-solid fa-arrow-left text-xs"></i></button>
          <button className="w-8 h-8 rounded-sm bg-fashion-brown text-white flex items-center justify-center hover:bg-opacity-90 transition-colors cursor-pointer"><i className="fa-solid fa-arrow-right text-xs"></i></button>
        </div>
      </div>

      <div className="bg-fashion-cream p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8 relative">
        <div className="absolute top-6 left-6 text-4xl text-fashion-gold opacity-30"><i className="fa-solid fa-quote-left"></i></div>
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Client" />
        </div>
        <div>
          <div className="flex text-fashion-gold text-xs gap-1 mb-2">
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            <span className="text-gray-700 font-bold ml-1">5.0</span>
          </div>
          <p className="text-gray-600 text-sm italic leading-relaxed mb-4">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto."</p>
          <h4 className="font-bold text-sm text-fashion-brown">Leslie Alexander</h4>
          <span className="text-xs text-gray-400">Fashion Enthusiast</span>
          </div>
      </div>
    </section>
  );
}