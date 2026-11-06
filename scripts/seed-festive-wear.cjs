const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'stitchora.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const festiveProducts = [
  {
    id: 'prod-festive-f1-burgundy-sharara',
    slug: 'the-sultana-burgundy-velvet-embroidered-sharara-set',
    name: 'The Sultana Burgundy Velvet Embroidered Sharara Set',
    sku: 'STCH-FW-01',
    shortDesc: 'Opulent wine burgundy velvet kurti with voluminous tiered flared sharara kalis and antique gold zardozi.',
    description: 'A regal festive masterpiece capturing royal Mughal opulence. Handcrafted with rich wine burgundy micro-velvet, paired with tiered flared sharara pants and an intricately scalloped dupatta. Lavishly adorned with antique gold zardozi needlework, dabka, and pearl florets.',
    price: 8499,
    originalPrice: 11500,
    discountPercent: 26,
    fabric: 'Royal Micro-Velvet & Mulberry Georgette with Pure Silk Shantoon Lining',
    careInstructions: 'Professional dry clean only. Steam press on reverse.',
    occasion: 'Diwali Gala, Royal Wedding Sangeet, Festive Soiree',
    fit: 'Fitted Velvet Kurti with Tiered Flared Sharara Kalis',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f1-1',
        url: '/images/f1.png',
        alt: 'The Sultana Burgundy Velvet Embroidered Sharara Set - Full Length View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Burgundy'
      },
      {
        id: 'img-festive-f1-2',
        url: '/images/f1.png',
        alt: 'The Sultana Burgundy Sharara Set - Zardozi Bodice Detail',
        isPrimary: false,
        viewType: 'Zardozi Embroidery Detail',
        color: 'Burgundy'
      },
      {
        id: 'img-festive-f1-3',
        url: '/images/f1.png',
        alt: 'The Sultana Burgundy Sharara Set - Flared Tiered Kalis',
        isPrimary: false,
        viewType: 'Tiered Sharara Flare',
        color: 'Burgundy'
      }
    ],
    variants: [
      { id: 'v-fw-1-xs', productId: 'prod-festive-f1-burgundy-sharara', size: 'XS', color: 'Burgundy', colorHex: '#4A1521', stock: 5, sku: 'STCH-FW-01-XS' },
      { id: 'v-fw-1-s', productId: 'prod-festive-f1-burgundy-sharara', size: 'S', color: 'Burgundy', colorHex: '#4A1521', stock: 8, sku: 'STCH-FW-01-S' },
      { id: 'v-fw-1-m', productId: 'prod-festive-f1-burgundy-sharara', size: 'M', color: 'Burgundy', colorHex: '#4A1521', stock: 12, sku: 'STCH-FW-01-M' },
      { id: 'v-fw-1-l', productId: 'prod-festive-f1-burgundy-sharara', size: 'L', color: 'Burgundy', colorHex: '#4A1521', stock: 9, sku: 'STCH-FW-01-L' },
      { id: 'v-fw-1-xl', productId: 'prod-festive-f1-burgundy-sharara', size: 'XL', color: 'Burgundy', colorHex: '#4A1521', stock: 6, sku: 'STCH-FW-01-XL' },
      { id: 'v-fw-1-xxl', productId: 'prod-festive-f1-burgundy-sharara', size: 'XXL', color: 'Burgundy', colorHex: '#4A1521', stock: 4, sku: 'STCH-FW-01-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: new Date().toISOString(),
    colors: ['Burgundy', 'Wine', 'Deep Crimson', 'Maroon']
  },
  {
    id: 'prod-festive-f2-emerald-mandala-gown',
    slug: 'the-mayuri-emerald-rust-mandala-kalidar-gown',
    name: 'The Mayuri Emerald & Rust Mandala Kalidar Gown',
    sku: 'STCH-FW-02',
    shortDesc: 'Majestic emerald green gown with rust mandala block motifs, woven zari borders, and grand flare.',
    description: 'An ode to Rajasthan royal heritage, this emerald green kalidar gown features contrast rust terracotta borders, hand-carved heritage mandala motifs, and golden zari weaving along the sprawling kalis. Custom tailored with an elegant scoop neckline.',
    price: 7999,
    originalPrice: 10800,
    discountPercent: 26,
    fabric: 'Handloom Chanderi Silk & Gold Zari Weave with Shantoon Lining',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Diwali Puja, Mehendi Celebrations, Sangeet Night',
    fit: 'Flared Kalidar Floor-Length Gown with Structured Empire Bodice',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f2-1',
        url: '/images/f2.png',
        alt: 'The Mayuri Emerald & Rust Mandala Kalidar Gown - Front View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Emerald Green'
      },
      {
        id: 'img-festive-f2-2',
        url: '/images/f2.png',
        alt: 'The Mayuri Emerald Gown - Mandala Motif Close-up',
        isPrimary: false,
        viewType: 'Mandala Print Detail',
        color: 'Emerald Green'
      },
      {
        id: 'img-festive-f2-3',
        url: '/images/f2.png',
        alt: 'The Mayuri Emerald Gown - Zari Kalidar Flare',
        isPrimary: false,
        viewType: 'Zari Border Detail',
        color: 'Emerald Green'
      }
    ],
    variants: [
      { id: 'v-fw-2-xs', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'XS', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 4, sku: 'STCH-FW-02-XS' },
      { id: 'v-fw-2-s', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'S', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 7, sku: 'STCH-FW-02-S' },
      { id: 'v-fw-2-m', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'M', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 11, sku: 'STCH-FW-02-M' },
      { id: 'v-fw-2-l', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'L', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 8, sku: 'STCH-FW-02-L' },
      { id: 'v-fw-2-xl', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'XL', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 5, sku: 'STCH-FW-02-XL' },
      { id: 'v-fw-2-xxl', productId: 'prod-festive-f2-emerald-mandala-gown', size: 'XXL', color: 'Emerald Green', colorHex: '#1C4B3E', stock: 3, sku: 'STCH-FW-02-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 31,
    createdAt: new Date().toISOString(),
    colors: ['Emerald Green', 'Rust Orange', 'Forest Green', 'Gold']
  },
  {
    id: 'prod-festive-f3-chartreuse-wine-skirt',
    slug: 'the-chandrika-chartreuse-silk-tunic-banarasi-skirt',
    name: 'The Chandrika Chartreuse Silk Tunic & Banarasi Skirt',
    sku: 'STCH-FW-03',
    shortDesc: 'Vibrant chartreuse lime green silk straight tunic paired with royal aubergine Banarasi brocade skirt.',
    description: 'A striking festive duo blending luminous chartreuse lime green raw silk with a deep aubergine wine flared lehenga skirt bordered with heavy Banarasi golden zari. Accented with hand-embroidered gota borders and a sheer festive dupatta.',
    price: 7499,
    originalPrice: 9999,
    discountPercent: 25,
    fabric: 'Luminous Raw Silk & Pure Banarasi Brocade with Cotton Voile Lining',
    careInstructions: 'Professional dry clean only. Steam press.',
    occasion: 'Diwali Evening, Traditional Pooja, Family Celebrations',
    fit: 'Straight Tunic with Dramatic Flared Banarasi Skirt',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f3-1',
        url: '/images/f3.png',
        alt: 'The Chandrika Chartreuse Silk Tunic & Banarasi Skirt - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Lime Green'
      },
      {
        id: 'img-festive-f3-2',
        url: '/images/f3.png',
        alt: 'The Chandrika Banarasi Skirt - Brocade Weave Detail',
        isPrimary: false,
        viewType: 'Banarasi Brocade Detail',
        color: 'Lime Green'
      },
      {
        id: 'img-festive-f3-3',
        url: '/images/f3.png',
        alt: 'The Chandrika Tunic - Gota Patti Border Detail',
        isPrimary: false,
        viewType: 'Silk Neckline Detail',
        color: 'Lime Green'
      }
    ],
    variants: [
      { id: 'v-fw-3-xs', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'XS', color: 'Lime Green', colorHex: '#9E9B38', stock: 5, sku: 'STCH-FW-03-XS' },
      { id: 'v-fw-3-s', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'S', color: 'Lime Green', colorHex: '#9E9B38', stock: 8, sku: 'STCH-FW-03-S' },
      { id: 'v-fw-3-m', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'M', color: 'Lime Green', colorHex: '#9E9B38', stock: 10, sku: 'STCH-FW-03-M' },
      { id: 'v-fw-3-l', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'L', color: 'Lime Green', colorHex: '#9E9B38', stock: 7, sku: 'STCH-FW-03-L' },
      { id: 'v-fw-3-xl', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'XL', color: 'Lime Green', colorHex: '#9E9B38', stock: 4, sku: 'STCH-FW-03-XL' },
      { id: 'v-fw-3-xxl', productId: 'prod-festive-f3-chartreuse-wine-skirt', size: 'XXL', color: 'Lime Green', colorHex: '#9E9B38', stock: 2, sku: 'STCH-FW-03-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 24,
    createdAt: new Date().toISOString(),
    colors: ['Lime Green', 'Royal Wine', 'Olive', 'Gold']
  },
  {
    id: 'prod-festive-f4-crimson-gotapatti-anarkali',
    slug: 'the-noorani-crimson-gotapatti-bridal-anarkali-gown',
    name: 'The Noorani Crimson Gotapatti Bridal Anarkali Gown',
    sku: 'STCH-FW-04',
    shortDesc: 'Regal crimson red bridal Anarkali gown with rich gotapatti marodi work and kundan neckline.',
    description: 'An iconic STITCHORA bridal and festive classic. Tailored in deep crimson pure georgette silk with heirloom gotapatti ribbons, kundan embroidery at the structured neckline, and an opulent 6-meter twirling flare with scalloped edges.',
    price: 9299,
    originalPrice: 12800,
    discountPercent: 27,
    fabric: 'Pure Georgette Silk & Resham Gotapatti with Butter Crepe Lining',
    careInstructions: 'Professional dry clean only. Preserve in muslin wrap.',
    occasion: 'Weddings, Sangeet Night, Karwa Chauth, Grand Festive Receptions',
    fit: 'Fitted Sweetheart Bodice with 6-Meter Kalidar Anarkali Flare',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f4-1',
        url: '/images/f4.png',
        alt: 'The Noorani Crimson Gotapatti Bridal Anarkali - Full Length',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Crimson Red'
      },
      {
        id: 'img-festive-f4-2',
        url: '/images/f4.png',
        alt: 'The Noorani Crimson Anarkali - Gotapatti Bodice Detail',
        isPrimary: false,
        viewType: 'Gotapatti Bodice Detail',
        color: 'Crimson Red'
      },
      {
        id: 'img-festive-f4-3',
        url: '/images/f4.png',
        alt: 'The Noorani Crimson Anarkali - Scalloped Hemline Detail',
        isPrimary: false,
        viewType: 'Flared Hemline Detail',
        color: 'Crimson Red'
      }
    ],
    variants: [
      { id: 'v-fw-4-xs', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'XS', color: 'Crimson Red', colorHex: '#960018', stock: 6, sku: 'STCH-FW-04-XS' },
      { id: 'v-fw-4-s', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'S', color: 'Crimson Red', colorHex: '#960018', stock: 9, sku: 'STCH-FW-04-S' },
      { id: 'v-fw-4-m', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'M', color: 'Crimson Red', colorHex: '#960018', stock: 14, sku: 'STCH-FW-04-M' },
      { id: 'v-fw-4-l', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'L', color: 'Crimson Red', colorHex: '#960018', stock: 10, sku: 'STCH-FW-04-L' },
      { id: 'v-fw-4-xl', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'XL', color: 'Crimson Red', colorHex: '#960018', stock: 7, sku: 'STCH-FW-04-XL' },
      { id: 'v-fw-4-xxl', productId: 'prod-festive-f4-crimson-gotapatti-anarkali', size: 'XXL', color: 'Crimson Red', colorHex: '#960018', stock: 3, sku: 'STCH-FW-04-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 46,
    createdAt: new Date().toISOString(),
    colors: ['Crimson Red', 'Scarlet', 'Deep Maroon', 'Gold']
  },
  {
    id: 'prod-festive-f5-bronze-angrakha-jacket',
    slug: 'the-shehzadi-bronze-gold-angrakha-silk-jacket-set',
    name: 'The Shehzadi Bronze Gold Angrakha Silk Jacket Set',
    sku: 'STCH-FW-05',
    shortDesc: 'Dual-tone bronze gold Angrakha long jacket with mirror-work borders over a pleated silk gown.',
    description: 'Echoing royal court grandeur, this bronze gold dual-tone ensemble features a cascading asymmetrical Angrakha jacket trimmed with real mirror-work and antique zari cords, layered over an accordion pleated silk inner gown.',
    price: 8199,
    originalPrice: 11200,
    discountPercent: 27,
    fabric: 'Metallic Tissue Silk & Modal Chanderi with Handcrafted Dori Tassels',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Reception, Cocktails, Sangeet Night, Royal Celebrations',
    fit: 'Layered Angrakha Silhouette with Flowing Pleated Inner Gown',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f5-1',
        url: '/images/f5.png',
        alt: 'The Shehzadi Bronze Gold Angrakha Jacket Set - Front View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Bronze Gold'
      },
      {
        id: 'img-festive-f5-2',
        url: '/images/f5.png',
        alt: 'The Shehzadi Bronze Set - Mirror-Work Angrakha Trim Detail',
        isPrimary: false,
        viewType: 'Mirror-Work Trim Detail',
        color: 'Bronze Gold'
      },
      {
        id: 'img-festive-f5-3',
        url: '/images/f5.png',
        alt: 'The Shehzadi Bronze Set - Pleated Silk Hemline Detail',
        isPrimary: false,
        viewType: 'Pleated Silk Flare Detail',
        color: 'Bronze Gold'
      }
    ],
    variants: [
      { id: 'v-fw-5-xs', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'XS', color: 'Bronze Gold', colorHex: '#A67B48', stock: 4, sku: 'STCH-FW-05-XS' },
      { id: 'v-fw-5-s', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'S', color: 'Bronze Gold', colorHex: '#A67B48', stock: 6, sku: 'STCH-FW-05-S' },
      { id: 'v-fw-5-m', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'M', color: 'Bronze Gold', colorHex: '#A67B48', stock: 9, sku: 'STCH-FW-05-M' },
      { id: 'v-fw-5-l', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'L', color: 'Bronze Gold', colorHex: '#A67B48', stock: 6, sku: 'STCH-FW-05-L' },
      { id: 'v-fw-5-xl', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'XL', color: 'Bronze Gold', colorHex: '#A67B48', stock: 4, sku: 'STCH-FW-05-XL' },
      { id: 'v-fw-5-xxl', productId: 'prod-festive-f5-bronze-angrakha-jacket', size: 'XXL', color: 'Bronze Gold', colorHex: '#A67B48', stock: 2, sku: 'STCH-FW-05-XXL' }
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 28,
    createdAt: new Date().toISOString(),
    colors: ['Bronze Gold', 'Antique Gold', 'Champagne', 'Copper']
  },
  {
    id: 'prod-festive-f6-scarlet-paisley-lehenga',
    slug: 'the-roohani-scarlet-paisley-embroidered-lehenga-set',
    name: 'The Roohani Scarlet Paisley Embroidered Lehenga Set',
    sku: 'STCH-FW-06',
    shortDesc: 'Scarlet red crop jacket with golden paisley zari work and high-waisted pleated lehenga skirt.',
    description: 'Vibrant scarlet red festive attire showcasing an intricately embroidered Mandarin collar crop jacket enriched with Mughal paisley zari motifs, paired with a knife-pleated flowing lehenga skirt and delicate golden belt detail.',
    price: 7799,
    originalPrice: 10500,
    discountPercent: 26,
    fabric: 'Fine Micro-Satin & Gold Resham Embroidery with Shantoon Lining',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Diwali Parties, Sangeet Celebrations, Mehendi Evenings',
    fit: 'Tailored Crop Jacket with High-Waisted Knife-Pleated Lehenga Skirt',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f6-1',
        url: '/images/f6.png',
        alt: 'The Roohani Scarlet Paisley Lehenga Set - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Scarlet Red'
      },
      {
        id: 'img-festive-f6-2',
        url: '/images/f6.png',
        alt: 'The Roohani Scarlet Jacket - Paisley Zari Embroidery',
        isPrimary: false,
        viewType: 'Paisley Jacket Detail',
        color: 'Scarlet Red'
      },
      {
        id: 'img-festive-f6-3',
        url: '/images/f6.png',
        alt: 'The Roohani Lehenga - Pleated Skirt Movement',
        isPrimary: false,
        viewType: 'Pleated Skirt Detail',
        color: 'Scarlet Red'
      }
    ],
    variants: [
      { id: 'v-fw-6-xs', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'XS', color: 'Scarlet Red', colorHex: '#B22222', stock: 5, sku: 'STCH-FW-06-XS' },
      { id: 'v-fw-6-s', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'S', color: 'Scarlet Red', colorHex: '#B22222', stock: 8, sku: 'STCH-FW-06-S' },
      { id: 'v-fw-6-m', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'M', color: 'Scarlet Red', colorHex: '#B22222', stock: 12, sku: 'STCH-FW-06-M' },
      { id: 'v-fw-6-l', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'L', color: 'Scarlet Red', colorHex: '#B22222', stock: 7, sku: 'STCH-FW-06-L' },
      { id: 'v-fw-6-xl', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'XL', color: 'Scarlet Red', colorHex: '#B22222', stock: 4, sku: 'STCH-FW-06-XL' },
      { id: 'v-fw-6-xxl', productId: 'prod-festive-f6-scarlet-paisley-lehenga', size: 'XXL', color: 'Scarlet Red', colorHex: '#B22222', stock: 3, sku: 'STCH-FW-06-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: new Date().toISOString(),
    colors: ['Scarlet Red', 'Ruby', 'Crimson', 'Rust']
  },
  {
    id: 'prod-festive-f7-terracotta-sharara',
    slug: 'the-kasturi-terracotta-embroidered-sharara-ensemble',
    name: 'The Kasturi Terracotta Embroidered Sharara Ensemble',
    sku: 'STCH-FW-07',
    shortDesc: 'Terracotta rust sleeveless kurti with gold sequin jaal, tiered sharara pants, and sheer dupatta.',
    description: 'Earthy warmth meets festive celebration in this terracotta rust ensemble. Features a sleeveless straight kurti scattered with delicate gold micro-sequins, paired with wide multi-tier flared sharara bottoms and an airy scalloped dupatta.',
    price: 6999,
    originalPrice: 9400,
    discountPercent: 26,
    fabric: 'Pure Viscose Georgette & Hand-Sequined Embroidery with Soft Shantoon Lining',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Mehendi Soiree, Festive Luncheon, Puja, Diwali',
    fit: 'Fitted Sleeveless Kurti with Dramatic Multi-Tiered Sharara Flare',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-festive-f7-1',
        url: '/images/f7.png',
        alt: 'The Kasturi Terracotta Embroidered Sharara Ensemble - Model View',
        isPrimary: true,
        viewType: 'Model Full View',
        color: 'Terracotta Rust'
      },
      {
        id: 'img-festive-f7-2',
        url: '/images/f7.png',
        alt: 'The Kasturi Sharara - Sequin Jaal Kurti Detail',
        isPrimary: false,
        viewType: 'Sequin Jaal Detail',
        color: 'Terracotta Rust'
      },
      {
        id: 'img-festive-f7-3',
        url: '/images/f7.png',
        alt: 'The Kasturi Sharara - Flared Tiered Bottoms Detail',
        isPrimary: false,
        viewType: 'Tiered Sharara Flare',
        color: 'Terracotta Rust'
      }
    ],
    variants: [
      { id: 'v-fw-7-xs', productId: 'prod-festive-f7-terracotta-sharara', size: 'XS', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 4, sku: 'STCH-FW-07-XS' },
      { id: 'v-fw-7-s', productId: 'prod-festive-f7-terracotta-sharara', size: 'S', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 7, sku: 'STCH-FW-07-S' },
      { id: 'v-fw-7-m', productId: 'prod-festive-f7-terracotta-sharara', size: 'M', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 10, sku: 'STCH-FW-07-M' },
      { id: 'v-fw-7-l', productId: 'prod-festive-f7-terracotta-sharara', size: 'L', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 8, sku: 'STCH-FW-07-L' },
      { id: 'v-fw-7-xl', productId: 'prod-festive-f7-terracotta-sharara', size: 'XL', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 5, sku: 'STCH-FW-07-XL' },
      { id: 'v-fw-7-xxl', productId: 'prod-festive-f7-terracotta-sharara', size: 'XXL', color: 'Terracotta Rust', colorHex: '#BC544B', stock: 3, sku: 'STCH-FW-07-XXL' }
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 19,
    createdAt: new Date().toISOString(),
    colors: ['Terracotta Rust', 'Burnt Orange', 'Sandstone', 'Antique Gold']
  }
];

// Update or insert into dbData.products
const existingIds = new Set(festiveProducts.map(p => p.id));
dbData.products = dbData.products.filter(p => !existingIds.has(p.id));
dbData.products.push(...festiveProducts);

// Update category image if helpful
const festiveCat = dbData.categories.find(c => c.id === 'cat-festive-wear');
if (festiveCat) {
  festiveCat.imageUrl = '/images/f1.png';
}

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
console.log('Successfully seeded festive products into stitchora.json!');
console.log('Total products count now:', dbData.products.length);
