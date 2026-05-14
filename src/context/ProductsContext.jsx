import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // SUCCESS / ERROR POPUP STATE
  const [notification, setNotification] = useState(null);

  const API_URL =
    "https://6a0568f0aa826ca75c09c6d7.mockapi.io/api/products";

  // SHOW SUCCESS / ERROR MESSAGE
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const savedProduct = await response.json();

      setProducts((prev) => [...prev, savedProduct]);

      // SUCCESS POPUP
      showNotification(
        "New coffee blend added successfully ☕",
        "success",
      );
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, updatedFields) => {
    if (!id) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p)),
      );

      // SUCCESS POPUP
      showNotification(
        "Inventory updated successfully ☕",
        "success",
      );
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  // DELETE PRODUCT
  const removeProduct = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));

      // SUCCESS POPUP
      showNotification(
        "Coffee blend removed successfully 🗑️",
        "success",
      );
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        notification,
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

  if (!context) {
    throw new Error(
      "useProducts must be used within a ProductsProvider",
    );
  }

  return context;
};