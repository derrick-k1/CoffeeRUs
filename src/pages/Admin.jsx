import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

export default function Admin() {
  const { products, addProduct, updateProduct, removeProduct, loading } = useProducts();
  const [editing, setEditing] = useState(null);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#fafaf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">Inventory Manager</h1>
          <p className="text-stone-500 mt-2 font-medium">Create, update, or remove your signature coffee blends.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
          
          {/* LEFT: Add/Edit Section */}
          <aside className="lg:sticky lg:top-24">
            <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-xl overflow-hidden">
              {/* Header for the Form */}
              <div className="bg-[#2d241e] p-8 text-white">
                <h3 className="text-2xl font-bold">
                  {editing ? 'Edit Coffee' : 'Add New Blend'}
                </h3>
                <p className="text-stone-400 text-sm mt-1">
                  {editing ? 'Update the details for this specific product.' : 'Enter details for a new inventory item.'}
                </p>
              </div>
              
              {/* The Form */}
              <div className="p-8">
                <ProductForm 
                  initial={editing} 
                  onSubmit={editing ? (data) => { updateProduct(editing.id, data); setEditing(null); } : addProduct} 
                />
                
                {editing && (
                  <button 
                    onClick={() => setEditing(null)}
                    className="w-full mt-3 text-sm font-bold text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT: Product Feed Section */}
          <main>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-stone-900 uppercase tracking-widest">
                Current Stock ({products?.length})
              </h2>
              <div className="h-px flex-1 bg-stone-200 mx-6 hidden sm:block"></div>
            </div>

            {products?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onEdit={setEditing} // This scrolls the form into focus when clicked
                    onDelete={removeProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-stone-200 p-20 text-center">
                <span className="text-5xl mb-4 block">☕</span>
                <h3 className="text-xl font-bold text-stone-900">No products found</h3>
                <p className="text-stone-400">Your inventory is currently empty. Start by adding a blend!</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </section>
  );
}