import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ onEdit, onDelete, className = '' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/coffee');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 1. Loading State (Skeleton)
  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-gray-100 h-80 shadow-sm" />
        ))}
      </div>
    );
  }

  // 2. Empty State
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white rounded-3xl border shadow-xl">
        <h3 className="text-3xl font-bold mb-4">No Products Yet</h3>
        <p className="text-gray-500 mb-8">Add your first signature blend to get started.</p>
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold">
          Add First Coffee
        </button>
      </div>
    );
  }

  // 3. Data State
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}