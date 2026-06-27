import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  
  // Multi-step management states
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Shipping form fields data states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const total = (cart?.products || []).reduce((acc, p) => acc + (p.price * (p.count || 0)), 0);

  // Handle form input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Validate fields for Step 1 before proceeding to Payment options selection
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      alert('Please fill out all the required fields (*).');
      return;
    }
    setStep(2); // Advance timeline step map forward
  };

  // Confirm final checkout order payload save tasks on Step 2
  const handleConfirmPayment = async () => {
    if (!cart || !cart.products || cart.products.length === 0) return;

    if (!paymentMethod) {
      alert('Please select a payment method before confirming.');
      return;
    }

    const newOrder = {
      id: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userEmail: user?.email,
      total: `$${total.toFixed(2)}`,
      method: paymentMethod,
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      status: 'Accepted',
      shippingDetails: shippingInfo, // Save metadata block context entries natively
      items: cart.products.map((p) => ({
        title: p.title,
        color: p.color || 'Brown',
        size: p.size || 'XXL',
        qty: p.count,
        image: p.thumbnail,
      }))
    };

    const existingData = localStorage.getItem('fashionOrders');
    const existingOrders = existingData ? JSON.parse(existingData) : [];
    const nextOrders = [newOrder, ...existingOrders];
    
    localStorage.setItem('fashionOrders', JSON.stringify(nextOrders));
    await clearCart();
  
    alert('Payment Confirmed Successfully!');
    navigate('/profile'); 
  };

  const paymentOptions = [
    { id: 'Visa Card', label: 'Visa Card', icon: <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black text-white tracking-widest shadow-sm">VISA</div> },
    { id: 'Credit Card', label: 'Credit Card', icon: <div className="w-10 h-7 bg-purple-600 rounded flex items-center justify-center text-xs font-bold text-white shadow-sm">💳</div> },
    { id: 'ABA', label: 'ABA Pay', icon: <div className="w-10 h-7 bg-cyan-700 rounded flex flex-col items-center justify-center text-[9px] font-black text-white leading-none shadow-sm"><span>ABA</span><span className="text-[6px] tracking-tighter">PAY</span></div> },
    { id: 'Cash On Delivery', label: 'Cash On Delivery', icon: <div className="w-10 h-7 bg-emerald-600 rounded flex items-center justify-center text-sm shadow-sm">💵</div> },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 md:px-12 text-neutral-800">
       <div className="text-center mb-8  py-4">
        <h1 className="text-4xl font-bold text-neutral-900 font-serif">Shipping Order</h1>
        <p className="text-neutral-500 mt-2 text-sm">Home / Shipping Order</p>
      </div>
      
      {/* Dynamic Stepper Timeline Bar Indicator matching design specification from image_cdec9b.png */}
      {/* <div className="max-w-xl mx-auto flex items-center justify-between mb-16 relative text-xs md:text-sm font-semibold text-neutral-400">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-neutral-200 z-0" /> */}
        
        {/* Step 1 Node */}
        {/* <div className={`flex items-center gap-2 bg-[#FAF8F5] px-3 z-10 ${step >= 1 ? 'text-black font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-black' : 'bg-neutral-300'}`}>1</span>
          <span>Shipping</span>
        </div> */}

        {/* Step 2 Node */}
        {/* <div className={`flex items-center gap-2 bg-[#FAF8F5] px-3 z-10 ${step === 2 ? 'text-black font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step === 2 ? 'bg-black' : 'bg-neutral-300'}`}>2</span>
          <span>Payment</span>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Interactive Content Area Container */}
        <div className="lg:col-span-2 bg-white border border-fashion-brown/50 rounded-2xl p-6 md:p-10 shadow-sm">
          
          {/* STEP 1 VIEW FORM BLOCK PANEL */}
          {step === 1 && (
            <form onSubmit={handleContinueToPayment} className="space-y-6">
              <h2 className="text-2xl font-serif text-neutral-900 mb-6 flex items-center gap-2">
                <span>🚚</span> Shipping Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">First Name *</label>
                  <input type="text" name="firstName" required value={shippingInfo.firstName} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Last Name *</label>
                  <input type="text" name="lastName" required value={shippingInfo.lastName} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Phone *</label>
                  <input type="tel" name="phone" required value={shippingInfo.phone} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Email</label>
                  <input type="email" name="email" value={shippingInfo.email} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Address *</label>
                <input type="text" name="address" required value={shippingInfo.address} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">City *</label>
                  <input type="text" name="city" required value={shippingInfo.city} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Postal Code</label>
                  <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Notes</label>
                <textarea name="notes" rows="3" value={shippingInfo.notes} onChange={handleInputChange} className="w-full border border-neutral-200 rounded-lg p-3 outline-none focus:border-black transition-all bg-neutral-50 resize-none"></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto bg-fashion-brown text-white px-8 py-3.5 font-bold hover:bg-black transition-colors rounded-3xl uppercase tracking-wider text-xs">
                Continue to Payment
              </button>
            </form>
          )}

          {/* STEP 2 VIEW SELECTION INTERFACE */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-bold text-neutral-900">Select Payment Method</h2>
                <button onClick={() => setStep(1)} className="text-xs font-semibold text-neutral-500 hover:text-black underline">
                  ← Edit Shipping
                </button>
              </div>
              
              <div className="space-y-3">
                {paymentOptions.map((method) => (
                  <label key={method.id} className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === method.id ? 'border-[#3D2616] bg-neutral-50 ring-1 ring-[#3D2616]' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="accent-[#3D2616] w-4 h-4" />
                      <div className="flex-shrink-0">{method.icon}</div>
                      <span className="font-bold text-neutral-800 text-sm md:text-base">{method.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Order Summary Block Sidebar */}
        <aside className="border border-neutral-200 p-8 h-fit shadow-sm rounded-2xl bg-fashion-cream sticky top-32">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
          <div className="space-y-4 text-sm text-neutral-600">
            
            {/* Display products in cart overview */}
            <div className="max-h-40 overflow-y-auto divide-y divide-neutral-200 pr-2 space-y-2 mb-4">
              {(cart?.products || []).map((p, i) => (
                <div key={i} className="flex justify-between items-center text-xs py-2">
                  <span className="truncate max-w-[180px]">{p.title} <span className="text-neutral-400">× {p.count}</span></span>
                  <span className="font-semibold text-neutral-900">${(p.price * p.count).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t pt-4">
              <span>Sub Total</span>
              <span className="font-bold text-black">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-4 font-bold text-lg text-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {/* Show Action button condition based on current timeline step state */}
            {step === 2 && (
              <button
                onClick={handleConfirmPayment}
                className={`w-full py-4 mt-6 font-bold transition-colors rounded-3xl text-white ${
                  paymentMethod ? 'bg-fashion-brown hover:bg-black' : 'bg-fashion-brown cursor-not-allowed'
                }`}
              >
                Confirm Payment
              </button>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}