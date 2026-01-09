const axios = require('axios');
const cheerio = require('cheerio');

async function search(query) {
  try {
    const searchUrl = `https://www.myntra.com/${encodeURIComponent(query)}`;
    
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

    $('.product-base').each((index, element) => {
      if (products.length >= 10) return false;

      const $el = $(element);
      const title = $el.find('.product-product').text().trim();
      const price = $el.find('.product-price').text().trim();
      const originalPrice = $el.find('.product-strike').text().trim();
      const discount = $el.find('.product-discountPercentage').text().trim();
      const image = $el.find('img').attr('src');
      const link = $el.find('a').attr('href');
      const rating = $el.find('.product-ratingsContainer').text().trim();

      if (title && price) {
        products.push({
          platform: 'myntra',
          title,
          price,
          originalPrice: originalPrice || null,
          discount: discount || null,
          rating: rating || null,
          image: image || null,
          url: link ? `https://www.myntra.com${link}` : null,
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Myntra search error:', error.message);
    // Return search link instead of mock data
    return [{
      platform: 'myntra',
      title: `Search results for "${query}" on Myntra`,
      price: 'Click to view prices',
      originalPrice: null,
      discount: null,
      rating: null,
      image: null,
      url: `https://www.myntra.com/${encodeURIComponent(query)}`,
      note: 'Unable to fetch product details. Click to view search results on Myntra.',
    }];
  }
}

function getMockData(platform, query) {
  return [
    {
      platform,
      title: `${query} - Sample Product 1`,
      price: '₹799',
      originalPrice: '₹1,199',
      discount: '33%',
      rating: '4.4',
      image: null,
      url: `https://www.${platform}.com/${encodeURIComponent(query)}`,
    },
    {
      platform,
      title: `${query} - Sample Product 2`,
      price: '₹1,099',
      originalPrice: '₹1,599',
      discount: '31%',
      rating: '4.0',
      image: null,
      url: `https://www.${platform}.com/${encodeURIComponent(query)}`,
    },
  ];
}

module.exports = { search };
