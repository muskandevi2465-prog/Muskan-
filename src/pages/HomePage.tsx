import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, Heart, ShoppingBag, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Product } from '../types';
import { LATEST_NEW_ARRIVALS } from '../data/newArrivalsData';

interface ProductCardProps {
  product: Product;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, buyNow, toggleWishlist, isWishlisted, showToast } = useStore();
  const isWished = isWishlisted(product.id);
  const mainImg = product.images[0]?.url || '/images/stitchora_hero.png';
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Original');
  const [selectedSize, setSelectedSize] = useState<string>(product.variants?.[0]?.size || 'M');

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8D9C8] hover:border-[#D8B4C0] transition-all duration-300 shadow-2xs hover:shadow-xl">
      {/* Product Image & Badges */}
      <div className="relative aspect-3/4 overflow-hidden bg-[#FAF5EE]">
        <img
          src={mainImg}
          alt={product.name}
          onClick={() => navigateTo('product', { id: product.id })}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer z-10 ${
            isWished ? 'bg-white text-red-500 shadow-md' : 'bg-black/30 text-white hover:bg-white hover:text-[#3B2118]'
          }`}
          title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {discount && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-bold tracking-wider shadow-xs">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Product Info & Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8F5567] font-medium uppercase tracking-wider mb-1">
            <span className="truncate max-w-[65%]">{product.fabric || 'Pure Textile'}</span>
            <div className="flex items-center text-amber-500 shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className="ml-0.5 text-[#3B2118] font-bold">{product.rating || '4.9'}</span>
            </div>
          </div>

          <h4
            onClick={() => navigateTo('product', { id: product.id })}
            className="font-bold text-sm text-[#3B2118] line-clamp-1 hover:text-[#8F5567] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h4>
          <p className="text-xs text-[#73574E] line-clamp-1 mt-0.5">{product.shortDesc}</p>
        </div>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#8F5567] tracking-wider">
                Color:
              </span>
              <span className="text-[10px] text-[#73574E] font-medium truncate max-w-[120px]">
                {selectedColor}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold transition-all cursor-pointer ${
                    selectedColor === c
                      ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] shadow-xs'
                      : 'bg-[#FAF5EE] text-[#5D4238] border-[#E8D9C8]/80 hover:border-[#8F5567]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection Chips */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8F5567] tracking-wider">
              Size:
            </span>
            <span className="text-[10px] text-[#73574E] font-bold">
              {selectedSize}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {AVAILABLE_SIZES.map((sz) => {
              const variant = product.variants?.find((v) => v.size === sz);
              const isAvailable = variant ? variant.stock > 0 : true;
              const isSelected = selectedSize === sz;

              return (
                <button
                  key={sz}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[10px] min-w-[26px] h-6 px-1.5 rounded-md border font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#8F5567] text-white border-[#8F5567] shadow-xs'
                      : isAvailable
                      ? 'bg-white text-[#5D4238] border-[#E8D9C8] hover:border-[#8F5567]'
                      : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                  }`}
                  title={isAvailable ? `Select size ${sz}` : `Size ${sz} out of stock`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Action Buttons: Add to Cart and Buy Now */}
        <div className="pt-2.5 border-t border-[#FAF5EE] space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#3B2118]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#73574E] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                addToCart(product.id, selectedSize, selectedColor, 1);
              }}
              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#FAF5EE] text-[#3B2118] border border-[#D8B4C0] hover:border-[#3B2118] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#8F5567]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => {
                buyNow(product, selectedSize, selectedColor, 1);
              }}
              className="py-2 px-2.5 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
              title="Instant Checkout"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const { navigateTo, setActiveCategory } = useStore();
  const [products, setProducts] = useState<Product[]>(LATEST_NEW_ARRIVALS);
  useEffect(() => {
    api.getProducts().then(res => {
      const existingIds = new Set(LATEST_NEW_ARRIVALS.map(p => p.id));
      const merged = [...LATEST_NEW_ARRIVALS, ...res.products.filter(p => !existingIds.has(p.id))];
      setProducts(merged);
    }).catch(() => {
      setProducts(LATEST_NEW_ARRIVALS);
    });
  }, []);

  const festiveProducts = products.filter(p => p.categoryId === 'cat-festive-wear' || p.occasion?.toLowerCase().includes('festive')).slice(0, 4);
  const kurtiProducts = products.filter(p => p.categoryId === 'cat-short-kurtis').slice(0, 4);
  const coordProducts = products.filter(p => p.categoryId === 'cat-coord-sets').slice(0, 4);
  const partyWearProducts = products.filter(p => p.categoryId === 'cat-party-wear').slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118]">
      {/* Hero Banner with Full Background Image f4.png */}
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[600px] lg:min-h-[660px] flex items-center border-b border-[#E8D9C8]">
        {/* Full Background Layer with f4.png */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Ambient blurred fill from f4.png to seamlessly tint and envelop the entire background */}
          <img
            src="/images/f4.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110 opacity-25 brightness-90"
          />

          {/* Warm luxury undertone to complement the maroon & gold couture palette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EE] via-[#FBF7F2] to-[#FAF5EE]/40" />

          {/* Entire photo visible without cropping or cutting off any part (head, jewelry, dress, and hemline completely intact) */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-10 xl:pr-20 py-4 sm:py-6">
            <img
              src="/images/f4.png"
              alt="Muskan's Stitching Royal Festive Anarkali Couture"
              className="h-full w-auto max-h-[520px] sm:max-h-[580px] lg:max-h-[640px] object-contain drop-shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Soft scrim gradient from left to right ensuring heading, description, and CTA buttons are 100% visible & readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EE]/95 via-[#FAF5EE]/85 to-transparent sm:w-4/5 lg:w-3/5" />
          
          {/* Subtle mobile bottom vignette for seamless text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EE]/90 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Foreground Content: Heading, Description, CTA Buttons */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-xl lg:max-w-2xl space-y-6 bg-white/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-6 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-[#E8D9C8]/80 shadow-md sm:shadow-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D8B4C0] text-xs text-[#8F5567] font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Tailoring & Boutique</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#3B2118] leading-[1.15]">
              Stylish Designs, <br />
              <span className="font-bold text-[#8F5567]">Perfect Fitting & Quality Stitching.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5D4238] max-w-xl leading-relaxed">
              Upgrade your wardrobe with custom outfits made just for you. From modern trends to timeless classics, we deliver stylish designs, a flawless personal fit, and premium quality stitching on every dress.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  navigateTo('shop');
                }}
                className="px-8 py-4 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('festive-wear-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl bg-white hover:bg-[#FAF5EE] text-[#3B2118] border border-[#D8B4C0] text-xs font-bold uppercase tracking-[0.18em] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Festive Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8F5567]">Curated Collections</span>
          <h2 className="text-3xl font-bold text-[#3B2118] mt-1">Shop by Silhouette</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 'cat-ethnic-suits', name: 'Ethnic Suits', img: '/images/e2.png', tag: 'Anarkali & Sharara' },
            { id: 'cat-short-kurtis', name: 'Short Kurtis', img: '/images/s1.png', tag: 'Chikankari & Daily' },
            { id: 'cat-coord-sets', name: 'Co-ord Sets', img: '/images/c1.png', tag: 'Modern Ethnic' },
            { id: 'cat-festive-wear', name: 'Festive Wear', img: '/images/f2.png', tag: 'Celebrations' },
            { id: 'cat-party-wear', name: 'Party Wear', img: '/images/p1.png', tag: 'Soiree & Evening' },
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                navigateTo('shop');
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#E8D9C8] hover:border-[#8F5567] transition-all shadow-2xs hover:shadow-lg flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-[#FAF5EE]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-bold text-sm text-[#3B2118] group-hover:text-[#8F5567] transition-colors">
                  {cat.name}
                </h4>
                <span className="text-[10px] text-[#73574E] block mt-0.5">{cat.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Short Kurtis Section */}
      <section id="short-kurtis-section" className="py-14 bg-white border-y border-[#E8D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8F5567]">Everyday Grace</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">Short Kurtis Collection</h3>
            </div>
            <button
              onClick={() => {
                setActiveCategory('cat-short-kurtis');
                navigateTo('shop');
              }}
              className="text-xs font-bold text-[#8F5567] hover:text-[#3B2118] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Kurtis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kurtiProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Co-ord Sets Section */}
      <section id="coord-sets-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8F5567]">Contemporary Chic</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">Designer Co-ord Sets</h3>
          </div>
          <button
            onClick={() => {
              setActiveCategory('cat-coord-sets');
              navigateTo('shop');
            }}
            className="text-xs font-bold text-[#8F5567] hover:text-[#3B2118] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Co-ords</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coordProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Festive Wear Section */}
      <section id="festive-wear-section" className="py-14 bg-white border-y border-[#E8D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8F5567]">Heirloom Elegance</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">Festive Wear Ensembles</h3>
            </div>
            <button
              onClick={() => {
                setActiveCategory('cat-festive-wear');
                navigateTo('shop');
              }}
              className="text-xs font-bold text-[#8F5567] hover:text-[#3B2118] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Festive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {festiveProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Party Wear Section */}
      <section id="party-wear-section" className="py-14 bg-white border-y border-[#E8D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8F5567]">Glamour & Radiance</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">Party Wear Ensembles</h3>
            </div>
            <button
              onClick={() => {
                setActiveCategory('cat-party-wear');
                navigateTo('shop');
              }}
              className="text-xs font-bold text-[#8F5567] hover:text-[#3B2118] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Party Wear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partyWearProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
