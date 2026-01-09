# 🔗 Step-by-Step: Adding Affiliate Links (2-4 Hours)

This is the easiest way to start making money. Follow these exact steps.

## What You'll Earn

- **Amazon**: 1-10% commission per purchase
- **Flipkart**: 1-5% commission per purchase
- **Myntra**: 2-8% commission per purchase

**Example:** If 10 people buy ₹1000 products through your links:
- You earn: ₹50-100 (5-10% average)
- Monthly potential: ₹500-5000 with decent traffic

---

## Step 1: Sign Up for Affiliate Programs (30 minutes)

### Amazon Associates

1. Go to: https://affiliate-program.amazon.in
2. Click **"Join Now for Free"**
3. Fill in:
   - Website URL: Your Vercel URL
   - How you'll drive traffic: "Website/Blog"
   - Primary website language: English
   - Describe your site: "Price comparison and discount tracker"
4. Submit application
5. **Wait for approval** (1-2 days)
6. Once approved, go to **"Tools"** → **"Link Builder"**
7. Copy your **Associate Tag** (looks like: `yourname-21`)

### Flipkart Affiliate

1. Go to: https://affiliate.flipkart.com
2. Click **"Sign Up"**
3. Fill in details
4. Submit application
5. **Wait for approval** (1-3 days)
5. Once approved, go to dashboard
6. Copy your **Affiliate ID** (looks like: `yourid123`)

### Myntra Affiliate (Optional)

1. Go to: https://affiliate.myntra.com
2. Sign up
3. Get your affiliate code

---

## Step 2: Update Your Code (1-2 hours)

### 2.1 Add Environment Variables

**File: `server/.env`** (create if doesn't exist)

```env
AMAZON_AFFILIATE_TAG=your-tag-21
FLIPKART_AFFILIATE_ID=yourid123
MYNTRA_AFFILIATE_CODE=yourcode
```

**Important:** Don't commit `.env` file to GitHub! (It's already in .gitignore)

### 2.2 Update Amazon Scraper

**File: `server/services/scrapers/amazon.js`**

Find this section (around line 30-40):

```javascript
if (title && price) {
  products.push({
    platform: 'amazon',
    title,
    price: `₹${price}`,
    // ... existing code ...
    url: link ? `https://www.amazon.in${link}` : null,
  });
}
```

Replace with:

```javascript
if (title && price) {
  // Add affiliate tag to URL
  let affiliateUrl = null;
  if (link) {
    const baseUrl = `https://www.amazon.in${link}`;
    const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || '';
    affiliateUrl = affiliateTag 
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}tag=${affiliateTag}`
      : baseUrl;
  }
  
  products.push({
    platform: 'amazon',
    title,
    price: `₹${price}`,
    originalPrice: null,
    discount: null,
    rating: rating || null,
    image: image || null,
    url: affiliateUrl,
  });
}
```

### 2.3 Update Flipkart Scraper

**File: `server/services/scrapers/flipkart.js`**

Find the products.push section and update:

```javascript
if (title && price) {
  // Add affiliate ID to URL
  let affiliateUrl = null;
  if (link) {
    const baseUrl = `https://www.flipkart.com${link}`;
    const affiliateId = process.env.FLIPKART_AFFILIATE_ID || '';
    affiliateUrl = affiliateId
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}affid=${affiliateId}`
      : baseUrl;
  }
  
  products.push({
    platform: 'flipkart',
    title,
    price,
    originalPrice: originalPrice || null,
    discount: discount || null,
    rating: rating || null,
    image: image || null,
    url: affiliateUrl,
  });
}
```

### 2.4 Update Myntra Scraper (Optional)

**File: `server/services/scrapers/myntra.js`**

Similar update:

```javascript
if (title && price) {
  let affiliateUrl = null;
  if (link) {
    const baseUrl = `https://www.myntra.com${link}`;
    const affiliateCode = process.env.MYNTRA_AFFILIATE_CODE || '';
    affiliateUrl = affiliateCode
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}affid=${affiliateCode}`
      : baseUrl;
  }
  
  products.push({
    platform: 'myntra',
    title,
    price,
    originalPrice: originalPrice || null,
    discount: discount || null,
    rating: rating || null,
    image: image || null,
    url: affiliateUrl,
  });
}
```

---

## Step 3: Add Affiliate Disclosure (15 minutes)

**Required by law!** You must tell users about affiliate links.

### 3.1 Create Disclosure Component

**File: `client/src/components/AffiliateDisclosure.js`**

```javascript
import React from 'react';
import './AffiliateDisclosure.css';

function AffiliateDisclosure() {
  return (
    <div className="affiliate-disclosure">
      <p>
        <strong>💰 Affiliate Disclosure:</strong> We may earn a commission 
        when you purchase products through our links. This helps us keep 
        the service free for you. Thank you for your support!
      </p>
    </div>
  );
}

export default AffiliateDisclosure;
```

