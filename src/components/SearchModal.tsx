import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await api.getProducts({ search: searchTerm.trim() });
        setResults(data.products || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Mauve Tiered Dress', 'Anarkali Suit', 'Raw Silk Co-ord', 'Velvet Kurta', 'Chanderi'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#3B2118]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative max-w-2xl mx-auto mt-16 sm:mt-24 px-4 pb-12">
        <div className="bg-[#FAF5EE] rounded-xl shadow-2xl border border-[#E8D9C8] overflow-hidden">
          {/* Search Input Box */}
          <div className="p-4 sm:p-6 border-b border-[#E8D9C8] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#3B2118]/60 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by silhouette, fabric, collection, or occasion..."
              className="w-full text-sm sm:text-base text-[#3B2118] placeholder:text-[#73574E]/50 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[#73574E]/60 hover:text-[#3B2118] p-1 cursor-pointer"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs text-[#73574E] hover:text-[#3B2118] font-medium uppercase tracking-wider px-2 py-1 rounded bg-[#F8F0E6] cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions */}
          {!searchTerm && (
            <div className="p-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73574E] block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1.5 bg-[#F4EDE4] hover:bg-[#E8D9C8] text-[#3B2118] rounded-full text-xs transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {loading && (
            <div className="p-8 text-center text-xs text-[#73574E]">
              Searching Muskan's Stitching collection...
            </div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-xs text-[#73574E]">
                No silhouettes found matching "{searchTerm}". Try searching for 'mauve', 'silk', or 'suit'.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="max-h-96 overflow-y-auto divide-y divide-[#E8D9C8]/60">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('product', { id: product.id });
                  }}
                  className="p-4 hover:bg-[#F4ECEE]/40 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded bg-[#F8F0E6] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif-luxury text-sm font-medium text-[#3B2118] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#73574E] truncate">{product.fabric}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold tabular-nums text-[#3B2118]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#B77D8D]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
