const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/stitchora.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Update existing product colors
const colorMapping = {
  'prod-ivory-anarkali-suit': ['Ivory', 'Cream', 'Off-White', 'Beige', 'Champagne'],
  'prod-coord-set-blush': ['Pastel Pink', 'Baby Pink', 'Peach', 'Champagne'],
  'prod-espresso-velvet-suit': ['Beige', 'Champagne'],
  'prod-festive-indowestern-mustard': ['Butter Yellow', 'Beige', 'Cream'],
  'prod-luxury-bridal-lehenga': ['Champagne', 'Dusty Rose'],
  'prod-traditional-royal-blue': ['Sky Blue', 'Powder Blue'],
  'prod-chikankari-peplum-kurti': ['Ivory', 'Off-White', 'Cream', 'Beige'],
  'prod-crimson-floral-alia-kurti': ['Peach', 'Pastel Pink', 'Dusty Rose'],
  'prod-emerald-zari-chanderi-kurti': ['Mint Green', 'Sage Green'],
  'prod-purple-zari-ethnic-dress': ['Pastel Purple', 'Lavender', 'Lilac'],
};

db.products.forEach(p => {
  if (colorMapping[p.id]) {
    p.colors = colorMapping[p.id];
  } else if (!p.colors) {
    p.colors = ['Beige', 'Ivory'];
  }
});

// Check if new products already exist
const existingIds = new Set(db.products.map(p => p.id));

