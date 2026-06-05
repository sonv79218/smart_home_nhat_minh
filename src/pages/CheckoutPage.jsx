// ============================================
// CHECKOUT PAGE - TAILWIND CSS
// ============================================
import { useState, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";
import { createOrder } from "../services/orderService";
import { toInteger } from "../utils/priceUtils";
import { ArrowLeft, User, Truck, CreditCard, Package, Shield, Check } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeMultipleFromCart, getCartItemKey } = useCart();

  const selectedItemKeys = location.state?.selectedItems || [];

  const checkoutItems = useMemo(() => {
    return cartItems.filter(item =>
      selectedItemKeys.includes(getCartItemKey(item))
    );
  }, [cartItems, selectedItemKeys, getCartItemKey]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  }, [checkoutItems]);

  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const totalPrice = subtotal + shippingFee;

  // Empty state if no items selected
  if (cartItems.length > 0 && checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl shadow-lg">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Chưa chọn sản phẩm</h2>
          <p className="text-slate-500 mb-6">Vui lòng quay lại giỏ hàng để chọn sản phẩm</p>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft size={18} />
            Quay lại giỏ hàng
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl shadow-lg">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-slate-500 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
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
          email: formData.email.trim() || "",
          address: formData.address.trim() || "",
          note: formData.note.trim() || "",
        },

        items: checkoutItems.map((item) => ({
          id: item.id || "",
          name: item.name || "",
          price: item.price || 0,
          thumbnail: item.thumbnail || "",
          quantity: item.quantity || 1,
          variantId: item.variantId || null,
          sku: item.sku || "",
          optionValues: item.optionValues || [],
        })),

        totalPrice: totalPrice || 0,
        shippingFee: shippingFee || 0,
        status: "pending",
        createdAt: new Date(),
      };

      await createOrder(order);

      removeMultipleFromCart(selectedItemKeys);

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      navigate("/products");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop";

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12 pb-20 lg:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Quay lại giỏ hàng
          </button>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Thanh toán</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <User size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-slate-900 mb-1">Thông tin giao hàng</h2>
                  <p className="text-sm text-slate-500">Điền thông tin để chúng tôi giao hàng đến bạn</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    className={`
                      px-4 py-3.5 border-2 rounded-xl text-sm bg-slate-50
                      focus:outline-none transition-all
                      ${errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }
                    `}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0xxxxxxxxx"
                    className={`
                      px-4 py-3.5 border-2 rounded-xl text-sm bg-slate-50
                      focus:outline-none transition-all
                      ${errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }
                    `}
                  />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Email (tùy chọn)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="px-4 py-3.5 border-2 border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className={`
                      px-4 py-3.5 border-2 rounded-xl text-sm bg-slate-50
                      focus:outline-none transition-all
                      ${errors.address
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      }
                    `}
                  />
                  {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Ghi chú (tùy chọn)</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng mong muốn"
                    rows={3}
                    className="px-4 py-3.5 border-2 border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all resize-vertical min-h-[80px]"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 lg:p-7 shadow-sm">
              <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 mb-5">
                <Package size={20} className="text-blue-600" />
                Tóm tắt đơn hàng
              </h3>

              {/* Items */}
              <div className="flex flex-col gap-3 pb-4 border-b border-slate-100 mb-4 max-h-80 overflow-y-auto">
                {checkoutItems.map((item) => (
                  <div key={item.variantId ? `${item.id}-${item.variantId}` : item.id} className="flex items-start gap-3 pb-3 border-b border-dashed border-slate-100 last:border-b-0 last:pb-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <img
                        src={item.thumbnail || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                      />
                      <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-slate-900 line-clamp-2 leading-tight">
                        {item.name}
                      </span>
                      {item.optionValues?.length > 0 && (
                        <span className="block text-xs text-slate-500 mt-0.5">
                          {item.optionValues.join(" · ")}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 shrink-0">
                      {toInteger(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary Rows */}
              <div className="space-y-3 pb-4 border-b border-slate-100 mb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tạm tính ({checkoutItems.length} sản phẩm)</span>
                  <span className="font-semibold text-slate-900">{toInteger(subtotal).toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Phí vận chuyển</span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600 font-semibold">Miễn phí</span>
                  ) : (
                    <span className="font-semibold text-slate-900">{toInteger(shippingFee).toLocaleString()}đ</span>
                  )}
                </div>
              </div>

              {/* Shipping Note */}
              {shippingFee > 0 && (
                <div className="flex items-center gap-2 text-xs text-slate-500 p-2.5 bg-slate-50 rounded-lg mb-4">
                  <Truck size={14} className="text-blue-600 shrink-0" />
                  <span>Mua thêm {toInteger(500000 - subtotal).toLocaleString()}đ để miễn phí vận chuyển</span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-start mb-5">
                <span className="text-base font-semibold text-slate-900">Tổng cộng</span>
                <div className="text-right">
                  <span className="text-2xl lg:text-3xl font-extrabold text-red-500">
                    {toInteger(totalPrice).toLocaleString()}đ
                  </span>
                  <span className="block text-xs text-slate-400">(Đã bao gồm VAT)</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="
                  w-full flex items-center justify-center gap-2.5
                  py-4 px-6
                  bg-gradient-to-r from-blue-600 to-sky-500 text-white
                  border-none rounded-2xl
                  text-base lg:text-lg font-bold
                  shadow-lg shadow-blue-500/40
                  hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5
                  active:scale-[0.98]
                  transition-all duration-200
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                "
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Check size={20} />
                    Đặt hàng ngay
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                <Shield size={14} className="text-green-500" />
                <span>Thanh toán an toàn & bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
