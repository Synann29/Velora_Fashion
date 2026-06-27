import React, { useState, useRef } from 'react';
import { topSellers } from '../data/fashionData';

export default function TopSellers() {
  // State សម្រាប់គ្រប់គ្រងប៊ូតុងប្រភេទដែលកំពុង Active
  const [activeTab, setActiveTab] = useState('All');
  const scrollRef = useRef(null);

  // ប្រព័ន្ធរំងាស់ទិន្នន័យផលិតផលតាមប្រភេទ (Filter System)
  const filteredProducts = activeTab === 'All' 
    ? topSellers 
    : topSellers.filter(product => product.category.toLowerCase() === activeTab.toLowerCase());

  // មុខងារចុចព្រួញរំកិល Scroll ឆ្វេង-ស្តាំ
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative group">
      
      {/* ផ្នែកក្បាលបញ្ជីផលិតផល (Header) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Our Products</span>
          <h2 className="text-3xl font-serif font-bold text-fashion-brown mt-1">Our Top Seller Products</h2>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          
          {/* ផ្ទាំងប៊ូតុងសម្រាប់ចុច Filter ផលិតផល */}
          <div className="flex gap-2 text-xs font-medium">
            {['All', 'Women', 'Men', 'Accessories'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-sm cursor-pointer transition-colors ${activeTab === tab ? 'bg-fashion-brown text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ប៊ូតុងរំកិល ឆ្វេង-ស្តាំ */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleScroll('left')} 
              className="w-9 h-9 rounded-full bg-white border border-gray-200 text-fashion-brown flex items-center justify-center hover:bg-fashion-brown hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Scroll Left"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button 
              onClick={() => handleScroll('right')} 
              className="w-9 h-9 rounded-full bg-white border border-gray-200 text-fashion-brown flex items-center justify-center hover:bg-fashion-brown hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Scroll Right"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* របារបង្ហាញកាតទំនិញដែលអាចអូសបាន (Horizontal Scroll View) */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-6 select-none snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="w-[85%] sm:w-[45%] md:w-[31%] lg:w-[23.5%] shrink-0 snap-start group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-xs transition-all duration-300"
            >
              {/* ផ្នែករូបភាពទំនិញ និង Badge ប្រូម៉ូសិន */}
              <div className="aspect-3/4 bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" 
                  alt={product.name} 
                />
                <span className="absolute top-3 left-3 bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                  {product.discount}
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center hover:text-red-500 shadow-sm cursor-pointer">
                  <i className="fa-regular fa-heart"></i>
                </button>
                
                {/* របារបង្ហាញម៉ោងបញ្ចុះតម្លៃពិសេស (Countdown Bar) */}
                {product.hasCountdown && (
                  <div className="absolute bottom-0 left-0 w-full bg-fashion-gold py-2 grid grid-cols-4 text-center text-white font-mono text-xs">
                    <div><p className="font-bold">05</p><span className="text-[9px] opacity-80">Days</span></div>
                    <div><p className="font-bold">12</p><span className="text-[9px] opacity-80">Hours</span></div>
                    <div><p className="font-bold">30</p><span className="text-[9px] opacity-80">Mins</span></div>
                    <div><p className="font-bold">25</p><span className="text-[9px] opacity-80">Sec</span></div>
                  </div>
                )}
              </div>

              {/* ផ្នែកឈ្មោះ តម្លៃ និង ពិន្ទុផ្កាយ */}
              <div className="p-4">
                <span className="text-xs text-gray-400">{product.category}</span>
                <div className="flex justify-between items-center mt-1">
                  <h4 className="font-bold text-fashion-brown text-sm group-hover:text-fashion-gold transition-colors truncate max-w-[80%]">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 text-fashion-gold text-xs shrink-0">
                    <i className="fa-solid fa-star"></i> <span>{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-fashion-brown">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12 text-gray-400 text-sm">
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
}