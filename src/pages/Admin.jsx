import React, { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

export default function Admin() {
  const { products, addProduct, updateProduct, removeProduct, loading } =
    useProducts();

  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  // =========================================================
  // FILTER LOGIC
  // =========================================================
  // Filters products based on search input (name or origin)
  const items = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.origin.toLowerCase().includes(query.toLowerCase()),
  );

  // =========================================================
  // LOADING STATE
  // =========================================================
  // Shows spinner while data is being fetched from API
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>
    );

  return (
    <section className="min-h-screen bg-[#fafaf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================================================
        HEADER SECTION
        ========================================================= */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">
            Inventory Manager
          </h1>

          <p className="text-stone-500 mt-2 font-medium">
            Create, update, or remove your signature coffee blends.
          </p>
        </div>

        {/* =========================================================
        MAIN LAYOUT (FORM + PRODUCTS)
        ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-12 items-start">

          {/* =========================================================
          LEFT SIDE — PRODUCT FORM
          ========================================================= */}
          <aside className="lg:sticky lg:top-24">
            <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-xl overflow-hidden">

              {/* FORM HEADER */}
              <div className="bg-[#2d241e] p-10 text-white">
                <h3 className="text-3xl font-black tracking-tight">
                  {editing ? "Edit Coffee" : "Add New Blend"}
                </h3>

                <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                  {editing
                    ? "Update the details for this specific product."
                    : "Enter details for a new inventory item."}
                </p>
              </div>

              {/* FORM BODY */}
              <div className="p-10">
                <ProductForm
                  initial={editing}
                  onSubmit={(data) => {
                    // If editing, update product
                    if (editing) {
                      updateProduct(editing.id, data);
                      setEditing(null);
                    } else {
                      // Otherwise add new product
                      addProduct(data);
                    }
                  }}
                />

                {/* Cancel edit mode */}
                {editing && (
                  <button
                    onClick={() => setEditing(null)}
                    className="w-full mt-4 text-sm font-bold text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* =========================================================
          RIGHT SIDE — PRODUCT LIST
          ========================================================= */}
          <main>

            {/* =========================================================
            TOP BAR (TITLE + SEARCH)
            ========================================================= */}
            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-xl p-6 mb-8">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* TITLE SECTION */}
                <div>
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                    Current Stock
                  </h2>

                  <p className="text-stone-500 text-sm mt-1">
                    {items.length} products available
                  </p>
                </div>

                {/* =====================================================
                SEARCH BAR
                =====================================================
                - Stores user input in `query`
                - Updates state on every keystroke
                - Triggers live filtering of products
                ===================================================== */}
                <div className="w-full lg:max-w-md">
                  <input
                    type="text"
                    placeholder="Search coffee or origin..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-900 shadow-sm focus:border-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                  />
                </div>

              </div>
            </div>

            {/* =========================================================
            PRODUCT GRID (ProductCard RENDERING)
            ========================================================= */}
            {items.length > 0 ? (

              // Grid layout for product cards
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Loop through each product and render a ProductCard */}
                {items.map((product) => (

                  <ProductCard

                    // Unique identifier for React rendering
                    key={product.id}

                    // Pass full product data into card
                    product={product}

                    // Function to enable edit mode
                    onEdit={setEditing}

                    // Function to delete product from database/state
                    onDelete={removeProduct}

                  />

                ))}

              </div>

            ) : (

              // Empty state when no products match search
              <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-stone-200 p-20 text-center">

                <span className="text-5xl mb-4 block">☕</span>

                <h3 className="text-2xl font-black text-stone-900">
                  No products found
                </h3>

                <p className="text-stone-400 mt-2">
                  Try another search or add a new blend.
                </p>

                {/* Reset search */}
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="mt-6 rounded-2xl bg-stone-900 px-8 py-3 text-sm font-bold text-white hover:bg-stone-800 transition"
                  >
                    Clear Search
                  </button>
                )}

              </div>
            )}

          </main>

        </div>
      </div>
    </section>
  );
}