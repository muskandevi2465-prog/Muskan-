import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User } from '../types';
import { api } from '../services/api';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface DirectCheckoutItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface StoreContextType {
  // Navigation & routing state
  currentRoute: string;
  routeParams: Record<string, string>;
  navigateTo: (route: string, params?: Record<string, string>) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Cart & Buy Now
  cart: CartItem[];
  cartSubtotal: number;
  cartCount: number;
  isLoadingCart: boolean;
  directCheckoutItem: DirectCheckoutItem | null;
  setDirectCheckoutItem: (item: DirectCheckoutItem | null) => void;
  addToCart: (productId: string, size: string, color: string, quantity?: number) => Promise<void>;
  buyNow: (product: Product, size?: string, color?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;

  // Wishlist
  wishlist: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;

  // Auth
  user: User | null;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<void>;
  adminResetPassword: (email: string, code: string, newPass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, phone?: string) => Promise<void>;
  logout: () => void;

  // Global Toast Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Catalog Filters State
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState<DirectCheckoutItem | null>(null);

  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (route: string, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshCart = async () => {
    try {
      setIsLoadingCart(true);
      const data = await api.getCart();
      setCart(data.items || []);
      setCartSubtotal(data.subtotal || 0);
    } catch (err) {
      console.warn('Error fetching cart:', err);
    } finally {
      setIsLoadingCart(false);
    }
  };

  const refreshWishlist = async () => {
    try {
      const data = await api.getWishlist();
      setWishlist(data.items || []);
    } catch {
      // ignore
    }
  };

  const checkAuth = async () => {
    try {
      const data = await api.getCurrentUser();
      if (data?.user) {
        setUser(data.user);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    refreshCart();
    refreshWishlist();
  }, []);

  const addToCart = async (productId: string, size: string, color: string, quantity = 1) => {
    try {
      const res = await api.addToCart(productId, size, color, quantity);
      setCart(res.items || []);
      setCartSubtotal(res.subtotal || 0);
      setIsCartOpen(true);
      showToast('Added to your shopping bag');
    } catch (err: any) {
      showToast(err.message || 'Failed to add to bag', 'error');
    }
  };

  const buyNow = (product: Product, size = 'M', color = '', quantity = 1) => {
    const chosenColor = color || product.colors?.[0] || 'Signature';
    setDirectCheckoutItem({
      product,
      size,
      color: chosenColor,
      quantity,
    });
    // Ensure navigation smoothly transitions to checkout
    navigateTo('checkout', { buyNow: 'true', productId: product.id });
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await api.updateCartItem(itemId, quantity);
      setCart(res.items || []);
      setCartSubtotal(res.subtotal || 0);
    } catch (err: any) {
      showToast(err.message || 'Error updating quantity', 'error');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const res = await api.removeCartItem(itemId);
      setCart(res.items || []);
      setCartSubtotal(res.subtotal || 0);
      showToast('Item removed from bag', 'info');
    } catch (err: any) {
      showToast(err.message || 'Error removing item', 'error');
    }
  };

  const toggleWishlist = async (productId: string) => {
    try {
      const res = await api.toggleWishlist(productId);
      setWishlist(res.items || []);
      if (res.isAdded) {
        showToast('Saved to your wishlist');
      } else {
        showToast('Removed from wishlist', 'info');
      }
    } catch (err: any) {
      showToast('Please try again', 'error');
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const login = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    setUser(res.user);
    setIsAuthOpen(false);
    refreshCart();
    refreshWishlist();
    showToast(`Welcome back, ${res.user.name}`);
  };

  const adminLogin = async (email: string, pass: string) => {
    const res = await api.adminLogin(email, pass);
    setUser(res.user);
    showToast(`Authenticated as Administrator: ${res.user.name}`);
  };

  const adminResetPassword = async (email: string, code: string, newPass: string) => {
    const res = await api.verifyAndResetAdminPassword({
      email,
      verificationCode: code,
      newPassword: newPass,
    });
    setUser(res.user);
    showToast(`Admin password reset successful! Welcome, ${res.user.name}`);
  };

  const register = async (name: string, email: string, pass: string, phone?: string) => {
    const res = await api.register(name, email, pass, phone);
    setUser(res.user);
    setIsAuthOpen(false);
    showToast(`Account created! Welcome to Muskan's Stitching, ${name}`);
  };

  const logout = () => {
    localStorage.removeItem('stitchora_token');
    setUser(null);
    showToast('Signed out successfully', 'info');
    if (currentRoute === 'admin' || currentRoute === 'account') {
      navigateTo('home');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        cart,
        cartSubtotal,
        cartCount,
        isLoadingCart,
        directCheckoutItem,
        setDirectCheckoutItem,
        addToCart,
        buyNow,
        updateCartQuantity,
        removeFromCart,
        refreshCart,
        wishlist,
        isWishlisted,
        toggleWishlist,
        user,
        isAdmin: user?.role === 'ADMIN',
        login,
        adminLogin,
        adminResetPassword,
        register,
        logout,
        toasts,
        showToast,
        removeToast,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
