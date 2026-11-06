const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'stitchora.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newArrivalProducts = [
  {
    id: 'prod-na-1-sapphire-foil-anarkali',
    slug: 'the-neelambari-sapphire-foil-zari-anarkali-gown',
    name: 'The Neelambari Sapphire Foil Zari Anarkali Gown',
    sku: 'STCH-NA-01',
    shortDesc: 'Royal sapphire blue Chanderi silk flared Anarkali gown with dense antique gold foil and woven zari.',
    description: 'Inspired by royal Jodhpur palace architecture, this royal sapphire blue Anarkali gown is crafted in luminous Chanderi silk with rich gold foil stamping, dense floral jaal, and an ornate hemline border with pure butter crepe lining.',
    price: 8299,
    originalPrice: 11200,
    discountPercent: 26,
    fabric: 'Pure Chanderi Silk with Butter Crepe Lining',
    careInstructions: 'Professional dry clean only. Steam press on reverse.',
    occasion: 'Weddings, Sangeet Night, Diwali Galas, Royal Receptions',
    fit: 'Fitted Sweetheart Bodice with 5-Meter Kalidar Anarkali Flare',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-na-1-1',
        url: '/images/na1.png',
        alt: 'The Neelambari Sapphire Foil Zari Anarkali Gown - Full View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Royal Blue'
      },
      {
        id: 'img-na-1-2',
        url: '/images/na1.png',
        alt: 'The Neelambari Anarkali - Foil Zari Detail',
        isPrimary: false,
        viewType: 'Foil Zari Detail',
        color: 'Royal Blue'
      },
      {
        id: 'img-na-1-3',
        url: '/images/na1.png',
        alt: 'The Neelambari Anarkali - Hemline Flare',
        isPrimary: false,
        viewType: 'Hemline Flare',
        color: 'Royal Blue'
      }
    ],
    variants: [
      { id: 'v-na-1-xs', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'XS', color: 'Royal Blue', colorHex: '#1B365D', stock: 5, sku: 'STCH-NA-01-XS' },
      { id: 'v-na-1-s', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'S', color: 'Royal Blue', colorHex: '#1B365D', stock: 8, sku: 'STCH-NA-01-S' },
      { id: 'v-na-1-m', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'M', color: 'Royal Blue', colorHex: '#1B365D', stock: 12, sku: 'STCH-NA-01-M' },
      { id: 'v-na-1-l', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'L', color: 'Royal Blue', colorHex: '#1B365D', stock: 7, sku: 'STCH-NA-01-L' },
      { id: 'v-na-1-xl', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'XL', color: 'Royal Blue', colorHex: '#1B365D', stock: 5, sku: 'STCH-NA-01-XL' },
      { id: 'v-na-1-xxl', productId: 'prod-na-1-sapphire-foil-anarkali', size: 'XXL', color: 'Royal Blue', colorHex: '#1B365D', stock: 3, sku: 'STCH-NA-01-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: new Date().toISOString(),
    colors: ['Royal Blue', 'Navy Blue', 'Sapphire', 'Gold']
  },
  {
    id: 'prod-na-2-emerald-gold-kalidar',
    slug: 'the-vrinda-emerald-gold-buti-kalidar-gown',
    name: 'The Vrinda Emerald Gold Buti Kalidar Gown',
    sku: 'STCH-NA-02',
    shortDesc: 'Deep emerald green flared kalidar gown studded with golden butis and broad Banarasi gold zari border.',
    description: 'Tailored in rich emerald raw silk, this pleated kalidar gown features dense golden buti foil dots, structured square neckline with red selvedge piping, and a majestic broad Banarasi border along the twirling hemline.',
    price: 8799,
    originalPrice: 11999,
    discountPercent: 27,
    fabric: 'Handloom Raw Silk & Woven Banarasi Zari with Shantoon Lining',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Diwali Puja, Mehendi Soiree, Sangeet Night',
    fit: 'Knife-Pleated Kalidar Silhouette with Empire Waist',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-na-2-1',
        url: '/images/na2.png',
        alt: 'The Vrinda Emerald Gold Buti Kalidar Gown - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Emerald Green'
      },
      {
        id: 'img-na-2-2',
        url: '/images/na2.png',
        alt: 'The Vrinda Emerald Gown - Golden Butis Detail',
        isPrimary: false,
        viewType: 'Golden Butis Detail',
        color: 'Emerald Green'
      },
      {
        id: 'img-na-2-3',
        url: '/images/na2.png',
        alt: 'The Vrinda Emerald Gown - Banarasi Zari Border',
        isPrimary: false,
        viewType: 'Zari Border Detail',
        color: 'Emerald Green'
      }
    ],
    variants: [
      { id: 'v-na-2-xs', productId: 'prod-na-2-emerald-gold-kalidar', size: 'XS', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 4, sku: 'STCH-NA-02-XS' },
      { id: 'v-na-2-s', productId: 'prod-na-2-emerald-gold-kalidar', size: 'S', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 7, sku: 'STCH-NA-02-S' },
      { id: 'v-na-2-m', productId: 'prod-na-2-emerald-gold-kalidar', size: 'M', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 11, sku: 'STCH-NA-02-M' },
      { id: 'v-na-2-l', productId: 'prod-na-2-emerald-gold-kalidar', size: 'L', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 8, sku: 'STCH-NA-02-L' },
      { id: 'v-na-2-xl', productId: 'prod-na-2-emerald-gold-kalidar', size: 'XL', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 5, sku: 'STCH-NA-02-XL' },
      { id: 'v-na-2-xxl', productId: 'prod-na-2-emerald-gold-kalidar', size: 'XXL', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 3, sku: 'STCH-NA-02-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: new Date().toISOString(),
    colors: ['Emerald Green', 'Forest Green', 'Olive', 'Gold']
  },
  {
    id: 'prod-na-3-bandhani-patchwork-gown',
    slug: 'the-noorani-bandhani-patchwork-flared-gown',
    name: 'The Noorani Bandhani Patchwork Flared Gown',
    sku: 'STCH-NA-03',
    shortDesc: 'Multi-color Bandhani patchwork sleeveless gown with radiant magenta-pink sheer organza dupatta.',
    description: 'A celebration of vibrant Indian textiles, combining mustard yellow, scarlet, and magenta Bandhani patchwork kalis in soft modal silk, accompanied by a flowing sheer dupatta finished with antique gold kiran lace borders.',
    price: 7499,
    originalPrice: 9999,
    discountPercent: 25,
    fabric: 'Pure Modal Silk & Sheer Organza with Cotton Mulmul Lining',
    careInstructions: 'Professional dry clean only. Steam press.',
    occasion: 'Haldi, Mehendi, Festive Luncheons, Sangeet',
    fit: 'Sleeveless Flared Kalidar Gown with Gossamer Dupatta',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-na-3-1',
        url: '/images/na3.png',
        alt: 'The Noorani Bandhani Patchwork Flared Gown - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Pastel Pink'
      },
      {
        id: 'img-na-3-2',
        url: '/images/na3.png',
        alt: 'The Noorani Gown - Bandhani Patchwork Detail',
        isPrimary: false,
        viewType: 'Bandhani Prints Detail',
        color: 'Pastel Pink'
      },
      {
        id: 'img-na-3-3',
        url: '/images/na3.png',
        alt: 'The Noorani Gown - Dupatta Kiran Lace',
        isPrimary: false,
        viewType: 'Dupatta Kiran Detail',
        color: 'Pastel Pink'
      }
    ],
    variants: [
      { id: 'v-na-3-xs', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'XS', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 5, sku: 'STCH-NA-03-XS' },
      { id: 'v-na-3-s', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'S', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 8, sku: 'STCH-NA-03-S' },
      { id: 'v-na-3-m', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'M', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 10, sku: 'STCH-NA-03-M' },
      { id: 'v-na-3-l', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'L', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 6, sku: 'STCH-NA-03-L' },
      { id: 'v-na-3-xl', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'XL', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 4, sku: 'STCH-NA-03-XL' },
      { id: 'v-na-3-xxl', productId: 'prod-na-3-bandhani-patchwork-gown', size: 'XXL', color: 'Pastel Pink', colorHex: '#FAD2E1', stock: 2, sku: 'STCH-NA-03-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 16,
    createdAt: new Date().toISOString(),
    colors: ['Pastel Pink', 'Dusty Rose', 'Peach', 'Gold']
  },
  {
    id: 'prod-na-4-crimson-elephant-anarkali',
    slug: 'the-padmavati-crimson-elephant-border-anarkali',
    name: 'The Padmavati Crimson Elephant Border Anarkali',
    sku: 'STCH-NA-04',
    shortDesc: 'Deep crimson maroon georgette Anarkali gown with royal elephant gotapatti embroidery along scalloped hem.',
    description: 'Echoing royal procession tapestries, this deep crimson maroon Anarkali is enriched with heritage gotapatti elephant and temple border needlework, a square neckline, and a diaphanous scalloped net dupatta.',
    price: 9499,
    originalPrice: 12999,
    discountPercent: 27,
    fabric: 'Pure Micro-Georgette & Antique Zari Gotapatti with Butter Crepe Lining',
    careInstructions: 'Professional dry clean only. Preserve in muslin wrap.',
    occasion: 'Weddings, Reception, Karwa Chauth, Grand Festive Gatherings',
    fit: 'Fitted Sweetheart Bodice with 6-Meter Royal Kalidar Flare',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-na-4-1',
        url: '/images/na4.png',
        alt: 'The Padmavati Crimson Elephant Anarkali - Full View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Crimson Red'
      },
      {
        id: 'img-na-4-2',
        url: '/images/na4.png',
        alt: 'The Padmavati Anarkali - Elephant Gotapatti Hem',
        isPrimary: false,
        viewType: 'Elephant Motif Detail',
        color: 'Crimson Red'
      },
      {
        id: 'img-na-4-3',
        url: '/images/na4.png',
        alt: 'The Padmavati Anarkali - Scalloped Dupatta',
        isPrimary: false,
        viewType: 'Scalloped Hem Detail',
        color: 'Crimson Red'
      }
    ],
    variants: [
      { id: 'v-na-4-xs', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'XS', color: 'Crimson Red', colorHex: '#960018', stock: 4, sku: 'STCH-NA-04-XS' },
      { id: 'v-na-4-s', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'S', color: 'Crimson Red', colorHex: '#960018', stock: 7, sku: 'STCH-NA-04-S' },
      { id: 'v-na-4-m', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'M', color: 'Crimson Red', colorHex: '#960018', stock: 12, sku: 'STCH-NA-04-M' },
      { id: 'v-na-4-l', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'L', color: 'Crimson Red', colorHex: '#960018', stock: 9, sku: 'STCH-NA-04-L' },
      { id: 'v-na-4-xl', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'XL', color: 'Crimson Red', colorHex: '#960018', stock: 5, sku: 'STCH-NA-04-XL' },
      { id: 'v-na-4-xxl', productId: 'prod-na-4-crimson-elephant-anarkali', size: 'XXL', color: 'Crimson Red', colorHex: '#960018', stock: 3, sku: 'STCH-NA-04-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 34,
    createdAt: new Date().toISOString(),
    colors: ['Crimson Red', 'Burgundy', 'Wine', 'Deep Crimson']
  },
  {
    id: 'prod-na-5-mint-sage-jacket-palazzo',
    slug: 'the-gulnaz-mint-sage-embroidered-jacket-palazzo-set',
    name: 'The Gulnaz Mint Sage Embroidered Jacket & Palazzo Set',
    sku: 'STCH-NA-05',
    shortDesc: 'Ethereal mint sage green open-front sheer embroidered jacket with silver zardozi and wide-leg palazzos.',
    description: 'A contemporary cocktail showstopper pairing a floor-sweeping sheer georgette jacket adorned with silver bullion wire embroidery and a mandarin collar, paired over fluid wide-leg silk palazzos.',
    price: 6899,
    originalPrice: 9200,
    discountPercent: 25,
    fabric: 'Sheer Silk Georgette & Shantoon with Handloom Silver Zari',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Cocktails, Day Weddings, Sangeet Night, Receptions',
    fit: 'Floor-Length Open Jacket with Relaxed Palazzo Bottoms',
    categoryId: 'cat-party-wear',
    images: [
      {
        id: 'img-na-5-1',
        url: '/images/na5.png',
        alt: 'The Gulnaz Mint Sage Embroidered Jacket Set - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Mint Green'
      },
      {
        id: 'img-na-5-2',
        url: '/images/na5.png',
        alt: 'The Gulnaz Set - Silver Zardozi Jacket Detail',
        isPrimary: false,
        viewType: 'Zardozi Jacket Detail',
        color: 'Mint Green'
      },
      {
        id: 'img-na-5-3',
        url: '/images/na5.png',
        alt: 'The Gulnaz Set - Flared Palazzos Movement',
        isPrimary: false,
        viewType: 'Wide Palazzos Detail',
        color: 'Mint Green'
      }
    ],
    variants: [
      { id: 'v-na-5-xs', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'XS', color: 'Mint Green', colorHex: '#D8F3DC', stock: 4, sku: 'STCH-NA-05-XS' },
      { id: 'v-na-5-s', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'S', color: 'Mint Green', colorHex: '#D8F3DC', stock: 6, sku: 'STCH-NA-05-S' },
      { id: 'v-na-5-m', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'M', color: 'Mint Green', colorHex: '#D8F3DC', stock: 10, sku: 'STCH-NA-05-M' },
      { id: 'v-na-5-l', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'L', color: 'Mint Green', colorHex: '#D8F3DC', stock: 7, sku: 'STCH-NA-05-L' },
      { id: 'v-na-5-xl', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'XL', color: 'Mint Green', colorHex: '#D8F3DC', stock: 4, sku: 'STCH-NA-05-XL' },
      { id: 'v-na-5-xxl', productId: 'prod-na-5-mint-sage-jacket-palazzo', size: 'XXL', color: 'Mint Green', colorHex: '#D8F3DC', stock: 2, sku: 'STCH-NA-05-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 20,
    createdAt: new Date().toISOString(),
    colors: ['Mint Green', 'Sage Green', 'Powder Blue', 'Ivory']
  },
  {
    id: 'prod-na-6-noir-chevron-jacket-coord',
    slug: 'the-zoya-noir-chevron-jacket-coord-set',
    name: 'The Zoya Noir & Chevron Jacket Co-ord Set',
    sku: 'STCH-NA-06',
    shortDesc: 'Modern Indo-Western 2-piece set with a noir slip gown and metallic bronze chevron cropped blazer.',
    description: 'Redefining cocktail power-glamour, this set features an ankle-skimming minimalist black silk gown paired with an architectural cropped jacket woven with geometric metallic bronze chevron jacquard.',
    price: 5999,
    originalPrice: 7999,
    discountPercent: 25,
    fabric: 'Metallic Brocade Jacquard & Premium Modal Satin',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Cocktails, Black-Tie Receptions, Evening Dinners',
    fit: 'Tailored Cropped Jacket over Ankle-Length Slip Gown',
    categoryId: 'cat-coord-sets',
    images: [
      {
        id: 'img-na-6-1',
        url: '/images/na6.png',
        alt: 'The Zoya Noir & Chevron Jacket Co-ord Set - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Black'
      },
      {
        id: 'img-na-6-2',
        url: '/images/na6.png',
        alt: 'The Zoya Set - Chevron Jacquard Jacket Detail',
        isPrimary: false,
        viewType: 'Chevron Jacket Detail',
        color: 'Black'
      },
      {
        id: 'img-na-6-3',
        url: '/images/na6.png',
        alt: 'The Zoya Set - Flared Inner Slip Gown',
        isPrimary: false,
        viewType: 'Flared Inner Detail',
        color: 'Black'
      }
    ],
    variants: [
      { id: 'v-na-6-xs', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'XS', color: 'Black', colorHex: '#1F1A17', stock: 5, sku: 'STCH-NA-06-XS' },
      { id: 'v-na-6-s', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'S', color: 'Black', colorHex: '#1F1A17', stock: 8, sku: 'STCH-NA-06-S' },
      { id: 'v-na-6-m', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'M', color: 'Black', colorHex: '#1F1A17', stock: 12, sku: 'STCH-NA-06-M' },
      { id: 'v-na-6-l', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'L', color: 'Black', colorHex: '#1F1A17', stock: 6, sku: 'STCH-NA-06-L' },
      { id: 'v-na-6-xl', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'XL', color: 'Black', colorHex: '#1F1A17', stock: 4, sku: 'STCH-NA-06-XL' },
      { id: 'v-na-6-xxl', productId: 'prod-na-6-noir-chevron-jacket-coord', size: 'XXL', color: 'Black', colorHex: '#1F1A17', stock: 3, sku: 'STCH-NA-06-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 25,
    createdAt: new Date().toISOString(),
    colors: ['Black', 'Champagne', 'Bronze Gold', 'Light Grey']
  },
  {
    id: 'prod-na-7-burgundy-bishop-kurti',
    slug: 'the-mehrunissa-burgundy-bishop-sleeve-kurti-gown',
    name: 'The Mehrunissa Burgundy Bishop Sleeve Kurti Gown',
    sku: 'STCH-NA-07',
    shortDesc: 'Deep wine burgundy flared kurti dress with silver resham needlework yoke and sheer bishop sleeves.',
    description: 'An artisanal festive kurti gown crafted in fluid wine burgundy georgette with an intricately embroidered silver thread and micro-sequin bib yoke, delicate waist tucks, and romantic sheer gathered bishop sleeves.',
    price: 4799,
    originalPrice: 6499,
    discountPercent: 26,
    fabric: 'Viscose Georgette & Silver Resham with Shantoon Lining',
    careInstructions: 'Dry clean only. Gentle steam press on reverse.',
    occasion: 'Festive Dinners, Family Celebrations, Puja, Intimate Soirees',
    fit: 'Fitted Yoke Bodice with Pleated Flared Skirt and Bishop Sleeves',
    categoryId: 'cat-short-kurtis',
    images: [
      {
        id: 'img-na-7-1',
        url: '/images/na7.png',
        alt: 'The Mehrunissa Burgundy Bishop Sleeve Kurti - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Burgundy'
      },
      {
        id: 'img-na-7-2',
        url: '/images/na7.png',
        alt: 'The Mehrunissa Kurti - Resham Yoke Detail',
        isPrimary: false,
        viewType: 'Resham Yoke Detail',
        color: 'Burgundy'
      },
      {
        id: 'img-na-7-3',
        url: '/images/na7.png',
        alt: 'The Mehrunissa Kurti - Gathered Bishop Sleeves',
        isPrimary: false,
        viewType: 'Bishop Sleeves Detail',
        color: 'Burgundy'
      }
    ],
    variants: [
      { id: 'v-na-7-xs', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'XS', color: 'Burgundy', colorHex: '#4A1521', stock: 6, sku: 'STCH-NA-07-XS' },
      { id: 'v-na-7-s', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'S', color: 'Burgundy', colorHex: '#4A1521', stock: 9, sku: 'STCH-NA-07-S' },
      { id: 'v-na-7-m', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'M', color: 'Burgundy', colorHex: '#4A1521', stock: 14, sku: 'STCH-NA-07-M' },
      { id: 'v-na-7-l', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'L', color: 'Burgundy', colorHex: '#4A1521', stock: 8, sku: 'STCH-NA-07-L' },
      { id: 'v-na-7-xl', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'XL', color: 'Burgundy', colorHex: '#4A1521', stock: 5, sku: 'STCH-NA-07-XL' },
      { id: 'v-na-7-xxl', productId: 'prod-na-7-burgundy-bishop-kurti', size: 'XXL', color: 'Burgundy', colorHex: '#4A1521', stock: 3, sku: 'STCH-NA-07-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 21,
    createdAt: new Date().toISOString(),
    colors: ['Burgundy', 'Wine', 'Deep Crimson', 'Maroon']
  }
];

// Update or insert into dbData.products
const existingIds = new Set(newArrivalProducts.map(p => p.id));
dbData.products = dbData.products.filter(p => !existingIds.has(p.id));
dbData.products.push(...newArrivalProducts);

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
console.log('Successfully seeded 7 new arrival products into stitchora.json!');
console.log('Total products now:', dbData.products.length);
