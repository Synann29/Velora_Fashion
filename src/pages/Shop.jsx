import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";

// ============================================
// SHOP PAGE - Product Listing & Filtering
// ============================================

/**
 * List of fashion categories to filter from the API
 * Only products in these categories will be shown
 */
const FASHION_CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "tops",
  "sunglasses",
];

/**
 * Shop Component
 * Main product listing page with filtering, sorting, and pagination
 */
export default function Shop() {
  // ============================================
  // CONTEXT & STATE MANAGEMENT
  // ============================================

  // Get functions from AppContext (add to cart, wishlist management)
  const { addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  // API Data States
  const [products, setProducts] = useState([]); // All products from API
  const [categories, setCategories] = useState([]); // Available categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]); // User-selected categories
  const [maxPrice, setMaxPrice] = useState(500); // Price range filter
  const [sortBy, setSortBy] = useState("Default Sorting"); // Sort option

  // Pagination
  const ITEMS_PER_PAGE = 12; // Show 12 products at a time
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE); // Current number of visible products

  // ============================================
  // EFFECTS - Side Effects Management
  // ============================================

  // Effect 1: Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Effect 2: Fetch products from DummyJSON API on component mount
  useEffect(() => {
    const fetchFashionData = async () => {
      try {
        setLoading(true);

        // Fetch all products from DummyJSON API
        const resProducts = await fetch(
          "https://dummyjson.com/products?limit=194",
        );

        if (!resProducts.ok) {
          throw new Error("Failed to fetch data from DummyJSON server");
        }

        const dataProducts = await resProducts.json();

        // Filter products to only include fashion categories
        const fashionProducts = (dataProducts.products || []).filter(
          (product) => FASHION_CATEGORIES.includes(product.category),
        );

        // Update states with fetched data
        setProducts(fashionProducts);
        setCategories(FASHION_CATEGORIES);
      } catch (err) {
        // Handle errors during fetch
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFashionData();
  }, []);

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Handle category checkbox toggle
   * @param {string} categoryName - Category to toggle
   */
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) => {
      // Add or remove category from selection
      const updated = prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName) // Remove if already selected
        : [...prev, categoryName]; // Add if not selected
      return updated;
    });
    // Reset to first page when filter changes
    setVisibleCount(ITEMS_PER_PAGE);
  };

  /**
   * Reset all filters to default values
   */
  const handleClearAll = () => {
    setSelectedCategories([]);
    setMaxPrice(500);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  /**
   * Handle showing more products (pagination)
   */
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  // ============================================
  // FILTERING & SORTING LOGIC
  // ============================================

  // Get search query from URL parameters (if coming from search)
  const location = useLocation();
  const qParam = new URLSearchParams(location.search).get("q") || "";
  const q = qParam.toLowerCase().trim();

  /**
   * Filter products based on:
   * 1. Selected categories
   * 2. Price range
   * 3. Search query
   */
  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;
    const matchesQuery =
      !q ||
      (product.title && product.title.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q));
    return matchesCategory && matchesPrice && matchesQuery;
  });

  /**
   * Sort products based on selected sort option
   */
  if (sortBy === "Price: Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Get only the products to display (based on pagination)
  const slicedProducts = filteredProducts.slice(0, visibleCount);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-24 select-none text-gray-800 font-sans">
      {/* ========================================
          BANNER SECTION - Hero/Promotional Banner
          ======================================== */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] bg-neutral-950 overflow-hidden flex items-center justify-center text-center px-4 mb-12 group/banner">
        {/* Background Image with Elegant Animation & Mask */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover opacity-50 transform scale-105 group-hover/banner:scale-100 transition-transform duration-6000ms ease-out"
            alt="Fashion Poster Banner"
          />
          {/* Fixed Gradient Overlays for Luxury Contrast (Tailwind v3 Safe) */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20"></div>
        </div>

        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#8B6E59]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        {/* Content Block */}
        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          {/* Dynamic Badge */}
          <span className="text-[#8B6E59] uppercase tracking-[0.25em] text-[10px] md:text-xs font-bold bg-white/90 backdrop-blur-xs px-5 py-2 rounded-full shadow-xs border border-amber-100/20 transform transition-all duration-700">
            ✨ New Season Collection 2026
          </span>

          {/* Main Cinematic Typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight uppercase drop-shadow-lg">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D4B296] to-amber-200">
              Everyday Style
            </span>
          </h1>

          {/* Luxury Divider */}
          <div className="w-20 h-2px bg-linear-to-r from-transparent via-[#8B6E59] to-transparent my-1"></div>

          {/* Description */}
          <p className="text-xs md:text-sm text-neutral-300 tracking-wide max-w-md leading-relaxed opacity-90">
            Discover premium quality clothing and curated accessories designed
            to express your authentic confidence. Up to 50% off.
          </p>

          {/* Interactive CTA Button */}
          <div className="mt-2">
            <button
              onClick={() => {
                const mainSection = document.querySelector("main");
                if (mainSection)
                  mainSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="group relative px-8 py-3.5 bg-white text-gray-900 font-bold text-xs uppercase tracking-widest overflow-hidden rounded-xs shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white hover:bg-transparent hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <i className="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </span>
            </button>
          </div>
        </div>

        {/* Editorial Floating Footer text */}
        <div className="absolute bottom-4 left-0 w-full overflow-hidden whitespace-nowrap opacity-25 select-none pointer-events-none hidden md:block border-t border-b border-white/10 py-1.5">
          <div className="inline-block text-[9px] font-medium uppercase tracking-[0.4em] text-white animate-pulse">
            PREMIUM APPAREL • MINIMALIST DESIGN • STREETWEAR CONCEPT • LUXURY
            ACCESSORIES • URBAN STYLE MODERN COUTURE
          </div>
        </div>
      </div>

      {/* ========================================
          MAIN LAYOUT - Sidebar + Product Grid
          ======================================== */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* ========================================
            LEFT SIDEBAR - Filters (Category, Price)
            ======================================== */}
        <aside
          className="w-full lg:w-1/4 shrink-0 bg-white p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm lg:sticky lg:top-28 lg:self-start z-10"
        >
          <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Filter Options</span>
            <i className="fa-solid fa-sliders text-gray-400 text-xs"></i>
          </h3>

          {/* Category Filter */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Category
            </h4>
            <div className="space-y-2.5 max-h-52 sm:max-h-60 overflow-y-auto pr-2">
              {/* Map through categories and create checkboxes */}
              {categories.map((cat) => {
                const isChecked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-3 text-xs text-gray-600 cursor-pointer hover:text-gray-900 transition-colors capitalize py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 accent-[#8B6E59] border-gray-300 rounded-xs cursor-pointer transition-all"
                    />
                    <span
                      className={
                        isChecked ? "font-bold text-[#8B6E59]" : "font-medium"
                      }
                    >
                      {cat.replace(/-/g, " ")}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Price Range
            </h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500">$0.00</span>
              {/* Display current max price */}
              <span className="text-xs font-bold bg-amber-50 text-[#8B6E59] px-2 py-0.5 rounded-sm">
                ${maxPrice}.00
              </span>
            </div>
            {/* Price range slider */}
            <input
              type="range"
              min="10"
              max="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B6E59]"
            />
          </div>
        </aside>

        {/* ========================================
            RIGHT SIDE - Product Grid Main Content
            ======================================== */}
        <main className="w-full lg:w-3/4 flex flex-col justify-between">
          {/* Control Bar - Shows count, filters, and sorting */}
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 mb-8 border-b border-gray-100 text-xs text-gray-500"
          >
            {/* Results counter and search info */}
            <div className="font-medium">
              Showing 1-{slicedProducts.length} of{" "}
              <span className="font-bold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              results
              {qParam && (
                <div className="text-xs text-gray-600 mt-1">
                  Search results for "
                  <span className="font-semibold text-gray-800">{qParam}</span>"
                </div>
              )}
            </div>

            {/* Active filter badges with remove buttons */}
            <div
              className="
flex
flex-wrap
items-center
gap-2
flex-1
md:justify-center
"
            >
              {/* Map through selected categories and show as removable badges */}
              {selectedCategories.map((catName) => (
                <span
                  key={catName}
                  className="bg-amber-50/80 border border-amber-100 text-[#8B6E59] px-2.5 py-1 rounded-sm flex items-center gap-1 font-semibold text-[11px] capitalize animate-fade-in"
                >
                  {catName.replace(/-/g, " ")}
                  {/* Click to remove this filter */}
                  <button
                    onClick={() => handleCategoryChange(catName)}
                    className="hover:text-red-500 cursor-pointer font-bold ml-1 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
              {/* Show "Clear All" button only if filters are active */}
              {selectedCategories.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-gray-900 font-bold underline cursor-pointer text-[11px] ml-2 hover:text-[#8B6E59] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              label="Sort by:"
              options={[
                "Default Sorting",
                "Price: Low to High",
                "Price: High to Low",
              ]}
            />
          </div>

          {/* ========================================
              PRODUCT GRID - Shows loading, error, or products
              ======================================== */}
          {loading ? (
            // Loading state
            <div className="w-full text-center py-32 text-gray-400 text-xs tracking-wider uppercase font-medium">
              <div className="animate-spin inline-block w-7 h-7 border-2 border-[#8B6E59] border-t-transparent rounded-full mb-4"></div>
              <p className="animate-pulse">Loading fashion items...</p>
            </div>
          ) : error ? (
            // Error state
            <div className="w-full text-center py-32 text-red-500 text-xs font-bold border border-red-100 rounded-lg bg-red-50/50">
              ⚠️ Error: {error}
            </div>
          ) : slicedProducts.length > 0 ? (
            // Products found - display grid
            <>
              {/* Product Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Map through products and display each as a card */}
                {slicedProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="group block"
                  >
                    {/* Product Card Container */}
                    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                      {/* Product Image Section */}
                      <div
                        className="
aspect-3/4
bg-[#F9F9F9]
relative
overflow-hidden
flex
items-center
justify-center
p-3
sm:p-6
"
                      >
                        {/* Product Image with hover zoom effect */}
                        <img
                          src={product.thumbnail}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          alt={product.title}
                        />

                        {/* Wishlist Button - Top Right */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`absolute
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
transition-shadow ${wishlist && wishlist.some((w) => Number(w.id) === Number(product.id)) ? "bg-red-500 text-white shadow-md" : "bg-white text-gray-800 shadow"}`}
                          aria-label="Toggle wishlist"
                        >
                          <i className="fa-solid fa-heart"></i>
                        </button>

                        {/* Discount Badge - Top Left (shown only if discount exists) */}
                        {product.discountPercentage > 0 && (
                          <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                            -{Math.round(product.discountPercentage)}%
                          </span>
                        )}

                        {/* Add To Cart Button - Slides up on hover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-white via-white/80 to-transparent">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product.id);
                            }}
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
                            <i className="fa-solid fa-plus text-[10px]"></i> Add
                            To Cart
                          </button>
                        </div>
                      </div>

                      {/* Product Information Section */}
                      <div className="pt-4 flex flex-col gap-1 px-4 pb-4">
                        {/* Category & Rating Row */}
                        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
                          <span className="capitalize">
                            {(product.brand || product.category || "").replace(
                              /-/g,
                              " ",
                            )}
                          </span>
                          {/* Star Rating */}
                          <div className="flex items-center gap-1 text-amber-400">
                            <i className="fa-solid fa-star text-[10px]"></i>
                            <span className="text-neutral-800 font-bold">
                              {product.rating
                                ? product.rating.toFixed(1)
                                : "4.5"}
                            </span>
                          </div>
                        </div>

                        {/* Product Title - Truncated to 1 line */}
                        <h4
                          className="
font-medium
text-neutral-900
text-xs
sm:text-sm
tracking-wide
line-clamp-2
group-hover:text-neutral-500
transition-colors
mt-1
"
                        >
                          {product.title}
                        </h4>

                        {/* Price Section - Shows current and original price if discounted */}
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-sm sm:text-lg font-bold text-neutral-900">
                            ${product.price?.toFixed(2)}
                          </span>
                          {/* Show crossed-out original price if discount exists */}
                          {product.discountPercentage > 0 && (
                            <span className="text-sm text-neutral-400 line-through">
                              $
                              {(
                                product.price *
                                (1 + product.discountPercentage / 100)
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Show More Button - Pagination */}
              {filteredProducts.length > visibleCount && (
                <div className="w-full text-center mt-20">
                  <button
                    onClick={handleShowMore}
                    className="px-6
sm:px-10
py-3
bg-white
border-2
border-gray-950
text-gray-950
font-bold
text-xs
uppercase
tracking-widest
hover:bg-gray-950
hover:text-white
transition-all
duration-300
shadow-sm
cursor-pointer
rounded-3xl"
                  >
                    Show More Items
                  </button>
                </div>
              )}
            </>
          ) : (
            // No products found - show empty state message
            <div className="w-full text-center py-32 text-gray-400 text-xs font-bold border border-dashed border-gray-200 rounded-lg tracking-wide uppercase bg-white">
              😔 No products found matching criteria.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
