import React, { useState, useEffect } from 'react';

export default function ProductForm({ initial, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        origin: '',
        location: '', // New Field
        imageUrl: ''  // New Field
    });

    useEffect(() => {
        if (initial?.id) {
            setFormData({
                name: initial.name || '',
                description: initial.description || '',
                price: initial.price || '',
                origin: initial.origin || '',
                location: initial.location || '', // Sync New Field
                imageUrl: initial.imageUrl || ''  // Sync New Field
            });
        } else {
            setFormData({ name: '', description: '', price: '', origin: '', location: '', imageUrl: '' });
        }
    }, [initial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({
            id: initial?.id || Date.now(),
            ...formData,
            price: Number(formData.price),
            status: "active"
        });

        if (!initial?.id) {
            setFormData({ name: '', description: '', price: '', origin: '', location: '', imageUrl: '' });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... Name and Description remain the same ... */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Coffee Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none" required />
            </div>

            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Description</label>
                <input name="description" type="text" value={formData.description} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none" required />
            </div>

            {/* NEW: Image URL Field */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Image URL</label>
                <input
                    name="imageUrl"
                    type="url"
                    placeholder="https://images.unsplash.com/photo..."
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                />
            </div>

            {/* Grid for Origin, Location, and Price */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Origin</label>
                    <input name="origin" type="text" value={formData.origin} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500" required />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Store Location</label>
                    <input
                        name="location"
                        type="text"
                        placeholder="Aisle 4 / Shelf B"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Price ($)</label>
                    <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500" required />
                </div>
            </div>

            <button type="submit" className="w-full py-4 bg-[#2d241e] hover:bg-amber-800 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]">
                {initial?.id ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
}