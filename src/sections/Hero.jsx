import React from 'react';

export default function Hero() {
  return (
    <section className="bg-fashion-cream pt-36 pb-16 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* ផ្នែកខាងឆ្វេង: អត្ថបទចំណងជើង និង ប៊ូតុង */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          {/* Badge ប្រូម៉ូសិនតូច */}
          <span className="bg-white text-fashion-brown text-xs font-semibold px-4 py-1.5 rounded-full w-max shadow-xs border border-gray-100 mb-6 flex items-center gap-1.5 select-none animate-bounce">
            🎯 50% OFF Summer Super Sale
          </span>
          
          {/* ចំណងជើងធំ (ប្រើ Serif Font និងពណ៌ដីឥដ្ឋឱ្យដូច Layout ដើមបេះបិទ) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-fashion-brown leading-tight tracking-wide mb-6">
            Step into Style: <br />
            Your Ultimate <br />
            Fashion Destination
          </h1>
          
          {/* អត្ថបទពិពណ៌នាខ្លី (Lorem Ipsum ដូចក្នុងរូបគំរូ) */}
          <p className="text-gray-500 text-xs md:text-sm mb-8 max-w-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          {/* ប៊ូតុង Shop Now */}
          <button className="bg-fashion-brown text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-opacity-90 active:scale-95 transition-all w-max flex items-center gap-3 cursor-pointer shadow-md rounded-3xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            Shop Now 
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        {/* ផ្នែកខាងស្តាំ: រូបភាពបង្ហាញម៉ូដអាវ (រង្វង់មូលធំ និងមាន Badge វិល) */}
        <div className="w-full md:w-1/2 relative flex justify-center order-1 md:order-2">
          
          {/* ផ្ទៃរង្វង់មូលធំសម្រាប់ដាក់រូបភាពមនុស្សស្រីពាក់វ៉ែនតាកាន់កាមេរ៉ា */}
          <div className="w-[85%] md:w-[90%] aspect-square rounded-full overflow-hidden border-8 border-white shadow-xl bg-amber-50">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
              alt="Fashion Girl with Sunglasses" 
              className="w-full h-full object-cover scale-110 object-top grayscale-10% hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          {/* ផ្ទាំង Badge រង្វង់មូលតូចពណ៌លឿងទុំ (ផ្អៀងបន្តិចដូចក្នុងរូបថត) */}
          <div className="absolute top-8 right-6 md:top-12 md:right-12 bg-fashion-gold text-white w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center text-xs md:text-sm font-serif font-bold text-center shadow-lg transform rotate-12 tracking-wider select-none animate-pulse">
            <span className="text-[10px] md:text-xs opacity-90 font-sans font-light">New</span>
            <span>Arrival</span>
          </div>
          
        </div>

      </div>
    </section>
  );
}