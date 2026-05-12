import React, {useState} from "react";
import ProductForm from "../components/ProductForm";

function Admin() {
    const [products, setProducts] = useState([]);

    function handleAddProduct(newProduct) {
        setProducts([...products, newProduct]);
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">
                Admin Dashboard
            </h1>
            
            <ProductForm onAddProduct={handleAddProduct} />

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Added Products
                </h2>

                <ul className="space-y-3">
                    {products.map(product => (
                        <li key={product.id} className="bg-white p-4 rounded-lg shadow">
                           <strong>{product.name}</strong>
                           <p>{product.description}</p>
                           <p>Origin: {product.origin}</p>
                           <p>Price: ${product.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Admin;