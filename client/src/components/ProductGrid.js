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

  // Calculate platform stats
  const getPlatformStats = (platformProducts) => {
    const actualProducts = platformProducts.filter(p => !p.note && p.price !== 'Click to view prices');
    const searchLinks = platformProducts.filter(p => p.note || p.price === 'Click to view prices');
    
    return {
      total: platformProducts.length,
      actualProducts: actualProducts.length,
      searchLinks: searchLinks.length,
      hasError: platformProducts[0]?.error,
      status: platformProducts[0]?.error 
        ? 'error' 
        : actualProducts.length > 0 
          ? 'success' 
          : searchLinks.length > 0 
            ? 'search-link' 
            : 'empty'
    };
  };

  return (
    <div className="product-grid-container">
      <h2 className="results-header">
        Search Results for "{query}"
      </h2>
      
      {Object.entries(groupedProducts).map(([platform, platformProducts]) => {
        const stats = getPlatformStats(platformProducts);
        
        return (
          <div key={platform} className="platform-section">
            <div className="platform-header-container">
              <h3 className="platform-header">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                {stats.hasError && (
                  <span className="status-badge error-badge">Error</span>
                )}
                {stats.status === 'success' && (
                  <span className="status-badge success-badge">✓ {stats.actualProducts} product{stats.actualProducts !== 1 ? 's' : ''}</span>
                )}
                {stats.status === 'search-link' && (
                  <span className="status-badge search-link-badge">🔗 Search Link</span>
                )}
              </h3>
              <div className="platform-stats">
                {stats.total > 0 && !stats.hasError && (
                  <span className="stat-item">
                    {stats.actualProducts > 0 && `${stats.actualProducts} product${stats.actualProducts !== 1 ? 's' : ''}`}
                    {stats.actualProducts > 0 && stats.searchLinks > 0 && ' • '}
                    {stats.searchLinks > 0 && `${stats.searchLinks} search link${stats.searchLinks !== 1 ? 's' : ''}`}
                  </span>
                )}
              </div>
            </div>
            
            {stats.hasError ? (
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
        );
      })}
    </div>
  );
}

export default ProductGrid;
