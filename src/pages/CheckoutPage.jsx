import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { createOrder } from "../services/orderService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getShipping, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingFee = getShipping();

  if (cartItems.length === 0) {
    return (
      <>
        <style>{checkoutStyles}</style>
        <div className="checkout-page">
          <div className="checkout-container">
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2>Giỏ hàng trống</h2>
              <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng</p>
              <Link to="/products" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0[0-9]{9,10})$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ (0xxxxxxxxx)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const order = {
        userInfo: {
          name: formData.name.trim() || "",
          phone: formData.phone.trim() || "",
          address: formData.address.trim() || "",
          note: formData.note.trim() || "",
        },

        items: cartItems.map((item) => ({
          id: item.id || "",
          name: item.name || "",
          price: item.price || 0,
          thumbnail: item.thumbnail || "",
          quantity: item.quantity || 1,
        })),

        totalPrice: totalPrice || 0,
        shippingFee: shippingFee || 0,
        status: "pending",
        createdAt: new Date(),
      };

      await createOrder(order);

      clearCart();

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      navigate("/products");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{checkoutStyles}</style>
      <div className="checkout-page">
        <div className="checkout-container">
          {/* Header */}
          <div className="checkout-header">
            <button className="back-link" onClick={() => navigate("/cart")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Quay lại giỏ hàng
            </button>
            <h1 className="checkout-title">Thanh toán</h1>
          </div>

          {/* Main Content */}
          <div className="checkout-content">
            {/* Left: Form */}
            <div className="checkout-form">
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h2>Thông tin giao hàng</h2>
                    <p>Điền thông tin để chúng tôi giao hàng đến bạn</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="form-group">
                    <label>
                      Họ và tên <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0xxxxxxxxx"
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Địa chỉ giao hàng <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, thành phố"
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Ghi chú (tùy chọn)</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Ghi chú thêm cho đơn hàng (VD: giao giờ hành chính)"
                      rows="3"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="checkout-summary">
              <div className="summary-card">
                <h3 className="summary-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Đơn hàng của bạn
                </h3>

                {/* Items */}
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="item-image">
                        <img src={item.thumbnail} alt={item.name} />
                        {/* <span className="item-qty">{item.quantity}</span> */}
                      </div>
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">
                          {item.quantity} x {Number(item.price).toLocaleString()}đ
                        </span>
                      </div>
                      <span className="item-total">
                        {Number(item.price * item.quantity).toLocaleString()}đ
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary Rows */}
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>{Number(totalPrice - shippingFee).toLocaleString()}đ</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span className={shippingFee === 0 ? "free" : ""}>
                      {shippingFee === 0 ? "Miễn phí" : `${Number(shippingFee).toLocaleString()}đ`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <div className="shipping-note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      Miễn phí vận chuyển khi đơn hàng từ 500.000đ
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="summary-total">
                  <span>Tổng cộng</span>
                  <div className="total-right">
                    <span className="total-price">{Number(totalPrice).toLocaleString()}đ</span>
                    <span className="total-note">(Đã bao gồm VAT)</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Đặt hàng ngay
                    </>
                  )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const checkoutStyles = `
  /* ==================== PAGE LAYOUT ==================== */
  .checkout-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 32px 0 60px;
  }

  .checkout-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== HEADER ==================== */
  .checkout-header {
    margin-bottom: 32px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    background: none;
    border: none;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease;
    margin-bottom: 16px;
  }

  .back-link:hover {
    color: #2563eb;
  }

  .checkout-title {
    font-size: 32px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  /* ==================== MAIN CONTENT ==================== */
  .checkout-content {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 32px;
    align-items: start;
  }

  /* ==================== FORM SECTION ==================== */
  .checkout-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-section {
    background: #ffffff;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
  }

  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-icon {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(56, 189, 248, 0.1));
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .section-icon svg {
    color: #2563eb;
  }

  .section-header h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
  }

  .section-header p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group.full-width {
    grid-column: span 2;
  }

  .form-group label {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }

  .required {
    color: #ef4444;
  }

  .form-group input,
  .form-group textarea {
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.2s ease;
    background: #f8fafc;
    color: #0f172a;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #94a3b8;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #2563eb;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  .form-group input.error,
  .form-group textarea.error {
    border-color: #ef4444;
    background: #fef2f2;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .error-text {
    font-size: 12px;
    color: #ef4444;
  }

  /* ==================== SUMMARY CARD ==================== */
  .checkout-summary {
    position: sticky;
    top: 90px;
  }

  .summary-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
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

  /* Items */
  .summary-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 16px;
    max-height: 280px;
    overflow-y: auto;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .item-image {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 10px;
    overflow: hidden;
    background: #f8fafc;
    flex-shrink: 0;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-qty {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    background: #2563eb;
    color: #ffffff;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-name {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-price {
    display: block;
    font-size: 12px;
    color: #64748b;
    margin-top: 2px;
  }

  .item-total {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    flex-shrink: 0;
  }

  /* Summary Rows */
  .summary-rows {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .summary-row span:last-child {
    font-weight: 600;
    color: #0f172a;
  }

  .summary-row .free {
    color: #22c55e;
    font-weight: 600;
  }

  .shipping-note {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 8px;
  }

  .shipping-note svg {
    color: #2563eb;
    flex-shrink: 0;
  }

  /* Total */
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

  .total-right {
    text-align: right;
  }

  .total-price {
    display: block;
    font-size: 28px;
    font-weight: 800;
    color: #ef4444;
  }

  .total-note {
    font-size: 12px;
    color: #94a3b8;
  }

  /* Submit Button */
  .submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px 24px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    border: none;
    border-radius: 16px;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
    margin-bottom: 16px;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(37, 99, 235, 0.5);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Security Note */
  .security-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
  }

  .security-note svg {
    color: #22c55e;
  }

  /* ==================== EMPTY STATE ==================== */
  .empty-state {
    text-align: center;
    padding: 80px 40px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.1);
  }

  .empty-icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: #94a3b8;
  }

  .empty-state h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
  }

  .empty-state p {
    font-size: 15px;
    color: #64748b;
    margin: 0 0 24px;
  }

  /* ==================== BUTTONS ==================== */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 14px;
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
    .checkout-content {
      grid-template-columns: 1fr;
    }

    .checkout-summary {
      position: static;
      order: -1;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .checkout-container {
      padding: 0 16px;
    }

    .checkout-page {
      padding: 20px 0 40px;
    }

    .checkout-title {
      font-size: 26px;
    }

    .form-section {
      padding: 24px;
      border-radius: 20px;
    }

    .section-header {
      margin-bottom: 24px;
      padding-bottom: 20px;
    }

    .section-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
    }

    .section-header h2 {
      font-size: 18px;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .form-group.full-width {
      grid-column: span 1;
    }

    .summary-card {
      padding: 20px;
      border-radius: 20px;
    }

    .summary-title {
      font-size: 16px;
    }

    .total-price {
      font-size: 24px;
    }

    .submit-btn {
      padding: 16px 20px;
      font-size: 16px;
      border-radius: 14px;
    }

    .empty-state {
      padding: 60px 24px;
      border-radius: 20px;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
    }

    .empty-state h2 {
      font-size: 20px;
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    .checkout-title {
      font-size: 22px;
    }

    .form-section {
      padding: 20px;
    }

    .form-group input,
    .form-group textarea {
      padding: 12px 14px;
      font-size: 14px;
    }

    .summary-items {
      max-height: 220px;
    }
  }
`;

export default CheckoutPage;
