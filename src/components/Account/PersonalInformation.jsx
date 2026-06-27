import React, { useState } from 'react';

export default function PersonalInfo({ user, formData, setFormData, handleChange, saveProfile, profileImage, handleImageChange }) {
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
      
      {/* Profile Image Section */}
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:items-end">
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-3xl font-bold text-gray-400">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
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
        <label htmlFor="profileImage" className="inline-flex cursor-pointer items-center rounded-full border border-fashion-brown/50 bg-fashion-brown/5 px-4 py-2 text-sm font-semibold text-fashion-brown transition hover:bg-fashion-brown/10">
          Select Photo
        </label>
        <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>

      {/* Form Section */}
      <form onSubmit={saveProfile} className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="w-full rounded-2xl border border-fashion-brown/50 px-4 py-3" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" className="w-full rounded-2xl border border-fashion-brown/50 px-4 py-3" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="w-full rounded-2xl border border-fashion-brown/50 px-4 py-3" />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone *" className="w-full rounded-2xl border border-fashion-brown/50 px-4 py-3" />
        </div>

        {/* Gender Dropdown */}
        <div className="relative">
          <label>Gender *</label>
          <div onClick={() => setIsGenderOpen(!isGenderOpen)} className="w-full flex justify-between items-center cursor-pointer rounded-2xl border border-fashion-brown/50 px-4 py-3 bg-white">
            <span>{formData.gender}</span>
            <span className={`transition-transform ${isGenderOpen ? 'rotate-180' : ''}`}>▼</span>
          </div>
          {isGenderOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border rounded-2xl shadow-xl overflow-hidden">
              {['Female', 'Male', 'Other'].map((option) => (
                <div key={option} onClick={() => { setFormData(prev => ({ ...prev, gender: option })); setIsGenderOpen(false); }}
                  className={`px-4 py-3 cursor-pointer ${formData.gender === option ? 'bg-[#4a3520] text-white' : 'hover:bg-[#fff9f0]'}`}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="w-full rounded-2xl bg-fashion-brown px-6 py-3 text-white font-semibold">Update Changes</button>
      </form>
    </div>
  );
}