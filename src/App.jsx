import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Import Global Components
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// Import Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Women from './pages/Women';
import Men from './pages/Men';
import Accessories from './pages/Accessories';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp.jsx';
import Account from './pages/Account';
import ShoppingCard from './pages/ShoppingCard';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';

function AppContent() {
  const { showAuthModal, setShowAuthModal, authMode } = useContext(AuthContext);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <div className="bg-white min-h-screen text-gray-800 antialiased font-sans select-none flex flex-col justify-between">
      <Header />

      {/* Pop-up Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        >
          {authMode === "signin" ? <SignIn /> : <SignUp />}
        </AuthModal>
      )}



      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Account />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
        </Routes>
      </main>

      {!isProductPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}