const newProducts = [
  {
    id: 'prod-rose-pink-sharara',
    slug: 'the-gulabi-rose-zari-sharara-set',
    name: 'The Gulabi Rose Zari Embroidered Sharara Set',
    sku: 'STCH-RS-13',
    shortDesc: 'Opulent rose pink raw silk short kurti with heavy golden zardozi embroidery and tiered flared sharara.',
    description: 'An ode to royal court couture, this striking rose pink ensemble features an intricately embroidered raw silk kurti with dense gold floral needlework along the notched neckline and hem. Matched with voluminous kalidar flared sharara pants adorned with scalloped gold zari borders and a diaphanous matching dupatta.',
    price: 7899,
    originalPrice: 10500,
    discountPercent: 25,
    fabric: 'Pure Chanderi Silk, Raw Silk & Net Dupatta',
    careInstructions: 'Dry clean only. Steam press inside out.',
    occasion: 'Festive Celebrations, Sangeet, Mehendi, Weddings',
    fit: 'Tailored Short Kurti with Flared High-Waist Sharara',
    categoryId: 'cat-ethnic-suits',
    colors: ['Pastel Pink', 'Baby Pink', 'Dusty Rose'],
    images: [
      {
        id: 'img-e2-1',
        url: '/images/e2.png',
        alt: 'STITCHORA Gulabi Rose Zari Embroidered Sharara Set in Pastel Pink & Baby Pink',
        isPrimary: true
      }
    ],
    variants: [
      { id: 'v-rose-xs', productId: 'prod-rose-pink-sharara', size: 'XS', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 4, sku: 'STCH-RS-13-XS' },
      { id: 'v-rose-s', productId: 'prod-rose-pink-sharara', size: 'S', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 8, sku: 'STCH-RS-13-S' },
      { id: 'v-rose-m', productId: 'prod-rose-pink-sharara', size: 'M', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 12, sku: 'STCH-RS-13-M' },
      { id: 'v-rose-l', productId: 'prod-rose-pink-sharara', size: 'L', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 6, sku: 'STCH-RS-13-L' },
      { id: 'v-rose-xl', productId: 'prod-rose-pink-sharara', size: 'XL', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 5, sku: 'STCH-RS-13-XL' },
      { id: 'v-rose-xxl', productId: 'prod-rose-pink-sharara', size: 'XXL', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 3, sku: 'STCH-RS-13-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 34,
    createdAt: '2026-03-27T10:00:00Z'
  },
  {
    id: 'prod-powder-blue-sharara',
    slug: 'the-firozi-powder-blue-sharara-suit',
    name: 'The Firozi Powder Blue Embellished Sharara Suit',
    sku: 'STCH-PB-14',
    shortDesc: 'Lustrous sky & powder blue silk kurti with intricate mughal floral jaal and tiered flared sharara.',
    description: 'Exemplifying breezy pastel elegance, this powder blue sharara suit is spun from luminous banarasi art silk. Features an all-over golden thread jaal on the bodice and sleeves, paired with dramatic flared sharara bottoms trimmed with ornate gotta patti lace and an airy matching dupatta.',
    price: 6499,
    originalPrice: 8999,
    discountPercent: 28,
    fabric: 'Pure Banarasi Art Silk & Soft Voile Lining',
    careInstructions: 'Dry clean only. Protect embellishments while pressing.',
    occasion: 'Daytime Weddings, Festive Gatherings, Eid, Receptions',
    fit: 'Straight Tailored Kurti with Tiered Flared Bottoms',
    categoryId: 'cat-ethnic-suits',
    colors: ['Powder Blue', 'Sky Blue', 'Light Grey'],
    images: [
      {
        id: 'img-e3-1',
        url: '/images/e3.png',
        alt: 'STITCHORA Firozi Powder Blue & Sky Blue Embellished Sharara Suit',
        isPrimary: true
      }
    ],
    variants: [
      { id: 'v-pb-xs', productId: 'prod-powder-blue-sharara', size: 'XS', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 5, sku: 'STCH-PB-14-XS' },
      { id: 'v-pb-s', productId: 'prod-powder-blue-sharara', size: 'S', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 9, sku: 'STCH-PB-14-S' },
      { id: 'v-pb-m', productId: 'prod-powder-blue-sharara', size: 'M', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 11, sku: 'STCH-PB-14-M' },
      { id: 'v-pb-l', productId: 'prod-powder-blue-sharara', size: 'L', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 7, sku: 'STCH-PB-14-L' },
      { id: 'v-pb-xl', productId: 'prod-powder-blue-sharara', size: 'XL', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 4, sku: 'STCH-PB-14-XL' },
      { id: 'v-pb-xxl', productId: 'prod-powder-blue-sharara', size: 'XXL', color: 'Powder Blue', colorHex: '#D3E0EA', stock: 2, sku: 'STCH-PB-14-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 22,
    createdAt: '2026-03-28T10:00:00Z'
  },
  {
    id: 'prod-dusty-mauve-anarkali',
    slug: 'the-dusty-mauve-pleated-anarkali-gown',
    name: 'The Dusty Mauve Sequined Pleated Anarkali Gown',
    sku: 'STCH-DM-15',
    shortDesc: 'Floor-sweeping dusty mauve anarkali dress with micro-pleated flared georgette and crystal-sequined bodice.',
    description: 'A modern heirloom crafted for contemporary grand occasions. Rendered in ethereal dusty mauve and soft lilac georgette, this floor-sweeping gown features a hand-embellished crystal and antique sequin bodice, structured round neckline, voluminous sunburst pleated flare, and a gossamer matching dupatta.',
    price: 8999,
    originalPrice: 12499,
    discountPercent: 28,
    fabric: 'Flowing Georgette with Butter Silk Lining & Organza Dupatta',
    careInstructions: 'Specialist dry clean only. Store hung in breathable garment bag.',
    occasion: 'Cocktail Evenings, Wedding Receptions, Sangeet Nights',
    fit: 'Fitted Embellished Bodice with Sweeping Pleated Flare',
    categoryId: 'cat-ethnic-suits',
    colors: ['Mauve', 'Dusty Rose', 'Lilac', 'Pastel Purple'],
    images: [
      {
        id: 'img-e4-1',
        url: '/images/e4.png',
        alt: 'STITCHORA Dusty Mauve & Lilac Pleated Anarkali Gown',
        isPrimary: true
      }
    ],
    variants: [
      { id: 'v-dm-xs', productId: 'prod-dusty-mauve-anarkali', size: 'XS', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 6, sku: 'STCH-DM-15-XS' },
      { id: 'v-dm-s', productId: 'prod-dusty-mauve-anarkali', size: 'S', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 10, sku: 'STCH-DM-15-S' },
      { id: 'v-dm-m', productId: 'prod-dusty-mauve-anarkali', size: 'M', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 15, sku: 'STCH-DM-15-M' },
      { id: 'v-dm-l', productId: 'prod-dusty-mauve-anarkali', size: 'L', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 8, sku: 'STCH-DM-15-L' },
      { id: 'v-dm-xl', productId: 'prod-dusty-mauve-anarkali', size: 'XL', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 5, sku: 'STCH-DM-15-XL' },
      { id: 'v-dm-xxl', productId: 'prod-dusty-mauve-anarkali', size: 'XXL', color: 'Dusty Mauve', colorHex: '#D4B2BC', stock: 3, sku: 'STCH-DM-15-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 41,
    createdAt: '2026-03-29T10:00:00Z'
  },
  {
    id: 'prod-pari-mint-angrakha-suit',
    slug: 'the-pari-mint-sage-angrakha-suit',
    name: 'The Pari Mint & Sage Chanderi Angrakha Dress',
    sku: 'STCH-MG-16',
    shortDesc: 'Refreshing mint & sage green handloom chanderi angrakha dress with antique silver gota borders.',
    description: 'Serene and poetic, this mint green angrakha silhouette is hand-tailored in handloom Chanderi silk. Features a crossover side-tie angrakha yoke, handcrafted latkans, silver zari threadwork, and an effortless flared hem with matching cigarette trousers.',
    price: 4299,
    originalPrice: 5999,
    discountPercent: 28,
    fabric: 'Handloom Chanderi Silk with Mulmul Lining',
    careInstructions: 'Dry clean or gentle hand wash in cold water.',
    occasion: 'Day Celebrations, Haldi-Mehendi, Festive Luncheons',
    fit: 'Angrakha Crossover Bodice with Flared Hem',
    categoryId: 'cat-ethnic-suits',
    colors: ['Mint Green', 'Sage Green', 'Off-White'],
    images: [
      {
        id: 'img-mint-1',
        url: '/public/images/emerald_short_kurti.jpg',
        alt: 'STITCHORA Mint Green & Sage Green Chanderi Angrakha Dress',
        isPrimary: true
      }
    ],
    variants: [
      { id: 'v-mint-xs', productId: 'prod-pari-mint-angrakha-suit', size: 'XS', color: 'Mint Green', colorHex: '#D8F3DC', stock: 4, sku: 'STCH-MG-16-XS' },
      { id: 'v-mint-s', productId: 'prod-pari-mint-angrakha-suit', size: 'S', color: 'Mint Green', colorHex: '#D8F3DC', stock: 7, sku: 'STCH-MG-16-S' },
      { id: 'v-mint-m', productId: 'prod-pari-mint-angrakha-suit', size: 'M', color: 'Mint Green', colorHex: '#D8F3DC', stock: 10, sku: 'STCH-MG-16-M' },
      { id: 'v-mint-l', productId: 'prod-pari-mint-angrakha-suit', size: 'L', color: 'Mint Green', colorHex: '#D8F3DC', stock: 6, sku: 'STCH-MG-16-L' },
      { id: 'v-mint-xl', productId: 'prod-pari-mint-angrakha-suit', size: 'XL', color: 'Mint Green', colorHex: '#D8F3DC', stock: 4, sku: 'STCH-MG-16-XL' },
      { id: 'v-mint-xxl', productId: 'prod-pari-mint-angrakha-suit', size: 'XXL', color: 'Mint Green', colorHex: '#D8F3DC', stock: 2, sku: 'STCH-MG-16-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 15,
    createdAt: '2026-03-30T10:00:00Z'
  },
  {
    id: 'prod-noor-lavender-organza-suit',
    slug: 'the-noor-lavender-silver-zari-suit',
    name: 'The Noor Lavender Silver Zari Organza Suit',
    sku: 'STCH-LV-17',
    shortDesc: 'Misted lavender pure organza silk suit with shimmering silver threadwork and scalloped dupatta.',
    description: 'Delicate and romantic, this pastel lavender ensemble pairs an ethereal pure organza kurti with silver zari booti embroidery, tailored raw silk trousers, and a hand-cut scalloped sheer dupatta.',
    price: 5199,
    originalPrice: 7200,
    discountPercent: 28,
    fabric: 'Pure Silk Organza & Shantoon',
    careInstructions: 'Dry clean only.',
    occasion: 'Festive Soirees, Engagements, Intimate Gatherings',
    fit: 'Straight Tailored Kurti with Cigarette Pants',
    categoryId: 'cat-ethnic-suits',
    colors: ['Lavender', 'Lilac', 'Light Grey'],
    images: [
      {
        id: 'img-lav-1',
        url: '/images/01.png',
        alt: 'STITCHORA Lavender & Lilac Silver Zari Organza Suit',
        isPrimary: true
      }
    ],
    variants: [
      { id: 'v-lav-xs', productId: 'prod-noor-lavender-organza-suit', size: 'XS', color: 'Lavender', colorHex: '#E8E0F0', stock: 3, sku: 'STCH-LV-17-XS' },
      { id: 'v-lav-s', productId: 'prod-noor-lavender-organza-suit', size: 'S', color: 'Lavender', colorHex: '#E8E0F0', stock: 6, sku: 'STCH-LV-17-S' },
      { id: 'v-lav-m', productId: 'prod-noor-lavender-organza-suit', size: 'M', color: 'Lavender', colorHex: '#E8E0F0', stock: 9, sku: 'STCH-LV-17-M' },
      { id: 'v-lav-l', productId: 'prod-noor-lavender-organza-suit', size: 'L', color: 'Lavender', colorHex: '#E8E0F0', stock: 5, sku: 'STCH-LV-17-L' },
      { id: 'v-lav-xl', productId: 'prod-noor-lavender-organza-suit', size: 'XL', color: 'Lavender', colorHex: '#E8E0F0', stock: 3, sku: 'STCH-LV-17-XL' },
      { id: 'v-lav-xxl', productId: 'prod-noor-lavender-organza-suit', size: 'XXL', color: 'Lavender', colorHex: '#E8E0F0', stock: 2, sku: 'STCH-LV-17-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: '2026-03-31T10:00:00Z'
  }
];

newProducts.forEach(np => {
  if (!existingIds.has(np.id)) {
    db.products.push(np);
  } else {
    const idx = db.products.findIndex(p => p.id === np.id);
    db.products[idx] = { ...db.products[idx], ...np };
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated stitchora.json with light colors and new products! Total products:', db.products.length);
