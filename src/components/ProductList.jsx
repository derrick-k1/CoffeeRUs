import { useProducts } from '../context/ProductsContext';
import ProductCard from './ProductCard';

export default function ProductList({ onEdit, className = '' }) {
  // Pull everything from Context
  const { products, loading, removeProduct } = useProducts();

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-stone-100 h-64" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
        <h3 className="text-xl font-bold text-stone-800">Your inventory is empty</h3>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={removeProduct} // Uses the context function directly
        />
      ))}
    </div>
  );
}