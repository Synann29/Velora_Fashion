import React from 'react';

export default function Features() {
  const list = [
    { icon: "fa-box", title: "Free Shipping", desc: "Free shipping for order over $150" },
    { icon: "fa-wallet", title: "Flexible Payment", desc: "Multiple secure payment options" },
    { icon: "fa-headset", title: "24x7 Support", desc: "We support online all days" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
      {list.map((item, index) => (
        <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 rounded-full bg-fashion-cream flex items-center justify-center text-fashion-brown text-xl">
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
          <div>
            <h4 className="font-bold text-sm text-fashion-brown">{item.title}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}