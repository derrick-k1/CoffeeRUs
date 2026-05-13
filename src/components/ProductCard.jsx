import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  // Added 'image' and 'roast' to destructuring
  const { id, name, description, origin, price, image, roast } = product;

  const formatPrice = (val) => {
    const numeric = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val;
    return isNaN(numeric) ? "0.00" : numeric.toFixed(2);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-stone-200">
      
      {/* 1. Image Header */}
      <div className="relative h-52 w-full overflow-hidden">
        <img 
          src={image || `https://source.unsplash.com/400x300/?coffee-beans,${name}`} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark overlay gradient for text legibility if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Roast Tag - Floating over image */}
        {roast && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-900 shadow-sm">
              {roast}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-black text-stone-900 tracking-tight leading-tight group-hover:text-amber-700 transition-colors">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
           <span className="inline-flex items-center rounded-lg bg-stone-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            {origin}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-stone-500 line-clamp-2 mb-6 italic">
          "{description}"
        </p>

        {/* 3. Price & Stats */}
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Price</span>
            <span className="text-2xl font-black text-stone-900">
              ${formatPrice(price)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {onEdit && (
              <button 
                onClick={() => onEdit(product)}
                className="p-3 rounded-2xl bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white transition-all shadow-sm active:scale-90"
                title="Edit Product"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
            
            {onDelete && (
              <button 
                onClick={() => {
                  if(window.confirm(`Remove ${name}?`)) onDelete(id);
                }}
                className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                title="Delete Product"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subtle hover accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default ProductCard;