import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    navigateTo,
    setDirectCheckoutItem,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EE] shadow-2xl flex flex-col text-[#3B2118]">
          {/* Header */}
          <div className="p-6 border-b border-[#E8D9C8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8F5567]" />
              <h3 className="font-serif-luxury text-xl font-medium tracking-wide">Shopping Bag</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#8F5567]">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-[#FAF5EE] rounded-full text-[#73574E] hover:text-[#3B2118] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-[#B77D8D] shadow-xs">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg font-medium text-[#3B2118]">Your bag is empty</h4>
                  <p className="text-xs text-[#73574E] mt-1 max-w-xs mx-auto">
                    Discover our exquisite handcrafted ethnic ensembles and designer wear.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#3B2118] text-[#FAF5EE] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#2A160F] transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white border border-[#E8D9C8]/80 shadow-2xs">
                  <img
                    src={item.product.images[0]?.url || '/images/stitchora_hero.png'}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-[#FAF5EE]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-[#3B2118] line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#B77D8D] hover:text-red-600 transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-[#73574E] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#3B2118]">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#3B2118]">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E8D9C8] rounded-md overflow-hidden bg-[#FAF5EE]">
                        <button
                          onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 py-1 text-xs hover:bg-[#E8D9C8] transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs hover:bg-[#E8D9C8] transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-serif-luxury font-bold text-sm text-[#3B2118]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8D9C8] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#73574E]">Subtotal</span>
                <span className="font-serif-luxury text-xl font-bold text-[#3B2118]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#73574E]/80">
                Taxes and complimentary express shipping calculated at checkout.
              </p>
              <button
                onClick={() => {
                  setDirectCheckoutItem(null);
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3.5 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
