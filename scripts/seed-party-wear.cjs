const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/stitchora.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const partyWearProducts = [
  {
    id: 'prod-party-p1-seafoam-zari',
    slug: 'seafoam-zari-embroidered-silk-party-suit',
    name: 'The Seafoam Zari Embroidered Silk Party Suit',
    sku: 'STCH-PW-01',
    description: 'Mint-seafoam pure Chanderi silk party wear suit lavishly adorned with antique silver zardozi neck embroidery, floral butis, scalloped hemline, and a gossamer organza dupatta. Tailored with cigarette trousers for a sharp yet graceful evening aesthetic.',
    shortDesc: 'Mint-seafoam Chanderi silk party suit with antique silver zardozi embroidery and scalloped organza dupatta.',
    price: 5499,
    originalPrice: 7299,
    discountPercent: 25,
    fabric: 'Pure Handloom Chanderi Silk & Sheer Organza',
    careInstructions: 'Dry Clean Only. Steam press on reverse.',
    occasion: 'Cocktail Receptions, Sangeet Parties, Festive Dinners',
    fit: 'Tailored straight kurti with cigarette trousers and dupatta',
    categoryId: 'cat-party-wear',
    colors: ['Mint Green', 'Sage Green', 'Ivory', 'Sky Blue'],
    images: [
      {
        id: 'img-pw1-1',
        url: '/images/p1.png',
        alt: 'The Seafoam Zari Embroidered Silk Party Suit - Full Silhouette View',
        isPrimary: true,
        color: 'Mint Green',
        viewType: 'model'
      },
      {
        id: 'img-pw1-2',
        url: '/images/p1.png',
        alt: 'The Seafoam Zari Embroidered Silk Party Suit - Silver Zardozi Neckline',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'front'
      },
      {
        id: 'img-pw1-3',
        url: '/images/p1.png',
        alt: 'The Seafoam Zari Embroidered Silk Party Suit - Scallop Hem & Dupatta Detail',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-pw1-xs-mint', productId: 'prod-party-p1-seafoam-zari', size: 'XS', color: 'Mint Green', colorHex: '#E2F0D9', stock: 6, sku: 'STCH-PW-01-XS-MINT' },
      { id: 'var-pw1-s-mint', productId: 'prod-party-p1-seafoam-zari', size: 'S', color: 'Mint Green', colorHex: '#E2F0D9', stock: 12, sku: 'STCH-PW-01-S-MINT' },
      { id: 'var-pw1-m-mint', productId: 'prod-party-p1-seafoam-zari', size: 'M', color: 'Mint Green', colorHex: '#E2F0D9', stock: 16, sku: 'STCH-PW-01-M-MINT' },
      { id: 'var-pw1-l-mint', productId: 'prod-party-p1-seafoam-zari', size: 'L', color: 'Mint Green', colorHex: '#E2F0D9', stock: 10, sku: 'STCH-PW-01-L-MINT' },
      { id: 'var-pw1-xl-mint', productId: 'prod-party-p1-seafoam-zari', size: 'XL', color: 'Mint Green', colorHex: '#E2F0D9', stock: 5, sku: 'STCH-PW-01-XL-MINT' },
      { id: 'var-pw1-m-sage', productId: 'prod-party-p1-seafoam-zari', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 9, sku: 'STCH-PW-01-M-SAGE' },
      { id: 'var-pw1-m-ivr', productId: 'prod-party-p1-seafoam-zari', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 7, sku: 'STCH-PW-01-M-IVR' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 33,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-party-p2-sage-crystal-gown',
    slug: 'sage-crystal-sequin-twilight-party-gown',
    name: 'The Sage Crystal Sequin Twilight Party Gown',
    sku: 'STCH-PW-02',
    description: 'Ethereal sage green cocktail party gown with an intricately hand-beaded crystal sequin V-neck bodice, a structured embroidered waistbelt, and a cascading flared soft tulle skirt. Designed for red-carpet gala evenings and black-tie celebrations.',
    shortDesc: 'Sage green cocktail party gown with crystal sequin V-neck bodice and cascading soft tulle flare.',
    price: 7899,
    originalPrice: 10500,
    discountPercent: 25,
    fabric: 'Crystal Embellished Silk & Soft Micro-Tulle',
    careInstructions: 'Strictly Professional Dry Clean Only.',
    occasion: 'Cocktail Galas, Reception Evenings, Red Carpet Events',
    fit: 'Fitted embellished V-bodice with grand flared silhouette',
    categoryId: 'cat-party-wear',
    colors: ['Sage Green', 'Mint Green', 'Pastel Pink', 'Champagne'],
    images: [
      {
        id: 'img-pw2-1',
        url: '/images/p2.png',
        alt: 'The Sage Crystal Sequin Twilight Party Gown - Full Length Model View',
        isPrimary: true,
        color: 'Sage Green',
        viewType: 'model'
      },
      {
        id: 'img-pw2-2',
        url: '/images/p2.png',
        alt: 'The Sage Crystal Sequin Twilight Party Gown - V-Neck Sequin Bodice Detail',
        isPrimary: false,
        color: 'Mint Green',
        viewType: 'front'
      },
      {
        id: 'img-pw2-3',
        url: '/images/p2.png',
        alt: 'The Sage Crystal Sequin Twilight Party Gown - Tulle Skirt Drape Detail',
        isPrimary: false,
        color: 'Champagne',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-pw2-xs-sage', productId: 'prod-party-p2-sage-crystal-gown', size: 'XS', color: 'Sage Green', colorHex: '#D1E2C4', stock: 5, sku: 'STCH-PW-02-XS-SAGE' },
      { id: 'var-pw2-s-sage', productId: 'prod-party-p2-sage-crystal-gown', size: 'S', color: 'Sage Green', colorHex: '#D1E2C4', stock: 10, sku: 'STCH-PW-02-S-SAGE' },
      { id: 'var-pw2-m-sage', productId: 'prod-party-p2-sage-crystal-gown', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 15, sku: 'STCH-PW-02-M-SAGE' },
      { id: 'var-pw2-l-sage', productId: 'prod-party-p2-sage-crystal-gown', size: 'L', color: 'Sage Green', colorHex: '#D1E2C4', stock: 8, sku: 'STCH-PW-02-L-SAGE' },
      { id: 'var-pw2-xl-sage', productId: 'prod-party-p2-sage-crystal-gown', size: 'XL', color: 'Sage Green', colorHex: '#D1E2C4', stock: 4, sku: 'STCH-PW-02-XL-SAGE' },
      { id: 'var-pw2-m-pink', productId: 'prod-party-p2-sage-crystal-gown', size: 'M', color: 'Pastel Pink', colorHex: '#FADADD', stock: 8, sku: 'STCH-PW-02-M-PNK' },
      { id: 'var-pw2-m-chm', productId: 'prod-party-p2-sage-crystal-gown', size: 'M', color: 'Champagne', colorHex: '#F7E7CE', stock: 6, sku: 'STCH-PW-02-M-CHM' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 48,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-party-p3-crimson-bandhani',
    slug: 'crimson-bandhani-silk-kalidar-party-anarkali',
    name: 'The Crimson Bandhani Silk Kalidar Party Anarkali',
    sku: 'STCH-PW-03',
    description: 'Regal deep crimson red Bandhani printed silk Anarkali dress highlighted with an opulent antique gold marodi embroidered waistband, wide scoop neckline, and a sweeping twirling flare with matching border dupatta.',
    shortDesc: 'Crimson red Bandhani silk kalidar Anarkali with gold marodi embroidered waistband and flare.',
    price: 6799,
    originalPrice: 8999,
    discountPercent: 24,
    fabric: 'Pure Modal Silk with Bandhani & Chiffon Dupatta',
    careInstructions: 'Dry Clean Recommended. Do not bleach.',
    occasion: 'Weddings, Sangeet Nights, Diwali Soirées, Cocktail Evenings',
    fit: 'Flared kalidar silhouette with structured embroidered waist',
    categoryId: 'cat-party-wear',
    colors: ['Dusty Rose', 'Peach', 'Beige', 'Ivory'],
    images: [
      {
        id: 'img-pw3-1',
        url: '/images/p3.png',
        alt: 'The Crimson Bandhani Silk Kalidar Party Anarkali - Full Twirling Flare Model View',
        isPrimary: true,
        color: 'Dusty Rose',
        viewType: 'model'
      },
      {
        id: 'img-pw3-2',
        url: '/images/p3.png',
        alt: 'The Crimson Bandhani Silk Kalidar Party Anarkali - Marodi Waistband Detail',
        isPrimary: false,
        color: 'Peach',
        viewType: 'front'
      },
      {
        id: 'img-pw3-3',
        url: '/images/p3.png',
        alt: 'The Crimson Bandhani Silk Kalidar Party Anarkali - Bandhani Silk Hemline Border',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-pw3-xs-rose', productId: 'prod-party-p3-crimson-bandhani', size: 'XS', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 6, sku: 'STCH-PW-03-XS-ROSE' },
      { id: 'var-pw3-s-rose', productId: 'prod-party-p3-crimson-bandhani', size: 'S', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 12, sku: 'STCH-PW-03-S-ROSE' },
      { id: 'var-pw3-m-rose', productId: 'prod-party-p3-crimson-bandhani', size: 'M', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 18, sku: 'STCH-PW-03-M-ROSE' },
      { id: 'var-pw3-l-rose', productId: 'prod-party-p3-crimson-bandhani', size: 'L', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 11, sku: 'STCH-PW-03-L-ROSE' },
      { id: 'var-pw3-xl-rose', productId: 'prod-party-p3-crimson-bandhani', size: 'XL', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 5, sku: 'STCH-PW-03-XL-ROSE' },
      { id: 'var-pw3-m-pch', productId: 'prod-party-p3-crimson-bandhani', size: 'M', color: 'Peach', colorHex: '#FFE5B4', stock: 9, sku: 'STCH-PW-03-M-PCH' },
      { id: 'var-pw3-m-ivr', productId: 'prod-party-p3-crimson-bandhani', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 7, sku: 'STCH-PW-03-M-IVR' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 41,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-party-p4-noir-cape-palazzo',
    slug: 'noir-gold-zardozi-cape-palazzo-party-ensemble',
    name: 'The Noir Gold Zardozi Cape & Palazzo Party Ensemble',
    sku: 'STCH-PW-04',
    description: 'Dramatic 3-piece modern Indo-Western party outfit featuring a geometric gold zari embroidered crop top with hanging tassel fringes, high-waisted wide palazzo bottoms, and an attached sheer floor-sweeping cape.',
    shortDesc: 'Noir black 3-piece party wear with gold zari crop top, palazzo, and sheer floor-length cape.',
    price: 6999,
    originalPrice: 9200,
    discountPercent: 24,
    fabric: 'Georgette Satin & Handloom Zari with Silk Tassels',
    careInstructions: 'Dry Clean Only. Handle embroidered tassels with care.',
    occasion: 'Cocktail Receptions, Sangeet Parties, Festive Galas',
    fit: 'Fitted embellished crop top with flared palazzos and dramatic cape',
    categoryId: 'cat-party-wear',
    colors: ['Black', 'Ivory', 'Champagne', 'Light Grey'],
    images: [
      {
        id: 'img-pw4-1',
        url: '/images/p4.png',
        alt: 'The Noir Gold Zardozi Cape & Palazzo Party Ensemble - Model Full Silhouette View',
        isPrimary: true,
        color: 'Black',
        viewType: 'model'
      },
      {
        id: 'img-pw4-2',
        url: '/images/p4.png',
        alt: 'The Noir Gold Zardozi Cape & Palazzo Party Ensemble - Zardozi Crop Top & Tassels',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'front'
      },
      {
        id: 'img-pw4-3',
        url: '/images/p4.png',
        alt: 'The Noir Gold Zardozi Cape & Palazzo Party Ensemble - Cape Border & Hemline',
        isPrimary: false,
        color: 'Champagne',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-pw4-xs-blk', productId: 'prod-party-p4-noir-cape-palazzo', size: 'XS', color: 'Black', colorHex: '#1C1917', stock: 7, sku: 'STCH-PW-04-XS-BLK' },
      { id: 'var-pw4-s-blk', productId: 'prod-party-p4-noir-cape-palazzo', size: 'S', color: 'Black', colorHex: '#1C1917', stock: 14, sku: 'STCH-PW-04-S-BLK' },
      { id: 'var-pw4-m-blk', productId: 'prod-party-p4-noir-cape-palazzo', size: 'M', color: 'Black', colorHex: '#1C1917', stock: 19, sku: 'STCH-PW-04-M-BLK' },
      { id: 'var-pw4-l-blk', productId: 'prod-party-p4-noir-cape-palazzo', size: 'L', color: 'Black', colorHex: '#1C1917', stock: 12, sku: 'STCH-PW-04-L-BLK' },
      { id: 'var-pw4-xl-blk', productId: 'prod-party-p4-noir-cape-palazzo', size: 'XL', color: 'Black', colorHex: '#1C1917', stock: 6, sku: 'STCH-PW-04-XL-BLK' },
      { id: 'var-pw4-m-chm', productId: 'prod-party-p4-noir-cape-palazzo', size: 'M', color: 'Champagne', colorHex: '#F7E7CE', stock: 8, sku: 'STCH-PW-04-M-CHM' },
      { id: 'var-pw4-m-grey', productId: 'prod-party-p4-noir-cape-palazzo', size: 'M', color: 'Light Grey', colorHex: '#D3D3D3', stock: 7, sku: 'STCH-PW-04-M-GRY' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 39,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-party-p5-peacock-mirror-gown',
    slug: 'peacock-teal-mirror-gotapatti-flared-party-gown',
    name: 'The Peacock Teal Mirror & Gotapatti Flared Party Gown',
    sku: 'STCH-PW-05',
    description: 'Magnificent peacock teal blue party wear flared gown adorned with dense scalloped mirror-work, gotapatti needlework, scattered floral butis, and a matching embellished border sheer dupatta.',
    shortDesc: 'Peacock teal flared party gown with ornate scalloped mirror-work and gotapatti dupatta.',
    price: 7499,
    originalPrice: 9999,
    discountPercent: 25,
    fabric: 'Pure Georgette Silk with Real Mirror Accents',
    careInstructions: 'Dry Clean Recommended. Handle mirror embellishments with care.',
    occasion: 'Weddings, Sangeet Nights, Grand Receptions, Cocktails',
    fit: 'Flared royal kalidar gown with scalloped dupatta drape',
    categoryId: 'cat-party-wear',
    colors: ['Sky Blue', 'Powder Blue', 'Sage Green', 'Mint Green'],
    images: [
      {
        id: 'img-pw5-1',
        url: '/images/p5.png',
        alt: 'The Peacock Teal Mirror & Gotapatti Flared Party Gown - Full Flared Silhouette Model View',
        isPrimary: true,
        color: 'Sky Blue',
        viewType: 'model'
      },
      {
        id: 'img-pw5-2',
        url: '/images/p5.png',
        alt: 'The Peacock Teal Mirror & Gotapatti Flared Party Gown - Mirror-Work Scallop Border Detail',
        isPrimary: false,
        color: 'Powder Blue',
        viewType: 'front'
      },
      {
        id: 'img-pw5-3',
        url: '/images/p5.png',
        alt: 'The Peacock Teal Mirror & Gotapatti Flared Party Gown - Dupatta Kiran Detail',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-pw5-xs-sky', productId: 'prod-party-p5-peacock-mirror-gown', size: 'XS', color: 'Sky Blue', colorHex: '#87CEEB', stock: 5, sku: 'STCH-PW-05-XS-SKY' },
      { id: 'var-pw5-s-sky', productId: 'prod-party-p5-peacock-mirror-gown', size: 'S', color: 'Sky Blue', colorHex: '#87CEEB', stock: 11, sku: 'STCH-PW-05-S-SKY' },
      { id: 'var-pw5-m-sky', productId: 'prod-party-p5-peacock-mirror-gown', size: 'M', color: 'Sky Blue', colorHex: '#87CEEB', stock: 16, sku: 'STCH-PW-05-M-SKY' },
      { id: 'var-pw5-l-sky', productId: 'prod-party-p5-peacock-mirror-gown', size: 'L', color: 'Sky Blue', colorHex: '#87CEEB', stock: 9, sku: 'STCH-PW-05-L-SKY' },
      { id: 'var-pw5-xl-sky', productId: 'prod-party-p5-peacock-mirror-gown', size: 'XL', color: 'Sky Blue', colorHex: '#87CEEB', stock: 4, sku: 'STCH-PW-05-XL-SKY' },
      { id: 'var-pw5-m-pwd', productId: 'prod-party-p5-peacock-mirror-gown', size: 'M', color: 'Powder Blue', colorHex: '#B0E0E6', stock: 7, sku: 'STCH-PW-05-M-PWD' },
      { id: 'var-pw5-m-sage', productId: 'prod-party-p5-peacock-mirror-gown', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 8, sku: 'STCH-PW-05-M-SAGE' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 36,
    createdAt: new Date().toISOString()
  }
];

partyWearProducts.forEach((newProd) => {
  const existingIdx = db.products.findIndex(p => p.id === newProd.id);
  if (existingIdx >= 0) {
    db.products[existingIdx] = { ...db.products[existingIdx], ...newProd };
  } else {
    db.products.push(newProd);
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully seeded Party Wear products into stitchora.json! Total products in catalog:', db.products.length);
