import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CustomSelect from '../components/CustomSelect';

const WOMEN_CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'womens-dresses', label: 'Dresses', icon: '👗' },
  { id: 'womens-bags', label: 'Handbags', icon: '👜' },
  { id: 'womens-shoes', label: 'Footwear', icon: '👠' },
  { id: 'womens-jewellery', label: 'Jewelry', icon: '💎' },
  { id: 'womens-watches', label: 'Watches', icon: '⌚' },
  { id: 'sunglasses', label: 'Glasses', icon: '🕶️' }
];

export default function Women() {
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
    const fetchWomenData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products?limit=194');
        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        const catIds = WOMEN_CATEGORIES.map(c => c.id);
        const womenProducts = (data.products || []).filter(p => catIds.includes(p.category));

        setProducts(womenProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWomenData();
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
    <div className="bg-white min-h-screen pt-24 select-none font-sans text-neutral-900">

      {/* ================= 🌟 EDITORIAL MAGAZINE BANNER 🌟 ================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 my-4">
        <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[50vh] rounded-2xl overflow-hidden bg-[#1E1916] flex items-center justify-start px-5 sm:px-8 md:px-16 group/banner">

          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80"
              className="w-full h-full object-cover opacity-50 object-right md:object-center transform scale-100 group-hover/banner:scale-102 transition-transform duration-4000 ease-out"
              alt="Women editorial"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1E1916] via-[#1E1916]/60 to-transparent"></div>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-xs sm:max-w-md flex flex-col items-start text-left gap-3">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A082]">
              The 2026 Collection
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight uppercase">
              Chic. Minimalist. <br />
              <span className="italic font-normal text-[#E6C5B3]">Timeless.</span>
            </h1>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-xs opacity-90">
              Savoir-faire meets modern aesthetics. Discover pieces curated exclusively to illuminate your presence.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 🎡 STICKY CIRCULAR CATEGORIES BAR (FULL SHAPE) 🎡 ================= */}
      <div className="sticky top-25 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: Responsive Wrapped Circular Items */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0 snap-x snap-mandatory">
            {WOMEN_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
                >
                  {/* Circle Box */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-300 border ${
                      isSelected
                        ? 'bg-neutral-900 border-neutral-900 text-white scale-110 shadow-md'
                        : 'bg-neutral-50 border-neutral-200/60 text-neutral-700 group-hover:border-neutral-900 group-hover:bg-white group-hover:scale-105'
                    }`}
                  >
                  
                    {cat.icon}
                  </div>
                  {/* Label Text */}
                  <span className={`text-[10px] sm:text-[11px] tracking-wider font-bold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'text-neutral-900'
                      : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Clean Sorting Dropdown */}
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
     <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">

        {/* Results Counter */}
        <div className="text-xs text-neutral-400 font-medium mb-6">
          Showing 1-{slicedProducts.length} of <span className="font-bold text-neutral-900">{filtered.length}</span> luxury pieces
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full mb-2"></div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 animate-pulse">Loading Pieces...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 text-xs font-bold">⚠️ Error: {error}</div>
        ) : slicedProducts.length > 0 ? (
          <>
            {/* Grid View */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {slicedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300">

                    {/* Image Container */}
                   <div className="
aspect-3/4
bg-[#F9F9F9]
relative
overflow-hidden
flex
items-center
justify-center
p-3
sm:p-6
md:p-8
rounded-xl
border
border-neutral-100/40
">
                      <img
                        src={product.thumbnail}
                        className="max-w-full max-h-full object-contain transition-transform duration-500"
                        alt={product.title}
                        loading="lazy"
                      />

                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                        className={`
absolute
top-2
right-2
sm:top-3
sm:right-3
w-8
h-8
sm:w-9
sm:h-9
rounded-full
flex
items-center
justify-center
transition-shadow
${
  wishlist?.some(
    w => Number(w.id) === Number(product.id)
  )
    ? 'bg-red-500 text-white shadow-md'
    : 'bg-white text-gray-800 shadow'
}
`}
                        aria-label="Toggle wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>

                      {/* Discount Badge */}
                      {product.discountPercentage > 0 && (
                        <span className="absolute top-4 left-4 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          -{Math.round(product.discountPercentage)}%
                        </span>
                      )}

                      {/* Add to Bag Hover Slide */}
                      <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-white via-white/80 to-transparent">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                         className="
w-full
bg-fashion-brown
text-white
py-2
sm:py-3
rounded-3xl
text-[10px]
sm:text-xs
font-bold
uppercase
tracking-widest
hover:bg-fashion-brown/90
transition-colors
cursor-pointer
flex
items-center
justify-center
gap-2
"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i> Add To Card
                        </button>
                      </div>
                    </div>

                    {/* Metadata Product Info */}
                    <div className="pt-4 flex flex-col gap-1 px-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span>{product.category.replace(/womens-|-/g, ' ')}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <i className="fa-solid fa-star text-[9px]"></i>
                          <span className="text-neutral-800 font-bold">{product.rating ? product.rating.toFixed(1) : "4.5"}</span>
                        </div>
                      </div>

                     <h4 className="
font-medium
text-neutral-900
text-xs
sm:text-sm
tracking-wide
line-clamp-2
group-hover:text-neutral-500
transition-colors
mt-1
">
                        {product.title}
                      </h4>

                      <div className="mt-0.5 flex items-center">
                       <span className="text-sm sm:text-lg font-bold text-neutral-900">${product.price?.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {filtered.length > visibleCount && (
              <div className="w-full text-center mt-16">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                 className="
px-6
sm:px-10
py-3
border
border-neutral-900
text-neutral-900
font-bold
text-xs
uppercase
tracking-widest
hover:bg-neutral-900
hover:text-white
transition-all
duration-300
rounded-full
cursor-pointer
"
                >
                  Load More Items
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 text-neutral-400 text-xs font-bold tracking-wider uppercase">
            😔 No items found matching filters.
          </div>
        )}
      </div>
    </div>
  );
}