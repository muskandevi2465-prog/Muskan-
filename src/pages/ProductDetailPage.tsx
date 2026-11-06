import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Ruler, Check, Zap, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Product, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { routeParams, navigateTo, addToCart, buyNow, toggleWishlist, isWishlisted, setIsSizeGuideOpen, showToast } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = routeParams.id;
    if (!id) {
      navigateTo('shop');
      return;
    }
    api.getProduct(id)
      .then((res) => {
        setProduct(res.product);
        setReviews(res.reviews);
        if (res.product.images.length > 0) {
          setActiveImage(res.product.images[0].url);
        }
        if (res.product.colors && res.product.colors.length > 0) {
          setSelectedColor(res.product.colors[0]);
        }
        if (res.product.variants.length > 0) {
          setSelectedSize(res.product.variants[0].size);
        }
        setLoading(false);
      })
      .catch(() => {
        showToast('Product not found', 'error');
        navigateTo('shop');
      });
  }, [routeParams.id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#FAF5EE] flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#8F5567]" />
      </div>
    );
  }

  const isWished = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#73574E] hover:text-[#3B2118] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px]">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.url)}
                  className={`w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImage === img.url ? 'border-[#8F5567]' : 'border-[#E8D9C8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 rounded-3xl overflow-hidden bg-white border border-[#E8D9C8] shadow-md aspect-3/4 max-h-[640px]">
              <img
                src={activeImage || product.images[0]?.url || '/images/stitchora_hero.png'}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#8F5567] font-semibold">
                  {product.occasion || 'Atelier Collection'}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    isWished
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-white border-[#E8D9C8] text-[#73574E] hover:text-[#3B2118]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3B2118] mt-2 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-xs font-bold text-[#3B2118]">{product.rating || '4.9'}</span>
                </div>
                <span className="text-xs text-[#73574E]">·</span>
                <span className="text-xs text-[#73574E] font-medium">{product.reviewCount || 12} Verified Reviews</span>
                <span className="text-xs text-[#73574E]">·</span>
                <span className="text-xs font-mono font-bold text-[#8F5567]">{product.sku}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8D9C8] flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#3B2118]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#73574E] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {product.discountPercent || 25}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#5D4238] uppercase tracking-wider mb-2">
                  Select Shade: <span className="font-normal text-[#8F5567]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                        selectedColor === c
                          ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] font-bold shadow-xs'
                          : 'bg-white text-[#5D4238] border-[#E8D9C8] hover:border-[#8F5567]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#5D4238] uppercase tracking-wider">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#8F5567] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                  const variant = product.variants.find((v) => v.size === sz);
                  const isAvailable = variant ? variant.stock > 0 : true;

                  return (
                    <button
                      key={sz}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] shadow-sm'
                          : isAvailable
                          ? 'bg-white text-[#3B2118] border-[#E8D9C8] hover:border-[#8F5567]'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold text-[#5D4238] uppercase tracking-wider">
                Quantity:
              </span>
              <div className="inline-flex items-center rounded-xl border border-[#E8D9C8] bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-[#5D4238] hover:bg-[#FAF5EE] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  title="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-xs font-bold text-[#3B2118] min-w-[36px] text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-[#5D4238] hover:bg-[#FAF5EE] cursor-pointer transition-colors"
                  title="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Add to Bag & Buy Now */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, selectedSize, selectedColor || 'Standard', quantity);
                  showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} (${selectedSize}) to shopping bag!`);
                }}
                className="py-4 rounded-xl bg-white hover:bg-[#FAF5EE] text-[#3B2118] border-2 border-[#3B2118] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#8F5567]" />
                <span>Add to Bag</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  buyNow(product, selectedSize, selectedColor || 'Standard', quantity);
                }}
                className="py-4 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8D9C8] grid grid-cols-2 gap-3 text-[11px] text-[#73574E]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8F5567] shrink-0" />
                <span>Express courier across India</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#8F5567] shrink-0" />
                <span>7-Day size exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8F5567] shrink-0" />
                <span>100% Genuine Handloom</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8F5567] shrink-0" />
                <span>Pre-washed & Pre-shrunk</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2 text-xs leading-relaxed text-[#5D4238]">
              <h4 className="font-serif-luxury text-base font-semibold text-[#3B2118]">Textile & Craft Details</h4>
              <p>{product.description}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8D9C8]">
                <div><strong className="text-[#3B2118]">Fabric:</strong> {product.fabric}</div>
                <div><strong className="text-[#3B2118]">Fit:</strong> {product.fit}</div>
                <div><strong className="text-[#3B2118]">Occasion:</strong> {product.occasion}</div>
                <div><strong className="text-[#3B2118]">Care:</strong> {product.careInstructions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
