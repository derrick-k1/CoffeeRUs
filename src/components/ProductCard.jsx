import React from 'react';

/*
|--------------------------------------------------------------------------
| ProductCard Component
|--------------------------------------------------------------------------
| This reusable component displays a single coffee product.
| 
| Features:
| - Dynamic product data rendering
| - Conditional edit/delete actions
| - Interactive hover animations
| - Responsive premium UI styling
| - Price formatting helper
|
| Props:
| - product   -> object containing coffee details
| - onEdit    -> function for editing a product
| - onDelete  -> function for deleting a product
|--------------------------------------------------------------------------
*/

const ProductCard = ({ product, onEdit, onDelete, addToCart }) => {

  /*
  |--------------------------------------------------------------------------
  | Destructure Product Data
  |--------------------------------------------------------------------------
  | Extracting values from the product object makes the JSX cleaner
  | and easier to read throughout the component.
  |--------------------------------------------------------------------------
  */

  const {
    id,
    name,
    description,
    origin,
    price,
    image,
    roast
  } = product;

  /*
  |--------------------------------------------------------------------------
  | formatPrice()
  |--------------------------------------------------------------------------
  | Converts the product price into a clean decimal format.
  |
  | Example:
  | "$24" -> "24.00"
  | 18    -> "18.00"
  |--------------------------------------------------------------------------
  */

  const formatPrice = (val) => {
    const numeric =
      typeof val === 'string'
        ? parseFloat(val.replace(/[^0-9.]/g, ''))
        : val;

    return isNaN(numeric)
      ? "0.00"
      : numeric.toFixed(2);
  };

  return (

    /*
    |--------------------------------------------------------------------------
    | Main Product Card Container
    |--------------------------------------------------------------------------
    | Uses:
    | - Tailwind utility classes
    | - gradient background
    | - hover animations
    | - shadow elevation effects
    |--------------------------------------------------------------------------
    */

    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#1c120d] to-[#120b08] border border-orange-900/30 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">

      {/* 
      ------------------------------------------------------------------------
      Glow Hover Effect
      ------------------------------------------------------------------------
      Creates a premium lighting effect when the user hovers over the card.
      ------------------------------------------------------------------------
      */}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.15),transparent_55%)] pointer-events-none" />

      {/* 
      ------------------------------------------------------------------------
      Product Image Section
      ------------------------------------------------------------------------
      Displays:
      - Product image
      - Overlay gradient
      - Roast badge
      - Floating price badge
      ------------------------------------------------------------------------
      */}

      <div className="relative h-56 w-full overflow-hidden">

        {/* Product Image */}
        <img
          src={
            image ||
            `https://source.unsplash.com/400x300/?coffee,beans,${name}`
          }
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-[#120b08]/30 to-transparent" />

        {/* 
        ----------------------------------------------------------------------
        Roast Badge
        ----------------------------------------------------------------------
        Conditionally rendered only if roast exists.
        Example: Dark Roast / Medium Roast
        ----------------------------------------------------------------------
        */}

        {roast && (
          <div className="absolute top-4 left-4">
            <span className="rounded-full border border-orange-400/30 bg-orange-500/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-white shadow-lg backdrop-blur-md">
              {roast}
            </span>
          </div>
        )}

        {/* 
        ----------------------------------------------------------------------
        Floating Price Badge
        ----------------------------------------------------------------------
        Positioned over the image for modern ecommerce styling.
        ----------------------------------------------------------------------
        */}

        <div className="absolute bottom-4 right-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 shadow-lg">

          <span className="text-xs uppercase tracking-[0.25em] text-orange-300 font-bold">
            Price
          </span>

          <p className="text-2xl font-black text-white">
            ${formatPrice(price)}
          </p>

        </div>
      </div>

      {/* 
      ------------------------------------------------------------------------
      Product Content Section
      ------------------------------------------------------------------------
      Contains:
      - Product title
      - Origin tag
      - Description
      - Footer actions
      ------------------------------------------------------------------------
      */}

      <div className="relative flex flex-1 flex-col p-6">

        {/* Product Title */}
        <div className="mb-4">

          <h3 className="text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-orange-400">
            {name}
          </h3>

          {/* Decorative animated underline */}
          <div className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-500 group-hover:w-28" />

        </div>

        {/* 
        ----------------------------------------------------------------------
        Origin Tag
        ----------------------------------------------------------------------
        Displays the country or source location of the coffee.
        ----------------------------------------------------------------------
        */}

        <div className="mb-5 flex items-center gap-2">
          <span className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-300 backdrop-blur-md">
            {origin}
          </span>
        </div>

        {/* Product Description */}
        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-stone-300">
          {description}
        </p>

        {/* 
        ----------------------------------------------------------------------
        Footer Section
        ----------------------------------------------------------------------
        Contains:
        - Premium indicator
        - Edit button
        - Delete button
        ----------------------------------------------------------------------
        */}

        <div className="mt-auto flex items-center justify-between border-t border-orange-900/20 pt-5">

          {/* Premium Roast Indicator */}
          <div className="flex items-center gap-1">

            {/* Animated pulse dot */}
            <div className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-pulse" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Premium Roast
            </span>

          </div>

          {/* 
          --------------------------------------------------------------------
          Action Buttons
          --------------------------------------------------------------------
          Buttons only appear if the corresponding functions are passed.
          This makes the component reusable in:
          - Shop page
          - Admin page
          --------------------------------------------------------------------
          */}

          <div className="flex items-center gap-3">

            {/* Add to Cart Button */}
            {addToCart && (
              <button
                onClick={() => addToCart(product)}
                className="group/cart rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-200 transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:text-white shadow-lg"
                title="Add to Cart"
              >

                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.1M7 13l1.25-2.5M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>

              </button>
            )}

            {/* Edit Button */}
            {onEdit && (
              <button
                onClick={() => onEdit(product)}
                className="group/edit rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 text-orange-300 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white shadow-lg"
                title="Edit Product"
              >

                {/* Edit Icon */}
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover/edit:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>

              </button>
            )}

            {/* Delete Button */}
            {onDelete && (
              <button
                onClick={() => {

                  /*
                  --------------------------------------------------------------
                  Confirm Delete Action
                  --------------------------------------------------------------
                  Prevents accidental product deletion.
                  --------------------------------------------------------------
                  */

                  if (window.confirm(`Remove ${name}?`)) {
                    onDelete(id);
                  }
                }}
                className="group/delete rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white shadow-lg"
                title="Delete Product"
              >

                {/* Delete Icon */}
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover/delete:shake"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>

              </button>
            )}

          </div>
        </div>
      </div>

      {/* 
      ------------------------------------------------------------------------
      Animated Top Accent Bar
      ------------------------------------------------------------------------
      Adds a premium animated visual detail on hover.
      ------------------------------------------------------------------------
      */}

      <div className="absolute top-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 transition-transform duration-500 group-hover:scale-x-100" />

    </div>
  );
};

export default ProductCard;