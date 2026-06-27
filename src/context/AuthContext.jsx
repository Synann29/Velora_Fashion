import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fashionCurrentUser') || 'null');
    } catch {
      return null;
    }
  });

  // Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  // signin | signup
  const [authMode, setAuthMode] = useState('signin');

  useEffect(() => {
    if (user) {
      localStorage.setItem('fashionCurrentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('fashionCurrentUser');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setShowAuthModal(false);
    alert('You have been logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
