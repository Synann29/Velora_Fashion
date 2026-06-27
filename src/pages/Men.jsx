import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CustomSelect from '../components/CustomSelect';

const MEN_CATEGORIES = [
  { id: 'all', label: 'All Heritage', icon: '⚡' },
  { id: 'mens-shirts', label: 'Apparel', icon: '👔' },
  { id: 'mens-shoes', label: 'Footwear', icon: '👟' },
  { id: 'mens-watches', label: 'Watches', icon: '⌚' },
  { id: 'sunglasses', label: 'Glasses', icon: '🕶️' }
];

export default function Men() {
  const { addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('Default Sorting');
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchMenData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products?limit=194');
        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        const catIds = MEN_CATEGORIES.map(c => c.id);

        const menProducts = (data.products || []).filter(p => catIds.includes(p.category));

        setProducts(menProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenData();
  }, []);

  const handleCategorySelect = (id) => {
    setActiveCategory(id);
    setVisibleCount(9);
  };

  // Filter and Sort Logic
  let filtered = products.filter(p => {
    return activeCategory === 'all' || p.category === activeCategory;
  });

  if (sortBy === 'Price: Low to High') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'Price: High to Low') filtered.sort((a, b) => b.price - a.price);

  const slicedProducts = filtered.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen pt-16 sm:pt-20 md:pt-24 select-none font-sans text-neutral-900">

      {/* ================= 🌟 EDITORIAL MASCULINE BANNER 🌟 ================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 my-3 sm:my-4">
        <div className="relative w-full h-[32vh] sm:h-[38vh] md:h-[45vh] rounded-xl sm:rounded-2xl overflow-hidden bg-[#11161B] flex items-center justify-start px-5 sm:px-8 md:px-16 group/banner">

          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80"
              className="w-full h-full object-cover opacity-45 object-right md:object-center transform scale-100 group-hover/banner:scale-102 transition-transform duration-4000 ease-out"
              alt="Men editorial"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11161B] via-[#11161B]/60 to-transparent"></div>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start text-left gap-2 sm:gap-3 md:gap-3.5">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8FA3B5]">
              The 2026 Collection
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight uppercase">
              Sharp. Refined. <br />
              <span className="italic font-normal text-[#C5D3E0]">Uncompromised.</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed max-w-[200px] sm:max-w-xs opacity-90 hidden sm:block">
              Modern tailoring meets street aesthetic. Elevate your daily rotation with sharp essentials engineered for distinction.
            </p>
            <p className="text-[10px] text-neutral-300 leading-relaxed max-w-[180px] opacity-90 sm:hidden">
              Elevate your daily rotation with sharp essentials.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 🎡 STICKY CIRCULAR CATEGORIES BAR ================= */}
      <div className="sticky top-16 sm:top-20 md:top-[6.25rem] z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 flex flex-col gap-3 sm:gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">

          {/* Category Circles — horizontally scrollable on mobile */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0 snap-x snap-mandatory">
            {MEN_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-pointer shrink-0 snap-start"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-300 border
                    ${isSelected
                      ? 'bg-neutral-900 border-neutral-900 text-white scale-110 shadow-md'
                      : 'bg-neutral-50 border-neutral-200/60 text-neutral-700 group-hover:border-neutral-900 group-hover:bg-white group-hover:scale-105'
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <span className={`text-[10px] sm:text-[11px] tracking-wider font-bold capitalize transition-colors whitespace-nowrap
                    ${isSelected ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-900'}`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto md:shrink-0">
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              label="Sort By:"
              options={['Default Sorting', 'Price: Low to High', 'Price: High to Low']}
            />
          </div>

        </div>
      </div>

      {/* ================= MAIN PRODUCTS GRID ================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10">

        {/* Results Counter */}
        <div className="text-xs text-neutral-400 font-medium mb-4 sm:mb-6">
          Showing 1–{slicedProducts.length} of <span className="font-bold text-neutral-900">{filtered.length}</span> refined pieces
        </div>

        {loading ? (
          <div className="text-center py-24 sm:py-32">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full mb-2"></div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 animate-pulse">Loading Pieces...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 text-xs font-bold">⚠️ Error: {error}</div>
        ) : slicedProducts.length > 0 ? (
          <>
            {/* Grid: 2 cols mobile → 3 cols tablet → 4 cols desktop */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
              className="sm:grid-cols-3 md:grid-cols-4 gap-x-3 sm:gap-x-5 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12"
            >
              {slicedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300">

                    {/* Image Container */}
                    <div className="aspect-[3/4] bg-[#F9F9F9] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8 rounded-xl border border-neutral-100/40">
                      <img
                        src={product.thumbnail}
                        className="max-w-full max-h-full object-contain transition-transform duration-500"
                        alt={product.title}
                        loading="lazy"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                        className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-shadow text-sm
                          ${wishlist && wishlist.some(w => Number(w.id) === Number(product.id))
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-white text-gray-800 shadow'}`}
                        aria-label="Toggle wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>

                      {/* Discount Badge */}
                      {product.discountPercentage > 0 && (
                        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-50 text-red-600 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md">
                          -{Math.round(product.discountPercentage)}%
                        </span>
                      )}

                      {/* Desktop: hover slide-up Add to Cart */}
                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white/80 to-transparent hidden md:flex">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                          className="w-full bg-fashion-brown text-white py-2.5 md:py-3 rounded-3xl text-xs font-bold uppercase tracking-widest hover:bg-fashion-brown/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i> Add To Cart
                        </button>
                      </div>

                      {/* Mobile/Tablet: always-visible Add button */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-white via-white/80 to-transparent md:hidden">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                          className="w-full bg-fashion-brown text-white py-2 rounded-3xl text-[10px] font-bold uppercase tracking-widest active:bg-fashion-brown/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <i className="fa-solid fa-plus text-[9px]"></i> Add
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="pt-2.5 sm:pt-3 md:pt-4 flex flex-col gap-0.5 sm:gap-1 px-0.5 sm:px-1">
                      <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span className="truncate mr-1">{product.category.replace(/mens-|-/g, ' ')}</span>
                        <div className="flex items-center gap-1 text-amber-400 shrink-0">
                          <i className="fa-solid fa-star text-[8px] sm:text-[9px]"></i>
                          <span className="text-neutral-800 font-bold">{product.rating ? product.rating.toFixed(1) : "4.5"}</span>
                        </div>
                      </div>

                      <h4 className="font-medium text-neutral-900 text-[12px] sm:text-[13px] md:text-[14px] tracking-wide line-clamp-1 group-hover:text-neutral-500 transition-colors mt-0.5">
                        {product.title}
                      </h4>

                      <div className="mt-0.5 flex items-center">
                        <span className="text-xs sm:text-sm font-bold text-neutral-900">${product.price?.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {filtered.length > visibleCount && (
              <div className="w-full text-center mt-10 sm:mt-12 md:mt-16">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-7 sm:px-10 py-3 sm:py-3.5 bg-transparent border border-neutral-900 text-neutral-900 font-bold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white active:bg-neutral-900 active:text-white transition-all duration-300 rounded-full cursor-pointer w-full sm:w-auto"
                >
                  Load More Items
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 sm:py-32 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 text-neutral-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase px-4">
            😔 No items found matching filters.
          </div>
        )}
      </div>
    </div>
  );
}