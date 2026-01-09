// Price history tracking using localStorage
const STORAGE_KEY = 'discount_tracker_price_history';
const MAX_HISTORY_DAYS = 30; // Keep history for 30 days

/**
 * Track price history for a product
 */
export function trackPriceHistory(product) {
  try {
    const history = getPriceHistory();
    const productKey = `${product.platform}_${product.title}`;
    const now = new Date().toISOString();
    
    // Extract numeric price for comparison
    const priceNum = extractPrice(product.price);
    
    if (!priceNum) return; // Skip if we can't extract price
    
    const priceEntry = {
      price: product.price,
      priceNum,
      originalPrice: product.originalPrice,
      discount: product.discount,
      timestamp: now,
      url: product.url,
    };
    
    if (!history[productKey]) {
      history[productKey] = {
        title: product.title,
        platform: product.platform,
        entries: [],
      };
    }
    
    // Add new entry if price changed or it's been more than 1 hour since last entry
    const lastEntry = history[productKey].entries[history[productKey].entries.length - 1];
    const shouldAdd = !lastEntry || 
                     lastEntry.priceNum !== priceNum ||
                     (new Date(now) - new Date(lastEntry.timestamp)) > 3600000; // 1 hour
    
    if (shouldAdd) {
      history[productKey].entries.push(priceEntry);
      
      // Keep only last 50 entries per product
      if (history[productKey].entries.length > 50) {
        history[productKey].entries = history[productKey].entries.slice(-50);
      }
    }
    
    // Clean up old entries (older than MAX_HISTORY_DAYS)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
    
    Object.keys(history).forEach(key => {
      history[key].entries = history[key].entries.filter(
        entry => new Date(entry.timestamp) > cutoffDate
      );
      
      // Remove product if no entries left
      if (history[key].entries.length === 0) {
        delete history[key];
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error tracking price history:', error);
  }
}

/**
 * Get price history for a product
 */
export function getProductHistory(product) {
  try {
    const history = getPriceHistory();
    const productKey = `${product.platform}_${product.title}`;
    return history[productKey] || null;
  } catch (error) {
    console.error('Error getting product history:', error);
    return null;
  }
}

/**
 * Get all price history
 */
function getPriceHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading price history:', error);
    return {};
  }
}

/**
 * Extract numeric price from price string (e.g., "₹999" -> 999)
 */
function extractPrice(priceStr) {
  if (!priceStr) return null;
  const match = priceStr.replace(/[₹,]/g, '').match(/(\d+)/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Calculate price change percentage
 */
export function getPriceChange(currentPrice, history) {
  if (!history || history.entries.length < 2) return null;
  
  const currentPriceNum = extractPrice(currentPrice);
  if (!currentPriceNum) return null;
  
  // Get the oldest price in history
  const oldestEntry = history.entries[0];
  const oldestPriceNum = oldestEntry.priceNum;
  
  if (!oldestPriceNum) return null;
  
  const change = ((currentPriceNum - oldestPriceNum) / oldestPriceNum) * 100;
  return {
    percentage: Math.round(change * 10) / 10,
    isIncrease: change > 0,
    oldestPrice: oldestEntry.price,
    oldestDate: oldestEntry.timestamp,
  };
}
