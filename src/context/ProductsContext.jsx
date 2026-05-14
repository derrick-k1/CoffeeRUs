import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FIX 1: Add the resource name 'coffee' (or whatever you named it) to the end
  // MockAPI needs: base_url + /api/products + /your_resource
  const API_URL = 'https://6a0568f0aa826ca75c09c6d7.mockapi.io/api/products';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      const savedProduct = await response.json();
      setProducts((prev) => [...prev, savedProduct]);
    } catch (err) {
      alert(err.message);
    }
  };

  // FIX 2: Check for valid ID and switch PATCH to PUT
  const updateProduct = async (id, updatedFields) => {
  // If 'id' is undefined here, the URL becomes .../api/products/undefined
  if (!id) {
    console.error("Update failed: No ID provided"); // This is the error you saw
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // Reminder: Use PUT for MockAPI
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) throw new Error('Failed to update product');
    const updatedProduct = await response.json();

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updatedProduct : p))
    );
  } catch (err) {
    alert(err.message);
  }
};

  const removeProduct = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ProductsContext.Provider 
      value={{ products, loading, error, addProduct, updateProduct, removeProduct, refresh: fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};