**File: `client/src/components/AffiliateDisclosure.css`**

```css
.affiliate-disclosure {
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #667eea;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 800px;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.affiliate-disclosure strong {
  color: #fff;
}
```

### 3.2 Add to Your App

**File: `client/src/App.js`**

```javascript
import AffiliateDisclosure from './components/AffiliateDisclosure';

// In your JSX, add before the footer:
<AffiliateDisclosure />
```

---

## Step 4: Update Environment Variables in Production (10 minutes)

### 4.1 Render (Backend)

1. Go to Render dashboard
2. Open your backend service
3. Go to **"Environment"** tab
4. Add these variables:
   - `AMAZON_AFFILIATE_TAG` = your Amazon tag
   - `FLIPKART_AFFILIATE_ID` = your Flipkart ID
   - `MYNTRA_AFFILIATE_CODE` = your Myntra code (if you have it)
5. Click **"Save Changes"**
6. Service will redeploy automatically

### 4.2 Test Locally First

Before deploying, test locally:

1. Create `server/.env` file with your affiliate tags
2. Run: `cd server && npm start`
3. Run: `cd client && npm start`
4. Search for a product
5. Click a product link
6. Check URL - should have your affiliate tag/ID

---

## Step 5: Deploy and Test (30 minutes)

### 5.1 Commit and Push

```bash
git add .
git commit -m "Add affiliate links and disclosure"
git push
```

### 5.2 Wait for Deployment

- Render: 5-10 minutes
- Vercel: 2-5 minutes

### 5.3 Test Your Live App

1. Visit your Vercel URL
2. Search for a product
3. Click on a product card
4. Check the URL in new tab
5. Verify affiliate tag/ID is in URL

**Example URLs:**
- Amazon: `https://www.amazon.in/product?tag=your-tag-21`
- Flipkart: `https://www.flipkart.com/product?affid=yourid123`

### 5.4 Make a Test Purchase

1. Buy something cheap (₹100-200)
2. Complete the purchase
3. Wait 24-48 hours
4. Check your affiliate dashboard
5. You should see the commission!

---

## Step 6: Track Your Earnings

### Set Up Tracking

1. **Bookmark affiliate dashboards:**
   - Amazon: https://affiliate-program.amazon.in/home
   - Flipkart: https://affiliate.flipkart.com/dashboard

2. **Check weekly:**
   - See how many clicks
   - See how many sales
   - Calculate earnings

3. **Optimize:**
   - Which products get most clicks?
   - Which platform converts best?
   - Adjust your strategy

---

## Troubleshooting

### Issue: "Affiliate tag not in URL"

**Check:**
1. Environment variable is set in Render
2. Code changes are deployed
3. Restart backend service

**Fix:**
- Double-check environment variable name
- Verify code changes are pushed to GitHub
- Check Render logs for errors

### Issue: "Not earning commissions"

**Common reasons:**
1. User didn't complete purchase
2. User cleared cookies
3. Outside the cookie window (usually 24 hours)
4. Product category doesn't pay commission

**Solution:**
- This is normal - not every click converts
- Focus on getting more traffic
- Average conversion: 1-5% of clicks

### Issue: "Application rejected"

**Common reasons:**
1. Not enough content on site
2. Site not live yet
3. Violates terms of service

**Solution:**
- Wait until site is live
- Add more content (about page, privacy policy)
- Reapply after 30 days

---

## Pro Tips

### 1. Optimize Click-Through Rate

- Make product cards more clickable
- Add "Best Deal" badges
- Show savings prominently

### 2. Focus on High-Commission Categories

- Electronics: 5-10%
- Fashion: 2-5%
- Books: 1-3%

### 3. Build Trust

- Show real prices
- Be transparent about affiliates
- Provide value to users

### 4. Track Performance

- Use Google Analytics
- See which products are popular
- Optimize for those

---

## Expected Results

### First Month:
- Clicks: 100-500
- Sales: 2-10
- Earnings: ₹200-1000

### After 3 Months:
- Clicks: 500-2000
- Sales: 10-50
- Earnings: ₹1000-5000

### After 6 Months:
- Clicks: 2000-10000
- Sales: 50-200
- Earnings: ₹5000-20000

**Remember:** This depends on traffic. Focus on getting visitors first!

---

## Next Steps

After implementing affiliate links:

1. ✅ Add Google AdSense (see MONETIZATION_GUIDE.md)
2. ✅ Improve SEO to get more traffic
3. ✅ Add social media sharing
4. ✅ Build email list
5. ✅ Plan premium features

---

## Summary

**What you did:**
1. ✅ Signed up for affiliate programs
2. ✅ Updated code to add affiliate tags
3. ✅ Added required disclosure
4. ✅ Deployed to production
5. ✅ Started earning commissions!

**Time invested:** 2-4 hours
**Potential earnings:** ₹500-5000/month (with traffic)

**You're now making money from your app!** 🎉

Keep building traffic and optimizing. Good luck! 💰
