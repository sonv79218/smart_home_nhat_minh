// ============================================
// CART PAGE
// Modern E-commerce Style (Pure TailwindCSS)
// ============================================
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

// ============================================
// EMPTY CART STATE
// ============================================
const EmptyCart = () => (
  <div className="text-center py-16 md:py-20 bg-white rounded-2xl shadow-sm">
    <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Giỏ hàng trống</h2>
    <p className="text-slate-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
    <Link 
      to="/products" 
      className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-xl transition-all"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Bắt đầu mua sắm
    </Link>
  </div>
);

// ============================================
// CART ITEM (Shopee/Tiki Style - Mobile Optimized)
// ============================================
const CartItem = ({ 
  item, 
  isSelected, 
  onToggle, 
  onIncrease, 
  onDecrease, 
  onRemove 
}) => {
  const itemTotal = item.price * item.quantity;
  const originalTotal = item.originalPrice ? item.originalPrice * item.quantity : 0;
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const [showDelete, setShowDelete] = useState(false);

  const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop";
  return (
    <div className={`
      relative flex gap-3 p-3 bg-white rounded-xl shadow-sm
      border-2 transition-all duration-200
      ${isSelected ? "border-primary-500" : "border-transparent"}
    `}>
      {/* Checkbox */}
      <div className="flex items-start pt-1">
        <div 
          className={`
            w-5 h-5 rounded-md flex items-center justify-center cursor-pointer
            transition-all duration-150
            ${isSelected 
              ? "bg-primary-600" 
              : "bg-slate-200 border-2 border-transparent hover:border-primary-300"
            }
          `}
          onClick={() => onToggle(item.id)}
        >
          {isSelected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
      </div>

      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <img 
          src={item.thumbnail||PLACEHOLDER_IMAGE} 
          alt={item.name} 
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg" 
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Name */}
        <Link 
          to={`/product/${item.id}`} 
          className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug hover:text-primary-600 transition-colors"
        >
          {item.name}
        </Link>

        {/* Price on Mobile */}
        <div className="mt-1 flex items-center gap-2 sm:hidden">
          <span className="text-base font-bold text-red-600">
            {Number(item.price).toLocaleString()}đ
          </span>
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through">
              {Number(item.originalPrice).toLocaleString()}đ
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Row: Quantity & Actions */}
        <div className="flex items-center justify-between mt-2">
          {/* Price on Desktop */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-base font-bold text-red-600">
              {Number(itemTotal).toLocaleString()}đ
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {Number(originalTotal).toLocaleString()}đ
              </span>
            )}
          </div>

          {/* Quantity Controls - Shopee Style */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-semibold text-slate-800 bg-white">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-md transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => {
              if (confirm("Xóa sản phẩm này?")) {
                onRemove(item.id);
              }
            }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all ml-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PROMO CODE INPUT
