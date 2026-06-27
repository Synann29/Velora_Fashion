import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, setWishlist } =
    useContext(AppContext);

  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemove = (item) => toggleWishlist(item);

  const handleClear = async () => {
    if (!wishlist?.length) return;

    setIsProcessing(true);

    try {
      for (const it of wishlist) {
        await toggleWishlist(it);
      }

      localStorage.removeItem('guestWishlist');
      setWishlist([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddAllToCart = async () => {
    if (!wishlist?.length) return;

    setIsProcessing(true);

    try {
      for (const item of wishlist) {
        try {
          await addToCart(Number(item.id));
        } catch (e) {
          console.error(e);
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Wishlist
          </h1>

          <p className="text-neutral-500 mt-2 text-sm sm:text-base">
            Home / Wishlist
          </p>
        </div>

        {!wishlist || wishlist.length === 0 ? (
          <div className="text-center py-20 border rounded-xl text-neutral-500">
            Your wishlist is empty.
          </div>
        ) : (
          <div>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-fashion-gold px-6 py-6 text-sm font-bold text-neutral-900 rounded-2xl">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Date Added</div>
              <div className="col-span-3">Stock Status</div>
            </div>

            {/* Products */}
            <div className="divide-y md:rounded-none md:border-b">

              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="
                    p-4 md:px-6 md:py-4
                    flex flex-col md:grid
                    md:grid-cols-12
                    gap-4 md:gap-6
                    md:items-center
                  "
                >
                  {/* Product */}
                  <div className="md:col-span-5 flex items-start sm:items-center gap-4">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-neutral-400 hover:text-red-600 font-bold text-lg"
                    >
                      ✕
                    </button>

                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                        {item.title}
                      </h3>

                      <p className="text-xs text-neutral-500 mt-1">
                        Color : {item.color || 'Brown'} | Size :{' '}
                        {item.size || 'S'}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex justify-between md:block">
                    <span className="font-medium md:hidden">
                      Price:
                    </span>

                    <span className="text-neutral-900">
                      $
                      {item.price
                        ? Number(item.price).toFixed(2)
                        : '—'}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-2 flex justify-between md:block">
                    <span className="font-medium md:hidden">
                      Date:
                    </span>

                    <span className="text-neutral-900 text-sm">
                      {item.dateAdded || '18 February 2024'}
                    </span>
                  </div>

                  {/* Stock & Button */}
                  <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-row gap-3 md:items-center md:justify-between">
                    <span className="text-green-600 font-medium">
                      Instock
                    </span>

                    <button
                      onClick={() => addToCart(Number(item.id))}
                      className="
                        w-full
                        sm:w-auto
                        bg-fashion-brown
                        text-white
                        px-5
                        py-2.5
                        rounded-3xl
                        text-sm
                        hover:opacity-90
                        transition
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions Wrapper */}
            {isProcessing ? (
              <div className="flex items-center gap-3 pt-10 text-sm text-neutral-500">
                <div className="h-4 w-4 rounded-full border-2 border-neutral-300 border-t-fashion-brown animate-spin"></div>
                <span>
                  Processing wishlist action... please wait.
                </span>
              </div>
            ) : (
              /* The key layout changes are directly below */
              <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left Side: Wishlist Link + Input + Copy Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1 max-w-xl">
                  <span className="font-bold text-sm whitespace-nowrap">
                    Wishlist link:
                  </span>

                  <input
                    readOnly
                    value={window.location.href}
                    className="border p-3 flex-1 text-sm rounded-3xl min-w-0"
                  />
                
                  <button
                    onClick={copyLink}
                    className="
                      w-full
                      sm:w-auto
                      bg-fashion-brown
                      text-white
                      px-6
                      py-3
                      rounded-3xl
                      whitespace-nowrap
                    "
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Right Side: Actions (Clear & Add All) */}
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-end">
                  <button
                    onClick={handleClear}
                    className="underline text-sm font-medium whitespace-nowrap"
                  >
                    Clear Wishlist
                  </button>

                  <button
                    onClick={handleAddAllToCart}
                    className="
                      w-full
                      sm:w-auto
                      bg-fashion-brown
                      text-white
                      px-6
                      py-3
                      rounded-3xl
                      whitespace-nowrap
                    "
                  >
                    Add All to Cart
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}