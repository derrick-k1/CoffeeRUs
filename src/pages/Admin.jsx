import React, { useState } from 'react';
/* Uncomment these when you're ready to link your logic:
  import { useProducts } from '../context/ProductsContext' 
*/

// Placeholder Components - Replace with your actual imports
const ProductForm = ({ initial, onSubmit }) => (
  <div className="text-sm text-slate-500 italic p-4 border-2 border-dashed border-slate-200 rounded-xl">
    ProductForm Component Goes Here
  </div>
);

const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="grid gap-4">
    {products.map(p => (
      <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h4 className="font-bold text-slate-800">{p.name}</h4>
          <p className="text-sm text-slate-500">${p.price}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(p)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold">Edit</button>
          <button onClick={() => onDelete(p.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold">Delete</button>
        </div>
      </div>
    ))}
  </div>
);

export default function Admin() {
  /* Logic Placeholders */
  const [products, setProducts] = useState([
    { id: 1, name: 'Ethiopian Yirgacheffe', price: 18.50, status: 'active' },
    { id: 2, name: 'Colombian Dark Roast', price: 15.00, status: 'active' }
  ]);
  const [editing, setEditing] = useState(null);

  // const { products, addProduct, updateProduct, removeProduct } = useProducts()

  async function handleAdd(payload) { console.log("Add:", payload); }
  async function handleUpdate(patch) { console.log("Update:", patch); setEditing(null); }
  async function handleDelete(id) { confirm('Delete?'); }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      {/* Header & Stats Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Manage your coffee inventory with precision
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Coffees', value: products.length },
            { label: 'Active Blends', value: products.filter(p => p.status === 'active').length },
            { label: 'Avg Price', value: `$${(products.reduce((sum, p) => sum + p.price, 0) / products.length || 0).toFixed(2)}` }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 lg:gap-12">
        
        {/* Sticky Form Sidebar */}
        <div className="xl:sticky xl:top-12 self-start">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold">
                  {editing ? '!' : '+'}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {editing ? 'Edit Blend' : 'Add Coffee'}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {editing ? 'Update existing details' : 'Create a signature blend'}
                  </p>
                </div>
              </div>
            </div>
            
            <ProductForm 
              initial={editing || {}} 
              onSubmit={editing ? handleUpdate : handleAdd}
            />

            {editing && (
              <button 
                onClick={() => setEditing(null)}
                className="mt-4 w-full text-sm text-slate-400 hover:text-slate-600 underline"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* Inventory List Area */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Inventory Management
              </h2>
              <p className="text-slate-500 mt-2">Control your collection</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-400 font-medium">Count: </span>
              <span className="font-black text-slate-900 text-xl">{products.length}</span>
            </div>
          </div>

          {products.length > 0 ? (
            <ProductList 
              products={products} 
              onEdit={setEditing} 
              onDelete={handleDelete} 
            />
          ) : (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
              <div className="text-5xl mb-6">☕</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No coffees yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8">
                Your collection is empty. Start by adding your first signature blend.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}