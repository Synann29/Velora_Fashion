import React, { createContext, useState, useEffect } from 'react';
import { fashionApi } from '../services/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // រាល់ពេលមាន Token យើងនឹងទៅ Fetch ទាញយក Cart និង Wishlist ពី API មកជានិច្ច
  useEffect(() => {
    if (token) {
      localStorage.setItem('userToken', token);
      loadCartAndWishlist();
    } else {
      localStorage.removeItem('userToken');
      // If no server token, restore a guest cart from localStorage if present
      const guest = localStorage.getItem('guestCart');
      setCart(guest ? JSON.parse(guest) : null);
      const guestWish = localStorage.getItem('guestWishlist');
      setWishlist(guestWish ? JSON.parse(guestWish) : []);
    }
  }, [token]);

  const loadCartAndWishlist = async () => {
    try {
      const cartData = await fashionApi.cart.get();
      setCart(cartData.data);

      const wishData = await fashionApi.wishlist.get();
      setWishlist(wishData.data);
    } catch (err) {
      console.error("Error loading initial user data:", err);
    }
  };

  // Wishlist helpers (supports server when token exists, otherwise uses localStorage)
  const toggleWishlist = async (product) => {
    if (token) {
      try {
        const exists = wishlist && wishlist.some(w => Number(w.id) === Number(product.id));
        if (exists) {
          await fashionApi.wishlist.remove(product.id);
        } else {
          await fashionApi.wishlist.add(product.id);
        }
        // refresh wishlist from server
        const wishData = await fashionApi.wishlist.get();
        setWishlist(wishData.data);
      } catch (err) {
        console.error('Error toggling server wishlist:', err);
      }
      return;
    }

    try {
      const existing = localStorage.getItem('guestWishlist');
      let guest = existing ? JSON.parse(existing) : [];
      const found = guest.find(p => Number(p.id) === Number(product.id));
      if (found) {
        guest = guest.filter(p => Number(p.id) !== Number(product.id));
      } else {
        guest.push({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail });
      }
      localStorage.setItem('guestWishlist', JSON.stringify(guest));
      setWishlist(guest);
    } catch (err) {
      console.error('Error toggling guest wishlist:', err);
    }
  };

  // មុខងារបន្ថែមទំនិញទៅកន្ត្រក (យកទៅប្រើលើកាតផលិតផល)
  const addToCart = async (productId) => {
    if (token) {
      try {
        const res = await fashionApi.cart.add(productId);
        setCart(res.data); // Update server-side cart
        alert('Product added to cart successfully!');
      } catch (err) {
        alert(err.message);
      }
      return;
    }

    // Guest/local flow: store cart in localStorage so users who sign up locally can still use cart
    try {
      const resp = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!resp.ok) throw new Error('Failed to fetch product');
      const product = await resp.json();

      const existing = localStorage.getItem('guestCart');
      let guestCart = existing ? JSON.parse(existing) : { products: [] };

      const found = guestCart.products.find(p => Number(p.id) === Number(product.id));
      if (found) {
        found.count = (found.count || 0) + 1;
      } else {
        guestCart.products.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          count: 1
        });
      }

      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      setCart(guestCart);
      alert('Product added to cart (guest)');
    } catch (err) {
      console.error('Error adding to guest cart:', err);
      alert('Could not add product to cart');
    }
  };

  // Update quantity for item in cart (guest or server)
  const updateCartItem = async (productId, newCount) => {
    if (token) {
      try {
        const res = await fashionApi.cart.updateQuantity(productId, newCount);
        setCart(res.data);
      } catch (err) {
        console.error('Error updating server cart item:', err);
        alert('Could not update cart item');
      }
      return;
    }

    try {
      const existing = localStorage.getItem('guestCart');
      let guestCart = existing ? JSON.parse(existing) : { products: [] };
      guestCart.products = guestCart.products.map(p => (Number(p.id) === Number(productId) ? { ...p, count: newCount } : p)).filter(p => p.count > 0);
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      setCart(guestCart.products.length ? guestCart : null);
    } catch (err) {
      console.error('Error updating guest cart:', err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (token) {
      try {
        const res = await fashionApi.cart.removeItem(productId);
        setCart(res.data);
      } catch (err) {
        console.error('Error removing server cart item:', err);
        alert('Could not remove item');
      }
      return;
    }

    try {
      const existing = localStorage.getItem('guestCart');
      let guestCart = existing ? JSON.parse(existing) : { products: [] };
      guestCart.products = guestCart.products.filter(p => Number(p.id) !== Number(productId));
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      setCart(guestCart.products.length ? guestCart : null);
    } catch (err) {
      console.error('Error removing guest cart item:', err);
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        await fashionApi.cart.clear();
        setCart(null);
      } catch (err) {
        console.error('Error clearing server cart:', err);
        alert('Could not clear cart');
      }
      return;
    }

    try {
      localStorage.removeItem('guestCart');
      setCart(null);
    } catch (err) {
      console.error('Error clearing guest cart:', err);
    }
  };

  return (
    <AppContext.Provider value={{ token, setToken, cart, setCart, wishlist, setWishlist, addToCart, updateCartItem, removeFromCart, clearCart, toggleWishlist }}>
      {children}
    </AppContext.Provider>
  );
}