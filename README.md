# 🛍️ Discount Tracker Website

A modern web application that tracks and compares product prices across multiple e-commerce platforms including Amazon, Flipkart, Myntra, Nykaa, and more.

## Features

- 🔍 **Multi-platform Search**: Search for products across Amazon, Flipkart, Myntra, Nykaa simultaneously
- 💰 **Price Comparison**: Compare prices, discounts, and ratings across different platforms
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- ⚡ **Fast Results**: Parallel searching across all platforms for quick results
- 🎨 **Modern UI**: Clean, gradient-based design with smooth animations

## Tech Stack

### Frontend
- React 18
- CSS3 with modern gradients and animations
- Axios for API calls

### Backend
- Node.js with Express
- Cheerio for web scraping
- Axios for HTTP requests

## Installation

1. **Clone or navigate to the project directory**

2. **Install all dependencies** (root, server, and client):
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   npm install
   cd server && npm install && cd ..
   cd client && npm install && cd ..
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
# or
cd server && npm run dev
```

**Frontend only:**
```bash
npm run client
# or
cd client && npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a product name in the search bar (e.g., "iPhone 15", "Laptop", "Headphones")
3. Click "Search" or press Enter
4. View results from all platforms with prices, discounts, and ratings
5. Click on any product card to open it on the respective platform

## Quick Testing Guide

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to `http://localhost:3000`

### Step 4: Test Search
- Enter "iPhone" in the search bar
- Click "🔍 Search"
- Wait for results from all platforms
- Click on any product card to view details

### Step 5: View Demo Preview
Open `demo.html` in your browser to see a static preview of the UI without running the server.

**For detailed testing instructions, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)**

## API Endpoints

### POST `/api/search`
Search for products across all platforms.

**Request Body:**
```json
{
  "query": "iPhone 15"
}
```

**Response:**
```json
{
  "query": "iPhone 15",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "products": [
    {
      "platform": "amazon",
      "title": "iPhone 15 - Sample Product",
      "price": "₹999",
      "originalPrice": "₹1,499",
      "discount": "33%",
      "rating": "4.5",
      "image": null,
      "url": "https://www.amazon.in/..."
    }
  ]
}
```

### POST `/api/search/:platform`
Search for products on a specific platform.

**Example:** `POST /api/search/amazon`

## Project Structure

```
discount-tracker-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── services/
│   │   ├── scrapers/       # Platform-specific scrapers
│   │   └── productService.js
│   └── index.js
├── package.json
└── README.md
```

## Important Notes

⚠️ **Web Scraping Considerations:**

- The current implementation includes web scraping functionality, but many e-commerce sites have anti-scraping measures
- The scrapers include fallback mock data for development and testing
- For production use, consider:
  - Using official APIs where available
  - Implementing proper rate limiting
  - Using proxy services
  - Respecting robots.txt and terms of service
  - Using headless browsers (Puppeteer/Playwright) for JavaScript-rendered content

## Adding New Platforms

To add a new e-commerce platform:

1. Create a new scraper file in `server/services/scrapers/` (e.g., `newplatform.js`)
2. Implement the `search(query)` function that returns an array of products
3. Add the platform to `PLATFORMS` object in `server/services/productService.js`

Example:
```javascript
// server/services/scrapers/newplatform.js
async function search(query) {
  // Your scraping logic here
  return products;
}
module.exports = { search };
```

## Future Enhancements

- [ ] User authentication and saved searches
- [ ] Price drop alerts
- [ ] Historical price tracking
- [ ] Product wishlist
- [ ] Advanced filters (price range, ratings, etc.)
- [ ] Product comparison feature
- [ ] Email/SMS notifications for price drops

## License

MIT

## Deployment

### For Complete Beginners

**Start Here:**
1. **Fastest way**: Follow [QUICK_START.md](./QUICK_START.md) (1 hour, step-by-step)
2. **Checklist format**: Use [BEGINNER_CHECKLIST.md](./BEGINNER_CHECKLIST.md) (check off as you go)
3. **Detailed guide**: Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) (comprehensive explanations)
4. **Tools & Maintenance**: See [TOOLS_AND_MAINTENANCE.md](./TOOLS_AND_MAINTENANCE.md) (what you need, how to maintain)

**Recommended Deployment:**
- **Frontend**: Deploy on Vercel (free, easy)
- **Backend**: Deploy on Render (free tier available)

**Time Required:** 1-2 hours for first deployment

**Cost:** $0/month (using free tiers)

### Quick Deploy Commands

After pushing to GitHub:

1. **Backend (Render):**
   - Connect GitHub repo
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`

2. **Frontend (Vercel):**
   - Connect GitHub repo
   - Root Directory: `client`
   - Framework: Create React App
   - Add env: `REACT_APP_API_URL` = your backend URL

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

## Monetization

Want to make money from your app? Check out:

- **[MONETIZATION_GUIDE.md](./MONETIZATION_GUIDE.md)** - Complete monetization strategies
- **[AFFILIATE_IMPLEMENTATION.md](./AFFILIATE_IMPLEMENTATION.md)** - Step-by-step affiliate setup (2-4 hours)

**Quick Start:**
1. Add affiliate links (easiest, ₹500-5000/month potential)
2. Add Google AdSense (very easy, ₹200-2000/month potential)
3. Add premium features (medium difficulty, ₹1000-10000/month potential)

See the guides for detailed instructions!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
