import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

const API_URL =
  "https://6a0568f0aa826ca75c09c6d7.mockapi.io/api/products";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // MockAPI endpoint for the product inventory.
  // Keep this value aligned with the remote resource path so the app can fetch and update products.
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch inventory");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the inventory once when the provider mounts so the app can display current product data.
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");
      const savedProduct = await response.json();

      setProducts((prev) => [...prev, savedProduct]);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    if (!id) {
      // Guard against invalid updates when the product ID is missing.
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) throw new Error("Failed to update product");
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
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        removeProduct,
        refresh: fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};