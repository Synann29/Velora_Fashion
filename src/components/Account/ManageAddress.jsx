import React, { useState } from 'react';

const locationData = {
  "Cambodia": ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville"],
  "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
  "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Sapporo"],
  "UK": ["London", "Manchester", "Birmingham", "Liverpool"]
};

export default function ManageAddress() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', country: '', city: '', street: '', phone: '', email: ''
  });
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const addAddress = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.country || !formData.city) return;
    if (editId) {
      setAddresses(addresses.map(a => a.id === editId ? { ...formData, id: editId } : a));
      setEditId(null);
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    setFormData({ firstName: '', lastName: '', country: '', city: '', street: '', phone: '', email: '' });
  };

  const deleteAddress = (id) => setAddresses(addresses.filter(a => a.id !== id));

  const editAddress = (addr) => {
    setFormData(addr);
    setEditId(addr.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Addresses</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={addAddress} className="space-y-3 sm:space-y-4">

        {/* Row 1: First + Last Name */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '0.75rem' }}>
          <input
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            className="p-3 border border-fashion-brown/50 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-fashion-brown/30"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            className="p-3 border border-fashion-brown/50 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-fashion-brown/30"
            required
          />
        </div>

        {/* Row 2: Country + City */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '0.75rem' }}>

          {/* Country */}
          <div className="relative">
            <div
              onClick={() => { setIsCountryOpen(!isCountryOpen); setIsCityOpen(false); }}
              className="p-3 border border-fashion-brown/50 rounded-2xl cursor-pointer bg-white flex justify-between items-center text-sm"
              style={{ color: formData.country ? '#111' : '#9ca3af' }}
            >
              <span className="truncate">{formData.country || "Country *"}</span>
              <span className="text-xs ml-1 shrink-0">▼</span>
            </div>
            {isCountryOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-fashion-brown/50 rounded-2xl shadow-xl max-h-40 overflow-y-auto">
                {Object.keys(locationData).map(country => (
                  <div
                    key={country}
                    onClick={() => { setFormData({ ...formData, country, city: '' }); setIsCountryOpen(false); }}
                    className={`p-3 cursor-pointer text-sm ${formData.country === country ? 'bg-[#4a3520] text-white' : 'hover:bg-[#fff9f0]'}`}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* City */}
          <div className="relative">
            <div
              onClick={() => { if (formData.country) { setIsCityOpen(!isCityOpen); setIsCountryOpen(false); } }}
              className={`p-3 border border-fashion-brown/50 rounded-2xl cursor-pointer bg-white flex justify-between items-center text-sm ${!formData.country ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ color: formData.city ? '#111' : '#9ca3af' }}
            >
              <span className="truncate">{formData.city || "City *"}</span>
              <span className="text-xs ml-1 shrink-0">▼</span>
            </div>
            {isCityOpen && formData.country && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-fashion-brown/50 rounded-2xl shadow-xl max-h-40 overflow-y-auto">
                {locationData[formData.country].map(city => (
                  <div
                    key={city}
                    onClick={() => { setFormData({ ...formData, city }); setIsCityOpen(false); }}
                    className={`p-3 cursor-pointer text-sm ${formData.city === city ? 'bg-[#4a3520] text-white' : 'hover:bg-[#fff9f0]'}`}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Street — full width */}
        <input
          name="street"
          placeholder="Street Address *"
          value={formData.street}
          onChange={e => setFormData({ ...formData, street: e.target.value })}
          className="p-3 border border-fashion-brown/50 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-fashion-brown/30"
          required
        />

        {/* Row 3: Phone + Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '0.75rem' }}>
          <input
            name="phone"
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="p-3 border border-fashion-brown/50 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-fashion-brown/30"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="p-3 border border-fashion-brown/50 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-fashion-brown/30"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-fashion-brown text-white py-3 px-8 rounded-2xl text-sm font-semibold w-full sm:w-auto hover:bg-fashion-brown/90 active:bg-fashion-brown/80 transition-colors"
        >
          {editId ? 'Update Address' : 'Add Address'}
        </button>
      </form>

      {/* ===== SAVED ADDRESSES LIST ===== */}
      {addresses.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Saved Addresses</h3>
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border border-neutral-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-900">{addr.firstName} {addr.lastName}</p>
                  <p className="text-xs text-gray-500">{addr.street}, {addr.city}, {addr.country}</p>
                  <p className="text-xs text-gray-500">{addr.phone} · {addr.email}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => editAddress(addr)}
                    className="text-xs font-semibold px-4 py-2 rounded-xl border border-fashion-brown/50 text-fashion-brown hover:bg-fashion-brown hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
