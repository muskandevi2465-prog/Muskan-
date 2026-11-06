import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Tag, CreditCard, Banknote, Check, Sparkles, Zap, ShoppingBag, Truck, Lock, Plus, Minus, AlertCircle } from 'lucide-react';
import { useStore, DirectCheckoutItem } from '../context/StoreContext';
import { api } from '../services/api';
import { Order } from '../types';
import { RazorpayModal } from '../components/RazorpayModal';

const INDIAN_STATES = [
  'Delhi NCR',
  'Maharashtra',
  'Karnataka',
  'Gujarat',
  'Uttar Pradesh',
  'Rajasthan',
  'Haryana',
  'Punjab',
  'West Bengal',
  'Tamil Nadu',
  'Telangana',
  'Madhya Pradesh',
  'Kerala',
  'Bihar',
  'Andhra Pradesh',
  'Odisha',
  'Assam',
  'Goa',
  'Uttarakhand',
  'Himachal Pradesh',
  'Other',
];

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    directCheckoutItem,
    setDirectCheckoutItem,
    navigateTo,
    showToast,
    refreshCart,
    user,
  } = useStore();

  // Mode: if directCheckoutItem exists, default to direct buy. Otherwise cart.
  const [activeCheckoutMode, setActiveCheckoutMode] = useState<'direct' | 'cart'>(
    directCheckoutItem ? 'direct' : 'cart'
  );

  // Direct checkout item state for live customization
  const [localDirectItem, setLocalDirectItem] = useState<DirectCheckoutItem | null>(directCheckoutItem);

  useEffect(() => {
    if (directCheckoutItem) {
      setLocalDirectItem(directCheckoutItem);
      setActiveCheckoutMode('direct');
    } else if (cart.length > 0) {
      setActiveCheckoutMode('cart');
    }
  }, [directCheckoutItem, cart.length]);

  // Customer Form state
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi NCR');
  const [pincode, setPincode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');

  // Loading & Modal state
  const [loading, setLoading] = useState(false);
  const [activeRazorpayOrder, setActiveRazorpayOrder] = useState<Order | null>(null);

  // If both direct item and cart are empty, show empty bag screen
  const isDirectMode = activeCheckoutMode === 'direct' && localDirectItem !== null;
  const isCartMode = activeCheckoutMode === 'cart' && cart.length > 0;

  if (!isDirectMode && !isCartMode) {
    return (
      <div className="min-h-screen bg-[#FAF5EE] flex flex-col items-center justify-center p-8 text-[#3B2118]">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center text-[#8F5567] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your shopping bag is empty</h2>
        <p className="text-xs text-[#73574E] mt-2 mb-6 text-center max-w-sm">
          Select an ensemble from our collection or click "Buy Now" on any product to proceed straight to instant checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-[#3B2118] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2A160F] transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  // Calculate items and pricing
  const currentSubtotal = isDirectMode
    ? (localDirectItem?.product.price || 0) * (localDirectItem?.quantity || 1)
    : cartSubtotal;

  const shippingFee = currentSubtotal >= 1999 ? 0 : 150;
  const totalAmount = Math.max(0, currentSubtotal - discount + shippingFee);

  // Direct buy size / color changers
  const handleSizeChange = (newSize: string) => {
    if (!localDirectItem) return;
    const updated = { ...localDirectItem, size: newSize };
    setLocalDirectItem(updated);
    setDirectCheckoutItem(updated);
  };

  const handleColorChange = (newColor: string) => {
    if (!localDirectItem) return;
    const updated = { ...localDirectItem, color: newColor };
    setLocalDirectItem(updated);
    setDirectCheckoutItem(updated);
  };

  const handleQuantityChange = (delta: number) => {
    if (!localDirectItem) return;
    const newQty = Math.max(1, localDirectItem.quantity + delta);
    const updated = { ...localDirectItem, quantity: newQty };
    setLocalDirectItem(updated);
    setDirectCheckoutItem(updated);
  };

  // Coupon validator
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    try {
      const res = await api.validateCoupon(couponCode.trim(), currentSubtotal);
      if (res.valid) {
        setDiscount(res.discount);
        setCouponApplied(true);
        setCouponMessage(res.message);
        showToast(res.message, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Invalid coupon code', 'error');
    }
  };

  // Order Placement
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !email.trim() || !street.trim() || !city.trim() || !pincode.trim()) {
      showToast('Please fill all mandatory contact & address fields', 'error');
      return;
    }

    // Format phone check
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    setLoading(true);

    try {
      const checkoutItems = isDirectMode && localDirectItem
        ? [
            {
              productId: localDirectItem.product.id,
              size: localDirectItem.size,
              color: localDirectItem.color,
              quantity: localDirectItem.quantity,
            },
          ]
        : cart.map((item) => ({
            productId: item.product.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          }));

      const orderPayload = {
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
        },
        items: checkoutItems,
        isDirectBuy: isDirectMode,
        paymentMethod,
        couponCode: couponApplied ? couponCode.trim() : undefined,
      };

      const res = await api.createOrder(orderPayload);

      if (res.success && res.order) {
        if (paymentMethod === 'RAZORPAY') {
          // Open Razorpay online payment modal
          setActiveRazorpayOrder(res.order);
        } else {
          // COD: Order confirmed immediately
          if (isDirectMode) {
            setDirectCheckoutItem(null);
          } else {
            await refreshCart();
          }
          showToast('Order placed successfully via Cash on Delivery!', 'success');
          navigateTo('order-confirmed', {
            id: res.order.id,
            orderNumber: res.order.orderNumber,
          });
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Razorpay payment success handler
  const handleRazorpaySuccess = async (updatedOrder: Order) => {
    setActiveRazorpayOrder(null);
    if (isDirectMode) {
      setDirectCheckoutItem(null);
    } else {
      await refreshCart();
    }
    showToast('Payment verified successfully! Your order is placed.', 'success');
    navigateTo('order-confirmed', {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Mode Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#73574E] hover:text-[#3B2118] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>

          {/* Mode Switcher if user has both a direct Buy Now item and a cart */}
          {localDirectItem && cart.length > 0 && (
            <div className="inline-flex items-center p-1 bg-white rounded-xl border border-[#E8D9C8] text-xs">
              <button
                type="button"
                onClick={() => setActiveCheckoutMode('direct')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCheckoutMode === 'direct'
                    ? 'bg-[#3B2118] text-[#FAF5EE] shadow-xs'
                    : 'text-[#73574E] hover:text-[#3B2118]'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Buy Now Item</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCheckoutMode('cart')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCheckoutMode === 'cart'
                    ? 'bg-[#3B2118] text-[#FAF5EE] shadow-xs'
                    : 'text-[#73574E] hover:text-[#3B2118]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#8F5567]" />
                <span>Shopping Bag ({cart.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8B4C0] text-[11px] font-bold text-[#8F5567] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Secure Checkout & Tailored Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3B2118] tracking-tight">
            Checkout & Order Summary
          </h1>
          <p className="text-xs sm:text-sm text-[#73574E] mt-1">
            Complete your contact, shipping details, and select your preferred payment mode below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Details & Delivery Address */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8D9C8] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
                <h2 className="text-base sm:text-lg font-bold text-[#3B2118]">
                  1. Customer & Delivery Address
                </h2>
                <span className="text-[11px] text-[#8F5567] font-bold uppercase tracking-wider">
                  Mandatory Fields *
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3B2118] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2118] mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#73574E]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={12}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full pl-12 pr-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2118] mb-1.5">
                  Email Address * <span className="font-normal text-[#73574E] text-[11px]">(For order confirmation & tracking dispatch)</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya.sharma@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2118] mb-1.5">
                  Delivery Address / House / Flat / Street *
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Flat 301, Magnolia Heights, 14th Main Road"
                  className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3B2118] mb-1.5">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi"
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2118] mb-1.5">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] cursor-pointer transition-colors"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2118] mb-1.5">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="110024"
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2118] mb-1.5">
                  Order Note / Fitting Instructions <span className="font-normal text-[#73574E] text-[11px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before delivery / Alter hemline slightly"
                  className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] font-medium focus:outline-hidden focus:border-[#8F5567] transition-colors"
                />
              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8D9C8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
                <h2 className="text-base sm:text-lg font-bold text-[#3B2118]">
                  2. Select Payment Method
                </h2>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Encrypted & Verified</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Razorpay Online */}
                <div
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-[#8F5567] bg-[#FAF5EE] shadow-sm'
                      : 'border-[#E8D9C8] hover:border-[#8F5567] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-100 text-[#0C2340]">
                        <CreditCard className="w-5 h-5 text-[#528FF0]" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#3B2118] block">
                          Online Payment
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#73574E]">
                          Razorpay Gateway
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'RAZORPAY'
                          ? 'border-[#8F5567] bg-[#8F5567]'
                          : 'border-[#E8D9C8]'
                      }`}
                    >
                      {paymentMethod === 'RAZORPAY' && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#E8D9C8]/60 text-[11px] text-[#5D4238]">
                    <span>UPI (GPay, PhonePe, Paytm), Debit/Credit Cards & NetBanking</span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#8F5567] bg-[#FAF5EE] shadow-sm'
                      : 'border-[#E8D9C8] hover:border-[#8F5567] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                        <Banknote className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#3B2118] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#73574E]">
                          Pay upon delivery
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'COD'
                          ? 'border-[#8F5567] bg-[#8F5567]'
                          : 'border-[#E8D9C8]'
                      }`}
                    >
                      {paymentMethod === 'COD' && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#E8D9C8]/60 text-[11px] text-[#5D4238]">
                    <span>Pay with cash or QR code on delivery at your doorstep</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8D9C8] shadow-xs space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-sm font-bold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                    <span>Place Order • ₹{totalAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#73574E] text-center pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#8F5567]" /> Express Dispatch
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Free Exchange
                </span>
              </div>
            </div>
          </form>

          {/* Right Column: Order Items, Interactive Size/Color Selection & Price Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8D9C8] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#FAF5EE] pb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#3B2118]">
                  Order Summary
                </h3>
                <span className="text-xs font-bold text-[#8F5567] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#E8D9C8]">
                  {isDirectMode ? '1 Item (Direct Buy)' : `${cart.length} Items`}
                </span>
              </div>

              {/* DIRECT BUY ITEM INTERACTIVE CARD */}
              {isDirectMode && localDirectItem && (
                <div className="space-y-4 p-4 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8]">
                  <div className="flex gap-3">
                    <img
                      src={localDirectItem.product.images[0]?.url || '/images/f4.png'}
                      alt={localDirectItem.product.name}
                      className="w-20 h-24 object-cover object-top rounded-xl border border-[#E8D9C8] bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#8F5567] tracking-wider block">
                        {localDirectItem.product.fabric || 'Festive Ensemble'}
                      </span>
                      <h4 className="text-sm font-bold text-[#3B2118] line-clamp-1 mt-0.5">
                        {localDirectItem.product.name}
                      </h4>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#3B2118]">
                          ₹{localDirectItem.product.price.toLocaleString('en-IN')}
                        </span>
                        {localDirectItem.product.originalPrice && (
                          <span className="text-[11px] text-[#73574E] line-through">
                            ₹{localDirectItem.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#5D4238]">Qty:</span>
                        <div className="inline-flex items-center bg-white border border-[#E8D9C8] rounded-lg">
                          <button
                            type="button"
                            disabled={localDirectItem.quantity <= 1}
                            onClick={() => handleQuantityChange(-1)}
                            className="p-1 text-[#5D4238] hover:bg-[#FAF5EE] disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#3B2118] min-w-[20px] text-center">
                            {localDirectItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            className="p-1 text-[#5D4238] hover:bg-[#FAF5EE] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Size Selector inside Checkout */}
                  <div className="pt-2 border-t border-[#E8D9C8]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-[#3B2118] uppercase tracking-wider">
                        Select Size:
                      </span>
                      <span className="text-xs font-bold text-[#8F5567]">
                        Chosen: {localDirectItem.size}
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                      {AVAILABLE_SIZES.map((sz) => {
                        const isSelected = localDirectItem.size === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSizeChange(sz)}
                            className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] shadow-xs'
                                : 'bg-white text-[#5D4238] border-[#E8D9C8] hover:border-[#8F5567]'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Color Selector inside Checkout */}
                  {localDirectItem.product.colors && localDirectItem.product.colors.length > 0 && (
                    <div className="pt-2 border-t border-[#E8D9C8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-[#3B2118] uppercase tracking-wider">
                          Select Color:
                        </span>
                        <span className="text-xs font-bold text-[#8F5567]">
                          {localDirectItem.color}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {localDirectItem.product.colors.map((c) => {
                          const isSelected = localDirectItem.color === c;
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => handleColorChange(c)}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#8F5567] text-white border-[#8F5567] shadow-xs'
                                  : 'bg-white text-[#5D4238] border-[#E8D9C8] hover:border-[#8F5567]'
                              }`}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CART ITEMS LIST */}
              {isCartMode && (
                <div className="divide-y divide-[#FAF5EE] max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-3">
                      <img
                        src={item.product.images[0]?.url || '/images/stitchora_hero.png'}
                        alt={item.product.name}
                        className="w-14 h-16 object-cover object-top rounded-xl bg-[#FAF5EE] border border-[#E8D9C8]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#3B2118] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#73574E] block mt-0.5">
                          Size: <strong className="text-[#3B2118]">{item.size}</strong> · Color: <strong className="text-[#3B2118]">{item.color}</strong> · Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#3B2118] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8F5567] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon (e.g. WELCOME10)"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs font-bold uppercase text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#8F5567] hover:bg-[#734352] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  Apply
                </button>
              </form>

              {couponApplied && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span className="font-bold">{couponMessage || `Promo ${couponCode} Applied!`}</span>
                  <span className="font-bold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#FAF5EE] text-xs">
                <div className="flex justify-between text-[#73574E]">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#3B2118] tabular-nums">
                    ₹{currentSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span className="tabular-nums">- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#73574E]">
                  <span>Express Delivery</span>
                  <span className="font-bold text-[#3B2118]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE (Complimentary)</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex items-baseline justify-between text-base font-extrabold text-[#3B2118] pt-3 border-t border-[#FAF5EE]">
                  <span>Total Amount</span>
                  <span className="text-2xl font-extrabold text-[#3B2118] tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Online Payment Gateway Modal */}
      {activeRazorpayOrder && (
        <RazorpayModal
          order={activeRazorpayOrder}
          onSuccess={handleRazorpaySuccess}
          onClose={() => {
            setActiveRazorpayOrder(null);
            showToast('Payment window closed. You can retry payment anytime.', 'info');
          }}
        />
      )}
    </div>
  );
};
