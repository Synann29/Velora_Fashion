import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
  const { setAuthMode, authMode } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    // Save account locally (store multiple users)
    const loadUsers = () => {
      const list = JSON.parse(localStorage.getItem('fashionUsers') || 'null');
      if (Array.isArray(list)) return list;
      const single = JSON.parse(localStorage.getItem('fashionUser') || 'null');
      if (single) return [single];
      return [];
    };

    const existing = loadUsers();
    // prevent duplicate emails
    if (existing.find(u => u.email === email)) {
      alert('An account with this email already exists. Please sign in.');
      setAuthMode('signin');
      return;
    }

    const newUsers = [...existing, userData];
    localStorage.setItem('fashionUsers', JSON.stringify(newUsers));

    alert("Account created successfully! Please sign in.");

    // Switch to Sign In modal
    setAuthMode("signin");

    // Clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  // Clear form whenever the auth modal switches to signup
  useEffect(() => {
    if (authMode === 'signup') {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  }, [authMode]);

  return (
    <div className="grid md:grid-cols-2 min-h-12.5">
      {/* Left Side */}
      <div className="p-12 flex flex-col justify-center bg-white">
        <span className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wider">
          Welcome
        </span>

        <h1 className="text-4xl font-bold mt-2 text-gray-900">
          Create Account
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Join our fashion community and discover the latest trends.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
          </div>

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
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <button
            type="button"
            onClick={() => setAuthMode("signin")}
            className="ml-2 text-[#8B5E3C] font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>

      {/* Right Side */}
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/a4/fe/80/a4fe8076e0341798b15dc805424430e6.jpg"
          alt="Fashion"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-10 left-10 right-10 text-white">
          <h2 className="text-3xl font-bold mb-3">
            Discover Your Style
          </h2>

          <p className="text-white/90 leading-relaxed">
            Explore premium fashion collections designed to inspire confidence
            and elegance every day.
          </p>
        </div>
      </div>
    </div>
  );
}