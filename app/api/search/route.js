import path from 'path';

export async function GET(request) {
  try {
    console.log('Current working directory:', process.cwd());
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    const category = searchParams.get('category')?.toLowerCase() || '';

    // Hardcoded dataset
    const products = [
      {
        id: 1,
        name: 'Organic Cotton T-Shirt',
        category: 'Clothing',
        description: 'Made from 100% organic cotton, sustainable and soft.',
        keywords: ['organic', 'sustainable', 'clothing'],
      },
      {
        id: 2,
        name: 'Bamboo Toothbrush',
        category: 'Personal Care',
        description: 'Biodegradable toothbrush made from bamboo.',
        keywords: ['bamboo', 'eco-friendly', 'personal care'],
      },
      {
        id: 3,
        name: 'Reusable Stainless  Straw',
        category: 'Home Goods',
        description: 'Durable straw to reduce plastic waste.',
        keywords: ['reusable', 'stainless steel', 'home goods'],
      },
      {
    id: 4,
    name: 'Recycled Plastic Water Bottle',
    category: 'Home Goods',
    description: 'Made from 100% recycled plastic, BPA-free and durable.',
    keywords: ['recycled', 'plastic', 'bpa-free', 'home goods']
  },
  {
    id: 5,
    name: 'Organic Linen Bed Sheets',
    category: 'Clothing',
    description: 'Soft and breathable bed sheets made from organic linen.',
    keywords: ['organic', 'linen', 'sustainable', 'clothing']
  },
  {
    id: 6,
    name: 'Solar-Powered Charger',
    category: 'Electronics',
    description: 'Portable charger powered by solar energy for eco-friendly charging.',
    keywords: ['solar', 'eco-friendly', 'electronics']
  },
  {
    id: 7,
    name: 'Vegan Leather Wallet',
    category: 'Accessories',
    description: 'Stylish wallet made from cruelty-free vegan leather.',
    keywords: ['vegan', 'leather', 'sustainable', 'accessories']
  },
  {
    id: 8,
    name: 'Compostable Coffee Pods',
    category: 'Food & Beverage',
    description: 'Biodegradable coffee pods for single-serve machines.',
    keywords: ['compostable', 'coffee', 'eco-friendly', 'food']
  },
  {
    id: 9,
    name: 'Hemp Backpack',
    category: 'Accessories',
    description: 'Durable backpack made from sustainable hemp fibers.',
    keywords: ['hemp', 'sustainable', 'accessories']
  },
  {
    id: 10,
    name: 'Natural Deodorant Stick',
    category: 'Personal Care',
    description: 'Aluminum-free deodorant with natural ingredients.',
    keywords: ['natural', 'deodorant', 'eco-friendly', 'personal care']
  },
  {
    id: 11,
    name: 'Recycled Glass Dinnerware Set',
    category: 'Home Goods',
    description: 'Elegant dinnerware made from recycled glass.',
    keywords: ['recycled', 'glass', 'sustainable', 'home goods']
  },
  {
    id: 12,
    name: 'Organic Matcha Green Tea',
    category: 'Food & Beverage',
    description: 'High-quality matcha powder from sustainably grown tea leaves.',
    keywords: ['organic', 'matcha', 'sustainable', 'food']
  },
  {
    id: 13,
    name: 'Bamboo Laptop Stand',
    category: 'Electronics',
    description: 'Ergonomic stand made from renewable bamboo.',
    keywords: ['bamboo', 'eco-friendly', 'electronics']
  },
  {
    id: 14,
    name: 'Reusable Beeswax Food Wraps',
    category: 'Home Goods',
    description: 'Eco-friendly alternative to plastic wrap, made with beeswax.',
    keywords: ['beeswax', 'reusable', 'sustainable', 'home goods']
  },
  {
    id: 15,
    name: 'Fair Trade Organic Cotton Scarf',
    category: 'Clothing',
    description: 'Handwoven scarf from fair trade certified organic cotton.',
    keywords: ['organic', 'fair trade', 'sustainable', 'clothing']
  }
];
    

    // Filter products
    const results = products.filter((product) => {
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.keywords.some((kw) => kw.toLowerCase().includes(query))
        : true;
      const matchesCategory = category
        ? product.category.toLowerCase() === category
        : true;
      return matchesQuery && matchesCategory;
    });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error.message);
    const errorResponse = { error: error.message || 'Internal server error' };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}