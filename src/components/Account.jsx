import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ManageAddress from '../components/ManageAddress';

export default function Account() {
  const { user, setUser, handleLogout, setShowAuthModal } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Female',
  });
  const [profileImage, setProfileImage] = useState('');

  const menuItems = ['Personal Information', 'My Orders', 'Manage Address', 'Payment Method', 'Password Manager'];

  const syncUserToStorage = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('fashionCurrentUser', JSON.stringify(updatedUser));
    const storedUsers = JSON.parse(localStorage.getItem('fashionUsers') || 'null');
    if (Array.isArray(storedUsers)) {
      const nextUsers = storedUsers.map((existing) =>
        existing.email === updatedUser.email ? { ...existing, ...updatedUser } : existing
      );
      localStorage.setItem('fashionUsers', JSON.stringify(nextUsers));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || 'Female',
    });
    setProfileImage(user.profileImage || '');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, ...formData, profileImage };
    syncUserToStorage(updated);
    alert('Your profile has been updated.');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setProfileImage(imageData);
      syncUserToStorage({ ...user, profileImage: imageData });
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 pt-32">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500">Home / My Account</p>
        <h1 className="text-4xl font-bold text-fashion-brown mt-3">My Account</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="rounded-3xl bg-fashion-gold/10 px-5 py-4 text-fashion-brown font-semibold">Personal Information</div>
          <button disabled className="w-full text-left rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-400 cursor-not-allowed">
            My Orders
          </button>
          <button disabled className="w-full text-left rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-400 cursor-not-allowed">
            {activeTab === 'Manage Address' && <ManageAddress />}
          </button>
          <button disabled className="w-full text-left rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-400 cursor-not-allowed">
            Payment Method
          </button>
          <button disabled className="w-full text-left rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-400 cursor-not-allowed">
            Password Manager
          </button>
          <button onClick={handleLogout} className="w-full rounded-xl px-4 py-3 bg-fashion-brown text-white hover:bg-[#3a220f] transition">
            Logout
          </button>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:items-end">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-3xl font-bold text-gray-400">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{(user?.firstName?.[0] || '').toUpperCase() || (user?.email?.[0] || '').toUpperCase()}</span>
              )}
              <span className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-fashion-brown text-white text-sm">
                <i className="fa-solid fa-pen"></i>
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Update your profile information below.</p>
              <h2 className="text-2xl font-semibold text-gray-900">{user?.firstName || 'Customer'} {user?.lastName || ''}</h2>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
            <label htmlFor="profileImage" className="inline-flex cursor-pointer items-center rounded-full border border-fashion-brown bg-fashion-brown/5 px-4 py-2 text-sm font-semibold text-fashion-brown transition hover:bg-fashion-brown/10">
              Select Photo
            </label>
            <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <p className="text-xs text-gray-500">Choose a profile image from your PC. Leave blank to keep the default avatar.</p>
          </div>

          <form onSubmit={saveProfile} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-gray-700">
                First Name *
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-fashion-brown focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-700">
                Last Name *
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-fashion-brown focus:outline-none"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-gray-700">
                Email *
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-fashion-brown focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-700">
                Phone *
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-fashion-brown focus:outline-none"
                />
              </label>
            </div>

            <div className="space-y-2 text-sm text-gray-700 relative">
              <label>Gender *</label>
              <div 
                onClick={() => setIsGenderOpen(!isGenderOpen)}
                className="w-full flex justify-between items-center cursor-pointer rounded-2xl border border-fashion-brown px-4 py-3 text-gray-700 focus:outline-none bg-white"
              >
                <span>{formData.gender}</span>
                <span className={`transition-transform duration-200 ${isGenderOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>

              {/* Dropdown Menu */}
              {isGenderOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                  {['Female', 'Male', 'Other'].map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, gender: option }));
                        setIsGenderOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        formData.gender === option 
                          ? 'bg-[#4a3520] text-white' // The dark brown color
                          : 'hover:bg-[#fff9f0] text-gray-700' // The light cream hover
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="w-full rounded-2xl bg-fashion-brown px-6 py-3 text-white font-semibold hover:bg-[#3a220f] transition">
              Update Changes
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
