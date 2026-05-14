import React, { useState, useEffect } from 'react';

export default function ProductForm({ initial, onSubmit }) {
    // 1. Initialize state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        origin: '',
        location: 'Downtown', // Default value
        image: '' 
    });

    // 2. The "Autofill" Logic
    // Whenever the 'initial' prop changes (when you click edit), update the form fields
    useEffect(() => {
        if (initial) {
            setFormData({
                name: initial.name || '',
                description: initial.description || '',
                price: initial.price || '',
                origin: initial.origin || '',
                location: initial.location || 'Downtown',
                image: initial.image || ''
            });
        } else {
            // Reset form when not editing
            setFormData({ name: '', description: '', price: '', origin: '', location: 'Downtown', image: '' });
        }
    }, [initial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function handleSubmit(event) {
  event.preventDefault();
  
  const productData = {
    ...formData,
    price: Number(formData.price),
    // Ensure the ID stays attached if we are editing
    ...(initial?.id && { id: initial.id }),
    status: "active"
  };

  onSubmit(productData);

  if (!initial?.id) {
    setFormData({ name: '', description: '', price: '', origin: '', location: '', image: '' });
  }
}

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Coffee Name</label>
                <input 
                    name="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none" 
                    required 
                />
            </div>

            {/* Description Input */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Description</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none" 
                    rows="2"
                    required 
                />
            </div>

            {/* Image URL Input */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Image URL</label>
                <input
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                    required
                />
            </div>

            {/* Origin, Location, and Price Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Origin</label>
                    <input name="origin" type="text" value={formData.origin} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500" required />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Location</label>
                    <select 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                    >
                        <option value="Downtown">Downtown</option>
                        <option value="Midtown">Midtown</option>
                        <option value="Uptown">Uptown</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Price ($)</label>
                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500" required />
                </div>
            </div>

            <button type="submit" className="w-full py-4 bg-[#2d241e] hover:bg-amber-800 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]">
                {initial ? "Save Changes" : "Add to Inventory"}
            </button>
        </form>
    );
}