const amazonService = require('./scrapers/amazon');
const flipkartService = require('./scrapers/flipkart');
const myntraService = require('./scrapers/myntra');
const nykaaService = require('./scrapers/nykaa');

const PLATFORMS = {
  amazon: amazonService,
  flipkart: flipkartService,
  myntra: myntraService,
  nykaa: nykaaService,
};

async function searchProducts(query, platform = null) {
  const results = {
    query,
    timestamp: new Date().toISOString(),
    products: [],
  };

  if (platform) {
    // Search specific platform
    const platformService = PLATFORMS[platform.toLowerCase()];
    if (platformService) {
      try {
        const products = await platformService.search(query);
        results.products.push(...products);
      } catch (error) {
        console.error(`Error searching ${platform}:`, error);
        results.products.push({
          platform: platform,
          error: error.message,
        });
      }
    } else {
      results.error = `Platform ${platform} not supported`;
    }
  } else {
    // Search all platforms in parallel
    const searchPromises = Object.entries(PLATFORMS).map(async ([name, service]) => {
      try {
        const products = await service.search(query);
        return { platform: name, products, error: null };
      } catch (error) {
        console.error(`Error searching ${name}:`, error);
        return { platform: name, products: [], error: error.message };
      }
    });

    const platformResults = await Promise.allSettled(searchPromises);
    
    platformResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { platform, products, error } = result.value;
        if (error) {
          results.products.push({ platform, error });
        } else {
          results.products.push(...products);
        }
      } else {
        results.products.push({ 
          platform: 'unknown', 
          error: result.reason?.message || 'Unknown error' 
        });
      }
    });
  }

  return results;
}

module.exports = { searchProducts };
