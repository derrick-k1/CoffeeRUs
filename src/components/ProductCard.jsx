import React, { useState } from 'react';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  // Destructure for cleaner code
  const { id, name, description, origin, price } = product;

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleSave = () => {
    // Ensure we send a number back, even if input gave us a string
    const updatedPrice = parseFloat(newPrice);
    
    if (!isNaN(updatedPrice)) {
      onUpdate(id, { ...product, price: updatedPrice });
    }
    
    setIsEditing(false);
  };

  // Helper to safely format price (handles strings like "$1.00" or numbers)
  const formatPrice = (val) => {
    const numeric = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val;
    return isNaN(numeric) ? "0.00" : numeric.toFixed(2);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-gray-200">
  
  {/* Card Header & Content */}
  <div className="p-6">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
        {name}
      </h3>
      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
        {origin}
      </span>
    </div>

    <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
      {description}
    </p>

    {/* Price Section */}
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Price</span>
        {isEditing ? (
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              step="0.01"
              autoFocus
              className="w-24 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button onClick={handleSave} className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-xs font-semibold text-gray-600 hover:text-gray-900">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${formatPrice(price)}
            </span>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Footer Actions */}
  <div className="mt-auto flex border-t border-gray-100 bg-gray-50/50 p-4">
    <button 
      className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700" 
      onClick={() => onDelete(id)}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Remove Product
    </button>
  </div>
</div>

  );
};

export default ProductCard;