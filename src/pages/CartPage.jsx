// ============================================
// CART PAGE - MODERN ECOMMERCE STYLE
// ============================================
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

// ============================================
// SUB-COMPONENTS
// ============================================

// Empty Cart State
const EmptyCart = () => (
  <div className="empty-cart">
    <div className="empty-cart-icon">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </div>
    <h2 className="empty-cart-title">Giỏ hàng trống</h2>
    <p className="empty-cart-text">
      Bạn chưa thêm sản phẩm nào vào giỏ hàng
    </p>
    <Link to="/products" className="btn btn-primary">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Tiếp tục mua sắm
    </Link>
  </div>
);

// Cart Item với checkbox chọn
const CartItem = ({ 
  item, 
  isSelected, 
  onToggle, 
  onIncrease, 
  onDecrease, 
  onRemove 
}) => {
  const itemTotal = item.price * item.quantity;
  const originalTotal = (item.originalPrice || item.price) * item.quantity;
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  return (
    <div className={`cart-item ${isSelected ? "selected" : ""}`}>
      {/* Checkbox */}
      <label className="item-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(item.id)}
        />
        <span className="checkbox-custom" />
      </label>

      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="cart-item-image">
        <img src={item.thumbnail} alt={item.name} />
      </Link>

      {/* Product Info */}
      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <div className="cart-item-price">
          <span className="current-price">{Number(item.price).toLocaleString()}đ</span>
          {hasDiscount && (
            <span className="original-price">{Number(item.originalPrice).toLocaleString()}đ</span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => onDecrease(item.id)}
          aria-label="Giảm số lượng"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onIncrease(item.id)}
          aria-label="Tăng số lượng"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Item Total */}
      <div className="cart-item-total">
        <span className="total-price">{Number(itemTotal).toLocaleString()}đ</span>
        {hasDiscount && item.quantity > 1 && (
          <span className="original-total">{Number(originalTotal).toLocaleString()}đ</span>
        )}
      </div>

      {/* Remove Button */}
      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label="Xóa sản phẩm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
};

// Promo Code Input
const PromoCodeInput = ({ promoCode, discount, onApply, onRemove }) => {
  const [code, setCode] = useState(promoCode);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    
    setTimeout(() => {
      const result = onApply(code);
      if (!result.success) {
        setError("Mã giảm giá không hợp lệ");
      }
      setLoading(false);
    }, 500);
  };

  if (promoCode && discount > 0) {
    return (
      <div className="promo-applied">
        <div className="promo-applied-info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <span>Mã: <strong>{promoCode}</strong> - Giảm {discount}%</span>
        </div>
        <button className="promo-remove" onClick={onRemove}>×</button>
      </div>
    );
  }

  return (
    <div className="promo-input">
      <div className="promo-input-wrapper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === "Enter" && handleApply()}
        />
        <button 
          className="promo-apply-btn" 
          onClick={handleApply}
          disabled={loading || !code.trim()}
        >
          {loading ? "..." : "Áp dụng"}
        </button>
      </div>
      {error && <p className="promo-error">{error}</p>}
    </div>
  );
};

