import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [sortBy, setSortBy] = useState('All');

  // Load orders on component mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('fashionOrders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error("Error reading order history array:", error);
      }
    }
  }, []);

  // Function to wipe out the entire order history
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire order history?")) {
      localStorage.removeItem('fashionOrders');
      setOrders([]);
    }
  };

  // Function to delete just one specific order card
  const handleDeleteOrder = (orderId, e) => {
    e.stopPropagation(); // Prevents clicking the button from triggering other events
    if (window.confirm("Are you sure you want to delete this order from your history?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      localStorage.setItem('fashionOrders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

  // Filter or sort orders based on selection
  const filteredOrders = orders.filter(order => {
    if (sortBy === 'All') return true;
    return order.status === sortBy;
  });

  if (orders.length === 0) {
    return (
      <div className="p-12 text-center text-neutral-500 bg-white border border-neutral-100 rounded-3xl shadow-sm">
        <p className="text-lg font-medium">No order history available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto px-2">
      
      {/* Upper Control Bar Header matching design spec */}
      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-bold text-neutral-900">Orders ({filteredOrders.length})</h2>
          {orders.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-500 hover:text-red-700 underline ml-2 transition-colors"
            >
              Clear All History
            </button>
          )}
        </div>
        
        {/* Sort drop down selector */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-500">Sort by :</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-neutral-200 rounded-lg p-1.5 font-medium bg-white outline-none text-neutral-800"
          >
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Primary Container Stream Wrapper */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
            
            {/* Top Bar Header Banner Grid Line */}
            <div className="bg-[#E5B56A] bg-opacity-90 grid grid-cols-4 gap-2 px-6 py-4 text-xs md:text-sm font-bold text-neutral-900">
              <div>
                <p className="text-neutral-700 font-normal text-[11px] uppercase tracking-wider">Order ID</p>
                <p className="mt-0.5 font-mono">{order.id}</p>
              </div>
              <div>
                <p className="text-neutral-700 font-normal text-[11px] uppercase tracking-wider">Total Payment</p>
                <p className="mt-0.5">{order.total}</p>
              </div>
              <div>
                <p className="text-neutral-700 font-normal text-[11px] uppercase tracking-wider">Payment Method</p>
                <p className="mt-0.5">{order.method}</p>
              </div>
              <div>
                <p className="text-neutral-700 font-normal text-[11px] uppercase tracking-wider">Order Date</p>
                <p className="mt-0.5">{order.date}</p>
              </div>
            </div>

            {/* List inner items purchased dynamically via context mapping arrays */}
            <div className="p-6 divide-y divide-neutral-100 bg-white">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-6 py-4 first:pt-0 last:pb-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-20 rounded-xl object-cover border border-neutral-100 shadow-sm bg-neutral-50" 
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-neutral-900 text-base">{item.title}</h4>
                    <p className="text-sm text-neutral-500 mt-1 font-medium">
                      Color: {item.color} <span className="mx-1.5">|</span> Size: {item.size} <span className="mx-1.5">|</span> Qty: {item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Row Actions panel matching layout styles */}
            <div className="px-6 py-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4 bg-neutral-50">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                  order.status === 'Delivered' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {order.status || 'Accepted'}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  Your Order has been {order.status === 'Delivered' ? 'Delivered' : 'Accepted'}
                </span>
              </div>

              {/* Functional Dynamic Action Control buttons matching layout image definitions */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    const cleanId = order.id.replace('#', '');
                    navigate(`/track-order/${cleanId}`);
                  }}
                  className="px-5 py-2 bg-[#3D2616] text-white text-xs md:text-sm rounded-md font-semibold hover:bg-black transition-all shadow-sm"
                >
                  {order.status === 'Delivered' ? 'Add Review' : 'Track Order'}
                </button>
                
                <button className="px-5 py-2 border border-neutral-300 bg-white text-neutral-700 text-xs md:text-sm rounded-md font-semibold hover:bg-neutral-100 transition-all shadow-sm">
                  Invoice
                </button>

                <button 
                  onClick={(e) => handleDeleteOrder(order.id, e)}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors ml-2"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}