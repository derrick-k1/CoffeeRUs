import React, { useState } from 'react';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  // Destructure for cleaner code
  const { id, name, description, origin, price } = product;

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleSave = () => {
    // Ensure we send a number back, even if input gave us a string
    const updatedPrice = parseFloat(newPrice);
    
    if (!isNaN(updatedPrice)) {
      onUpdate(id, { ...product, price: updatedPrice });
    }
    
    setIsEditing(false);
  };

  // Helper to safely format price (handles strings like "$1.00" or numbers)
  const formatPrice = (val) => {
    const numeric = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val;
    return isNaN(numeric) ? "0.00" : numeric.toFixed(2);
  };

  return (
    <div className="product-card">
      <div className="card-header">
        <h3>{name}</h3>
        <span className="origin-tag">{origin}</span>
      </div>

      <p className="description">{description}</p>

      <div className="price-section">
        <label>Price: </label>
        {isEditing ? (
          <div className="edit-group">
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              step="0.01"
              autoFocus
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="display-group">
            <span className="price-value">${formatPrice(price)}</span>
            <button onClick={() => setIsEditing(true)}>Edit Price</button>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;