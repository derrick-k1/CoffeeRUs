import { useState } from 'react';
import ProductList from './ProductList';

export default function CoffeeShop() {
  const [priceFilter, setPriceFilter] = useState('all');

  return (
    <div>
      {/* Your existing UI */}
      <div className="price-range-section">
        <h3>Price Range</h3>
        <button onClick={() => setPriceFilter('all')}>All</button>
        <button onClick={() => setPriceFilter('10-20')}>$10 - $20</button>
        <button onClick={() => setPriceFilter('20-35')}>$20 - $35</button>
        <button onClick={() => setPriceFilter('35-plus')}>$35+</button>
      </div>

      {/* Pass the filter to ProductList */}
      <ProductList 
        onEdit={handleEdit}
        onDelete={handleDelete}
        priceFilter={priceFilter}  // Pass filter as prop
      />
    </div>
  );
} 