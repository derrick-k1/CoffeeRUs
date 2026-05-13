import React, { useState, useEffect } from 'react';

/* Uncomment when ready:
import { useProducts } from '../context/ProductsContext'
import ProductList from '../components/ProductList'
*/

// Placeholder for the ProductList component logic
const ProductListPlaceholder = ({ products }) => (
  <div className="grid gap-6 sm:grid-cols-2">
    {products.map((p) => (
      <div key={p.id} className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
        <div className="aspect-square bg-slate-100 rounded-2xl mb-4 flex items-center justify-center text-4xl">☕</div>
        <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
        <p className="text-slate-500 text-sm mb-4">{p.origin || 'Single Origin'}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-black text-slate-900">${Number(p.price).toFixed(2)}</span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default function Shop() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // 🔥 FETCH FROM JSON SERVER (coffee ONLY)
  useEffect(() => {
    fetch('http://localhost:4000/coffee')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // FILTER SEARCH
  const items = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[300px_1fr]">

        {/* Sidebar Filter Area */}
        <aside className="lg:sticky lg:top-24 self-start rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-10">
            <h3 className="text-2xl font-black tracking-tight">Search Coffees</h3>

            <label className="block text-sm font-semibold text-slate-400 mt-4 mb-3 uppercase tracking-wider">
              Find a product
            </label>

            <input
              placeholder="Search blends..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
            />

            {query && (
              <p className="mt-4 text-sm text-slate-500">
                Found {items.length} {items.length === 1 ? 'coffee' : 'coffees'}
              </p>
            )}
          </div>

          {/* Filters (UI only for now) */}
          <div className="space-y-8">

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Locations
              </h4>

              <div className="space-y-2">
                {['Downtown', 'Midtown', 'Uptown'].map((location) => (
                  <div
                    key={location}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 font-medium hover:border-slate-300 cursor-pointer transition-colors"
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Price Range
              </h4>

              <div className="space-y-2 text-sm">
                {['$10 - $20', '$20 - $35', '$35+'].map((range) => (
                  <div
                    key={range}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 font-medium hover:border-slate-300 cursor-pointer transition-colors"
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

          {/* Header */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900">
                  Our Collection
                </h2>
                <p className="mt-3 text-slate-500 max-w-2xl leading-relaxed">
                  Carefully curated beans roasted to perfection.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-900 shadow-sm">
                {items.length} items available
              </div>

            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 rounded-3xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : items.length > 0 ? (
            <ProductListPlaceholder products={items} />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-xl">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">
                No coffees found
              </h3>
              <p className="text-slate-500 mb-8">
                Try searching for something else or clear the search.
              </p>

              <button
                onClick={() => setQuery('')}
                className="rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-lg"
              >
                Clear Search
              </button>
            </div>
          )}

        </main>
      </div>
    </section>
  );
}