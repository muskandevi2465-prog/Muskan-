import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Truck,
  DollarSign,
  Tag,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Upload,
  ArrowRight,
  ExternalLink,
  LogOut,
  Save,
  Phone,
  MessageCircle,
  Mail,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  Database,
  Copy,
  Layers,
  FolderPlus,
  KeyRound,
  ArrowLeft,
  Sparkles,
  CheckCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Product, Order, Category } from '../types';
import { StitchoraLogo } from '../components/StitchoraLogo';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, navigateTo, showToast, adminLogin, adminResetPassword, logout } = useStore();

  // Admin Login State (when not authenticated)
  const [loginEmail, setLoginEmail] = useState('muskandevi2465@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Forgot / Reset Password State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('muskandevi2465@gmail.com');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeGeneratedNotice, setCodeGeneratedNotice] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'content' | 'coupons' | 'security' | 'supabase'>('products');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Category Management State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatSlug, setEditCatSlug] = useState('');
  const [editCatDesc, setEditCatDesc] = useState('');
  const [editCatImg, setEditCatImg] = useState('');

  // Products Tab Management State
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  // Quick Inline Price Edit State
  const [editingPriceProductId, setEditingPriceProductId] = useState<string | null>(null);
  const [quickPrice, setQuickPrice] = useState('');
  const [quickOriginalPrice, setQuickOriginalPrice] = useState('');

  // Direct Photo Upload State for existing product
  const [uploadingForProductId, setUploadingForProductId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeUploadTarget, setActiveUploadTarget] = useState<'existing' | 'newModal' | 'editModal'>('existing');

  // New Product Modal State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('cat-party-wear');
  const [newProdPrice, setNewProdPrice] = useState('7999');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('9999');
  const [newProdFabric, setNewProdFabric] = useState('Pure Chanderi Silk & Zari');
  const [newProdDesc, setNewProdDesc] = useState('Handcrafted bespoke silhouette with delicate hand-embroidery.');
  const [newProdImageUrl, setNewProdImageUrl] = useState('/images/f4.png');
  const [newProdStock, setNewProdStock] = useState('10');
  const [isUploadingNewImage, setIsUploadingNewImage] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProdName, setEditProdName] = useState('');
  const [editProdCategory, setEditProdCategory] = useState('');
  const [editProdPrice, setEditProdPrice] = useState('');
  const [editProdOriginalPrice, setEditProdOriginalPrice] = useState('');
  const [editProdFabric, setEditProdFabric] = useState('');
  const [editProdDesc, setEditProdDesc] = useState('');
  const [editProdImageUrl, setEditProdImageUrl] = useState('');

  // Order status update state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>('SHIPPED');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  // Website Content & Settings State
  const [announcementText, setAnnouncementText] = useState('Complimentary Express Delivery on orders above ₹1,999 · Pure Handloom Silks');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [supportPhone, setSupportPhone] = useState('+91 98765 43210');
  const [supportWhatsApp, setSupportWhatsApp] = useState('+91 98765 43210');
  const [supportEmail, setSupportEmail] = useState('concierge@muskansstitching.com');
  const [atelierAddress, setAtelierAddress] = useState('Boutique Atelier: Defence Colony, New Delhi · Mumbai Studio');
  const [codEnabled, setCodEnabled] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(1999);
  const [standardShippingFee, setStandardShippingFee] = useState(150);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Security / Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Coupon State
  const [coupons, setCoupons] = useState<any[]>([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');
  const [newCouponMinOrder, setNewCouponMinOrder] = useState('3999');

  // Supabase Backend Integration State
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');
  const [savingSupabaseKey, setSavingSupabaseKey] = useState(false);
  const [syncingOrders, setSyncingOrders] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const fetchSupabaseStatus = async () => {
    try {
      const res = await api.getSupabaseStatus();
      setSupabaseStatus(res);
    } catch (err) {
      console.error('Failed to load Supabase status:', err);
    }
  };

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, prodsData, catsData, ordersData, settingsData, couponsData] = await Promise.all([
        api.getAdminStats(),
        api.getProducts(),
        api.getCategories(),
        api.getAdminOrders().catch(() => api.getUserOrders()),
        api.getAdminSettings().catch(() => null),
        api.getCoupons().catch(() => ({ coupons: [] })),
      ]);

      setStats(statsData);
      setProducts(prodsData.products || []);
      setCategories(catsData.categories || []);
      setOrders(ordersData.orders || []);
      if (couponsData?.coupons) setCoupons(couponsData.coupons);
      fetchSupabaseStatus();

      if (settingsData) {
        if (settingsData.announcementBarText !== undefined) setAnnouncementText(settingsData.announcementBarText);
        if (settingsData.announcementBarEnabled !== undefined) setAnnouncementEnabled(settingsData.announcementBarEnabled);
        if (settingsData.supportPhone) setSupportPhone(settingsData.supportPhone);
        if (settingsData.supportWhatsApp) setSupportWhatsApp(settingsData.supportWhatsApp);
        if (settingsData.supportEmail) setSupportEmail(settingsData.supportEmail);
        if (settingsData.atelierAddress) setAtelierAddress(settingsData.atelierAddress);
        if (settingsData.codEnabled !== undefined) setCodEnabled(settingsData.codEnabled);
        if (settingsData.freeShippingThreshold !== undefined) setFreeShippingThreshold(settingsData.freeShippingThreshold);
        if (settingsData.standardShippingFee !== undefined) setStandardShippingFee(settingsData.standardShippingFee);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  // Handle Admin Login submission
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await adminLogin(loginEmail, loginPassword);
      setLoginPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 1. Request verification code for admin password reset (no old password required)
  const handleRequestResetCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResetError('');
    setResetSuccess('');
    setCodeGeneratedNotice('');
    setResetLoading(true);

    try {
      const res = await api.requestAdminForgotPassword(resetEmail.trim());
      setGeneratedCode(res.verificationCode);
      setResetCode(res.verificationCode); // auto-populate for effortless one-step experience
      setCodeGeneratedNotice(res.message);
      setResetStep('verify');
      showToast('Verification code generated for authorized administrator!');
    } catch (err: any) {
      setResetError(err.message || 'Failed to request password reset code');
    } finally {
      setResetLoading(false);
    }
  };

  // 2. Verify code and set new admin password without requiring old password
  const handleVerifyAndResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!resetCode.trim()) {
      setResetError('Please enter the 6-digit verification code.');
      return;
    }

    if (newPasswordVal.length < 6) {
      setResetError('New password must be at least 6 characters long.');
      return;
    }

    if (newPasswordVal !== confirmPasswordVal) {
      setResetError('New password and confirm password do not match.');
      return;
    }

    setResetLoading(true);
    try {
      await adminResetPassword(resetEmail.trim(), resetCode.trim(), newPasswordVal);
      setResetSuccess("Your Muskan's Stitching Admin password has been updated securely in the backend database! All existing products, orders, and content are safe.");
      showToast('Admin password reset successfully! Logged into Admin Panel.');
      // Keep loginPassword in sync if they ever log out
      setLoginPassword(newPasswordVal);
      setIsResetMode(false);
      setResetStep('request');
      setNewPasswordVal('');
      setConfirmPasswordVal('');
    } catch (err: any) {
      setResetError(err.message || 'Failed to update administrator password.');
    } finally {
      setResetLoading(false);
    }
  };

  // Quick Price Edit handler
  const handleSaveQuickPrice = async (productId: string) => {
    const numPrice = parseFloat(quickPrice);
    if (isNaN(numPrice) || numPrice <= 0) {
      showToast('Please enter a valid price', 'error');
      return;
    }

    const numOrig = quickOriginalPrice ? parseFloat(quickOriginalPrice) : undefined;

    try {
      await api.updateAdminProduct(productId, {
        price: numPrice,
        originalPrice: numOrig,
      });

      setProducts(prev =>
        prev.map(p =>
          p.id === productId
            ? { ...p, price: numPrice, originalPrice: numOrig }
            : p
        )
      );

      setEditingPriceProductId(null);
      showToast('Product price updated successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to update price', 'error');
    }
  };

  // Direct Photo Upload Trigger from PC
  const triggerFileUpload = (target: 'existing' | 'newModal' | 'editModal', productId?: string) => {
    setActiveUploadTarget(target);
    if (productId) setUploadingForProductId(productId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        showToast('Uploading photo...', 'info');
        const res = await api.uploadPhoto(base64Data, file.name);
        const uploadedUrl = res.url;

        if (activeUploadTarget === 'newModal') {
          setNewProdImageUrl(uploadedUrl);
          showToast('Photo uploaded for new silhouette!');
        } else if (activeUploadTarget === 'editModal') {
          setEditProdImageUrl(uploadedUrl);
          showToast('New photo uploaded for silhouette!');
        } else if (activeUploadTarget === 'existing' && uploadingForProductId) {
          await api.updateAdminProduct(uploadingForProductId, {
            images: [
              { id: 'img-' + Date.now(), url: uploadedUrl, alt: 'Updated Silhouette Photo', isPrimary: true }
            ]
          });

          setProducts(prev =>
            prev.map(p =>
              p.id === uploadingForProductId
                ? {
                    ...p,
                    images: [{ id: 'img-' + Date.now(), url: uploadedUrl, alt: p.name, isPrimary: true }]
                  }
                : p
            )
          );
          showToast('Product photo updated successfully!');
          setUploadingForProductId(null);
        }
      } catch (err: any) {
        showToast(err.message || 'Failed to upload image', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Product handler
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newProdName,
        categoryId: newProdCategory,
        price: parseFloat(newProdPrice),
        originalPrice: newProdOriginalPrice ? parseFloat(newProdOriginalPrice) : undefined,
        fabric: newProdFabric,
        description: newProdDesc,
        shortDesc: newProdDesc.slice(0, 80) + '...',
        careInstructions: 'Dry clean only',
        occasion: 'Festive & Celebration',
        fit: 'Regular Tailored',
        images: [{ id: 'img-' + Date.now(), url: newProdImageUrl, alt: newProdName, isPrimary: true }],
        variants: [
          { id: `v-${Date.now()}-xs`, productId: '', size: 'XS', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-XS` },
          { id: `v-${Date.now()}-s`, productId: '', size: 'S', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-S` },
          { id: `v-${Date.now()}-m`, productId: '', size: 'M', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-M` },
          { id: `v-${Date.now()}-l`, productId: '', size: 'L', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-L` },
          { id: `v-${Date.now()}-xl`, productId: '', size: 'XL', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-XL` },
          { id: `v-${Date.now()}-xxl`, productId: '', size: 'XXL', color: 'Signature', stock: parseInt(newProdStock, 10), sku: `SKU-${Date.now()}-XXL` },
        ],
        featured: true,
        bestSeller: false,
        isNewArrival: false,
      };

      const res = await api.createAdminProduct(payload);
      if (res.product) {
        setProducts([res.product, ...products]);
        setIsAddingProduct(false);
        showToast('New silhouette added to boutique catalog!');
        setNewProdName('');
      }
    } catch (err: any) {
      showToast(err.message || 'Error creating product', 'error');
    }
  };

  // Full Edit Product handler
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setEditProdName(p.name);
    setEditProdCategory(p.categoryId);
    setEditProdPrice(p.price.toString());
    setEditProdOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setEditProdFabric(p.fabric || '');
    setEditProdDesc(p.description || '');
    setEditProdImageUrl(p.images[0]?.url || '');
  };

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const updates = {
        name: editProdName,
        categoryId: editProdCategory,
        price: parseFloat(editProdPrice),
        originalPrice: editProdOriginalPrice ? parseFloat(editProdOriginalPrice) : undefined,
        fabric: editProdFabric,
        description: editProdDesc,
        images: [{ id: 'img-' + Date.now(), url: editProdImageUrl, alt: editProdName, isPrimary: true }],
      };

      await api.updateAdminProduct(editingProduct.id, updates);
      setProducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? { ...p, ...updates } : p))
      );
      setEditingProduct(null);
      showToast('Product details updated successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to update product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the catalog?`)) return;
    try {
      await api.deleteAdminProduct(id);
      setProducts(products.filter(p => p.id !== id));
      showToast('Product removed from catalog');
    } catch {
      showToast('Failed to delete product', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string) => {
    try {
      const res = await api.updateAdminOrderStatus(orderId, selectedStatus, trackingNumberInput || undefined);
      setOrders(orders.map(o => (o.id === orderId ? res.order : o)));
      setEditingOrderId(null);
      showToast(`Order status updated to ${selectedStatus}`);
    } catch {
      showToast('Error updating order status', 'error');
    }
  };

  // Save Website Content handler
  const handleSaveWebsiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await api.updateAdminSettings({
        announcementBarText: announcementText,
        announcementBarEnabled: announcementEnabled,
        supportPhone,
        supportWhatsApp,
        supportEmail,
        atelierAddress,
        codEnabled,
        freeShippingThreshold,
        standardShippingFee,
      });
      showToast('Website content and settings saved live!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Change Admin Password handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await api.adminChangePassword(newPassword);
      showToast('Admin password updated securely on the server!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Category CRUD Handlers
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showToast('Category name is required', 'error');
      return;
    }
    try {
      const res = await api.createAdminCategory({
        name: newCatName.trim(),
        slug: newCatSlug.trim() || undefined,
        description: newCatDesc.trim(),
        imageUrl: newCatImg.trim() || '/images/f4.png',
        isActive: true,
      });
      if (res.category) {
        setCategories(prev => [...prev, res.category]);
        setIsAddingCategory(false);
        setNewCatName('');
        setNewCatSlug('');
        setNewCatDesc('');
        setNewCatImg('');
        showToast('New category created successfully!');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to create category', 'error');
    }
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditCatSlug(cat.slug);
    setEditCatDesc(cat.description || '');
    setEditCatImg(cat.imageUrl || '');
  };

  const handleSaveEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const res = await api.updateAdminCategory(editingCategory.id, {
        name: editCatName.trim(),
        slug: editCatSlug.trim(),
        description: editCatDesc.trim(),
        imageUrl: editCatImg.trim(),
      });
      if (res.category) {
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? res.category : c));
        setEditingCategory(null);
        showToast('Category updated successfully!');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (cat: Category) => {
    if (!window.confirm(`Are you sure you want to delete the category "${cat.name}"? Products in this category will remain in the catalog.`)) return;
    try {
      await api.deleteAdminCategory(cat.id);
      setCategories(prev => prev.filter(c => c.id !== cat.id));
      showToast('Category deleted successfully');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category', 'error');
    }
  };

  const handleToggleCategoryActive = async (cat: Category) => {
    try {
      const res = await api.updateAdminCategory(cat.id, { isActive: !cat.isActive });
      if (res.category) {
        setCategories(prev => prev.map(c => c.id === cat.id ? res.category : c));
        showToast(`Category ${res.category.isActive ? 'activated' : 'deactivated'}`);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update category status', 'error');
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.fabric.toLowerCase().includes(productSearch.toLowerCase());

    const matchesCat =
      selectedCategoryFilter === 'all' ||
      p.categoryId === selectedCategoryFilter ||
      p.categoryId === `cat-${selectedCategoryFilter}`;

    return matchesSearch && matchesCat;
  });

  // =========================================================================
  // 1. UNAUTHENTICATED: SECURE ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-[#FAF5EE] via-[#F4EDE4] to-[#FAF5EE] flex items-center justify-center px-4 py-16">
        {/* Hidden File Input (reusable) */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#E8D9C8] relative overflow-hidden">
          {/* Top Decorative Couture Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8F5567] via-[#D8B4C0] to-[#3B2118]" />

          {/* Logo & Lock / Key Badge */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#3B2118] text-[#FAF5EE] flex items-center justify-center shadow-lg ring-4 ring-[#FAF5EE]">
              {isResetMode ? (
                <KeyRound className="w-7 h-7 text-[#D8B4C0]" />
              ) : (
                <Lock className="w-7 h-7 text-[#D8B4C0]" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8F5567]">
                Restricted Atelier Portal
              </span>
              <h1 className="font-serif-luxury text-3xl font-medium text-[#3B2118]">
                {isResetMode ? 'Reset Admin Password' : "Muskan's Stitching Admin Login"}
              </h1>
              <p className="text-xs text-[#73574E] leading-relaxed max-w-xs mx-auto">
                {isResetMode
                  ? 'Verify your registered administrator email to set a brand-new password without requiring your old password.'
                  : 'Secure management gateway for boutique catalog, customer orders, live pricing, and atelier content.'}
              </p>
            </div>
          </div>

          {/* Authorized Email Notice */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#FAF5EE] border border-[#D8B4C0] flex items-start gap-2.5 text-xs text-[#5D4238]">
            <ShieldCheck className="w-4 h-4 text-[#8F5567] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-[#3B2118] block">Authorized Administrator Access</span>
              <p className="text-[11.5px] text-[#73574E] leading-snug">
                Only the designated owner email (<strong className="text-[#3B2118]">muskandevi2465@gmail.com</strong>) has access privileges.
              </p>
            </div>
          </div>

          {/* Global Reset Success Message */}
          {resetSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{resetSuccess}</span>
            </div>
          )}

          {/* Error Message Box */}
          {(loginError || resetError) && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{isResetMode ? resetError : loginError}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW A: FORGOT / RESET PASSWORD FORM (NO OLD PASSWORD)    */}
          {/* ======================================================== */}
          {isResetMode ? (
            <div className="space-y-4">
              {/* Back to normal login bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#FAF5EE]">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setResetError('');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8F5567] hover:text-[#3B2118] font-bold cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </button>
                <span className="text-[10.5px] font-bold text-[#8F5567] bg-[#FAF5EE] px-2 py-0.5 rounded-md border border-[#D8B4C0]/50">
                  Step {resetStep === 'request' ? '1 of 2' : '2 of 2'}
                </span>
              </div>

              {resetStep === 'request' ? (
                /* Step 1: Verify Registered Email */
                <form onSubmit={handleRequestResetCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider mb-1.5">
                      Verify Registered Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="muskandevi2465@gmail.com"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-[#73574E] mt-1.5 leading-relaxed">
                      We will verify your administrator identity and issue a secure 6-digit verification code to set your new password.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50 active:scale-[0.99]"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#D8B4C0]" />
                        <span>Verifying Administrator Email...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 text-[#D8B4C0]" />
                        <span>Send 6-Digit Verification Code</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Step 2: Enter Verification Code & New Password */
                <form onSubmit={handleVerifyAndResetPassword} className="space-y-4">
                  {/* Generated code notification box */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FAF5EE] to-[#F4EDE4] border border-[#D8B4C0] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#3B2118] flex items-center gap-1.5">
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                        <span>Admin Identity Verified</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleRequestResetCode}
                        disabled={resetLoading}
                        className="text-[10px] text-[#8F5567] hover:underline font-semibold cursor-pointer"
                      >
                        Resend Code
                      </button>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-[#D8B4C0]/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#73574E] block">
                          Security Verification Code
                        </span>
                        <span className="font-mono text-base font-extrabold tracking-widest text-[#3B2118]">
                          {generatedCode || resetCode}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Active (15 mins)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider mb-1.5">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="123456"
                      className="w-full px-3 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-center font-mono text-base font-bold tracking-widest text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider mb-1.5">
                      New Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3.5" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={newPasswordVal}
                        onChange={(e) => setNewPasswordVal(e.target.value)}
                        placeholder="Enter new private password (min 6 chars)"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-[#73574E] hover:text-[#3B2118] cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider mb-1.5">
                      Confirm New Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3.5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={confirmPasswordVal}
                        onChange={(e) => setConfirmPasswordVal(e.target.value)}
                        placeholder="Confirm your new private password"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-[#73574E] hover:text-[#3B2118] cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#73574E] leading-relaxed">
                    Once saved, your password will be updated directly in the backend database. You do not need the old password. All existing products, categories, orders, and content will remain completely safe.
                  </p>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8F5567] to-[#3B2118] hover:from-[#784454] hover:to-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50 active:scale-[0.99]"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#D8B4C0]" />
                        <span>Updating Password in Backend...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D8B4C0]" />
                        <span>Save New Password & Enter Admin Panel</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setResetStep('request')}
                      className="text-xs text-[#73574E] hover:text-[#3B2118] hover:underline cursor-pointer"
                    >
                      ← Change Admin Email ID
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* VIEW B: STANDARD SECURE ADMIN LOGIN FORM                 */
            /* ======================================================== */
            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider mb-1.5">
                  Admin Email ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="muskandevi2465@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password field group (Matches CSS selector for focused element) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                    Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8F5567] hover:text-[#3B2118] hover:underline cursor-pointer transition-colors"
                  >
                    <KeyRound className="w-3 h-3 text-[#8F5567]" />
                    <span>Forgot Password?</span>
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#73574E] hover:text-[#3B2118] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-1.5 text-[10.5px]">
                  <span className="text-[#73574E]">Protected & verified on backend</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="text-[#8F5567] font-bold hover:underline cursor-pointer"
                  >
                    Reset without old password →
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 active:scale-[0.99]"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D8B4C0]" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#D8B4C0]" />
                    <span>Sign In to Admin Panel</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="pt-6 mt-6 border-t border-[#E8D9C8] text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-[#73574E] hover:text-[#3B2118] transition-colors cursor-pointer inline-flex items-center gap-1.5 font-medium"
            >
              <span>← Return to Muskan's Stitching Boutique Store</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED: FULL MUSKAN'S STITCHING ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hidden File Input for Device Photo Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Admin Top Header Banner with Luxury Heading */}
      <div className="bg-[#3B2118] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl border border-[#523024] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8F5567]/20 blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#523024] border border-[#8F5567]/40 text-[#D8B4C0] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8B4C0]" />
            <span>Authenticated Administrator Console</span>
          </div>

          {/* Requested Heading of Admin Panel */}
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF5EE]">
            Muskan's Stitching Atelier Admin Panel
          </h1>

          <p className="text-xs sm:text-sm text-[#E8D9C8]/85 max-w-2xl leading-relaxed">
            Welcome, <strong className="text-white">{user?.name}</strong> ({user?.email}) · Full authority to manage catalog silhouettes, upload photos, update prices, track orders, and customize website content.
          </p>
        </div>

        {/* Action Buttons in Banner */}
        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => setIsAddingProduct(true)}
            className="px-4 py-2.5 bg-[#B77D8D] hover:bg-[#9B6372] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Silhouette</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#FAF5EE] border border-[#E8D9C8]/30 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Boutique</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2.5 bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-700/50 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            title="Log out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8D9C8] scrollbar-none text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalog & Prices ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Orders & Tracking ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'content'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Website Content</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'coupons'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Coupons</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'security'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Admin Security</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('supabase');
            fetchSupabaseStatus();
          }}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'supabase'
              ? 'bg-[#3B2118] text-[#FAF5EE] shadow-sm'
              : 'text-[#73574E] hover:text-[#3B2118] hover:bg-[#F4EDE4]'
          }`}
        >
          <Database className="w-4 h-4 text-[#D8B4C0]" />
          <span>Supabase Backend (ogiiheusnnyzqzltontv)</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: PRODUCTS & PRICES MANAGEMENT (Core user requirement)
      ====================================================================== */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Controls Bar: Search, Category Filters, and Add Button */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8D9C8] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#73574E] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products by title, SKU, or fabric..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-[#3B2118] text-[#FAF5EE]'
                    : 'bg-[#FAF5EE] text-[#5D4238] hover:bg-[#E8D9C8]'
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-[#3B2118] text-[#FAF5EE]'
                      : 'bg-[#FAF5EE] text-[#5D4238] hover:bg-[#E8D9C8]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Product Items Table / Card Grid */}
          <div className="bg-white rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-2xs divide-y divide-[#E8D9C8]">
            <div className="p-4 bg-[#FAF5EE] border-b border-[#E8D9C8] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73574E]">
              <span>Showing {filteredProducts.length} Silhouettes</span>
              <span className="hidden sm:inline text-[11px] font-normal text-[#8F5567]">
                Click "Quick Edit Price" to update prices immediately · Click photo icon to upload a new picture
              </span>
            </div>

            {filteredProducts.map((p) => {
              const primaryImg = p.images[0]?.url || '/images/f4.png';
              const isEditingPrice = editingPriceProductId === p.id;
              const catName = categories.find(c => c.id === p.categoryId)?.name || p.categoryId;

              return (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF5EE]/40 transition-colors">
                  {/* Photo & Main Details */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Thumbnail with Photo Upload overlay */}
                    <div className="relative group w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#E8D9C8] shrink-0 shadow-2xs">
                      <img
                        src={primaryImg}
                        alt={p.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <button
                        onClick={() => triggerFileUpload('existing', p.id)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-[10px] font-semibold cursor-pointer p-1 text-center"
                        title="Upload new photo for this dress"
                      >
                        <Upload className="w-4 h-4 text-[#D8B4C0]" />
                        <span>Change Photo</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF5EE] border border-[#E8D9C8] text-[#8F5567]">
                          {catName}
                        </span>
                        <span className="text-[10px] text-[#73574E] font-mono">
                          SKU: {p.sku}
                        </span>
                      </div>

                      <h4 className="font-serif-luxury text-base sm:text-lg font-medium text-[#3B2118]">
                        {p.name}
                      </h4>

                      <p className="text-xs text-[#73574E] line-clamp-1 max-w-lg">
                        {p.fabric} · {p.occasion}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-[#73574E]">
                        <span>Sizes: {p.variants?.map(v => v.size).join(', ') || 'All'}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">In Stock</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Quick Editor Area */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 justify-between md:justify-end">
                    {isEditingPrice ? (
                      <div className="bg-[#FAF5EE] p-3 rounded-xl border border-[#B77D8D] flex items-center gap-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#73574E] block">Selling Price (₹)</label>
                          <input
                            type="number"
                            value={quickPrice}
                            onChange={(e) => setQuickPrice(e.target.value)}
                            className="w-24 px-2 py-1 bg-white border border-[#E8D9C8] rounded text-xs text-[#3B2118] font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#73574E] block">MRP (₹)</label>
                          <input
                            type="number"
                            value={quickOriginalPrice}
                            onChange={(e) => setQuickOriginalPrice(e.target.value)}
                            className="w-24 px-2 py-1 bg-white border border-[#E8D9C8] rounded text-xs text-[#73574E]"
                          />
                        </div>
                        <button
                          onClick={() => handleSaveQuickPrice(p.id)}
                          className="p-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer mt-3"
                          title="Save updated price"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingPriceProductId(null)}
                          className="p-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer mt-3"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-left md:text-right">
                        <div className="flex items-baseline gap-2 md:justify-end">
                          <span className="text-lg font-bold text-[#3B2118]">₹{p.price.toLocaleString('en-IN')}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-[#73574E] line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setEditingPriceProductId(p.id);
                            setQuickPrice(p.price.toString());
                            setQuickOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
                          }}
                          className="text-[11px] text-[#8F5567] hover:underline font-semibold cursor-pointer block mt-0.5"
                        >
                          Quick Edit Price
                        </button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerFileUpload('existing', p.id)}
                        className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] border border-[#E8D9C8] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                        title="Upload photo from PC"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#8F5567]" />
                        <span className="hidden sm:inline">Photo</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] border border-[#E8D9C8] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                        title="Edit all product specifications"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center text-[#73574E] space-y-3">
                <Package className="w-10 h-10 mx-auto text-[#D8B4C0]" />
                <p className="text-sm">No silhouettes matched your search filter.</p>
                <button
                  onClick={() => {
                    setProductSearch('');
                    setSelectedCategoryFilter('all');
                  }}
                  className="text-xs text-[#8F5567] font-semibold underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB: CATEGORIES MANAGEMENT (Requested requirement)
      ====================================================================== */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#D8B4C0] text-[11px] font-bold text-[#8F5567] uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Boutique Silhouettes & Collections</span>
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#3B2118]">
                Category Management
              </h3>
              <p className="text-xs text-[#73574E] mt-0.5">
                Create and organize collections. Changes instantly reflect on shop filters and navigation.
              </p>
            </div>

            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2.5 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <FolderPlus className="w-4 h-4 text-[#D8B4C0]" />
              <span>Add New Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const productCount = products.filter(
                p => p.categoryId === cat.id || p.categoryId === `cat-${cat.slug}`
              ).length;

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8] overflow-hidden shrink-0">
                          <img
                            src={cat.imageUrl || '/images/f4.png'}
                            alt={cat.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#3B2118] line-clamp-1">
                            {cat.name}
                          </h4>
                          <span className="font-mono text-[10.5px] text-[#8F5567] block">
                            slug: {cat.slug}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleCategoryActive(cat)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        }`}
                        title="Click to toggle visibility on website"
                      >
                        {cat.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </div>

                    <p className="text-xs text-[#73574E] line-clamp-2 leading-relaxed">
                      {cat.description || 'Custom handcrafted boutique collection.'}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[#FAF5EE]">
                      <span className="text-[#73574E] font-medium">Assigned Products:</span>
                      <span className="font-bold text-[#3B2118] bg-[#FAF5EE] px-2.5 py-0.5 rounded-md border border-[#E8D9C8]">
                        {productCount} Silhouettes
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF5EE] border-t border-[#E8D9C8] flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategory(cat)}
                      className="px-3 py-1.5 bg-white hover:bg-[#FAF5EE] text-[#3B2118] border border-[#D8B4C0] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#8F5567]" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: ORDERS & FULFILLMENT MANAGEMENT
      ====================================================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Customer Orders & Dispatch</h3>
            <span className="text-xs text-[#73574E]">Manage status & assign courier tracking IDs</span>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl border border-[#E8D9C8] p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8D9C8] pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#8F5567] block">
                      {ord.orderNumber}
                    </span>
                    <span className="text-xs text-[#73574E]">
                      Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      ord.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.status === 'SHIPPED'
                        ? 'bg-indigo-100 text-indigo-800'
                        : ord.status === 'CONFIRMED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {ord.status}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] text-xs font-medium text-[#3B2118]">
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>

                    <span className="text-sm font-bold text-[#3B2118] ml-2">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Customer and Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#5D4238] bg-[#FAF5EE]/60 p-4 rounded-xl border border-[#E8D9C8]/60">
                  <div>
                    <span className="font-semibold text-[#3B2118] block mb-1">Customer Contact:</span>
                    <p>{ord.customerName}</p>
                    <p>{ord.customerEmail}</p>
                    <p>{ord.customerPhone}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2118] block mb-1">Shipping Address:</span>
                    <p>{ord.shippingAddress?.street}, {ord.shippingAddress?.city}</p>
                    <p>{ord.shippingAddress?.state} - {ord.shippingAddress?.pincode}</p>
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#3B2118] block">Items in Order ({ord.items?.length || 0}):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ord.items?.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-[#FAF5EE] rounded-lg border border-[#E8D9C8]">
                        <img src={it.productImage || '/images/f4.png'} alt="" className="w-10 h-12 object-cover rounded shrink-0" />
                        <div className="text-xs">
                          <span className="font-medium text-[#3B2118] block line-clamp-1">{it.productName}</span>
                          <span className="text-[#73574E] text-[11px]">Size: {it.size} · Qty: {it.quantity} · ₹{it.totalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edit Status & Courier Tracking Form */}
                {editingOrderId === ord.id ? (
                  <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#8F5567] space-y-3 pt-3">
                    <span className="text-xs font-bold text-[#3B2118] block">Update Status & Courier Tracking ID</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#73574E] mb-1">Fulfillment Status</label>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#E8D9C8] rounded-lg text-[#3B2118] font-medium"
                        >
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#73574E] mb-1">Courier AWB / Tracking No.</label>
                        <input
                          type="text"
                          value={trackingNumberInput}
                          onChange={(e) => setTrackingNumberInput(e.target.value)}
                          placeholder="e.g. DELHIVERY-891240"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#E8D9C8] rounded-lg text-[#3B2118]"
                        />
                      </div>

                      <div className="flex items-end gap-2">
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.id)}
                          className="px-4 py-2 bg-[#3B2118] text-[#FAF5EE] rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#2A160F]"
                        >
                          Save Update
                        </button>
                        <button
                          onClick={() => setEditingOrderId(null)}
                          className="px-3 py-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-lg text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-[#E8D9C8]/70">
                    <span className="text-[#73574E]">
                      Courier Tracking: <strong className="text-[#3B2118]">{ord.trackingNumber || 'Not assigned yet'}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setEditingOrderId(ord.id);
                        setSelectedStatus(ord.status);
                        setTrackingNumberInput(ord.trackingNumber || '');
                      }}
                      className="px-3 py-1.5 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] rounded-lg text-xs font-semibold cursor-pointer border border-[#E8D9C8]"
                    >
                      Update Fulfillment & Tracking
                    </button>
                  </div>
                )}
              </div>
            ))}

            {orders.length === 0 && (
              <div className="bg-white p-12 text-center text-[#73574E] rounded-2xl border border-[#E8D9C8]">
                <Truck className="w-10 h-10 mx-auto text-[#D8B4C0] mb-2" />
                <p className="text-sm">No customer orders recorded yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: EDIT WEBSITE CONTENT & SETTINGS (Requested requirement)
      ====================================================================== */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveWebsiteContent} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-8">
          <div>
            <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Live Website Content Management</h3>
            <p className="text-xs text-[#73574E] mt-1">
              Changes made here update your live boutique website immediately without code edits.
            </p>
          </div>

          {/* Section 1: Top Announcement Bar */}
          <div className="space-y-4 pb-6 border-b border-[#E8D9C8]">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-sm text-[#3B2118] block">Top Header Announcement Bar</span>
                <span className="text-xs text-[#73574E]">Appears at the very top of your boutique</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementEnabled}
                  onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-[#3B2118]"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4238] mb-1">Announcement Message Text</label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>
          </div>

          {/* Section 2: Store Concierge & Customer Contact Details */}
          <div className="space-y-4 pb-6 border-b border-[#E8D9C8]">
            <span className="font-semibold text-sm text-[#3B2118] block">Boutique Concierge & Contact Numbers</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5D4238] mb-1">WhatsApp Chat Number</label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={supportWhatsApp}
                    onChange={(e) => setSupportWhatsApp(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5D4238] mb-1">Customer Service Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5D4238] mb-1">Concierge Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4238] mb-1">Physical Atelier Address / Studio</label>
              <input
                type="text"
                value={atelierAddress}
                onChange={(e) => setAtelierAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
              />
            </div>
          </div>

          {/* Section 3: Delivery & Checkout Policies */}
          <div className="space-y-4 pb-6 border-b border-[#E8D9C8]">
            <span className="font-semibold text-sm text-[#3B2118] block">Payment & Shipping Rules</span>

            <div className="flex items-center justify-between p-3.5 bg-[#FAF5EE] rounded-xl border border-[#E8D9C8]">
              <div>
                <span className="font-semibold text-xs text-[#3B2118] block">Cash on Delivery (COD) Option</span>
                <span className="text-[11px] text-[#73574E]">Enable cash payment upon doorstep courier delivery</span>
              </div>
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#3B2118] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5D4238] mb-1">Free Shipping Order Minimum (₹)</label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-[#3B2118]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5D4238] mb-1">Standard Courier Fee (₹)</label>
                <input
                  type="number"
                  value={standardShippingFee}
                  onChange={(e) => setStandardShippingFee(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-[#3B2118]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingSettings}
              className="px-6 py-3 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              {isSavingSettings ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#D8B4C0]" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#D8B4C0]" />
                  <span>Save Website Content & Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* =====================================================================
          TAB 4: ANALYTICS OVERVIEW
      ====================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73574E] block">Gross Revenue</span>
              <div className="text-2xl font-bold text-[#3B2118]">₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-emerald-700 font-medium">From fulfilled orders</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73574E] block">Total Orders</span>
              <div className="text-2xl font-bold text-[#3B2118]">{stats?.totalOrders || orders.length}</div>
              <span className="text-[11px] text-[#8F5567] font-medium">Across all states</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73574E] block">Active Catalog</span>
              <div className="text-2xl font-bold text-[#3B2118]">{products.length} Dresses</div>
              <span className="text-[11px] text-[#73574E]">Handcrafted Silhouettes</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73574E] block">Registered Clients</span>
              <div className="text-2xl font-bold text-[#3B2118]">{stats?.totalCustomers || 12}</div>
              <span className="text-[11px] text-emerald-700 font-medium">Atelier Privé Members</span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: DISCOUNT COUPONS
      ====================================================================== */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Promotion & Discount Vouchers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] space-y-2 shadow-2xs">
              <span className="font-mono text-base font-bold text-[#B77D8D] block">WELCOME10</span>
              <p className="text-xs text-[#73574E]">10% off on first orders above ₹2,999</p>
              <div className="text-[11px] text-emerald-700 font-semibold">Active · 142 redemptions</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] space-y-2 shadow-2xs">
              <span className="font-mono text-base font-bold text-[#B77D8D] block">FESTIVE15</span>
              <p className="text-xs text-[#73574E]">15% off on festive collections above ₹4,999</p>
              <div className="text-[11px] text-emerald-700 font-semibold">Active · 89 redemptions</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8D9C8] space-y-2 shadow-2xs">
              <span className="font-mono text-base font-bold text-[#B77D8D] block">MUSKAN500</span>
              <p className="text-xs text-[#73574E]">Flat ₹500 off on cart orders above ₹3,500</p>
              <div className="text-[11px] text-emerald-700 font-semibold">Active · 215 redemptions</div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: ADMIN SECURITY & PASSWORD UPDATE
      ====================================================================== */}
      {activeTab === 'security' && (
        <div className="max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-[#E8D9C8] shadow-2xs space-y-6">
          <div>
            <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Administrator Security Settings</h3>
            <p className="text-xs text-[#73574E] mt-1">
              Your password is encrypted and stored safely on the backend server. You can change it here anytime.
            </p>
          </div>

          <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#E8D9C8] text-xs text-[#5D4238] space-y-1">
            <span className="font-bold text-[#3B2118] block">Authorized Owner Account:</span>
            <p className="font-mono text-[#8F5567]">{user?.email}</p>
            <p className="text-[11px] text-[#73574E] pt-1">
              Backend role: ADMIN (Superuser with full database privileges).
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5D4238] mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter at least 6 characters"
                className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4238] mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:bg-white focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-6 py-2.5 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              {isUpdatingPassword ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#D8B4C0]" />
                  <span>Saving New Password...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#D8B4C0]" />
                  <span>Update Admin Password</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* =====================================================================
          TAB 7: SUPABASE BACKEND INTEGRATION (Project ID: ogiiheusnnyzqzltontv)
      ====================================================================== */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          {/* Main Status & Configuration Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8D9C8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8D9C8]">
              <div className="space-y-2">
                {supabaseStatus?.connected ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Supabase Backend Connected & Live</span>
                  </div>
                ) : supabaseStatus?.hasKey ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>API Key Configured · Run SQL Schema to Verify</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Project Configured · Awaiting Supabase API Key</span>
                  </div>
                )}
                <h3 className="font-serif-luxury text-2xl font-bold text-[#3B2118]">
                  Supabase Backend Integration
                </h3>
                <p className="text-xs text-[#73574E] max-w-2xl leading-relaxed">
                  Your Muskan's Stitching store is configured to stream and persist all customer order form submissions into your Supabase project tables (<code className="font-mono text-[#8F5567] font-bold">orders</code> and <code className="font-mono text-[#8F5567] font-bold">order_items</code>).
                </p>

                {supabaseStatus?.error && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 max-w-2xl">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-bold">Supabase Status Notice:</span>
                      <p>{supabaseStatus.error}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://supabase.com/dashboard/project/ogiiheusnnyzqzltontv"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Supabase Project</span>
                </a>
                <a
                  href="https://supabase.com/dashboard/project/ogiiheusnnyzqzltontv/sql/new"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] border border-[#D8B4C0] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <Database className="w-3.5 h-3.5 text-[#8F5567]" />
                  <span>Supabase SQL Editor</span>
                </a>
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F5567] block">
                  Project Reference ID
                </span>
                <span className="font-mono text-sm font-bold text-[#3B2118] select-all">
                  ogiiheusnnyzqzltontv
                </span>
                <span className="text-[10px] text-emerald-700 block font-semibold">
                  ✓ Configured in Muskan's Stitching Backend
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F5567] block">
                  Supabase API Endpoint
                </span>
                <span className="font-mono text-xs font-medium text-[#3B2118] select-all truncate block">
                  https://ogiiheusnnyzqzltontv.supabase.co
                </span>
                <span className="text-[10px] text-[#73574E] block">
                  PostgREST REST API v1
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F5567] block">
                  Target Database Tables
                </span>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="px-2 py-0.5 rounded bg-white text-[10.5px] font-mono font-bold text-[#3B2118] border border-[#D8B4C0]">
                    public.orders
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-[10.5px] font-mono font-bold text-[#3B2118] border border-[#D8B4C0]">
                    public.order_items
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-[10.5px] font-mono font-bold text-[#3B2118] border border-[#D8B4C0]">
                    public.inquiries
                  </span>
                </div>
              </div>
            </div>

            {/* Supabase Anon / Service Role Key Configuration */}
            <div className="p-5 rounded-xl bg-[#FAF5EE] border border-[#D8B4C0] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2118] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#8F5567]" />
                    <span>Supabase Project API Key</span>
                  </h4>
                  <p className="text-[11.5px] text-[#73574E]">
                    Paste your Supabase <code className="font-mono font-bold text-[#3B2118]">anon public</code> or <code className="font-mono font-bold text-[#3B2118]">service_role</code> key from{' '}
                    <a
                      href="https://supabase.com/dashboard/project/ogiiheusnnyzqzltontv/settings/api"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8F5567] underline hover:text-[#3B2118] font-bold"
                    >
                      Project Settings → API
                    </a>
                    .
                  </p>
                </div>
                {supabaseStatus?.hasKey ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    ✓ API Key Set
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                    Awaiting API Key
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="password"
                  placeholder="Paste your Supabase anon/service_role key here..."
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-white border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-mono focus:outline-hidden focus:border-[#8F5567]"
                />
                <button
                  type="button"
                  disabled={savingSupabaseKey || !supabaseKeyInput.trim()}
                  onClick={async () => {
                    try {
                      setSavingSupabaseKey(true);
                      const res = await api.configureSupabase(supabaseKeyInput);
                      showToast(res.message);
                      setSupabaseKeyInput('');
                      fetchSupabaseStatus();
                    } catch (err: any) {
                      showToast(err.message || 'Failed to update key', 'error');
                    } finally {
                      setSavingSupabaseKey(false);
                    }
                  }}
                  className="px-5 py-2.5 bg-[#8F5567] hover:bg-[#734251] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-xs shrink-0"
                >
                  {savingSupabaseKey ? 'Saving...' : 'Save & Verify Key'}
                </button>
              </div>
            </div>

            {/* Sync Existing Orders Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E8D9C8]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#3B2118] block">
                  Bulk Order Synchronization
                </span>
                <p className="text-[11.5px] text-[#73574E]">
                  Push all currently existing boutique orders ({orders.length} orders) to your Supabase tables in one click.
                </p>
              </div>

              <button
                type="button"
                disabled={syncingOrders || orders.length === 0}
                onClick={async () => {
                  try {
                    setSyncingOrders(true);
                    const res = await api.syncAllOrdersToSupabase();
                    showToast(res.message);
                    fetchSupabaseStatus();
                  } catch (err: any) {
                    showToast(err.message || 'Sync failed', 'error');
                  } finally {
                    setSyncingOrders(false);
                  }
                }}
                className="px-5 py-2.5 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#D8B4C0] ${syncingOrders ? 'animate-spin' : ''}`} />
                <span>{syncingOrders ? 'Syncing...' : 'Sync All Orders to Supabase'}</span>
              </button>
            </div>
          </div>

          {/* SQL Schema Script Box (1-Click Setup in Supabase SQL Editor) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8D9C8] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8D9C8]">
              <div className="space-y-0.5">
                <h4 className="font-serif-luxury text-xl font-bold text-[#3B2118]">
                  Database Tables Schema (SQL Script)
                </h4>
                <p className="text-xs text-[#73574E]">
                  Run this SQL in your Supabase SQL Editor to automatically create the <code className="font-mono text-[#8F5567] font-bold">orders</code> and <code className="font-mono text-[#8F5567] font-bold">order_items</code> tables with proper columns and policies:
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const sql = supabaseStatus?.sqlSchema || `-- Muskan's Stitching Schema for Supabase project: ogiiheusnnyzqzltontv
create table if not exists public.orders (
    id text primary key,
    order_number text not null unique,
    customer_name text not null,
    customer_email text not null,
    customer_phone text not null,
    subtotal numeric(12, 2) not null default 0,
    discount_amount numeric(12, 2) not null default 0,
    shipping_fee numeric(12, 2) not null default 0,
    total_amount numeric(12, 2) not null default 0,
    coupon_code text,
    status text not null default 'PENDING',
    payment_method text not null default 'COD',
    payment_status text not null default 'PENDING',
    tracking_number text,
    shipping_address jsonb not null default '{}'::jsonb,
    items jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
    id text primary key,
    order_id text references public.orders(id) on delete cascade,
    order_number text,
    product_id text not null,
    product_name text not null,
    product_image text,
    size text,
    color text,
    unit_price numeric(12, 2) not null default 0,
    quantity integer not null default 1,
    total_price numeric(12, 2) not null default 0,
    created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
create policy "Enable insert for orders" on public.orders for insert with check (true);
create policy "Enable select for orders" on public.orders for select using (true);
create policy "Enable insert for order_items" on public.order_items for insert with check (true);
create policy "Enable select for order_items" on public.order_items for select using (true);`;
                    navigator.clipboard.writeText(sql);
                    setCopiedSql(true);
                    showToast('SQL script copied to clipboard!');
                    setTimeout(() => setCopiedSql(false), 3000);
                  }}
                  className="px-3.5 py-2 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] border border-[#D8B4C0] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8F5567]" />
                      <span>Copy SQL Schema</span>
                    </>
                  )}
                </button>

                <a
                  href="https://supabase.com/dashboard/project/ogiiheusnnyzqzltontv/sql/new"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#3B2118] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#2A160F] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open SQL Editor</span>
                </a>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-[#2A160F] text-[#FAF5EE] text-xs font-mono overflow-x-auto max-h-72 leading-relaxed border border-[#523024]">
              {supabaseStatus?.sqlSchema || `-- 1. Orders Table
create table if not exists public.orders (
    id text primary key,
    order_number text not null unique,
    customer_name text not null,
    customer_email text not null,
    customer_phone text not null,
    subtotal numeric(12, 2) not null default 0,
    discount_amount numeric(12, 2) not null default 0,
    shipping_fee numeric(12, 2) not null default 0,
    total_amount numeric(12, 2) not null default 0,
    coupon_code text,
    status text not null default 'PENDING',
    payment_method text not null default 'COD',
    payment_status text not null default 'PENDING',
    tracking_number text,
    shipping_address jsonb not null default '{}'::jsonb,
    items jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. Order Items Table
create table if not exists public.order_items (
    id text primary key,
    order_id text references public.orders(id) on delete cascade,
    order_number text,
    product_id text not null,
    product_name text not null,
    product_image text,
    size text,
    color text,
    unit_price numeric(12, 2) not null default 0,
    quantity integer not null default 1,
    total_price numeric(12, 2) not null default 0,
    created_at timestamptz not null default now()
);`}
            </pre>
          </div>

          {/* Orders Preview List */}
          <div className="bg-white rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-2xs">
            <div className="p-4 bg-[#FAF5EE] border-b border-[#E8D9C8] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B2118]">
                Recent Orders Ready for Supabase ({orders.length})
              </span>
              <span className="text-[11px] text-[#73574E]">
                Auto-saved upon customer form submission
              </span>
            </div>

            <div className="divide-y divide-[#E8D9C8] max-h-96 overflow-y-auto">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#73574E]">
                  No orders have been submitted yet. Test by completing an order from the checkout page!
                </div>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="p-4 hover:bg-[#FAF5EE]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#3B2118]">{o.orderNumber}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'CONFIRMED' || o.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.status}
                        </span>
                        <span className="text-[11px] text-[#73574E]">· {o.paymentMethod}</span>
                      </div>
                      <div className="text-[#5D4238]">
                        <strong>{o.customerName}</strong> ({o.customerPhone}) · {o.customerEmail}
                      </div>
                      <div className="text-[11px] text-[#73574E]">
                        {o.shippingAddress?.city}, {o.shippingAddress?.state} ({o.shippingAddress?.pincode}) · {o.items?.length || 0} items
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-[#3B2118] block">
                        ₹{o.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Supabase Sync Ready</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADD NEW SILHOUETTE
      ====================================================================== */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsAddingProduct(false)} />

          <div className="relative bg-[#FAF5EE] rounded-2xl shadow-2xl border border-[#E8D9C8] w-full max-w-xl p-6 sm:p-8 z-10 overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8D9C8] pb-3">
              <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Add Haute Couture Silhouette</h3>
              <button onClick={() => setIsAddingProduct(false)} className="text-[#73574E] hover:text-[#3B2118] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Saffron Organza Draped Kurta Set"
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Selling Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Original Price (₹ MRP)</label>
                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Initial Stock per Size</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Fabric & Textile</label>
                <input
                  type="text"
                  required
                  value={newProdFabric}
                  onChange={(e) => setNewProdFabric(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Product Description</label>
                <textarea
                  rows={2}
                  required
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                />
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2 p-3.5 bg-white rounded-xl border border-[#E8D9C8]">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#3B2118]">Product Photo</label>
                  <button
                    type="button"
                    onClick={() => triggerFileUpload('newModal')}
                    className="px-3 py-1 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#8F5567] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[#D8B4C0]"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-[#FAF5EE] border border-[#E8D9C8] shrink-0">
                    <img src={newProdImageUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                  </div>
                  <input
                    type="text"
                    required
                    value={newProdImageUrl}
                    onChange={(e) => setNewProdImageUrl(e.target.value)}
                    placeholder="Or enter image URL..."
                    className="flex-1 px-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Silhouette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDIT PRODUCT SPECIFICATIONS
      ====================================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setEditingProduct(null)} />

          <div className="relative bg-[#FAF5EE] rounded-2xl shadow-2xl border border-[#E8D9C8] w-full max-w-xl p-6 sm:p-8 z-10 overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8D9C8] pb-3">
              <h3 className="font-serif-luxury text-2xl text-[#3B2118]">Edit Silhouette Details</h3>
              <button onClick={() => setEditingProduct(null)} className="text-[#73574E] hover:text-[#3B2118] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editProdName}
                  onChange={(e) => setEditProdName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Category</label>
                  <select
                    value={editProdCategory}
                    onChange={(e) => setEditProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editProdPrice}
                    onChange={(e) => setEditProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Original Price (₹ MRP)</label>
                  <input
                    type="number"
                    value={editProdOriginalPrice}
                    onChange={(e) => setEditProdOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#3B2118] mb-1">Fabric & Textile</label>
                  <input
                    type="text"
                    required
                    value={editProdFabric}
                    onChange={(e) => setEditProdFabric(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Product Description</label>
                <textarea
                  rows={2}
                  required
                  value={editProdDesc}
                  onChange={(e) => setEditProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118]"
                />
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2 p-3.5 bg-white rounded-xl border border-[#E8D9C8]">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#3B2118]">Product Photo</label>
                  <button
                    type="button"
                    onClick={() => triggerFileUpload('editModal')}
                    className="px-3 py-1 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#8F5567] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[#D8B4C0]"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-[#FAF5EE] border border-[#E8D9C8] shrink-0">
                    <img src={editProdImageUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                  </div>
                  <input
                    type="text"
                    required
                    value={editProdImageUrl}
                    onChange={(e) => setEditProdImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#FAF5EE] border border-[#E8D9C8] rounded-lg text-xs text-[#3B2118]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADD NEW CATEGORY
      ====================================================================== */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsAddingCategory(false)} />
          <div className="relative bg-[#FAF5EE] rounded-2xl shadow-2xl border border-[#E8D9C8] w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8D9C8] pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#3B2118]">Add New Category</h3>
              <button onClick={() => setIsAddingCategory(false)} className="text-[#73574E] hover:text-[#3B2118] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    if (!newCatSlug) {
                      setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Wedding Lehengas"
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">URL Identifier (Slug)</label>
                <input
                  type="text"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                  placeholder="e.g. wedding-lehengas"
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] font-mono focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Category Description</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Bespoke bridal ensembles and flared silhouette masterworks..."
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newCatImg}
                  onChange={(e) => setNewCatImg(e.target.value)}
                  placeholder="/images/f4.png or https://..."
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-4 py-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDIT CATEGORY
      ====================================================================== */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setEditingCategory(null)} />
          <div className="relative bg-[#FAF5EE] rounded-2xl shadow-2xl border border-[#E8D9C8] w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8D9C8] pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#3B2118]">Edit Category</h3>
              <button onClick={() => setEditingCategory(null)} className="text-[#73574E] hover:text-[#3B2118] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">URL Identifier (Slug)</label>
                <input
                  type="text"
                  required
                  value={editCatSlug}
                  onChange={(e) => setEditCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] font-mono focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Category Description</label>
                <textarea
                  rows={2}
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B2118] mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editCatImg}
                  onChange={(e) => setEditCatImg(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8D9C8] rounded-xl text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-white border border-[#E8D9C8] text-[#73574E] rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
