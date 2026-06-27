import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PersonalInfo from '../components/Account/PersonalInformation';
import ManageAddress from '../components/Account/ManageAddress';
import PaymentMethods from '../components/Account/PaymentMethod';
import MyOrders from '../components/Account/MyOrders';

export default function Account() {
  const { user, setUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal Information');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', gender: 'Female' });
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    setFormData({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', phone: user.phone || '', gender: user.gender || 'Female' });
    setProfileImage(user.profileImage || '');
  }, [user, navigate]);

  const syncUserToStorage = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('fashionCurrentUser', JSON.stringify(updatedUser));
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const saveProfile = (e) => { e.preventDefault(); syncUserToStorage({ ...user, ...formData, profileImage }); alert('Updated!'); };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setProfileImage(reader.result); syncUserToStorage({ ...user, profileImage: reader.result }); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 pt-32">
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-fashion-brown mt-3">My Account</h1>
        <p className="text-sm text-gray-500">Home / My Account</p>
      </div>

       {/* Account Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-5 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left Sidebar */}
        <div className="space-y-3 rounded-3xl border border-fashion-brown/30 p-6 shadow-sm bg-fashion-cream h-fit">
          {['Personal Information', 'My Orders', 'Manage Address', 'Payment Methods'].map(item => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left rounded-3xl px-4 py-3 font-semibold ${activeTab === item ? 'bg-fashion-brown text-white' : 'text-black/80 hover:bg-fashion-brown hover:text-white'}`}>
              {item}
            </button>
          ))}
          {/* Logout Button */}
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 font-semibold text-red-500">Logout</button>
        </div>

          {/* Right Content */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-fashion-brown/30 min-h-125">
          {activeTab === 'Personal Information' && (
            <PersonalInfo 
              user={user} formData={formData} setFormData={setFormData} 
              handleChange={handleChange} saveProfile={saveProfile} 
              profileImage={profileImage} handleImageChange={handleImageChange} 
            />
          )}
          {activeTab === 'Manage Address' && <ManageAddress />}
          {activeTab === 'Payment Methods' && <PaymentMethods />}
          {activeTab === 'My Orders' && <MyOrders />}
        </div>

    </div>
  </div>
  );
}