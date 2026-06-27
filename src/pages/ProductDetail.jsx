import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('XXL');
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  useEffect(() => {
    // Show loading state while fetching new product
    setProduct(null);
    setRelatedProducts([]);
    setSelectedImage('');
    setCurrentImageIndex(0);

    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.images[0]);
        setCurrentImageIndex(0);

        fetch(
          `https://dummyjson.com/products/category/${data.category}?limit=4`
        )
          .then(res => res.json())
          .then(rel =>
            setRelatedProducts(
              rel.products.filter(p => p.id !== data.id)
            )
          );
      });
  }, [id]);

  // NEXT IMAGE
  const nextImage = () => {
    if (!product?.images) return;

    const nextIndex =
      currentImageIndex === product.images.length - 1
        ? 0
        : currentImageIndex + 1;

    setCurrentImageIndex(nextIndex);
    setSelectedImage(product.images[nextIndex]);
  };

  // PREVIOUS IMAGE
  const prevImage = () => {
    if (!product?.images) return;

    const prevIndex =
      currentImageIndex === 0
        ? product.images.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(prevIndex);
    setSelectedImage(product.images[prevIndex]);
  };

  // BACK TO PREVIOUS PAGE
  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <div className="text-center">

          {/* Loading Spinner */}
          <div className="w-16 h-16 border-4 border-neutral-300 border-t-[#C5A059] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-xl tracking-widest text-neutral-500">
            Loading Product...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFA] min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={handleBack}
          className="mb-8 text-3xl hover:text-[#C5A059] transition"
        >
          ←
        </button>

        {/* PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-24">

          {/* LEFT SIDE IMAGE GALLERY */}
          <div className="flex flex-col md:flex-row gap-4">

            {/* BIG IMAGE */}
            <div className="relative flex-1 bg-neutral-200 overflow-hidden shadow-xl order-1">

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-87.5 sm:h-125 md:h-162.5 object-cover"
                />
              </AnimatePresence>

              {/* Previous */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#C5A059] hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition text-xl"
              >
                ←
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#C5A059] hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition text-xl"
              >
                →
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex md:flex-col gap-3 overflow-x-auto order-2 md:order-1 pb-2 md:pb-0">
              {product.images?.slice(0, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  onClick={() => {
                    setSelectedImage(img);
                    setCurrentImageIndex(i);
                  }}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border cursor-pointer transition duration-300 ${selectedImage === img
                      ? 'border-[#C5A059] border-2'
                      : 'border-neutral-300 hover:border-[#C5A059]'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE INFO */}
          <div className="space-y-6">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif">
              {product.title}
            </h1>

            {/* RATING */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#C5A059] text-xl">
                ★★★★★
              </span>

              <span className="text-neutral-500">
                {product.rating} (245 Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-3xl sm:text-4xl font-bold">
                ${product.price}
              </p>

              {product.discountPercentage && (
                <p className="line-through text-neutral-400 text-xl sm:text-2xl">
                  ${(product.price * 1.2).toFixed(2)}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-neutral-600 leading-8">
              {product.description}
            </p>

            {/* COLOR */}
            <div className="space-y-4">
              <p className="uppercase text-sm font-bold">
                Color:
                <span className="text-neutral-500 font-normal">
                  {' '}Brown
                </span>
              </p>

              <div className="flex gap-3">
                {['#4A3728', '#FFFFFF', '#008000', '#FF0000'].map(c => (
                  <div
                    key={c}
                    className="w-9 h-9 rounded-full border border-neutral-300 cursor-pointer hover:scale-110 transition"
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="flex flex-wrap gap-3">
              {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 sm:w-14 sm:h-12 border rounded-2xl transition duration-300 ${selectedSize === size
                      ? 'bg-[#C5A059] text-white border-[#C5A059]'
                      : 'border-neutral-300 hover:border-[#C5A059]'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* STOCK */}
            <div className="flex items-center gap-2">
              <span className="font-bold">Stock:</span>

              <span className="text-green-600">
                {product.stock} Available
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">

              <button
                onClick={() => addToCart(product.id)}
                className="w-full sm:flex-1 py-3 sm:py-4 bg-fashion-brown rounded-4xl text-white hover:bg-[#79411e] transition duration-300 text-lg"
              >
                Add To Cart
              </button>

              <button
                className="w-full sm:flex-1 py-3 sm:py-4 bg-fashion-gold rounded-4xl text-white hover:bg-[#D68910] transition duration-300 text-lg"
              >
                Buy Now
              </button>

            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="border-t pt-16">

          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Explore Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="group block">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
                >

                  <div className="overflow-hidden relative">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-40 sm:h-56 md:h-72 object-cover transition duration-500"
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                      className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-shadow ${wishlist && wishlist.some(w => Number(w.id) === Number(p.id)) ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-800 shadow'}`}
                      aria-label="Toggle wishlist"
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
                  </div>

                  <div className="p-5 space-y-3">

                    <p className="uppercase text-xs tracking-widest text-neutral-400">
                      {p.category}
                    </p>

                    <h3 className="font-bold text-lg line-clamp-1">
                      {p.title}
                    </h3>

                    <div className="flex items-center justify-between">

                      <p className="text-[#C5A059] text-2xl font-bold">
                        ${p.price}
                      </p>

                      <button type="button" className="px-4 py-2 bg-[#4A3728] text-white text-sm hover:bg-[#C5A059] transition rounded-3xl">
                        View
                      </button>

                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}