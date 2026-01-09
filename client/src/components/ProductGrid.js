import React from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';

function ProductGrid({ products, query }) {
  // Group products by platform
  const groupedProducts = products.reduce((acc, product) => {
    const platform = product.platform || 'unknown';
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(product);
    return acc;
  }, {});

  return (
    <div className="product-grid-container">
      <h2 className="results-header">
        Search Results for "{query}"
      </h2>
      
      {Object.entries(groupedProducts).map(([platform, platformProducts]) => (
        <div key={platform} className="platform-section">
          <h3 className="platform-header">
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
            {platformProducts[0]?.error && (
              <span className="error-badge">Error</span>
            )}
          </h3>
          
          {platformProducts[0]?.error ? (
            <div className="platform-error">
              ⚠️ {platformProducts[0].error}
            </div>
          ) : (
            <div className="product-grid">
              {platformProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
