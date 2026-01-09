import React from 'react';
import './ProductCard.css';
import { getProductHistory, getPriceChange } from '../utils/priceHistory';

function ProductCard({ product }) {
  const isSearchLink = product.note || product.price === 'Click to view prices';
  const history = !isSearchLink ? getProductHistory(product) : null;
  const priceChange = history ? getPriceChange(product.price, history) : null;

  const handleClick = () => {
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`product-card ${isSearchLink ? 'search-link-card' : ''}`} onClick={handleClick}>
      {isSearchLink && (
        <div className="search-link-badge">
          🔗 Search Results
        </div>
      )}
      
      {product.image && (
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
      )}
      
      <div className="product-info">
        <h4 className="product-title">{product.title}</h4>
        
        {product.note && (
          <div className="product-note">
            {product.note}
          </div>
        )}
        
        <div className="product-price-section">
          <span className="product-price">{product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">{product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="product-discount">{product.discount} OFF</span>
          )}
        </div>
        
        {priceChange && (
          <div className={`price-history ${priceChange.isIncrease ? 'price-increase' : 'price-decrease'}`}>
            {priceChange.isIncrease ? '📈' : '📉'} 
            {priceChange.isIncrease ? '+' : ''}{priceChange.percentage}% 
            {priceChange.isIncrease ? 'increase' : 'decrease'} 
            {history.entries.length > 1 && ` (${history.entries.length} tracked)`}
          </div>
        )}
        
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
          {isSearchLink ? 'View Search Results' : `View on ${product.platform}`} →
        </div>
      )}
    </div>
  );
}

export default ProductCard;
