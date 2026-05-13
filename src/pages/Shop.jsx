import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { products, loading } = useProducts();

  // 1. New Filter States
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  // 2. Updated Filter Logic
  const items = products.filter((p) => {
    // Search filter
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) ||
                          p.origin.toLowerCase().includes(query.toLowerCase());

    // Location filter (Checking if origin includes the UI location name)
    const matchesLocation = location === 'All' || p.origin.includes(location);

// Price range filter
let matchesPrice = true;
if (priceRange === '$10 - $20') matchesPrice = p.price >= 10 && p.price <= 20;
else if (priceRange === '$20 - $35') matchesPrice = p.price > 20 && p.price <= 35;
else if (priceRange === '$35+') matchesPrice = p.price > 35;

return matchesSearch && matchesLocation && matchesPrice;
  });

  // 3. Clear Function
  const handleClearAll = () => {
    setQuery('');
    setLocation('All');
    setPriceRange('All');
  };

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[300px_1fr]">

    {/* Sidebar Filter Area */}
    <aside className="lg:sticky lg:top-24 self-start rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-black tracking-tight">Search Coffees</h3>
        {(query || location !== 'All' || priceRange !== 'All') && (
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

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

      <div className="space-y-8">
        {/* UI Filters: Locations */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Locations</h4>
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

        {/* UI Filters: Price Range */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Price Range</h4>
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

    {/* Main Content */}
    <main className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Our Collection</h2>
            <p className="mt-3 text-slate-500 max-w-2xl leading-relaxed italic">
              {location !== 'All' || priceRange !== 'All' 
                ? `Showing ${location !== 'All' ? location : ''} items ${priceRange !== 'All' ? `in ${priceRange}` : ''}`
                : 'Carefully curated beans roasted to perfection.'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm border-b-4 border-b-slate-900">
            {items.length} items available
          </div>
        </div>
      </div>

      {/* Products Loading/List/Empty Logic */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-3xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-xl">
          <div className="text-5xl mb-6">☕</div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">No coffees found</h3>
          <p className="text-slate-500 mb-8">Try adjusting your filters or clearing them to see our full inventory.</p>
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