// ============================================
const PromoCodeInput = ({ promoCode, discount, onApply, onRemove }) => {
  const [code, setCode] = useState(promoCode);
  const [error, setError] = useState("");

  const handleApply = () => {
    if (!code.trim()) return;
    const result = onApply(code);
    if (!result.success) {
      setError("Mã giảm giá không hợp lệ");
    } else {
      setError("");
    }
  };

  if (promoCode && discount > 0) {
    return (
      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 text-green-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <span className="text-sm font-medium">
            Mã: <strong>{promoCode}</strong> - Giảm {discount}%
          </span>
        </div>
        <button 
          onClick={onRemove}
          className="w-6 h-6 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-full transition-colors"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === "Enter" && handleApply()}
          className="flex-1 bg-transparent text-sm outline-none uppercase"
        />
        <button 
          onClick={handleApply}
          disabled={!code.trim()}
          className="px-4 py-2 bg-gradient-to-r from-primary-600 to-blue-500 text-white text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
        >
          Áp dụng
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================
// ORDER SUMMARY (Clean Desktop Component)
// ============================================
const OrderSummary = ({ 
  selectedItems,
  allItems,
  subtotal,
  shipping, 
  discount, 
  discountAmount,
  total,
  onCheckout 
}) => {
  const selectedCount = allItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);
  
  const savings = subtotal - allItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Tóm tắt đơn hàng
      </h3>

      {/* Summary Rows */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tạm tính ({selectedCount} sản phẩm)</span>
          <span>{Number(subtotal).toLocaleString()}đ</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Tiết kiệm</span>
            <span>-{Number(savings).toLocaleString()}đ</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm text-red-500">
            <span>Giảm giá ({discount}%)</span>
            <span>-{Number(discountAmount).toLocaleString()}đ</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-slate-600">
          <span>Phí vận chuyển</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Miễn phí" : `${Number(shipping).toLocaleString()}đ`}
          </span>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {shipping > 0 && (
        <div className="bg-orange-50 rounded-xl p-3 mb-4">
          <p className="text-xs text-orange-700 mb-2">
            Mua thêm <strong className="text-orange-600">{Number(500000 - subtotal).toLocaleString()}đ</strong> để miễn phí vận chuyển
          </p>
          <div className="h-1.5 bg-orange-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 500000) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mb-4 pt-3 border-t border-slate-100">
        <span className="text-base font-semibold text-slate-800">Tổng cộng</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-red-600">{Number(total).toLocaleString()}đ</span>
          <span className="block text-xs text-slate-400">(Đã bao gồm VAT)</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button 
        onClick={onCheckout}
        disabled={selectedCount === 0}
        className={`
          w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm
          transition-all duration-200 active:scale-[0.98]
          ${selectedCount === 0 
            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
            : "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
          }
        `}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        Thanh toán ({selectedCount})
      </button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Thanh toán an toàn & bảo mật</span>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState(() => new Set(cartItems.map(i => i.id)));

  const cartItemIds = useMemo(() => new Set(cartItems.map(item => item.id)), [cartItems]);

  // Keep selection valid for current cart without setState during render/effects.
  const effectiveSelectedItems = useMemo(() => {
    const next = new Set();
    selectedItems.forEach((id) => {
      if (cartItemIds.has(id)) {
        next.add(id);
      }
    });
    return next;
  }, [selectedItems, cartItemIds]);

  // Calculate totals
  const selectedSubtotal = useMemo(() => {
    return cartItems
      .filter(item => effectiveSelectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems, effectiveSelectedItems]);

  const selectedDiscountAmount = Math.round(selectedSubtotal * discount / 100);
  const selectedShipping = selectedSubtotal >= 500000 ? 0 : 30000;
  const selectedTotal = selectedSubtotal - selectedDiscountAmount + selectedShipping;

  const toggleSelectAll = () => {
    if (effectiveSelectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(i => i.id)));
    }
  };

  const toggleItem = (id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCheckout = () => {
    if (effectiveSelectedItems.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }
    navigate("/checkout", { 
      state: { 
        selectedItems: Array.from(effectiveSelectedItems),
        promoCode,
        discount 
      } 
    });
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <EmptyCart />
        </div>
      </div>
    );
  }

  const isAllSelected = effectiveSelectedItems.size === cartItems.length && cartItems.length > 0;
  const selectedCount = cartItems
    .filter(item => effectiveSelectedItems.has(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100 pb-32 md:pb-6">
      <div className="max-w-[1200px] mx-auto px-4 pt-4 pb-6">
        {/* Page Header - Mobile Shopee Style */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline text-xl">Giỏ hàng của bạn</span>
            <span className="sm:hidden">Giỏ hàng</span>
            <span className="px-1.5 py-0.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
              {cartItems.length}
            </span>
          </h1>
          <button 
            onClick={clearCart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span className="hidden sm:inline">Xóa tất cả</span>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left: Cart Items */}
          <div className="flex-1">
            {/* Select All Header - Shopee Style */}
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm mb-3">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleSelectAll}
              >
                <div 
                  className={`
                    w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer
                    ${isAllSelected 
                      ? "bg-primary-600" 
                      : "bg-slate-200"
                    }
                  `}
                >
                  {isAllSelected ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Chọn tất cả
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {effectiveSelectedItems.size}/{cartItems.length}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={effectiveSelectedItems.has(item.id)}
                  onToggle={toggleItem}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 text-center">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Right: Order Summary - Desktop Only */}
          <div className="hidden lg:block w-full max-w-[380px]">
            <div className="lg:sticky lg:top-24 space-y-4">
              <PromoCodeInput
                promoCode={promoCode}
                discount={discount}
                onApply={applyPromoCode}
                onRemove={removePromoCode}
              />
              <OrderSummary
                selectedItems={Array.from(effectiveSelectedItems)}
                allItems={cartItems}
                subtotal={selectedSubtotal}
                shipping={selectedShipping}
                discount={discount}
                discountAmount={selectedDiscountAmount}
                total={selectedTotal}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Summary Bar - Shopee Style */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-inset-bottom">
        {/* Free Shipping Progress - Mobile */}
        {selectedShipping > 0 && (
          <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-700">
                Mua thêm <strong>{Number(500000 - selectedSubtotal).toLocaleString()}đ</strong> để miễn phí vận chuyển
              </span>
            </div>
            <div className="h-1 bg-orange-100 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${Math.min((selectedSubtotal / 500000) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-3">
          {/* Selected Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className={`
                  w-6 h-6 rounded-md flex items-center justify-center transition-all
                  ${effectiveSelectedItems.size > 0 
                    ? "bg-primary-600" 
                    : "bg-slate-200"
                  }
                `}
                onClick={toggleSelectAll}
              >
                {effectiveSelectedItems.size > 0 ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                )}
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{Number(selectedTotal).toLocaleString()}đ</p>
              <p className="text-[10px] text-slate-500">{selectedCount} sản phẩm</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={selectedCount === 0}
            className={`
              px-6 py-2.5 rounded-xl font-bold text-sm
              transition-all duration-200 active:scale-95
              ${selectedCount === 0 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-red-500 text-white shadow-lg shadow-red-500/30"
              }
            `}
          >
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
