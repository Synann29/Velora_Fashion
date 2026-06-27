import React, { useState } from 'react';

export default function PaymentMethod() {
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Payment Method</h2>

      {/* Linked Accounts List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="font-bold">PayPal</span>
          </div>
          <button className="text-sm font-semibold">Link Account</button>
        </div>

        <div className="flex justify-between items-center p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="font-bold">VISA **** **** **** 8047</span>
          </div>
          <button className="text-sm font-semibold text-red-500">Delete</button>
        </div>

        <div className="flex justify-between items-center p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="font-bold">Google Pay</span>
          </div>
          <button className="text-sm font-semibold">Link Account</button>
        </div>
      </div>

      {/* Add New Card Form */}
      <div className="border-t pt-6">
        <button 
          onClick={() => setShowNewCardForm(!showNewCardForm)}
          className="flex items-center gap-2 font-semibold mb-4"
        >
          <span className="text-xl">+</span> Add New Credit/Debit Card
        </button>

        {showNewCardForm && (
          <form className="grid gap-4 md:grid-cols-2 p-6 border rounded-2xl bg-gray-50">
            <input placeholder="Card Holder Name *" className="p-3 border rounded-2xl col-span-2" />
            <input placeholder="Card Number *" className="p-3 border rounded-2xl col-span-2" />
            <input placeholder="Expiry Date *" className="p-3 border rounded-2xl" />
            <input placeholder="CVV *" className="p-3 border rounded-2xl" />
            <label className="flex items-center gap-2 col-span-2">
              <input type="checkbox" /> Save card for future payments
            </label>
            <button type="submit" className="bg-[#4a3520] text-white py-3 px-8 rounded-2xl w-fit">
              Add Card
            </button>
          </form>
        )}
      </div>
    </div>
  );
}