const axios = require('axios');
const cheerio = require('cheerio');

async function search(query) {
  try {
    // Amazon search URL
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const products = [];

    // Amazon product selectors (may need adjustment based on actual HTML structure)
    $('[data-component-type="s-search-result"]').each((index, element) => {
      if (products.length >= 10) return false; // Limit to 10 products

      const $el = $(element);
      const title = $el.find('h2 a span').text().trim();
      const price = $el.find('.a-price-whole').first().text().trim();
      const image = $el.find('img').attr('src');
      const link = $el.find('h2 a').attr('href');
      const rating = $el.find('.a-icon-alt').text().match(/(\d+\.?\d*)/)?.[1];

      if (title && price) {
        products.push({
          platform: 'amazon',
          title,
          price: `₹${price}`,
          originalPrice: null,
          discount: null,
          rating: rating || null,
          image: image || null,
          url: link ? `https://www.amazon.in${link}` : null,
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Amazon search error:', error.message);
    // Return mock data for development
    return getMockData('amazon', query);
  }
}

function getMockData(platform, query) {
  return [
    {
      platform,
      title: `${query} - Sample Product 1`,
      price: '₹999',
      originalPrice: '₹1,499',
      discount: '33%',
      rating: '4.5',
      image: null,
      url: `https://www.${platform}.in/search?q=${encodeURIComponent(query)}`,
    },
    {
      platform,
      title: `${query} - Sample Product 2`,
      price: '₹1,299',
      originalPrice: '₹1,999',
      discount: '35%',
      rating: '4.2',
      image: null,
      url: `https://www.${platform}.in/search?q=${encodeURIComponent(query)}`,
    },
  ];
}

module.exports = { search };
