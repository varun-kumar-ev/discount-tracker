# 🧪 Testing Guide - Discount Tracker Website

This guide will walk you through testing the Discount Tracker application step by step.

## Prerequisites

Before testing, ensure you have:
- Node.js (v14 or higher) installed
- npm (v6 or higher) installed
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Internet connection (for actual scraping, though mock data will work offline)

## Step 1: Installation

### 1.1 Install All Dependencies

Open your terminal/command prompt in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for:
- Root package (concurrently for running both servers)
- Backend server (Express, Cheerio, Axios, etc.)
- Frontend client (React and dependencies)

**Expected Output:**
```
✓ Dependencies installed successfully
✓ Server dependencies installed
✓ Client dependencies installed
```

**Troubleshooting:**
- If you get permission errors, try: `npm install --legacy-peer-deps`
- If Node.js is not found, install Node.js from [nodejs.org](https://nodejs.org/)

## Step 2: Start the Application

### 2.1 Start Both Frontend and Backend

In the project root, run:

```bash
npm run dev
```

**Expected Output:**
```
[0] Server running on port 5000
[1] Compiled successfully!
[1] 
[1] You can now view discount-tracker-client in the browser.
[1] 
[1]   Local:            http://localhost:3000
[1]   On Your Network:  http://192.168.x.x:3000
```

**What's happening:**
- Backend API server starts on `http://localhost:5000`
- Frontend React app starts on `http://localhost:3000`
- Both run simultaneously using `concurrently`

**Troubleshooting:**
- If port 5000 is in use, change it in `server/index.js` (line 6)
- If port 3000 is in use, React will automatically use 3001, 3002, etc.

### 2.2 Alternative: Run Separately

If you prefer to run them separately:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## Step 3: Access the Application

### 3.1 Open in Browser

1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. You should see the Discount Tracker homepage with:
   - Header: "🛍️ Discount Tracker"
   - Subtitle: "Compare prices across Amazon, Flipkart, Myntra, Nykaa & more"
   - Search bar with placeholder text
   - Platform tags (Amazon, Flipkart, Myntra, Nykaa, + More)

## Step 4: Testing the Search Functionality

### Test Case 1: Basic Search

1. **Enter a search query:**
   - Type "iPhone" in the search bar
   - Click the "🔍 Search" button or press Enter

2. **Expected Behavior:**
   - Loading spinner appears with "Searching across all platforms..."
   - After a few seconds, product cards appear grouped by platform
   - Each platform section shows products with:
     - Product title
     - Price (in ₹)
     - Original price (if available)
     - Discount percentage
     - Rating (if available)
     - Platform name

3. **Verify Results:**
   - Products are grouped by platform (Amazon, Flipkart, Myntra, Nykaa)
   - Each product card is clickable
   - Cards show proper formatting and styling

### Test Case 2: Empty Search

1. **Test empty query:**
   - Leave search bar empty
   - Click search button

2. **Expected Behavior:**
   - Error message: "⚠️ Please enter a search query"
   - No products displayed

### Test Case 3: Different Product Types

Test with various product categories:

- **Electronics:** "Laptop", "Headphones", "Smartphone"
- **Fashion:** "T-Shirt", "Shoes", "Watch"
- **Beauty:** "Lipstick", "Face Cream", "Perfume"
- **Home:** "Bed Sheet", "Lamp", "Curtains"

**Expected:** Each search should return results from all platforms (or mock data if scraping fails)

### Test Case 4: Long Search Query

1. **Test with long query:**
   - Enter: "Samsung Galaxy S24 Ultra 5G Smartphone 256GB"
   - Search

2. **Expected Behavior:**
   - Query is processed correctly
   - Results appear (may be fewer due to specific query)

### Test Case 5: Special Characters

1. **Test with special characters:**
   - Enter: "Nike Air Max 90's"
   - Search

2. **Expected Behavior:**
   - Special characters are handled properly
   - No errors occur

## Step 5: Testing API Endpoints Directly

### 5.1 Test Health Endpoint

Open a new terminal and run:

```bash
curl http://localhost:5000/api/health
```

Or use a tool like Postman/Insomnia:
- Method: GET
- URL: `http://localhost:5000/api/health`

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Discount Tracker API is running"
}
```

### 5.2 Test Search Endpoint

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"laptop\"}"
```

**Using Postman/Insomnia:**
- Method: POST
- URL: `http://localhost:5000/api/search`
- Headers: `Content-Type: application/json`
- Body (JSON):
  ```json
  {
    "query": "laptop"
  }
  ```

