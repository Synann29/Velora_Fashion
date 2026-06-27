import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, wishlist } = useContext(AppContext);

  const {
    user,
    setShowAuthModal,
  } = useContext(AuthContext);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef(null);

  const totalItems =
    cart?.products?.reduce((acc, item) => acc + item.count, 0) || 0;

  const navItems = [
    'Home',
    'Shop',
    'Women',
    'Men',
    'Accessories',
    'About Us',
    'Contact Us',
  ];

  const pathMap = {
    Home: '/',
    Shop: '/shop',
    Women: '/women',
    Men: '/men',
    Accessories: '/accessories',
    'About Us': '/about',
    'Contact Us': '/contact',
  };

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();

    const q = searchQuery.trim();

    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">

      {/* Top Bar */}
      <div className="bg-fashion-brown text-fashion-cream text-xs py-2 px-4 flex justify-between items-center md:px-12">
        <span className="hidden sm:inline text-[11px]">
          Support (406) 555-0120
        </span>

        <p className="mx-auto sm:mx-0 text-[11px] md:text-xs text-center">
          Sign up and{' '}
          <span className="font-bold text-fashion-gold">
            GET 25% OFF
          </span>{' '}
          for your first order.
          <button
            onClick={() => setShowAuthModal(true)}
            className="ml-1 underline text-fashion-gold hover:text-white"
          >
            Sign up now
          </button>
        </p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-fashion-brown"
          >
            <i
              className={`fa-solid ${
                mobileMenuOpen ? 'fa-xmark' : 'fa-bars'
              }`}
            ></i>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-serif font-bold text-lg md:text-xl text-fashion-brown"
          >
            <img
              src='../src/assets/logo.png'
              alt="Velora Fashion Logo"
              className="h-12 w-auto object-contain md:h-14"
            />
            Velora Fashion
            <span className="text-fashion-gold">.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium text-gray-700">
          {navItems.map((item) => {
            const path = pathMap[item];

            return (
              <Link
                key={item}
                to={path}
                className={`pb-1 transition-colors ${
                  location.pathname === path
                    ? 'text-fashion-brown font-bold border-b-2 border-fashion-brown'
                    : 'hover:text-fashion-brown'
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-5 text-fashion-brown">

          {/* Search */}
          <AnimatePresence mode="wait">
            {!searchOpen ? (
              <motion.button
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchOpen(true)}
                className="p-2"
              >
                <i className="fa-solid fa-magnifying-glass text-[17px]"></i>
              </motion.button>
            ) : (
              <motion.form
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submitSearch}
                className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1 overflow-hidden w-37.5 sm:w-62.5"
              >
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search..."
                  className="flex-1 px-2 py-1 text-sm outline-none"
                />

                <button
                  type="submit"
                  className="bg-fashion-brown text-white text-xs px-2 py-1 rounded"
                >
                  Go
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/wishlist')}
            className="relative"
          >
            <i className="fa-regular fa-heart text-[18px]"></i>

            <span className="absolute -top-2 -right-2 bg-fashion-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist?.length || 0}
            </span>
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative"
          >
            <i className="fa-solid fa-bag-shopping text-[18px]"></i>

            <span className="absolute -top-2 -right-2 bg-fashion-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </button>

          {/* User */}
          {user ? (
            <Link to="/profile">
              <i className="fa-solid fa-user text-[18px]"></i>
            </Link>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="hidden sm:block text-xs font-bold uppercase border border-fashion-brown px-3 py-1.5 hover:bg-fashion-brown hover:text-white transition"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
              {navItems.map((item) => {
                const path = pathMap[item];

                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`transition-colors ${
                      location.pathname === path
                        ? 'text-fashion-brown font-bold'
                        : 'hover:text-fashion-brown'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}

              {!user && (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 bg-fashion-brown text-white py-2 rounded-lg"
                >
                  Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}