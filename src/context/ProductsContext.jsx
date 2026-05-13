import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4000/coffee';

  // --- 1. Fetch All Products ---
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

  // --- 2. Add Product ---
  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      const savedProduct = await response.json();
      
      // Update local state so UI updates instantly
      setProducts((prev) => [...prev, savedProduct]);
    } catch (err) {
      alert(err.message);
    }
  };

  // --- 3. Update Product ---
  const updateProduct = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
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

  // --- 4. Delete Product ---
  const removeProduct = async (id) => {
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

// Custom hook for easy usage
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};