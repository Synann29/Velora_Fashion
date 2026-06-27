import React from 'react';

export default function InstagramFeed() {
  const imgs = [
    "https://images.unsplash.com/photo-1779400202037-095ebbe0b486?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1768696083096-2f1cb7c3a9dd?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/488027919/photo/the-carefree-days.jpg?s=2048x2048&w=is&k=20&c=i1JeCQMHC7m2owSi0YZKuDatb3qKdDcO1ZfDsK8crbQ=",
    "https://images.unsplash.com/photo-1718579631602-69e7ffa04e66?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1693221161626-8ba845ded976?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <section className="py-12 border-t border-gray-50 bg-white">
      <div className="text-center mb-6">
        <span className="text-xs text-gray-400 uppercase font-semibold">Follow Us</span>
        <h3 className="text-xl font-serif font-bold text-fashion-brown mt-0.5">Follow Us On Instagram</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-2 max-w-7xl mx-auto">
        {imgs.map((url, i) => (
          <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group cursor-pointer">
            <img src={url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-3xl" alt="Instagram" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-lg">
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
