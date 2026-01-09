require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { searchProducts } = require('./services/productService');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Log for debugging
    console.log('CORS check - Origin:', origin);
    console.log('CORS check - Allowed origins:', allowedOrigins);
    
    // If FRONTEND_URL is set, check against allowed origins
    if (process.env.FRONTEND_URL) {
      // Check exact match or if origin includes vercel.app (for preview deployments)
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
        callback(null, true);
      } else {
        console.log('CORS rejected for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // If FRONTEND_URL is not set (development), allow all
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Discount Tracker API is running' });
});

// Search products across all platforms
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const results = await searchProducts(query);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search products', message: error.message });
  }
});

// Search specific platform
app.post('/api/search/:platform', async (req, res) => {
  try {
    const { query } = req.body;
    const { platform } = req.params;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const results = await searchProducts(query, platform);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search products', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
