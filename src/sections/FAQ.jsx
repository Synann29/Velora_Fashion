import React, { useState } from 'react';
import { faqs } from '../data/fashionData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(1); // Default បើកប្រអប់ទី ២ ដូចក្នុងរូបភាព

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <span className="text-xs text-gray-400 uppercase font-semibold">FAQ</span>
        <h3 className="text-2xl font-serif font-bold text-fashion-brown mt-0.5">Questions? Look here.</h3>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border border-gray-100 rounded-lg overflow-hidden transition-all shadow-xs">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full text-left px-5 py-4 flex justify-between items-center font-medium text-sm transition-colors cursor-pointer ${isOpen ? 'bg-fashion-brown text-white' : 'bg-white text-fashion-brown hover:bg-gray-50'}`}
              >
                <span>{faq.question}</span>
                <span>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="bg-fashion-brown text-white/80 px-5 pb-4 text-xs leading-relaxed border-t border-white/10">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}