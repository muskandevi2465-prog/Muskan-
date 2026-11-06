const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/stitchora.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Update existing prod-coord-set-blush with rich colors and multiple views
const blushIndex = db.products.findIndex(p => p.id === 'prod-coord-set-blush');
if (blushIndex !== -1) {
  db.products[blushIndex].colors = ['Dusty Rose', 'Mauve', 'Pastel Pink', 'Baby Pink'];
  db.products[blushIndex].images = [
    {
      id: 'img-coord-blush-1',
      url: '/src/assets/images/stitchora_coord_set_blush_1791889230186.jpg',
      alt: 'Rose Mauve Tailored Raw Silk Co-ord Set - Model Wearing View',
      isPrimary: true,
      color: 'Dusty Rose',
      viewType: 'model'
    },
    {
      id: 'img-coord-blush-2',
      url: '/images/c2.png',
      alt: 'Rose Mauve Tailored Co-ord Set - Alternate Blush Pink Color Edition',
      isPrimary: false,
      color: 'Pastel Pink',
      viewType: 'front'
    },
    {
      id: 'img-coord-blush-3',
      url: '/images/stitchora_mauve_detail.png',
      alt: 'Rose Mauve Tailored Raw Silk Co-ord Set - Cutdana Embroidery & Lapel Detail',
      isPrimary: false,
      color: 'Dusty Rose',
      viewType: 'detail'
    }
  ];
}

