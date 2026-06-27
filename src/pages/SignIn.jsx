import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuthMode, setUser, authMode, setShowAuthModal } = useContext(AuthContext);
  const { setToken } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadUsers = () => {
    const list = JSON.parse(localStorage.getItem('fashionUsers') || 'null');
    if (Array.isArray(list)) return list;
    const single = JSON.parse(localStorage.getItem('fashionUser') || 'null');
    if (single) return [single];
    return [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('fashionCurrentUser', JSON.stringify(found));
      // Ensure no stale server token remains when using local auth
      setToken && setToken(null);
      setShowAuthModal && setShowAuthModal(false);
      alert('Signed in successfully');
      // clear fields
      setEmail('');
      setPassword('');
      navigate('/profile');
      return;
    }
    alert('Invalid email or password');
  };

  useEffect(() => {
    if (authMode === 'signin') {
      setEmail('');
      setPassword('');
    }
  }, [authMode]);

  return (
    <div className="grid md:grid-cols-2 min-h-162.5">
      {/* Left Side */}
      <div className="p-12 flex flex-col justify-center bg-white">
        <span className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wider">
          Welcome Back
        </span>

        <h1 className="text-4xl font-bold mt-2 text-gray-900">
          Sign In
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Sign in to continue your shopping journey.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />

          <button
            type="submit"
            className="w-full bg-[#3D2616] text-white py-3 rounded-xl font-semibold hover:bg-[#2b1a10] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <button
            type="button"
            onClick={() => setAuthMode("signup")}
            className="ml-2 text-[#8B5E3C] font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Right Side */}
      <div className="relative">
        <img
          src="https://i.pinimg.com/1200x/dc/26/d3/dc26d3c04b57472d8f0cfea05024f1c8.jpg"
          alt="Fashion"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-10 left-10 right-10 text-white">
          <h2 className="text-3xl font-bold mb-3">
            Welcome Back
          </h2>

          <p className="text-white/90 leading-relaxed">
            Access your account and continue exploring the latest fashion trends.
          </p>
        </div>
      </div>
    </div>
  );
}