**Expected Response:**
```json
{
  "query": "laptop",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "products": [
    {
      "platform": "amazon",
      "title": "laptop - Sample Product 1",
      "price": "₹999",
      "originalPrice": "₹1,499",
      "discount": "33%",
      "rating": "4.5",
      "image": null,
      "url": "https://www.amazon.in/search?q=laptop"
    },
    ...
  ]
}
```

### 5.3 Test Platform-Specific Search

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/search/amazon \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"headphones\"}"
```

**Expected:** Only Amazon products returned

## Step 6: Testing UI Components

### 6.1 Search Bar

- ✅ Input field accepts text
- ✅ Search button is disabled when input is empty
- ✅ Search button shows "Searching..." when loading
- ✅ Platform tags are visible
- ✅ Responsive on mobile (try resizing browser)

### 6.2 Product Cards

- ✅ Cards display all product information
- ✅ Cards are clickable (opens in new tab)
- ✅ Hover effect works (card lifts up)
- ✅ Images display correctly (if available)
- ✅ Price formatting is correct
- ✅ Discount badges are visible

### 6.3 Loading States

- ✅ Spinner appears during search
- ✅ "Searching across all platforms..." message shows
- ✅ UI is disabled during loading

### 6.4 Error Handling

- ✅ Error messages display correctly
- ✅ Empty results show "No products found"
- ✅ Network errors are handled gracefully

## Step 7: Testing Responsive Design

1. **Desktop View (1920x1080):**
   - All elements properly aligned
   - Product grid shows 4-5 columns
   - Search bar is centered

2. **Tablet View (768px width):**
   - Product grid shows 2-3 columns
   - Search bar stacks vertically
   - Text remains readable

3. **Mobile View (375px width):**
   - Product grid shows 1-2 columns
   - Search button full width
   - Cards are touch-friendly

**How to test:**
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test different screen sizes

## Step 8: Testing Browser Console

1. **Open Browser DevTools:**
   - Press F12 or Right-click → Inspect
   - Go to Console tab

2. **Check for Errors:**
   - No red errors should appear
   - Warnings are acceptable (React dev warnings)

3. **Network Tab:**
   - Open Network tab
   - Perform a search
   - Verify API call to `/api/search` returns 200 status
   - Check response time

## Step 9: Testing Edge Cases

### 9.1 Very Long Product Name
- Search for products with very long titles
- Verify text truncation works (2 lines max)

### 9.2 Missing Data
- Some products may not have ratings/images
- Verify UI handles missing data gracefully

### 9.3 Multiple Searches
- Perform multiple searches in succession
- Verify previous results are cleared
- Check for memory leaks (use browser DevTools Performance tab)

### 9.4 Slow Network
- Use browser DevTools → Network → Throttling
- Set to "Slow 3G"
- Verify loading states work correctly

## Step 10: Testing Scrapers (Advanced)

### 10.1 Test Individual Scrapers

You can test each scraper individually by modifying `server/services/productService.js` temporarily:

```javascript
// Test only Amazon
const results = await searchProducts(query, 'amazon');
```

### 10.2 Verify Mock Data Fallback

If scraping fails (which is likely due to anti-bot measures), the app should:
- Log the error to console
- Return mock data instead
- Continue functioning normally

**Check server console for:**
```
Amazon search error: [error message]
```

## Common Issues and Solutions

### Issue: "Cannot find module"
**Solution:** Run `npm run install-all` again

### Issue: "Port already in use"
**Solution:** 
- Kill the process using the port
- Or change port in `server/index.js`

### Issue: "CORS error"
**Solution:** 
- Ensure backend is running on port 5000
- Check `server/index.js` has `cors()` middleware

### Issue: "No products returned"
**Solution:**
- Check server console for errors
- Verify internet connection
- Mock data should still work

### Issue: "Scraping not working"
**Solution:**
- This is expected - e-commerce sites block scrapers
- Mock data is provided as fallback
- For production, use official APIs or headless browsers

## Success Criteria

✅ Application starts without errors
✅ Search bar accepts input and triggers search
✅ Products are displayed in organized grid
✅ All platforms show results (or mock data)
✅ UI is responsive and looks good
✅ No console errors
✅ API endpoints respond correctly
✅ Error handling works

## Next Steps After Testing

1. **Customize Scrapers:** Update selectors in scraper files for better results
2. **Add More Platforms:** Follow the pattern in existing scrapers
3. **Improve UI:** Add filters, sorting, pagination
4. **Add Features:** Price alerts, wishlist, comparison tool

## Need Help?

- Check the main README.md for setup instructions
- Review server console logs for backend errors
- Check browser console for frontend errors
- Verify all dependencies are installed correctly

---

Happy Testing! 🎉
