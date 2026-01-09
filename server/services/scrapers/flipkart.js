const axios = require('axios');
const cheerio = require('cheerio');

async function search(query) {
  try {
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    
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

    $('div[data-id]').each((index, element) => {
      if (products.length >= 10) return false;

      const $el = $(element);
      const title = $el.find('a[rel="noopener noreferrer"]').attr('title') || 
                    $el.find('a').first().text().trim();
      const price = $el.find('div._30jeq3').text().trim();
      const originalPrice = $el.find('div._3I9_wc').text().trim();
      const discount = $el.find('div._3Ay6Sb span').text().trim();
      const image = $el.find('img').attr('src');
      const link = $el.find('a').first().attr('href');
      const rating = $el.find('div._3LWZlK').text().trim();

      if (title && price) {
        products.push({
          platform: 'flipkart',
          title,
          price,
          originalPrice: originalPrice || null,
          discount: discount || null,
          rating: rating || null,
          image: image || null,
          url: link ? `https://www.flipkart.com${link}` : null,
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Flipkart search error:', error.message);
    return getMockData('flipkart', query);
  }
}

function getMockData(platform, query) {
  return [
    {
      platform,
      title: `${query} - Sample Product 1`,
      price: '₹899',
      originalPrice: '₹1,299',
      discount: '31%',
      rating: '4.3',
      image: null,
      url: `https://www.${platform}.com/search?q=${encodeURIComponent(query)}`,
    },
    {
      platform,
      title: `${query} - Sample Product 2`,
      price: '₹1,199',
      originalPrice: '₹1,799',
      discount: '33%',
      rating: '4.1',
      image: null,
      url: `https://www.${platform}.com/search?q=${encodeURIComponent(query)}`,
    },
  ];
}

module.exports = { search };
