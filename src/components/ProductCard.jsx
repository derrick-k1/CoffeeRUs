import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const { id, name, description, origin, price } = product;
  
  // State for toggling edit mode and handling input
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleSave = () => {
    // Send the updated price back to the parent/API
    onUpdate(id, { ...product, price: parseFloat(newPrice) });
    setIsEditing(false);
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
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>✕</button>
          </div>
        ) : (
          <div className="display-group">
            <span className="price-value">${price.toFixed(2)}</span>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Price
            </button>
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

// Robust Prop-Types validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    origin: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;