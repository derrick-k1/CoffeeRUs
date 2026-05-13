import React, { useState, useEffect } from 'react'

function ProductForm({ initial, onSubmit }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');

    // ✅ THIS IS THE FIX (auto-fill when editing)
    useEffect(() => {
        if (initial?.id) {
            setName(initial.name || '');
            setDescription(initial.description || '');
            setPrice(initial.price || '');
            setOrigin(initial.origin || '');
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setOrigin('');
        }
    }, [initial]);

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            id: initial?.id || Date.now(),
            name,
            description,
            price: Number(price),
            origin,
            status: "active"
        });

        // clear ONLY after adding, not during edit
        if (!initial?.id) {
            setName('');
            setDescription('');
            setPrice('');
            setOrigin('');
        }
    }

    return (
        <form onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4">

            <h2 className="text-2xl font-bold">
                {initial?.id ? "Edit Coffee" : "Add new Coffee"}
            </h2>

            <input
                type="text"
                placeholder='Coffee Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border p-2 rounded'
                required
            />

            <input
                type="text"
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full border p-2 rounded'
                required
            />

            <input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className='w-full border p-2 rounded'
                required
            />

            <input
                type="number"
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='w-full border p-2 rounded'
                required
            />

            <button
                type="submit"
                className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300'
            >
                {initial?.id ? "Update Product" : "Add Product"}
            </button>
        </form>
    )
}

export default ProductForm