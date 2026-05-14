import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Shop() {

  // Get products and loading state from Context API
  const { products, loading } = useProducts();

  // Get cart state from Context API
  const { cart, addToCart } = useContext(CartContext);

  // Search input state
  const [query, setQuery] = useState('');

  // Location filter state
  const [location, setLocation] = useState('All');

  // Price filter state
  const [priceRange, setPriceRange] = useState('All');

  /*
  |--------------------------------------------------------------------------
  | FILTER PRODUCTS
  |--------------------------------------------------------------------------
  | Filters products based on:
  | - search query
  | - location
  | - price range
  |--------------------------------------------------------------------------
  */

  const items = products.filter((p) => {

    // Match search query
    const matchesSearch =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.origin.toLowerCase().includes(query.toLowerCase());

    // Match location filter
    const matchesLocation =
      location === 'All' || p.location === location;

    // Match price filter
    let matchesPrice = true;

    const priceValue = Number(p.price);

    if (priceRange === '$10 - $20') {
      matchesPrice = priceValue >= 10 && priceValue <= 20;
    }

    else if (priceRange === '$20 - $35') {
      matchesPrice = priceValue > 20 && priceValue <= 35;
    }

    else if (priceRange === '$35+') {
      matchesPrice = priceValue > 35;
    }

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice
    );
  });

  /*
  |--------------------------------------------------------------------------
  | CLEAR ALL FILTERS
  |--------------------------------------------------------------------------
  */

  const handleClearAll = () => {
    setQuery('');
    setLocation('All');
    setPriceRange('All');
  };

  return (

    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[300px_1fr]">

        {/* ================================================================ */}
        {/* SIDEBAR FILTER SECTION */}
        {/* ================================================================ */}

        <aside className="lg:sticky lg:top-24 self-start rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-10">

            <h3 className="text-2xl font-black tracking-tight">
              Search Coffees
            </h3>

            {/* Clear filters button */}
            {(query || location !== 'All' || priceRange !== 'All') && (
              <button
                onClick={handleClearAll}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                Clear All
              </button>
            )}

          </div>

          {/* Search Input */}
          <div className="mb-10">

            <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              Find a product
            </label>

            <input
              placeholder="Search blends or origins..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
            />

          </div>

          {/* FILTER OPTIONS */}
          <div className="space-y-8">

            {/* Location Filters */}
            <div>

              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Locations
              </h4>

              <div className="space-y-2">

                {['All', 'Downtown', 'Midtown', 'Uptown'].map((loc) => (

                  <div
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer transition-all ${
                      location === loc
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                        : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {loc}
                  </div>

                ))}

              </div>
            </div>

            {/* Price Filters */}
            <div>

              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Price Range
              </h4>

              <div className="space-y-2 text-sm">

                {['All', '$10 - $20', '$20 - $35', '$35+'].map((range) => (

                  <div
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`rounded-xl border px-4 py-3 font-medium cursor-pointer transition-all ${
                      priceRange === range
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                        : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {range}
                  </div>

                ))}

              </div>
            </div>

          </div>
        </aside>

        {/* ================================================================ */}
        {/* MAIN CONTENT */}
        {/* ================================================================ */}

        <main className="space-y-8">

          {/* Top Header Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <h2 className="text-4xl font-black tracking-tight text-slate-900">
                  Our Collection
                </h2>

                <p className="mt-3 text-slate-500 max-w-2xl leading-relaxed italic">

                  {location !== 'All' || priceRange !== 'All'
                    ? `Showing ${location !== 'All' ? location : ''} items ${
                        priceRange !== 'All'
                          ? `in ${priceRange}`
                          : ''
                      }`
                    : 'Carefully curated beans roasted to perfection.'}

                </p>

              </div>

              {/* Product Count */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm border-b-4 border-b-slate-900">

                {items.length} items available

              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* PRODUCT DISPLAY LOGIC */}
          {/* ============================================================ */}

          {loading ? (

            // Loading skeleton cards while API data loads
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-3xl bg-slate-200 animate-pulse"
                />
              ))}

            </div>

          ) : items.length > 0 ? (

            // Render ProductCard component for each filtered product
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((product) => (

                <ProductCard

                  // Unique React key
                  key={product.id}

                  // Pass product data into ProductCard component
                  product={product}

                  // Enable add-to-cart button inside the product card
                  addToCart={addToCart}

                />

              ))}

            </div>

          ) : (

            // Empty state if no products match filters
            <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-xl">

              <div className="text-5xl mb-6">
                ☕
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-4">
                No coffees found
              </h3>

              <button
                onClick={handleClearAll}
                className="rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-lg"
              >
                Clear All Filters
              </button>

            </div>

          )}

        </main>
      </div>
    </section>
  );
}