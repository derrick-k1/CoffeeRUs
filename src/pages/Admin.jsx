import React, { useState, useEffect } from 'react';

/* Uncomment these when you're ready to link your logic:
  import { useProducts } from '../context/ProductsContext' 
*/

// Placeholder Components (DO NOT TOUCH LAYOUT)
const ProductForm = ({ initial, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setPrice(initial?.price || '');
    setOrigin(initial?.origin || '');
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      description,
      price: Number(price),
      origin
    });

    if (!initial?.id) {
      setName('');
      setDescription('');
      setPrice('');
      setOrigin('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">
        {initial?.id ? "Edit Coffee" : "Add Coffee"}
      </h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
      <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Origin" className="w-full border p-2 rounded" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="w-full border p-2 rounded" />

      <button className="bg-orange-500 text-white px-4 py-2 rounded">
        {initial?.id ? "Update" : "Add"}
      </button>
    </form>
  );
};

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

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  // =========================
  // LOAD FROM data.json → coffee[]
  // =========================
  useEffect(() => {
    fetch('http://localhost:4000/coffee')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // =========================
  // ADD → updates BOTH adminCoffee + coffee
  // =========================
  async function handleAdd(payload) {

    const newItem = {
      ...payload,
      status: "active"
    };

    // add to adminCoffee
    const adminRes = await fetch('http://localhost:4000/adminCoffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    const created = await adminRes.json();

    // add to coffee (SHOP)
    await fetch('http://localhost:4000/coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(created)
    });

    setProducts(prev => [created, ...prev]);
  }

  // =========================
  // UPDATE → updates BOTH
  // =========================
  async function handleUpdate(payload) {

    const updated = { ...editing, ...payload };

    await fetch(`http://localhost:4000/adminCoffee/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    await fetch(`http://localhost:4000/coffee/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    setProducts(prev =>
      prev.map(p => (p.id === editing.id ? updated : p))
    );

    setEditing(null);
  }

  // =========================
  // DELETE → removes from BOTH
  // =========================
  async function handleDelete(id) {

    const ok = confirm('Delete this coffee?');
    if (!ok) return;

    await fetch(`http://localhost:4000/adminCoffee/${id}`, {
      method: 'DELETE'
    });

    await fetch(`http://localhost:4000/coffee/${id}`, {
      method: 'DELETE'
    });

    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">

      {/* HEADER (UNCHANGED) */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Manage your coffee inventory with precision
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Coffees', value: products.length },
            { label: 'Active Blends', value: products.length },
            { label: 'Avg Price', value: `$${(products.reduce((s, p) => s + p.price, 0) / products.length || 0).toFixed(2)}` }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT (UNCHANGED) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 lg:gap-12">

        {/* FORM SIDE (UNCHANGED POSITION) */}
        <div className="xl:sticky xl:top-12 self-start">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-10">

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

        {/* INVENTORY (REAL data.json coffee ARRAY) */}
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

          <ProductList
            products={products}
            onEdit={setEditing}
            onDelete={handleDelete}
          />

        </div>
      </div>
    </section>
  );
}