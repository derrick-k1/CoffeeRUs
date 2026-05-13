import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initial }) {

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
}

export default ProductForm;