const newCoordSets = [
  {
    id: 'prod-coord-set-sage-flora',
    slug: 'sage-flora-embroidered-collared-coord-set',
    name: 'The Sage Flora Embroidered Collared Co-ord Set',
    sku: 'STCH-CR-01',
    shortDesc: 'Bespoke sage green hand-block floral printed shirt tunic with wide-leg palazzo pants and artisanal buttons.',
    description: 'A masterful union of traditional Indian botanical block prints and relaxed contemporary resort tailoring. Crafted from breathable organic cotton-linen with a structured spread collar, three-quarter sleeves with floral borders, and fluid wide-leg palazzo trousers engineered for breezy elegance and effortless comfort.',
    price: 4499,
    originalPrice: 5999,
    discountPercent: 25,
    fabric: '100% Pure Fine Cambric Cotton & Linen Blend',
    careInstructions: 'Gentle machine wash with cold water. Line dry in shade. Warm iron on reverse.',
    occasion: 'Brunch Soirees, Vacation Luxe, Casual Ethnic, Day Celebrations',
    fit: 'Relaxed Collared Tunic with Wide-Leg Palazzo Pants',
    categoryId: 'cat-coord-sets',
    colors: ['Sage Green', 'Mint Green', 'Cream', 'Ivory'],
    images: [
      {
        id: 'img-c1-model',
        url: '/images/c1.png',
        alt: 'Sage Flora Embroidered Collared Co-ord Set - Full Model Wearing Shoot',
        isPrimary: true,
        color: 'Sage Green',
        viewType: 'model'
      },
      {
        id: 'img-c1-front',
        url: '/images/c1.png',
        alt: 'Sage Flora Embroidered Collared Co-ord Set - Front Shirt & Palazzo View',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'front'
      },
      {
        id: 'img-c1-detail',
        url: '/images/c1.png',
        alt: 'Sage Flora Embroidered Collared Co-ord Set - Botanical Hand-Block Print Close-Up',
        isPrimary: false,
        color: 'Sage Green',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-c1-sg-xs', productId: 'prod-coord-set-sage-flora', size: 'XS', color: 'Sage Green', colorHex: '#9CAF88', stock: 8, sku: 'STCH-CR-01-SG-XS' },
      { id: 'v-c1-sg-s', productId: 'prod-coord-set-sage-flora', size: 'S', color: 'Sage Green', colorHex: '#9CAF88', stock: 15, sku: 'STCH-CR-01-SG-S' },
      { id: 'v-c1-sg-m', productId: 'prod-coord-set-sage-flora', size: 'M', color: 'Sage Green', colorHex: '#9CAF88', stock: 18, sku: 'STCH-CR-01-SG-M' },
      { id: 'v-c1-sg-l', productId: 'prod-coord-set-sage-flora', size: 'L', color: 'Sage Green', colorHex: '#9CAF88', stock: 12, sku: 'STCH-CR-01-SG-L' },
      { id: 'v-c1-sg-xl', productId: 'prod-coord-set-sage-flora', size: 'XL', color: 'Sage Green', colorHex: '#9CAF88', stock: 6, sku: 'STCH-CR-01-SG-XL' },
      { id: 'v-c1-sg-xxl', productId: 'prod-coord-set-sage-flora', size: 'XXL', color: 'Sage Green', colorHex: '#9CAF88', stock: 4, sku: 'STCH-CR-01-SG-XXL' },
      { id: 'v-c1-mg-s', productId: 'prod-coord-set-sage-flora', size: 'S', color: 'Mint Green', colorHex: '#98D8AA', stock: 10, sku: 'STCH-CR-01-MG-S' },
      { id: 'v-c1-mg-m', productId: 'prod-coord-set-sage-flora', size: 'M', color: 'Mint Green', colorHex: '#98D8AA', stock: 14, sku: 'STCH-CR-01-MG-M' },
      { id: 'v-c1-mg-l', productId: 'prod-coord-set-sage-flora', size: 'L', color: 'Mint Green', colorHex: '#98D8AA', stock: 8, sku: 'STCH-CR-01-MG-L' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2026-03-28T10:00:00Z'
  },
  {
    id: 'prod-coord-set-blush-palm',
    slug: 'pastel-pink-palm-embroidered-coord-set',
    name: 'The Pastel Pink Palm Embroidered Co-ord Set',
    sku: 'STCH-CR-02',
    shortDesc: 'Chic blush pastel pink shirt tunic with fine resham palm tree embroidery and matching wide trousers.',
    description: 'Soft, romantic, and effortlessly poised. This pastel blush pink ensemble is handcrafted in featherlight linen silk, highlighted with exquisite tonal resham and gold thread palm tree embroidery across the tunic hem and cuffs. Paired with coordinating straight-cut palazzo trousers with subtle side slit accents.',
    price: 4799,
    originalPrice: 6499,
    discountPercent: 26,
    fabric: 'Breathable Linen Silk & Cotton Mulmul Lining',
    careInstructions: 'Professional dry clean recommended for pristine luster. Warm iron on reverse side.',
    occasion: 'Intimate Dinners, Summer High-Tea, Garden Gatherings, Festive Outings',
    fit: 'Tailored Spread Collar Shirt Tunic with Flared Trousers',
    categoryId: 'cat-coord-sets',
    colors: ['Baby Pink', 'Pastel Pink', 'Peach', 'Mauve'],
    images: [
      {
        id: 'img-c2-model',
        url: '/images/c2.png',
        alt: 'Pastel Pink Palm Embroidered Co-ord Set - Model Outdoor Garden View',
        isPrimary: true,
        color: 'Baby Pink',
        viewType: 'model'
      },
      {
        id: 'img-c2-front',
        url: '/images/c2.png',
        alt: 'Pastel Pink Palm Embroidered Co-ord Set - Front Shirt & Notched Collar',
        isPrimary: false,
        color: 'Baby Pink',
        viewType: 'front'
      },
      {
        id: 'img-c2-detail',
        url: '/images/c2.png',
        alt: 'Pastel Pink Palm Embroidered Co-ord Set - Intricate Palm Needlework Close-Up',
        isPrimary: false,
        color: 'Baby Pink',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-c2-bp-xs', productId: 'prod-coord-set-blush-palm', size: 'XS', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 6, sku: 'STCH-CR-02-BP-XS' },
      { id: 'v-c2-bp-s', productId: 'prod-coord-set-blush-palm', size: 'S', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 12, sku: 'STCH-CR-02-BP-S' },
      { id: 'v-c2-bp-m', productId: 'prod-coord-set-blush-palm', size: 'M', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 16, sku: 'STCH-CR-02-BP-M' },
      { id: 'v-c2-bp-l', productId: 'prod-coord-set-blush-palm', size: 'L', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 9, sku: 'STCH-CR-02-BP-L' },
      { id: 'v-c2-bp-xl', productId: 'prod-coord-set-blush-palm', size: 'XL', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 5, sku: 'STCH-CR-02-BP-XL' },
      { id: 'v-c2-bp-xxl', productId: 'prod-coord-set-blush-palm', size: 'XXL', color: 'Baby Pink', colorHex: '#F4C2C2', stock: 3, sku: 'STCH-CR-02-BP-XXL' },
      { id: 'v-c2-p-s', productId: 'prod-coord-set-blush-palm', size: 'S', color: 'Peach', colorHex: '#FFDAB9', stock: 8, sku: 'STCH-CR-02-P-S' },
      { id: 'v-c2-p-m', productId: 'prod-coord-set-blush-palm', size: 'M', color: 'Peach', colorHex: '#FFDAB9', stock: 11, sku: 'STCH-CR-02-P-M' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 36,
    createdAt: '2026-03-27T10:00:00Z'
  },
  {
    id: 'prod-coord-set-ivory-jaal',
    slug: 'ivory-floral-jaal-silk-coord-set',
    name: 'The Ivory Floral Jaal Silk Co-ord Set',
    sku: 'STCH-CR-04',
    shortDesc: 'Regal ivory boat-neck tunic with rich Mughal floral jaal border and matching wide palazzo trousers.',
    description: 'Capturing the serene poise of Indian court aesthetics, this pristine ivory co-ord set features an elegant round boat neckline, elbow-length sleeves, and a dense botanical border printed and hand-highlighted with floral motifs. Paired with ankle-length wide palazzo trousers tailored with an elasticated waistband and side pockets.',
    price: 4299,
    originalPrice: 5799,
    discountPercent: 26,
    fabric: 'Lustrous Modal Silk & Pure Cotton Lining',
    careInstructions: 'Dry clean only. Steam press on low heat.',
    occasion: 'Festive Puja, Family Sangeet, Art Exhibitions, Elegant Daytime Events',
    fit: 'Straight-Cut Boat Neck Tunic with Wide Palazzo Pants',
    categoryId: 'cat-coord-sets',
    colors: ['Ivory', 'Cream', 'Off-White', 'Beige'],
    images: [
      {
        id: 'img-c3-model',
        url: '/images/c3.png',
        alt: 'Ivory Floral Jaal Silk Co-ord Set - Model Wearing Portrait View',
        isPrimary: true,
        color: 'Ivory',
        viewType: 'model'
      },
      {
        id: 'img-c3-front',
        url: '/images/c3.png',
        alt: 'Ivory Floral Jaal Silk Co-ord Set - Front Tunic and Palazzo Hemline',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'front'
      },
      {
        id: 'img-c3-detail',
        url: '/images/c3.png',
        alt: 'Ivory Floral Jaal Silk Co-ord Set - Mughal Border Botanical Needlework Close-Up',
        isPrimary: false,
        color: 'Ivory',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-c3-iv-xs', productId: 'prod-coord-set-ivory-jaal', size: 'XS', color: 'Ivory', colorHex: '#FFFFF0', stock: 7, sku: 'STCH-CR-04-IV-XS' },
      { id: 'v-c3-iv-s', productId: 'prod-coord-set-ivory-jaal', size: 'S', color: 'Ivory', colorHex: '#FFFFF0', stock: 14, sku: 'STCH-CR-04-IV-S' },
      { id: 'v-c3-iv-m', productId: 'prod-coord-set-ivory-jaal', size: 'M', color: 'Ivory', colorHex: '#FFFFF0', stock: 20, sku: 'STCH-CR-04-IV-M' },
      { id: 'v-c3-iv-l', productId: 'prod-coord-set-ivory-jaal', size: 'L', color: 'Ivory', colorHex: '#FFFFF0', stock: 11, sku: 'STCH-CR-04-IV-L' },
      { id: 'v-c3-iv-xl', productId: 'prod-coord-set-ivory-jaal', size: 'XL', color: 'Ivory', colorHex: '#FFFFF0', stock: 5, sku: 'STCH-CR-04-IV-XL' },
      { id: 'v-c3-iv-xxl', productId: 'prod-coord-set-ivory-jaal', size: 'XXL', color: 'Ivory', colorHex: '#FFFFF0', stock: 4, sku: 'STCH-CR-04-IV-XXL' },
      { id: 'v-c3-cr-s', productId: 'prod-coord-set-ivory-jaal', size: 'S', color: 'Cream', colorHex: '#FFFDD0', stock: 9, sku: 'STCH-CR-04-CR-S' },
      { id: 'v-c3-cr-m', productId: 'prod-coord-set-ivory-jaal', size: 'M', color: 'Cream', colorHex: '#FFFDD0', stock: 12, sku: 'STCH-CR-04-CR-M' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 51,
    createdAt: '2026-03-26T10:00:00Z'
  },
  {
    id: 'prod-coord-set-peacock-teal',
    slug: 'peacock-teal-ikat-tassel-coord-set',
    name: 'The Peacock Teal & Ikat Tassel Co-ord Set',
    sku: 'STCH-CR-05',
    shortDesc: 'Striking peacock teal shirt tunic with heirloom scallop lace tassels paired with printed ikat palazzo pants.',
    description: 'A vibrant celebratory statement. This 2-piece ethnic co-ord set features an open revere collar shirt in rich peacock jewel teal, detailed with handcrafted ivory scallop lace and hanging crochet tassels along the hemline and sleeve cuffs. Complemented by contrast ivory and teal ikat printed palazzo pants with deep pockets.',
    price: 4699,
    originalPrice: 6299,
    discountPercent: 25,
    fabric: 'Chanderi Cotton-Silk Tunic & Handloom Ikat Cotton-Silk Pants',
    careInstructions: 'Dry clean first cycle. Subsequent gentle hand wash in cold water.',
    occasion: 'Mehendi Functions, Destination Weddings, Festive Brunches, Evening Soirees',
    fit: 'Notch Collar Tunic with Tassel Scallop Hem & Relaxed Ikat Pants',
    categoryId: 'cat-coord-sets',
    colors: ['Sky Blue', 'Powder Blue', 'Sage Green', 'Cream'],
    images: [
      {
        id: 'img-c4-model',
        url: '/images/c4.png',
        alt: 'Peacock Teal & Ikat Tassel Co-ord Set - Model Outdoor Architectural Shoot',
        isPrimary: true,
        color: 'Sky Blue',
        viewType: 'model'
      },
      {
        id: 'img-c4-front',
        url: '/images/c4.png',
        alt: 'Peacock Teal & Ikat Tassel Co-ord Set - Front Notch Collar and Ikat Bottoms',
        isPrimary: false,
        color: 'Sky Blue',
        viewType: 'front'
      },
      {
        id: 'img-c4-detail',
        url: '/images/c4.png',
        alt: 'Peacock Teal & Ikat Tassel Co-ord Set - Scallop Lace Tassels Close-Up Detail',
        isPrimary: false,
        color: 'Sky Blue',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-c4-sb-xs', productId: 'prod-coord-set-peacock-teal', size: 'XS', color: 'Sky Blue', colorHex: '#87CEEB', stock: 5, sku: 'STCH-CR-05-SB-XS' },
      { id: 'v-c4-sb-s', productId: 'prod-coord-set-peacock-teal', size: 'S', color: 'Sky Blue', colorHex: '#87CEEB', stock: 11, sku: 'STCH-CR-05-SB-S' },
      { id: 'v-c4-sb-m', productId: 'prod-coord-set-peacock-teal', size: 'M', color: 'Sky Blue', colorHex: '#87CEEB', stock: 15, sku: 'STCH-CR-05-SB-M' },
      { id: 'v-c4-sb-l', productId: 'prod-coord-set-peacock-teal', size: 'L', color: 'Sky Blue', colorHex: '#87CEEB', stock: 8, sku: 'STCH-CR-05-SB-L' },
      { id: 'v-c4-sb-xl', productId: 'prod-coord-set-peacock-teal', size: 'XL', color: 'Sky Blue', colorHex: '#87CEEB', stock: 4, sku: 'STCH-CR-05-SB-XL' },
      { id: 'v-c4-pb-s', productId: 'prod-coord-set-peacock-teal', size: 'S', color: 'Powder Blue', colorHex: '#B0E0E6', stock: 7, sku: 'STCH-CR-05-PB-S' },
      { id: 'v-c4-pb-m', productId: 'prod-coord-set-peacock-teal', size: 'M', color: 'Powder Blue', colorHex: '#B0E0E6', stock: 10, sku: 'STCH-CR-05-PB-M' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2026-03-25T10:00:00Z'
  },
  {
    id: 'prod-coord-set-mochaccino-patchwork',
    slug: 'mochaccino-patchwork-kalamkari-coord-set',
    name: 'The Mochaccino Patchwork Kalamkari Co-ord Set',
    sku: 'STCH-CR-06',
    shortDesc: 'Artisanal earthy mochaccino short-sleeve shirt tunic with heritage patchwork Kalamkari prints and wide trousers.',
    description: 'Grounding timeless Indian handcraft in modern everyday luxury. Rendered in rich earthy mocha and biscuit beige tones, this co-ord set showcases geometric patchwork grids of traditional Kalamkari motifs. Features a tailored camp collar, concealed button placket, and breezy wide-leg trousers with an elasticated drawstring waist.',
    price: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    fabric: 'Natural Hand-Block Cotton on Breathable Mochaccino Linen',
    careInstructions: 'Machine wash cold inside out with like colors. Tumble dry low.',
    occasion: 'Travel Chic, Creative Workspaces, Weekend Brunches, Casual Dinners',
    fit: 'Camp Collar Shirt with Relaxed Wide-Leg Trousers',
    categoryId: 'cat-coord-sets',
    colors: ['Beige', 'Champagne', 'Light Grey', 'Mauve'],
    images: [
      {
        id: 'img-c5-model',
        url: '/images/c5.png',
        alt: 'Mochaccino Patchwork Kalamkari Co-ord Set - Full Model Wearing Shoot',
        isPrimary: true,
        color: 'Beige',
        viewType: 'model'
      },
      {
        id: 'img-c5-front',
        url: '/images/c5.png',
        alt: 'Mochaccino Patchwork Kalamkari Co-ord Set - Camp Collar and Placket View',
        isPrimary: false,
        color: 'Beige',
        viewType: 'front'
      },
      {
        id: 'img-c5-detail',
        url: '/images/c5.png',
        alt: 'Mochaccino Patchwork Kalamkari Co-ord Set - Kalamkari Block Motif Close-Up',
        isPrimary: false,
        color: 'Beige',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-c5-bg-xs', productId: 'prod-coord-set-mochaccino-patchwork', size: 'XS', color: 'Beige', colorHex: '#F5F5DC', stock: 6, sku: 'STCH-CR-06-BG-XS' },
      { id: 'v-c5-bg-s', productId: 'prod-coord-set-mochaccino-patchwork', size: 'S', color: 'Beige', colorHex: '#F5F5DC', stock: 12, sku: 'STCH-CR-06-BG-S' },
      { id: 'v-c5-bg-m', productId: 'prod-coord-set-mochaccino-patchwork', size: 'M', color: 'Beige', colorHex: '#F5F5DC', stock: 18, sku: 'STCH-CR-06-BG-M' },
      { id: 'v-c5-bg-l', productId: 'prod-coord-set-mochaccino-patchwork', size: 'L', color: 'Beige', colorHex: '#F5F5DC', stock: 10, sku: 'STCH-CR-06-BG-L' },
      { id: 'v-c5-bg-xl', productId: 'prod-coord-set-mochaccino-patchwork', size: 'XL', color: 'Beige', colorHex: '#F5F5DC', stock: 6, sku: 'STCH-CR-06-BG-XL' },
      { id: 'v-c5-ch-s', productId: 'prod-coord-set-mochaccino-patchwork', size: 'S', color: 'Champagne', colorHex: '#F7E7CE', stock: 8, sku: 'STCH-CR-06-CH-S' },
      { id: 'v-c5-ch-m', productId: 'prod-coord-set-mochaccino-patchwork', size: 'M', color: 'Champagne', colorHex: '#F7E7CE', stock: 14, sku: 'STCH-CR-06-CH-M' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 31,
    createdAt: '2026-03-24T10:00:00Z'
  },
  {
    id: 'prod-coord-set-emerald-lotus',
    slug: 'emerald-lotus-scallop-hem-tassel-coord-set',
    name: 'The Emerald Lotus Scallop Hem Tassel Co-ord Set',
    sku: 'STCH-CR-07',
    shortDesc: 'Regal emerald seafoam kurti tunic with scalloped lotus borders and delicate pearl latkans paired with tulip trousers.',
    description: 'Exuding serene festive sophistication, this emerald seafoam co-ord set features a tailored tunic kurti trimmed with hand-cut scalloped organza borders and hanging pearl latkan tassels. Accompanied by coordinating pleated tulip trousers for an elevated Indo-Western festive statement.',
    price: 4899,
    originalPrice: 6599,
    discountPercent: 26,
    fabric: 'Pure Chanderi Silk with Organza Scallop Trims',
    careInstructions: 'Dry clean only. Store in muslin cloth with silica gel.',
    occasion: 'Sangeet Brunch, Housewarmings, Festive Gatherings, Eid Soirees',
    fit: 'Scalloped A-Line Tunic with Pleated Tulip Bottoms',
    categoryId: 'cat-coord-sets',
    colors: ['Mint Green', 'Sage Green', 'Ivory'],
    images: [
      {
        id: 'img-s5-model',
        url: '/images/s5.png',
        alt: 'Emerald Lotus Scallop Hem Tassel Co-ord Set - Model Wearing View',
        isPrimary: true,
        color: 'Mint Green',
        viewType: 'model'
      },
      {
        id: 'img-s5-front',
        url: '/images/s5.png',
        alt: 'Emerald Lotus Scallop Hem Tassel Co-ord Set - Front Scallop Hemline',
        isPrimary: false,
        color: 'Mint Green',
        viewType: 'front'
      },
      {
        id: 'img-s5-detail',
        url: '/images/s5.png',
        alt: 'Emerald Lotus Scallop Hem Tassel Co-ord Set - Pearl Latkan Tassels Detail',
        isPrimary: false,
        color: 'Mint Green',
        viewType: 'detail'
      }
    ],
    variants: [
      { id: 'v-s5-mg-xs', productId: 'prod-coord-set-emerald-lotus', size: 'XS', color: 'Mint Green', colorHex: '#98D8AA', stock: 5, sku: 'STCH-CR-07-MG-XS' },
      { id: 'v-s5-mg-s', productId: 'prod-coord-set-emerald-lotus', size: 'S', color: 'Mint Green', colorHex: '#98D8AA', stock: 12, sku: 'STCH-CR-07-MG-S' },
      { id: 'v-s5-mg-m', productId: 'prod-coord-set-emerald-lotus', size: 'M', color: 'Mint Green', colorHex: '#98D8AA', stock: 16, sku: 'STCH-CR-07-MG-M' },
      { id: 'v-s5-mg-l', productId: 'prod-coord-set-emerald-lotus', size: 'L', color: 'Mint Green', colorHex: '#98D8AA', stock: 9, sku: 'STCH-CR-07-MG-L' },
      { id: 'v-s5-mg-xl', productId: 'prod-coord-set-emerald-lotus', size: 'XL', color: 'Mint Green', colorHex: '#98D8AA', stock: 4, sku: 'STCH-CR-07-MG-XL' },
      { id: 'v-s5-sg-s', productId: 'prod-coord-set-emerald-lotus', size: 'S', color: 'Sage Green', colorHex: '#9CAF88', stock: 8, sku: 'STCH-CR-07-SG-S' },
      { id: 'v-s5-sg-m', productId: 'prod-coord-set-emerald-lotus', size: 'M', color: 'Sage Green', colorHex: '#9CAF88', stock: 10, sku: 'STCH-CR-07-SG-M' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 45,
    createdAt: '2026-03-29T10:00:00Z'
  }
];

// Add each product if it doesn't already exist
newCoordSets.forEach((set) => {
  const existingIdx = db.products.findIndex(p => p.id === set.id);
  if (existingIdx !== -1) {
    db.products[existingIdx] = { ...db.products[existingIdx], ...set };
  } else {
    db.products.push(set);
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully seeded co-ord sets. Total products now:', db.products.length);
console.log('Co-ord sets count:', db.products.filter(p => p.categoryId === 'cat-coord-sets').length);
