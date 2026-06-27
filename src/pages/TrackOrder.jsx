import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem('fashionOrders');
    if (storedOrders) {
      const ordersList = JSON.parse(storedOrders);
      // Find matching order matching the route param id
      const foundOrder = ordersList.find((o) => o.id === `#${orderId}` || o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32 px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-neutral-500 mb-6">We couldn't locate an active order with ID: #{orderId}</p>
        <Link to="/profile" className="px-6 py-2.5 bg-[#3D2616] text-white font-semibold rounded-full">
          Back to My Orders
        </Link>
      </div>
    );
  }

  // Horizontal Stepper Timeline Configuration Blocks matching image_265965.jpg
  const steps = [
    { label: 'Order Placed', desc: order.date, sub: '11:00 AM', done: true },
    { label: 'Accepted', desc: order.date, sub: '11:15 AM', done: true },
    { label: 'In Progress', desc: 'Expected', sub: 'Next Day', done: false },
    { label: 'On the Way', desc: 'Expected', sub: 'In 2 Days', done: false },
    { label: 'Delivered', desc: 'Expected', sub: 'In 3 Days', done: false },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 bg-white text-neutral-800">
      {/* Top Breadcrumb Banner Block */}
      <div className="text-center mb-8  py-4">
        <h1 className="text-4xl font-bold text-neutral-900 font-serif">Track Your Order</h1>
        <p className="text-neutral-500 mt-2 text-sm">Home / Track Your Order</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Status Tracker Core Widget Block */}
        <div className="border border-neutral-200 rounded-3xl p-6 bg-fashion-cream
         shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Order Status</h3>
            <p className="text-lg font-bold text-neutral-900 mt-1">Order ID : <span className="text-[#3D2616]">{order.id}</span></p>
          </div>

          {/* Stepper Node Line Map */}
          <div className="grid grid-cols-5 gap-2 relative pt-4">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                
                {/* Visual Label */}
                <span className="text-xs md:text-sm font-bold text-neutral-800 mb-3 block">
                  {step.label}
                </span>

                {/* Node Circle & Connective Horizontal Line */}
                <div className="relative w-full flex items-center justify-center mb-3">
                  {/* Progress Connector Bar */}
                  {i !== 0 && (
                    <div className={`absolute right-1/2 left-[-50%] top-1/2 -translate-y-1/2 h-1 z-0 ${
                      step.done ? 'bg-[#3D2616]' : 'bg-neutral-200'
                    }`} />
                  )}
                  
                  {/* Circle Check Badge Container */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 text-xs ${
                    step.done ? 'bg-[#3D2616] text-white' : 'bg-neutral-100 text-neutral-300 border border-neutral-200'
                  }`}>
                    {step.done ? '✓' : ''}
                  </div>
                </div>

                {/* Lower Dynamic Timestamp Metadata */}
                <p className="text-[11px] text-neutral-500 font-semibold mt-1">{step.desc}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mapped Item Block Area */}
        <div className="border border-neutral-200 rounded-3xl p-6 bg-white shadow-sm">
          <h3 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b">Products</h3>
          
          <div className="divide-y divide-neutral-100">
            {order.items && order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 py-4 first:pt-0 last:pb-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-20 rounded-xl object-cover border shadow-sm bg-neutral-50" 
                />
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">{item.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">
                    Color: {item.color} | Size: {item.size} | {item.qty} Qty.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}