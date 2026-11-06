import React, { useState, useEffect } from 'react';
import { Filter, Star, Heart, SlidersHorizontal, RotateCcw, Check, X, Palette, Sparkles, Zap, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { LIGHT_COLOR_OPTIONS } from '../data/lightColors';

export const ShopPage: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    navigateTo,
    toggleWishlist,
    isWishlisted,
    addToCart,
    buyNow,
  } = useStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [cardImageMap, setCardImageMap] = useState<Record<string, string>>({});
  const [cardColorMap, setCardColorMap] = useState<Record<string, string>>({});
  const [cardSizeMap, setCardSizeMap] = useState<Record<string, string>>({});

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts({
        category: activeCategory !== 'all' ? activeCategory : undefined,
        sort: sortBy,
        size: selectedSize || undefined,
        minPrice,
        maxPrice,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
      });
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catRes = await api.getCategories();
        setCategories(catRes.categories || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy, selectedSize, minPrice, maxPrice, selectedColors]);

  const handleToggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSortBy('newest');
    setSelectedSize('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedColors([]);
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    Boolean(selectedSize) ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    selectedColors.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category Navigation Tabs & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#3B2118] text-[#FAF5EE]'
                : 'bg-[#F4EDE4] text-[#3B2118] hover:bg-[#E8D9C8]'
            }`}
          >
            All Collections ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-[#3B2118] text-[#FAF5EE]'
                  : 'bg-[#F4EDE4] text-[#3B2118] hover:bg-[#E8D9C8]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8D9C8] rounded-full text-xs font-medium text-[#3B2118] relative shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {selectedColors.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#8F5567] absolute -top-1 -right-1" />
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 bg-white border border-[#E8D9C8] rounded-full text-xs font-medium text-[#3B2118] focus:outline-none focus:border-[#B77D8D] cursor-pointer shadow-2xs"
          >
            <option value="newest">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* 3. Horizontal Light Color Swatch Carousel (Quick-Filter for Mobile & Desktop) */}
      <div className="bg-[#FAF5EE] p-4 sm:p-5 rounded-2xl border border-[#E8D9C8] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#8F5567]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3B2118]">
              Light & Pastel Color Palette
            </span>
            <span className="hidden sm:inline text-[11px] text-[#73574E]">
              — Click swatches to filter by shade (multiple selection enabled)
            </span>
          </div>
          {selectedColors.length > 0 && (
            <button
              onClick={() => setSelectedColors([])}
              className="text-[11px] text-[#8F5567] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Shades ({selectedColors.length})</span>
            </button>
          )}
        </div>

        {/* Scrollable Horizontal Swatches */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {LIGHT_COLOR_OPTIONS.map((col) => {
            const isSelected = selectedColors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => handleToggleColor(col.name)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] shadow-sm font-semibold'
                    : 'bg-white hover:bg-[#FAF5EE] text-[#5D4238] border-[#E8D9C8] font-normal hover:border-[#B77D8D]'
                }`}
                title={col.description}
              >
                {/* Visual circular color dot with exact pastel hex and outline */}
                <span
                  className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                  style={{
                    backgroundColor: col.hex,
                    border: `1.5px solid ${col.border}`,
                  }}
                >
                  {isSelected && (
                    <Check className="w-2.5 h-2.5 text-[#3B2118] stroke-[3]" />
                  )}
                </span>
                <span className="whitespace-nowrap text-[11.5px]">{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Filter Tags Bar (if any applied) */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#73574E]">
            Active Filters:
          </span>

          {activeCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] text-xs text-[#3B2118]">
              <span className="capitalize">Category: {activeCategory.replace('-', ' ')}</span>
              <button
                onClick={() => setActiveCategory('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSize && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] text-xs text-[#3B2118]">
              <span>Size: {selectedSize}</span>
              <button
                onClick={() => setSelectedSize('')}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPrice !== undefined || maxPrice !== undefined) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] text-xs text-[#3B2118]">
              <span>
                ₹{minPrice ?? 0} – ₹{maxPrice ?? 'Max'}
              </span>
              <button
                onClick={() => {
                  setMinPrice(undefined);
                  setMaxPrice(undefined);
                }}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColors.map((colName) => {
            const opt = LIGHT_COLOR_OPTIONS.find((c) => c.name === colName);
            return (
              <span
                key={colName}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#B77D8D] text-xs text-[#3B2118] font-medium shadow-2xs"
              >
                {opt && (
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: opt.hex,
                      border: `1px solid ${opt.border}`,
                    }}
                  />
                )}
                <span>{colName}</span>
                <button
                  onClick={() => handleToggleColor(colName)}
                  className="hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          <button
            onClick={handleResetFilters}
            className="text-[11px] text-[#8F5567] hover:underline font-semibold ml-2 cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* 5. Main Catalog Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm p-4 flex justify-center items-center' : 'hidden lg:block'
          }`}
        >
          <div className="w-full max-w-md lg:max-w-none bg-[#FAF5EE] p-5 rounded-2xl border border-[#E8D9C8] space-y-6 max-h-[90vh] lg:max-h-none overflow-y-auto shadow-xl lg:shadow-none">
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C8]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#3B2118]" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#3B2118]">
                  Filter By
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#B77D8D] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                {mobileFilterOpen && (
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden p-1 rounded-full hover:bg-[#E8D9C8]"
                  >
                    <X className="w-4 h-4 text-[#3B2118]" />
                  </button>
                )}
              </div>
            </div>

            {/* Light Color Swatches Filter Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#8F5567]" />
                  <span className="text-xs font-semibold text-[#3B2118]">
                    Light & Pastel Shades
                  </span>
                </div>
                {selectedColors.length > 0 && (
                  <span className="text-[10px] font-semibold bg-[#8F5567] text-[#FAF5EE] px-2 py-0.5 rounded-full">
                    {selectedColors.length} selected
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#73574E] leading-relaxed">
                Choose one or more light tones to filter matching handcrafted ethnic dresses:
              </p>

              {/* 19 Color Swatches Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {LIGHT_COLOR_OPTIONS.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => handleToggleColor(col.name)}
                      className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-white border-[#8F5567] shadow-sm font-semibold'
                          : 'bg-white/70 border-[#E8D9C8] hover:bg-white text-[#5D4238] hover:border-[#B77D8D]'
                      }`}
                    >
                      {/* Swatch circle with checkmark */}
                      <span
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center shadow-xs transition-transform"
                        style={{
                          backgroundColor: col.hex,
                          border: `1.5px solid ${col.border}`,
                        }}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-[#3B2118] stroke-[3]" />
                        )}
                      </span>

                      <span className="text-[11px] truncate leading-tight">
                        {col.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedColors.length > 0 && (
                <button
                  onClick={() => setSelectedColors([])}
                  className="w-full text-center py-1.5 text-[11px] font-medium text-[#8F5567] hover:underline cursor-pointer"
                >
                  Clear color selections
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8D9C8]">
              <span className="text-xs font-semibold text-[#3B2118] block">Size</span>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#3B2118] text-[#FAF5EE]'
                        : 'bg-white border border-[#E8D9C8] text-[#3B2118] hover:border-[#3B2118]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8D9C8]">
              <span className="text-xs font-semibold text-[#3B2118] block">
                Price Range (₹)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice ?? ''}
                  onChange={(e) =>
                    setMinPrice(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E8D9C8] rounded text-[#3B2118] focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice ?? ''}
                  onChange={(e) =>
                    setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E8D9C8] rounded text-[#3B2118] focus:outline-none"
                />
              </div>
            </div>

            {/* Brand Promise Box */}
            <div className="pt-4 border-t border-[#E8D9C8] text-[11px] text-[#73574E] space-y-1.5">
              <span className="font-semibold text-[#3B2118] block">Atelier Assurance</span>
              <p className="leading-relaxed">
                Every Muskan's Stitching dress is handcrafted in fine mulberry silks, raw silk, and handloom chanderi. Includes custom seam allowances for guaranteed fitting.
              </p>
            </div>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#3B2118] text-[#FAF5EE] rounded text-xs font-semibold uppercase tracking-wider cursor-pointer mt-4"
              >
                Apply Filters ({products.length} Designs)
              </button>
            )}
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="py-24 text-center text-xs text-[#73574E] space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-[#8F5567] border-t-transparent rounded-full animate-spin" />
              <p>Curating matching light pastel silhouettes...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-[#FAF5EE] rounded-2xl border border-[#E8D9C8] p-8 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#E8D9C8] flex items-center justify-center text-[#8F5567]">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#3B2118]">
                No Silhouettes Match Your Filter Combination
              </h3>
              <p className="text-xs text-[#73574E] max-w-sm mx-auto leading-relaxed">
                {selectedColors.length > 0
                  ? `No items found matching ${selectedColors.join(', ')} with the selected size and price filters. Try selecting another pastel tone or resetting filters.`
                  : 'Try widening your price range or clearing size filters to view our full collection.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#3B2118] text-[#FAF5EE] rounded text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-[#523024] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const currentCardImg = cardImageMap[product.id] || product.images[0]?.url;
                const activeCardColor = cardColorMap[product.id] || product.colors?.[0] || 'Standard';

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-[#FAF5EE] rounded-xl border border-[#E8D9C8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image Container with 3:4 Aspect Ratio */}
                    <div
                      onClick={() => navigateTo('product', { id: product.id })}
                      className="relative aspect-[3/4] bg-[#F4EDE4] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={currentCardImg}
                        alt={product.images[0]?.alt || product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Secondary image hover if no manual image override active */}
                      {!cardImageMap[product.id] && product.images[1] && (
                        <img
                          src={product.images[1].url}
                          alt={`${product.name} detail`}
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#3B2118] hover:text-[#B77D8D] shadow-sm transition-transform duration-200 hover:scale-110 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted(product.id) ? 'fill-[#B77D8D] text-[#B77D8D]' : ''
                          }`}
                        />
                      </button>

                      {/* Discount Badge */}
                      {product.discountPercent && (
                        <span className="absolute top-3 left-3 bg-[#8F5567] text-white text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
                          {product.discountPercent}% OFF
                        </span>
                      )}

                      {/* Multiple Photos Indicator / Thumbnail Switcher */}
                      {product.images && product.images.length > 1 && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/45 backdrop-blur-md px-1.5 py-0.5 rounded-md"
                        >
                          {product.images.slice(0, 3).map((img, iIdx) => {
                            const isSelectedImg = currentCardImg === img.url;
                            return (
                              <button
                                key={img.id || iIdx}
                                type="button"
                                onClick={() => setCardImageMap((prev) => ({ ...prev, [product.id]: img.url }))}
                                className={`w-2 h-2 rounded-full transition-transform cursor-pointer ${
                                  isSelectedImg ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/80'
                                }`}
                                title={img.viewType ? `${img.viewType} view` : `Photo ${iIdx + 1}`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#73574E] mb-1">
                          <span className="truncate max-w-[70%]">{product.fabric.split('&')[0]}</span>
                          <div className="flex items-center gap-1 text-amber-700">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span className="tabular-nums font-semibold">{product.rating}</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => navigateTo('product', { id: product.id })}
                          className="text-base font-bold text-[#3B2118] group-hover:text-[#8F5567] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-[#73574E] line-clamp-2 mt-1 leading-relaxed">
                          {product.shortDesc}
                        </p>

                        {/* Interactive Color Swatches on Card */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-[#73574E] font-semibold">Colors:</span>
                            {product.colors.slice(0, 4).map((colName) => {
                              const colMeta = LIGHT_COLOR_OPTIONS.find((c) => c.name === colName);
                              const isColorActive = activeCardColor === colName;

                              return (
                                <button
                                  key={colName}
                                  type="button"
                                  onClick={() => {
                                    setCardColorMap((prev) => ({ ...prev, [product.id]: colName }));
                                    const matchingImg = product.images.find(
                                      (img) => img.color?.toLowerCase() === colName.toLowerCase()
                                    );
                                    if (matchingImg) {
                                      setCardImageMap((prev) => ({ ...prev, [product.id]: matchingImg.url }));
                                    }
                                  }}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] transition-all cursor-pointer border ${
                                    isColorActive
                                      ? 'bg-white border-[#8F5567] text-[#3B2118] font-bold shadow-2xs'
                                      : 'bg-white/80 border-[#E8D9C8] hover:border-[#B77D8D] text-[#5D4238]'
                                  }`}
                                  title={`Switch to ${colName}`}
                                >
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{
                                      backgroundColor: colMeta?.hex || '#FAF5EE',
                                      border: `1px solid ${colMeta?.border || '#E8D9C8'}`,
                                    }}
                                  />
                                  <span>{colName}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Interactive Size Chips on Card */}
                        <div className="mt-2.5 flex items-center justify-between gap-1 flex-wrap">
                          <span className="text-[10px] text-[#73574E] font-semibold">Size:</span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                              const activeSize = cardSizeMap[product.id] || product.variants?.[0]?.size || 'M';
                              const isSizeActive = activeSize === sz;
                              const variant = product.variants?.find((v) => v.size === sz);
                              const isAvailable = variant ? variant.stock > 0 : true;

                              return (
                                <button
                                  key={sz}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => setCardSizeMap((prev) => ({ ...prev, [product.id]: sz }))}
                                  className={`text-[9px] min-w-[22px] h-5 px-1 rounded font-bold border transition-all cursor-pointer flex items-center justify-center ${
                                    isSizeActive
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
                      </div>

                      <div className="pt-3 border-t border-[#E8D9C8]/80 space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-base text-[#3B2118] tabular-nums">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-[#73574E]/60 line-through tabular-nums font-normal">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8F5567] font-semibold">
                            Size: {cardSizeMap[product.id] || product.variants?.[0]?.size || 'M'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              const chosenSize = cardSizeMap[product.id] || product.variants?.[0]?.size || 'M';
                              addToCart(product.id, chosenSize, activeCardColor, 1);
                            }}
                            className="py-1.5 px-2 bg-white hover:bg-[#FAF5EE] text-[#3B2118] border border-[#D8B4C0] hover:border-[#3B2118] rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center justify-center gap-1"
                            title="Add to Shopping Cart"
                          >
                            <ShoppingBag className="w-3 h-3 text-[#8F5567]" />
                            <span>Add</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const chosenSize = cardSizeMap[product.id] || product.variants?.[0]?.size || 'M';
                              buyNow(product, chosenSize, activeCardColor, 1);
                            }}
                            className="py-1.5 px-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1"
                            title="Direct Checkout"
                          >
                            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                            <span>Buy Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
