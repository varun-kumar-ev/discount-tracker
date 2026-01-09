import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import LoadingSpinner from './components/LoadingSpinner';
import { trackPriceHistory } from './utils/priceHistory';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setProducts([]);

    try {
      // Use environment variable for API URL in production, or relative path in development
      const API_URL = process.env.REACT_APP_API_URL || '';
      // Remove trailing slash if present
      const baseUrl = API_URL.replace(/\/$/, '');
      const searchUrl = `${baseUrl}/api/search`;
      
      const response = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Track price history for products with actual prices
      const productsWithHistory = data.products.map(product => {
        // Only track products with actual prices (not search links)
        if (product.price && 
            product.price !== 'Click to view prices' && 
            !product.note &&
            product.url &&
            !product.url.includes('/search?')) {
          trackPriceHistory(product);
        }
        return product;
      });
      
      setProducts(productsWithHistory);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛍️ Discount Tracker</h1>
        <p>Compare prices across Amazon, Flipkart, Myntra, Nykaa & more</p>
      </header>

      <main className="App-main">
        <SearchBar onSearch={handleSearch} disabled={loading} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {!loading && searchQuery && products.length === 0 && !error && (
          <div className="no-results">
            No products found for "{searchQuery}"
          </div>
        )}

        {!loading && products.length > 0 && (
          <ProductGrid products={products} query={searchQuery} />
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Discount Tracker - Find the best deals across all platforms</p>
      </footer>
    </div>
  );
}

export default App;
