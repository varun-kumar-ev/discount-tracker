import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  const handleClick = () => {
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {product.image && (
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
      )}
      
      <div className="product-info">
        <h4 className="product-title">{product.title}</h4>
        
        <div className="product-price-section">
          <span className="product-price">{product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">{product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="product-discount">{product.discount} OFF</span>
          )}
        </div>
        
        {product.rating && (
          <div className="product-rating">
            ⭐ {product.rating}
          </div>
        )}
        
        <div className="product-platform">
          {product.platform}
        </div>
      </div>
      
      {product.url && (
        <div className="product-link">
          View on {product.platform} →
        </div>
      )}
    </div>
  );
}

export default ProductCard;
