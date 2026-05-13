import React, { useState, useEffect } from 'react';

export default function ProductForm({ initial, onSubmit }) {
    // 1. Single state object for cleaner code
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        origin: ''
    });

    // 2. ✅ Auto-fill when editing (Syncing with the 'initial' prop)
    useEffect(() => {
        if (initial?.id) {
            setFormData({
                name: initial.name || '',
                description: initial.description || '',
                price: initial.price || '',
                origin: initial.origin || ''
            });
        } else {
            setFormData({ name: '', description: '', price: '', origin: '' });
        }
    }, [initial]);

    // 3. Generic handler to update any field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function handleSubmit(event) {
        event.preventDefault();

        // Pass the data up with the same logic as your current code
        onSubmit({
            id: initial?.id || Date.now(),
            ...formData,
            price: Number(formData.price),
            status: "active"
        });

        // ✅ Clear ONLY after adding new coffee, not during edit
        if (!initial?.id) {
            setFormData({ name: '', description: '', price: '', origin: '' });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field: Name */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Coffee Name</label>
                <input
                    name="name"
                    type="text"
                    placeholder="e.g. Ethiopian Yirgacheffe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    required
                />
            </div>

            {/* Field: Description */}
            <div>
                <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Description</label>
                <input
                    name="description"
                    type="text"
                    placeholder="Floral notes with citrus acidity..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    required
                />
            </div>

            {/* Grid for Origin and Price */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Origin</label>
                    <input
                        name="origin"
                        type="text"
                        placeholder="Ethiopia"
                        value={formData.origin}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                        required
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-stone-400 tracking-widest ml-1">Price ($)</label>
                    <input
                        name="price"
                        type="number"
                        placeholder="18.00"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-amber-500"
                        required
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-4 bg-[#2d241e] hover:bg-amber-800 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
            >
                {initial?.id ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
}