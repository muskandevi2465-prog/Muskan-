const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/stitchora.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const shortKurtiProducts = [
  {
    id: 'prod-kurti-s1-seafoam-zardozi',
    slug: 'seafoam-zardozi-scallop-tissue-kurti',
    name: 'The Seafoam Zardozi Scallop Tissue Short Kurti',
    sku: 'STCH-KT-01',
    description: 'Opulent seafoam sage green metallic tissue silk short kurti featuring ornate antique gold zardozi embroidery across the sweetheart neckline and scalloped hemline. Handcrafted for festive celebrations, paired with flared tiered sharara trousers and lightweight organza dupatta.',
    shortDesc: 'Seafoam tissue silk short kurti with antique gold zardozi sweetheart neckline and scalloped hemline.',
    price: 4899,
    originalPrice: 6500,
    discountPercent: 25,
    fabric: 'Pure Banarasi Tissue Silk & Soft Mulmul Lining',
    careInstructions: 'Dry Clean Only. Steam iron on reverse.',
    occasion: 'Festive Celebrations, Sangeet, Cocktail Evenings',
    fit: 'Fitted sweetheart bodice with scalloped waist flare',
    categoryId: 'cat-short-kurtis',
    colors: ['Mint Green', 'Sage Green', 'Ivory', 'Champagne'],
    images: [
      {
        id: 'img-s1-1',
        url: '/images/s1.png',
        alt: 'The Seafoam Zardozi Scallop Tissue Short Kurti - Model Full View',
        isPrimary: true,
        color: 'Mint Green',
        viewType: 'model'
      },
      {
        id: 'img-s1-2',
        url: '/images/s1.png',
        alt: 'The Seafoam Zardozi Scallop Tissue Short Kurti - Sweetheart Neckline Front View',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'front'
      },
      {
        id: 'img-s1-3',
        url: '/images/s1.png',
        alt: 'The Seafoam Zardozi Scallop Tissue Short Kurti - Zardozi Hemline Close-up Detail',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-s1-xs-mint', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'XS', color: 'Mint Green', colorHex: '#E2F0D9', stock: 6, sku: 'STCH-KT-01-XS-MINT' },
      { id: 'var-s1-s-mint', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'S', color: 'Mint Green', colorHex: '#E2F0D9', stock: 12, sku: 'STCH-KT-01-S-MINT' },
      { id: 'var-s1-m-mint', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'M', color: 'Mint Green', colorHex: '#E2F0D9', stock: 15, sku: 'STCH-KT-01-M-MINT' },
      { id: 'var-s1-l-mint', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'L', color: 'Mint Green', colorHex: '#E2F0D9', stock: 9, sku: 'STCH-KT-01-L-MINT' },
      { id: 'var-s1-xl-mint', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'XL', color: 'Mint Green', colorHex: '#E2F0D9', stock: 5, sku: 'STCH-KT-01-XL-MINT' },
      { id: 'var-s1-m-sage', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 10, sku: 'STCH-KT-01-M-SAGE' },
      { id: 'var-s1-m-ivory', productId: 'prod-kurti-s1-seafoam-zardozi', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 8, sku: 'STCH-KT-01-M-IVR' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-kurti-s2-midnight-pearl',
    slug: 'midnight-pearl-floral-embroidered-short-kurti',
    name: 'The Midnight Pearl Floral Embroidered Short Kurti',
    sku: 'STCH-KT-02',
    description: 'Sophisticated midnight black cotton-silk short kurti highlighted with ivory threadwork floral shoulder motifs, delicate scattered pearl butis, and a notched split round neckline. Perfect for evening gatherings and work-to-dinner transitions.',
    shortDesc: 'Midnight black short kurti with ivory floral shoulder embroidery, pearl butis, and side slits.',
    price: 3299,
    originalPrice: 4400,
    discountPercent: 25,
    fabric: 'Handloom Chanderi Cotton-Silk & Mulmul',
    careInstructions: 'Dry Clean or Gentle Cold Hand Wash.',
    occasion: 'Intimate Dinners, Art Galas, Festive Office Wear',
    fit: 'Straight silhouette with customized side slits for ease of movement',
    categoryId: 'cat-short-kurtis',
    colors: ['Black', 'Ivory', 'Cream', 'Off-White'],
    images: [
      {
        id: 'img-s2-1',
        url: '/images/s2.png',
        alt: 'The Midnight Pearl Floral Embroidered Short Kurti - Model Full View',
        isPrimary: true,
        color: 'Black',
        viewType: 'model'
      },
      {
        id: 'img-s2-2',
        url: '/images/s2.png',
        alt: 'The Midnight Pearl Floral Embroidered Short Kurti - Front Split Neckline View',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'front'
      },
      {
        id: 'img-s2-3',
        url: '/images/s2.png',
        alt: 'The Midnight Pearl Floral Embroidered Short Kurti - Shoulder Embroidery Detail',
        isPrimary: false,
        color: 'Cream',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-s2-xs-blk', productId: 'prod-kurti-s2-midnight-pearl', size: 'XS', color: 'Black', colorHex: '#1C1917', stock: 8, sku: 'STCH-KT-02-XS-BLK' },
      { id: 'var-s2-s-blk', productId: 'prod-kurti-s2-midnight-pearl', size: 'S', color: 'Black', colorHex: '#1C1917', stock: 14, sku: 'STCH-KT-02-S-BLK' },
      { id: 'var-s2-m-blk', productId: 'prod-kurti-s2-midnight-pearl', size: 'M', color: 'Black', colorHex: '#1C1917', stock: 18, sku: 'STCH-KT-02-M-BLK' },
      { id: 'var-s2-l-blk', productId: 'prod-kurti-s2-midnight-pearl', size: 'L', color: 'Black', colorHex: '#1C1917', stock: 11, sku: 'STCH-KT-02-L-BLK' },
      { id: 'var-s2-xl-blk', productId: 'prod-kurti-s2-midnight-pearl', size: 'XL', color: 'Black', colorHex: '#1C1917', stock: 6, sku: 'STCH-KT-02-XL-BLK' },
      { id: 'var-s2-m-ivr', productId: 'prod-kurti-s2-midnight-pearl', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 9, sku: 'STCH-KT-02-M-IVR' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 42,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-kurti-s3-emerald-peplum',
    slug: 'emerald-flora-gathered-peplum-short-kurti',
    name: 'The Emerald Flora Gathered Peplum Short Kurti',
    sku: 'STCH-KT-03',
    description: 'Breezy and graceful teal emerald green cambric cotton short kurti adorned with heritage botanical floral buti prints, contrast embroidered V-neck placket, and a flattering gathered peplum waist that moves effortlessly.',
    shortDesc: 'Teal emerald cambric cotton peplum kurti with floral block prints and embroidered V-neck.',
    price: 2899,
    originalPrice: 3899,
    discountPercent: 26,
    fabric: '100% Breathable Fine Cambric Cotton',
    careInstructions: 'Machine wash gentle cold with similar colors. Line dry.',
    occasion: 'Sunday Brunches, College, Work-from-Anywhere, Casual Lunches',
    fit: 'Fitted empire bodice with flattering gathered peplum flare',
    categoryId: 'cat-short-kurtis',
    colors: ['Sage Green', 'Mint Green', 'Peach', 'Cream'],
    images: [
      {
        id: 'img-s3-1',
        url: '/images/s3.png',
        alt: 'The Emerald Flora Gathered Peplum Short Kurti - Model Full View',
        isPrimary: true,
        color: 'Sage Green',
        viewType: 'model'
      },
      {
        id: 'img-s3-2',
        url: '/images/s3.png',
        alt: 'The Emerald Flora Gathered Peplum Short Kurti - Embroidered V-Neck Front View',
        isPrimary: false,
        color: 'Mint Green',
        viewType: 'front'
      },
      {
        id: 'img-s3-3',
        url: '/images/s3.png',
        alt: 'The Emerald Flora Gathered Peplum Short Kurti - Peplum Gathering Detail',
        isPrimary: false,
        color: 'Peach',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'var-s3-xs-sage', productId: 'prod-kurti-s3-emerald-peplum', size: 'XS', color: 'Sage Green', colorHex: '#D1E2C4', stock: 10, sku: 'STCH-KT-03-XS-SAGE' },
      { id: 'var-s3-s-sage', productId: 'prod-kurti-s3-emerald-peplum', size: 'S', color: 'Sage Green', colorHex: '#D1E2C4', stock: 16, sku: 'STCH-KT-03-S-SAGE' },
      { id: 'var-s3-m-sage', productId: 'prod-kurti-s3-emerald-peplum', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 22, sku: 'STCH-KT-03-M-SAGE' },
      { id: 'var-s3-l-sage', productId: 'prod-kurti-s3-emerald-peplum', size: 'L', color: 'Sage Green', colorHex: '#D1E2C4', stock: 14, sku: 'STCH-KT-03-L-SAGE' },
      { id: 'var-s3-xl-sage', productId: 'prod-kurti-s3-emerald-peplum', size: 'XL', color: 'Sage Green', colorHex: '#D1E2C4', stock: 7, sku: 'STCH-KT-03-XL-SAGE' },
      { id: 'var-s3-m-mint', productId: 'prod-kurti-s3-emerald-peplum', size: 'M', color: 'Mint Green', colorHex: '#E2F0D9', stock: 11, sku: 'STCH-KT-03-M-MINT' },
      { id: 'var-s3-m-peach', productId: 'prod-kurti-s3-emerald-peplum', size: 'M', color: 'Peach', colorHex: '#FFE5B4', stock: 9, sku: 'STCH-KT-03-M-PCH' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 35,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-kurti-s4-terracotta-bell',
    slug: 'terracotta-bell-sleeve-scallop-lace-short-kurti',
    name: 'The Terracotta Bell-Sleeve Scallop Lace Short Kurti',
    sku: 'STCH-KT-04',
    description: 'Earthy rust terracotta linen-cotton short kurti showcasing dramatic flared bell sleeves trimmed with artisanal cutwork scallop lace and matching square neckline accents. Paired with white wide trousers for a modern ethnic statement.',
    shortDesc: 'Terracotta linen-cotton short kurti with dramatic cutwork scallop bell sleeves and square neck.',
    price: 3499,
    originalPrice: 4699,
    discountPercent: 26,
    fabric: 'Pure Washed Linen-Cotton Blend & Voile Lining',
    careInstructions: 'Dry clean recommended or gentle hand wash.',
    occasion: 'Festive Lunches, Festive Evenings, Family Get-Togethers',
    fit: 'Flattering A-line tunic silhouette with statement tiered bell sleeves',
    categoryId: 'cat-short-kurtis',
    colors: ['Peach', 'Dusty Rose', 'Beige', 'Champagne'],
    images: [
      {
        id: 'img-s4-1',
        url: '/images/s4.png',
        alt: 'The Terracotta Bell-Sleeve Scallop Lace Short Kurti - Model Front View',
        isPrimary: true,
        color: 'Peach',
        viewType: 'model'
      },
      {
        id: 'img-s4-2',
        url: '/images/s4.png',
        alt: 'The Terracotta Bell-Sleeve Scallop Lace Short Kurti - Scallop Bell Sleeve Close-up',
        isPrimary: false,
        color: 'Dusty Rose',
        viewType: 'detail'
      },
      {
        id: 'img-s4-3',
        url: '/images/s6.png',
        alt: 'The Bell-Sleeve Scallop Lace Short Kurti - Jet Black Colorway Variant',
        isPrimary: false,
        color: 'Black',
        viewType: 'model'
      }
    ],
    variants: [
      { id: 'var-s4-xs-pch', productId: 'prod-kurti-s4-terracotta-bell', size: 'XS', color: 'Peach', colorHex: '#FFE5B4', stock: 7, sku: 'STCH-KT-04-XS-PCH' },
      { id: 'var-s4-s-pch', productId: 'prod-kurti-s4-terracotta-bell', size: 'S', color: 'Peach', colorHex: '#FFE5B4', stock: 12, sku: 'STCH-KT-04-S-PCH' },
      { id: 'var-s4-m-pch', productId: 'prod-kurti-s4-terracotta-bell', size: 'M', color: 'Peach', colorHex: '#FFE5B4', stock: 16, sku: 'STCH-KT-04-M-PCH' },
      { id: 'var-s4-l-pch', productId: 'prod-kurti-s4-terracotta-bell', size: 'L', color: 'Peach', colorHex: '#FFE5B4', stock: 10, sku: 'STCH-KT-04-L-PCH' },
      { id: 'var-s4-xl-pch', productId: 'prod-kurti-s4-terracotta-bell', size: 'XL', color: 'Peach', colorHex: '#FFE5B4', stock: 5, sku: 'STCH-KT-04-XL-PCH' },
      { id: 'var-s4-m-rose', productId: 'prod-kurti-s4-terracotta-bell', size: 'M', color: 'Dusty Rose', colorHex: '#DCAE96', stock: 9, sku: 'STCH-KT-04-M-ROSE' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 29,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-kurti-s5-botanical-lotus',
    slug: 'botanical-lotus-tassel-hem-short-kurti',
    name: 'The Botanical Lotus Tassel Hem Short Kurti',
    sku: 'STCH-KT-05',
    description: 'Fresh seafoam and mint botanical lotus hand-block printed short kurti featuring a square-notched neckline, elbow sleeves with delicate pearl latkan fringes, and a curved tulip hemline with hanging pompom tassels.',
    shortDesc: 'Botanical lotus hand-block short kurti with pearl latkan fringes and scalloped tulip hem.',
    price: 3199,
    originalPrice: 4299,
    discountPercent: 26,
    fabric: 'Pure Fine Voile Cotton with Pearl Tassel Latkans',
    careInstructions: 'Gentle hand wash inside out in cold water.',
    occasion: 'Garden High-Teas, Day Weddings, Mehndi Functions, Brunches',
    fit: 'Curved tulip hemline with side slits and elbow sleeves',
    categoryId: 'cat-short-kurtis',
    colors: ['Mint Green', 'Sage Green', 'Ivory', 'Butter Yellow'],
    images: [
      {
        id: 'img-s5-1',
        url: '/images/s5.png',
        alt: 'The Botanical Lotus Tassel Hem Short Kurti - Model Full View',
        isPrimary: true,
        color: 'Mint Green',
        viewType: 'model'
      },
      {
        id: 'img-s5-2',
        url: '/images/s5.png',
        alt: 'The Botanical Lotus Tassel Hem Short Kurti - Pearl Latkan & Lotus Print Detail',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'detail'
      },
      {
        id: 'img-s5-3',
        url: '/images/s5.png',
        alt: 'The Botanical Lotus Tassel Hem Short Kurti - Front Scallop Tunic View',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'front'
      }
    ],
    variants: [
      { id: 'var-s5-xs-mint', productId: 'prod-kurti-s5-botanical-lotus', size: 'XS', color: 'Mint Green', colorHex: '#E2F0D9', stock: 8, sku: 'STCH-KT-05-XS-MINT' },
      { id: 'var-s5-s-mint', productId: 'prod-kurti-s5-botanical-lotus', size: 'S', color: 'Mint Green', colorHex: '#E2F0D9', stock: 15, sku: 'STCH-KT-05-S-MINT' },
      { id: 'var-s5-m-mint', productId: 'prod-kurti-s5-botanical-lotus', size: 'M', color: 'Mint Green', colorHex: '#E2F0D9', stock: 18, sku: 'STCH-KT-05-M-MINT' },
      { id: 'var-s5-l-mint', productId: 'prod-kurti-s5-botanical-lotus', size: 'L', color: 'Mint Green', colorHex: '#E2F0D9', stock: 12, sku: 'STCH-KT-05-L-MINT' },
      { id: 'var-s5-xl-mint', productId: 'prod-kurti-s5-botanical-lotus', size: 'XL', color: 'Mint Green', colorHex: '#E2F0D9', stock: 6, sku: 'STCH-KT-05-XL-MINT' },
      { id: 'var-s5-m-sage', productId: 'prod-kurti-s5-botanical-lotus', size: 'M', color: 'Sage Green', colorHex: '#D1E2C4', stock: 10, sku: 'STCH-KT-05-M-SAGE' },
      { id: 'var-s5-m-byel', productId: 'prod-kurti-s5-botanical-lotus', size: 'M', color: 'Butter Yellow', colorHex: '#FFFDD0', stock: 8, sku: 'STCH-KT-05-M-BYEL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 47,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-kurti-s6-noir-scallop-bell',
    slug: 'noir-lace-bell-sleeve-flared-short-kurti',
    name: 'The Noir Lace Bell-Sleeve Flared Short Kurti',
    sku: 'STCH-KT-06',
    description: 'Timeless jet black tailored short kurti with an architectural square neckline, billowing flared bell sleeves, and handcrafted heirloom cutwork lace trimming the cuffs and bottom hem. Stitched with flattering darting for a structured, regal silhouette.',
    shortDesc: 'Noir jet black short kurti with architectural square neckline and cutwork lace bell sleeves.',
    price: 3699,
    originalPrice: 4999,
    discountPercent: 26,
    fabric: 'Premium Mulberry Cotton-Modal & Scalloped Cutwork Lace',
    careInstructions: 'Dry clean recommended.',
    occasion: 'Cocktail Parties, High-Fashion Ethnic Evenings, Festive Gatherings',
    fit: 'Fitted bodice with flared bell sleeves and A-line drape',
    categoryId: 'cat-short-kurtis',
    colors: ['Black', 'Ivory', 'Light Grey', 'Mauve'],
    images: [
      {
        id: 'img-s6-1',
        url: '/images/s6.png',
        alt: 'The Noir Lace Bell-Sleeve Flared Short Kurti - Model Full View',
        isPrimary: true,
        color: 'Black',
        viewType: 'model'
      },
      {
        id: 'img-s6-2',
        url: '/images/s6.png',
        alt: 'The Noir Lace Bell-Sleeve Flared Short Kurti - Cutwork Scallop Hem & Cuff Detail',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'detail'
      },
      {
        id: 'img-s6-3',
        url: '/images/s4.png',
        alt: 'The Bell-Sleeve Scallop Lace Short Kurti - Terracotta Peach Colorway Variant',
        isPrimary: false,
        color: 'Peach',
        viewType: 'model'
      }
    ],
    variants: [
      { id: 'var-s6-xs-blk', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'XS', color: 'Black', colorHex: '#1C1917', stock: 9, sku: 'STCH-KT-06-XS-BLK' },
      { id: 'var-s6-s-blk', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'S', color: 'Black', colorHex: '#1C1917', stock: 15, sku: 'STCH-KT-06-S-BLK' },
      { id: 'var-s6-m-blk', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'M', color: 'Black', colorHex: '#1C1917', stock: 20, sku: 'STCH-KT-06-M-BLK' },
      { id: 'var-s6-l-blk', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'L', color: 'Black', colorHex: '#1C1917', stock: 13, sku: 'STCH-KT-06-L-BLK' },
      { id: 'var-s6-xl-blk', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'XL', color: 'Black', colorHex: '#1C1917', stock: 7, sku: 'STCH-KT-06-XL-BLK' },
      { id: 'var-s6-m-ivr', productId: 'prod-kurti-s6-noir-scallop-bell', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 10, sku: 'STCH-KT-06-M-IVR' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 51,
    createdAt: new Date().toISOString()
  }
];

// Update or insert each short kurti product
shortKurtiProducts.forEach((newProd) => {
  const existingIdx = db.products.findIndex(p => p.id === newProd.id);
  if (existingIdx >= 0) {
    db.products[existingIdx] = { ...db.products[existingIdx], ...newProd };
  } else {
    db.products.push(newProd);
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully seeded short kurtis into stitchora.json! Total products in catalog:', db.products.length);
