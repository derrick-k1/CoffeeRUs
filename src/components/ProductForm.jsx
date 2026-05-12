import React, { useState } from 'react'

function ProductForm({ onAddProduct }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const newProduct = {
            id: Date.now(),
            name,
            description,
            price: Number(price),
            origin
        };

        onAddProduct(newProduct);

        // Clear form fields
        setName('');
        setDescription('');
        setPrice('');
        setOrigin('');
    }

    return (
        <form onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4">

            <h2 className="text-2xl font-bold">
                Add new Coffee
            </h2>

            <input
                type="text"
                placeholder='Coffee Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                className='w-full border p-2 rounded'
                required

            />

            <input
                type="text"
                placeholder='Description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className='w-full border p-2 rounded'
                required

            />

            <input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                className='w-full border p-2 rounded'
                required

            />

            <input
                type="number"
                placeholder='Price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className='w-full border p-2 rounded'
                required

            />

            <button type="submit"
                className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300'>
                Add Product
            </button>
        </form>
    )
}

export default ProductForm