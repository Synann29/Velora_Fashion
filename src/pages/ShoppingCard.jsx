import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';

export default function ShoppingCard() {
  const navigate = useNavigate();

  const {
    cart,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useContext(AppContext);

  const { user } = useContext(AuthContext);

  const total = (cart?.products || []).reduce(
    (acc, p) => acc + p.price * (p.count || 0),
    0
  );

  const totalItems = (cart?.products || []).reduce(
    (acc, p) => acc + p.count,
    0
  );

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Shopping Cart is Empty
        </h2>

        <Link
          to="/shop"
          className="px-8 py-3 bg-[#3D2616] text-white rounded-3xl"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-12 bg-white">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
          Shopping Cart
        </h1>

        <p className="text-neutral-500 mt-2 text-sm sm:text-base">
          Home / Shopping Cart
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products */}
        <div className="lg:col-span-2">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-[#E5B56A] p-4 text-sm font-bold text-neutral-900 mb-4 rounded-2xl">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>

          {/* Products */}
          <div className="space-y-4 md:space-y-0">
            {cart.products.map((p) => (
              <div
                key={p.id}
                className="
                  border rounded-xl p-4
                  md:border-b md:border-x-0 md:border-t-0 md:rounded-none
                  md:grid md:grid-cols-12 md:gap-4 md:items-center
                "
              >
                {/* Product */}
                <div className="md:col-span-6 flex gap-4">
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="text-neutral-400 hover:text-red-600 font-bold text-lg self-start"
                  >
                    ✕
                  </button>

                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 text-sm sm:text-base">
                      {p.title}
                    </h3>

                    <p className="text-xs text-neutral-500 mt-1">
                      Color: {p.color || 'Brown'} | Size:{' '}
                      {p.size || 'XXL'}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex justify-between md:block mt-4 md:mt-0">
                  <span className="font-medium md:hidden">
                    Price
                  </span>

                  <div className="md:text-center text-neutral-700">
                    ${p.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex justify-between items-center md:justify-center mt-3 md:mt-0">
                  <span className="font-medium md:hidden">
                    Quantity
                  </span>

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateCartItem(
                          p.id,
                          Math.max(1, p.count - 1)
                        )
                      }
                      className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200"
                    >
                      -
                    </button>

                    <span className="px-4 font-medium">
                      {p.count}
                    </span>

                    <button
                      onClick={() =>
                        updateCartItem(
                          p.id,
                          p.count + 1
                        )
                      }
                      className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="md:col-span-2 flex justify-between md:block mt-3 md:mt-0">
                  <span className="font-medium md:hidden">
                    Subtotal
                  </span>

                  <div className="md:text-center font-bold text-neutral-900">
                    ${(p.price * p.count).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <input
              type="text"
              placeholder="Coupon Code"
              className="
                border border-neutral-300
                p-3
                w-full md:w-56
                rounded-3xl
                outline-none
              "
            />

            <button
              className="
                w-full md:w-auto
                bg-[#3D2616]
                text-white
                px-6
                py-3
                rounded-3xl
              "
            >
              Apply Coupon
            </button>

            <button
              onClick={clearCart}
              className="
                md:ml-auto
                underline
                text-neutral-600
                hover:text-black
                text-center
              "
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <aside
          className="
            border border-neutral-200
            p-6 md:p-8
            h-fit
            shadow-sm
            rounded-xl
            bg-[#FAF7F2]
          "
        >
          <h2 className="text-xl font-bold mb-6 border-b pb-4">
            Order Summary
          </h2>

          <div className="space-y-4 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Items</span>

              <span className="font-bold text-black">
                {totalItems}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>

              <span className="font-bold text-black">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span className="font-bold text-black">
                $0.00
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>

              <span className="font-bold text-black">
                $0.00
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 font-bold text-lg text-black">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  alert(
                    'Please sign in to proceed to checkout.'
                  );
                  navigate('/signin');
                  return;
                }

                navigate('/checkout');
              }}
              className="
                w-full
                bg-[#3D2616]
                text-white
                py-3 md:py-4
                mt-6
                font-bold
                rounded-3xl
                hover:bg-black
                transition-colors
              "
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}