// Order Summary với selected items
const OrderSummary = ({ 
  selectedItems,
  allItems,
  subtotal,
  originalTotal,
  shipping, 
  discount, 
  discountAmount,
  total,
  onCheckout 
}) => {
  const selectedCount = selectedItems.length;
  const totalCount = allItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedCountDisplay = allItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  const savings = originalTotal - subtotal;

  return (
    <div className="order-summary">
      <h3 className="summary-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Tóm tắt đơn hàng
      </h3>

      {/* Summary Rows */}
      <div className="summary-rows">
        <div className="summary-row">
          <span>Tạm tính ({selectedCountDisplay} sản phẩm)</span>
          <span>{Number(subtotal).toLocaleString()}đ</span>
        </div>
        
        {savings > 0 && (
          <div className="summary-row savings">
            <span>Tiết kiệm</span>
            <span>-{Number(savings).toLocaleString()}đ</span>
          </div>
        )}

        {discount > 0 && (
          <div className="summary-row discount">
            <span>Giảm giá ({discount}%)</span>
            <span>-{Number(discountAmount).toLocaleString()}đ</span>
          </div>
        )}

        <div className="summary-row">
          <span>Phí vận chuyển</span>
          <span>
            {shipping === 0 ? (
              <span className="free-shipping">Miễn phí</span>
            ) : (
              `${Number(shipping).toLocaleString()}đ`
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="summary-total">
        <span>Tổng cộng</span>
        <div className="total-price-wrapper">
          <span className="total-price">{Number(total).toLocaleString()}đ</span>
          <span className="total-note">(Đã bao gồm VAT)</span>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {shipping > 0 && (
        <div className="free-shipping-progress">
          <p>Mua thêm <strong>{Number(500000 - subtotal).toLocaleString()}đ</strong> để được miễn phí vận chuyển</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min((subtotal / 500000) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button 
        className={`checkout-btn ${selectedCount === 0 ? "disabled" : ""}`} 
        onClick={onCheckout}
        disabled={selectedCount === 0}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        {selectedCount > 0 ? `Thanh toán (${selectedCountDisplay})` : "Chọn sản phẩm để thanh toán"}
      </button>

      {/* Security Note */}
      <div className="security-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    getSubtotal,
    getOriginalTotal,
    getShipping,
    getDiscountAmount,
    getTotalPrice,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState(() => new Set(cartItems.map(i => i.id)));

  // Sync selected items when cart changes
  useMemo(() => {
    setSelectedItems(prev => {
      const newSet = new Set();
      cartItems.forEach(item => {
        if (prev.has(item.id)) {
          newSet.add(item.id);
        }
      });
      return newSet;
    });
  }, [cartItems]);

  // Calculate totals for selected items only
  const selectedSubtotal = useMemo(() => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems, selectedItems]);

  const selectedOriginalTotal = useMemo(() => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  }, [cartItems, selectedItems]);

  const selectedDiscountAmount = Math.round(selectedSubtotal * discount / 100);
  const selectedShipping = selectedSubtotal >= 500000 ? 0 : 30000;
  const selectedTotal = selectedSubtotal - selectedDiscountAmount + selectedShipping;

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(i => i.id)));
    }
  };

  // Toggle single item
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
    if (selectedItems.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }
    navigate("/checkout", { 
      state: { 
        selectedItems: Array.from(selectedItems),
        promoCode,
        discount 
      } 
    });
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <>
        <style>{cartPageStyles}</style>
        <div className="cart-page">
          <div className="cart-container">
            <EmptyCart />
          </div>
        </div>
      </>
    );
  }

  const isAllSelected = selectedItems.size === cartItems.length && cartItems.length > 0;

  return (
    <>
      <style>{cartPageStyles}</style>
      <div className="cart-page">
        <div className="cart-container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Giỏ hàng của bạn
            </h1>
            <button className="clear-cart-btn" onClick={clearCart}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Xóa tất cả
            </button>
          </div>

          {/* Cart Content */}
          <div className="cart-content">
            {/* Left: Cart Items */}
            <div className="cart-items-section">
              {/* Select All Header */}
              <div className="items-header">
                <label className="select-all">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                  />
                  <span className="checkbox-custom" />
                  <span>Chọn tất cả ({cartItems.length} sản phẩm)</span>
                </label>
                <span className="selected-count">
                  Đã chọn: {selectedItems.size} sản phẩm
                </span>
              </div>

              {/* Cart Items List */}
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.has(item.id)}
                    onToggle={toggleItem}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="cart-summary-section">
              {/* Promo Code */}
              <PromoCodeInput
                promoCode={promoCode}
                discount={discount}
                onApply={applyPromoCode}
                onRemove={removePromoCode}
              />

              {/* Order Summary */}
              <OrderSummary
                selectedItems={Array.from(selectedItems)}
                allItems={cartItems}
                subtotal={selectedSubtotal}
                originalTotal={selectedOriginalTotal}
                shipping={selectedShipping}
                discount={discount}
                discountAmount={selectedDiscountAmount}
                total={selectedTotal}
                onCheckout={handleCheckout}
              />
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="continue-shopping">
            <Link to="/products" className="continue-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const cartPageStyles = `
  /* ==================== PAGE LAYOUT ==================== */
  .cart-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 24px 0 80px;
  }

  .cart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== PAGE HEADER ==================== */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  .page-title svg {
    color: #2563eb;
  }

  .clear-cart-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-cart-btn:hover {
    background: #fee2e2;
  }

  /* ==================== EMPTY CART ==================== */
  .empty-cart {
    text-align: center;
    padding: 80px 20px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .empty-cart-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-radius: 50%;
    margin-bottom: 24px;
  }

  .empty-cart-icon svg {
    color: #94a3b8;
  }

  .empty-cart-title {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
  }

  .empty-cart-text {
    font-size: 15px;
    color: #64748b;
    margin: 0 0 24px;
  }

  /* ==================== CART CONTENT ==================== */
  .cart-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    align-items: start;
  }

  /* ==================== ITEMS SECTION ==================== */
  .cart-items-section {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .items-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 16px;
  }

  .select-all {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #0f172a;
    user-select: none;
  }

  .select-all input {
    display: none;
  }

  .checkbox-custom {
    width: 22px;
    height: 22px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    position: relative;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .select-all input:checked + .checkbox-custom {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    border-color: transparent;
  }

  .select-all input:checked + .checkbox-custom::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 13px;
    font-weight: bold;
  }

  .selected-count {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }

  /* ==================== CART ITEM ==================== */
  .cart-items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 28px 100px 1fr auto auto 40px;
    gap: 16px;
    align-items: center;
    padding: 16px;
    background: #f8fafc;
    border-radius: 16px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .cart-item.selected {
    background: rgba(37, 99, 235, 0.04);
    border-color: rgba(37, 99, 235, 0.2);
  }

  .cart-item:hover {
    background: #f1f5f9;
  }

  .cart-item.selected:hover {
    background: rgba(37, 99, 235, 0.06);
  }

  /* Item Checkbox */
  .item-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .item-checkbox input {
    display: none;
  }

  .item-checkbox .checkbox-custom {
    width: 20px;
    height: 20px;
  }

  .item-checkbox input:checked + .checkbox-custom {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    border-color: transparent;
  }

  .item-checkbox input:checked + .checkbox-custom::after {
    content: "✓";
    font-size: 11px;
  }

  .cart-item-image {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
  }

  .cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cart-item-info {
    min-width: 0;
  }

  .cart-item-name {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    transition: color 0.2s;
  }

  .cart-item-name:hover {
    color: #2563eb;
  }

  .cart-item-price {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .cart-item-price .current-price {
    font-size: 16px;
    font-weight: 700;
    color: #2563eb;
  }

  .cart-item-price .original-price {
    font-size: 13px;
    color: #94a3b8;
    text-decoration: line-through;
  }

  /* ==================== QUANTITY CONTROLS ==================== */
  .cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #ffffff;
    border-radius: 10px;
    padding: 4px;
    border: 1px solid #e2e8f0;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s ease;
  }

  .qty-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
  }

  .qty-value {
    min-width: 36px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  /* ==================== ITEM TOTAL ==================== */
  .cart-item-total {
    text-align: right;
    min-width: 100px;
  }

  .cart-item-total .total-price {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }

  .cart-item-total .original-total {
    display: block;
    font-size: 12px;
    color: #94a3b8;
    text-decoration: line-through;
    margin-top: 2px;
  }

  /* ==================== REMOVE BUTTON ==================== */
  .remove-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #94a3b8;
    transition: all 0.2s ease;
  }

  .remove-btn:hover {
    background: #fef2f2;
    color: #dc2626;
  }

  /* ==================== SUMMARY SECTION ==================== */
  .cart-summary-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    top: 90px;
  }

  /* ==================== PROMO CODE ==================== */
  .promo-input {
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .promo-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }

  .promo-input-wrapper svg {
    color: #94a3b8;
    flex-shrink: 0;
  }

  .promo-input-wrapper input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 14px;
    outline: none;
    text-transform: uppercase;
  }

  .promo-input-wrapper input::placeholder {
    color: #94a3b8;
  }

  .promo-apply-btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .promo-apply-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .promo-apply-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .promo-error {
    margin: 8px 0 0;
    font-size: 13px;
    color: #dc2626;
  }

  .promo-applied {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: linear-gradient(135deg, #dcfce7, #d1fae5);
    border-radius: 12px;
  }

  .promo-applied-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #166534;
    font-size: 14px;
  }

  .promo-applied-info strong {
    font-weight: 700;
  }

  .promo-remove {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(22, 101, 52, 0.1);
    border: none;
    border-radius: 50%;
    color: #166534;
    cursor: pointer;
    font-size: 16px;
  }

  /* ==================== ORDER SUMMARY ==================== */
  .order-summary {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .summary-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px;
  }

  .summary-title svg {
    color: #2563eb;
  }

  .summary-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 16px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #64748b;
  }

  .summary-row.savings {
    color: #16a34a;
  }

  .summary-row.discount {
    color: #dc2626;
  }

  .summary-row .free-shipping {
    color: #16a34a;
    font-weight: 600;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .summary-total > span:first-child {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
  }

  .total-price-wrapper {
    text-align: right;
  }

  .total-price-wrapper .total-price {
    display: block;
    font-size: 28px;
    font-weight: 800;
    color: #ef4444;
  }

  .total-price-wrapper .total-note {
    font-size: 12px;
    color: #94a3b8;
  }

  /* ==================== FREE SHIPPING PROGRESS ==================== */
  .free-shipping-progress {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 16px;
  }

  .free-shipping-progress p {
    margin: 0 0 8px;
    font-size: 13px;
    color: #64748b;
  }

  .free-shipping-progress strong {
    color: #2563eb;
  }

  .progress-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2563eb, #38bdf8);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  /* ==================== CHECKOUT BUTTON ==================== */
  .checkout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
    margin-bottom: 16px;
  }

  .checkout-btn:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.45);
  }

  .checkout-btn.disabled {
    background: linear-gradient(135deg, #94a3b8, #cbd5e1);
    cursor: not-allowed;
    box-shadow: none;
  }

  .security-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
  }

  /* ==================== CONTINUE SHOPPING ==================== */
  .continue-shopping {
    margin-top: 24px;
    text-align: center;
  }

  .continue-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #2563eb;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .continue-link:hover {
    background: rgba(37, 99, 235, 0.08);
  }

  /* ==================== BUTTONS ==================== */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    border: none;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.45);
  }

  /* ==================== RESPONSIVE ==================== */

  /* Tablet */
  @media (max-width: 1024px) {
    .cart-content {
      grid-template-columns: 1fr 340px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .cart-container {
      padding: 0 16px;
    }

    .cart-content {
      grid-template-columns: 1fr;
    }

    .cart-summary-section {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 16px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 20px 20px 0 0;
    }

    .cart-items-section {
      margin-bottom: 200px;
    }

    .cart-item {
      grid-template-columns: 28px 80px 1fr;
      grid-template-rows: auto auto auto;
      gap: 10px;
      padding: 12px;
    }

    .item-checkbox {
      grid-row: span 3;
    }

    .cart-item-image {
      width: 80px;
      height: 80px;
      grid-row: span 3;
    }

    .cart-item-info {
      grid-column: 3;
    }

    .cart-item-quantity {
      grid-column: 3;
      justify-self: start;
    }

    .cart-item-total {
      display: none;
    }

    .remove-btn {
      position: absolute;
      right: 8px;
      top: 8px;
    }

    .cart-item {
      position: relative;
    }

    .page-title {
      font-size: 22px;
    }

    .items-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .summary-title {
      font-size: 16px;
    }

    .total-price-wrapper .total-price {
      font-size: 24px;
    }

    .checkout-btn {
      margin-bottom: 0;
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    .cart-item {
      padding: 10px;
      gap: 8px;
    }

    .cart-item-image {
      width: 70px;
      height: 70px;
    }

    .cart-item-name {
      font-size: 14px;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
    }

    .qty-value {
      min-width: 28px;
      font-size: 14px;
    }

    .clear-cart-btn span {
      display: none;
    }
  }
`;

export default CartPage;
