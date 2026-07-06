// ============================================
// SOLAR QUOTE FORM — Form đăng ký khảo sát miễn phí
// ============================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Wallet,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { quoteFormOptions } from "../../data/solarData";

const initialForm = {
  name: "",
  phone: "",
  address: "",
  bill: "",
  need: "house",
};

const SolarQuoteForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Vui lòng nhập họ tên.";
    if (!form.phone.trim()) {
      next.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^[0-9\s+-.]{8,15}$/.test(form.phone.trim())) {
      next.phone = "Số điện thoại không hợp lệ.";
    }
    if (!form.address.trim()) next.address = "Vui lòng nhập địa chỉ.";
    if (form.bill && !/^[0-9\s.,]+$/.test(form.bill)) {
      next.bill = "Vui lòng nhập số tiền hợp lệ.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // In real app: POST to backend here.
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left side - intro */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 md:text-sm"
          >
            <Sparkles size={14} />
            Tư vấn miễn phí
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Đăng ký khảo sát{" "}
            <span className="text-emerald-600">miễn phí</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg"
          >
            Để lại thông tin — đội ngũ kỹ sư của Nhật Minh Solar sẽ liên hệ
            tư vấn và khảo sát miễn phí trong vòng 24 giờ.
          </motion.p>

          <ul className="mt-8 space-y-4">
            {[
              "Tư vấn giải pháp phù hợp với nhu cầu & ngân sách",
              "Khảo sát mái nhà, đo đạc hướng nắng miễn phí",
              "Báo giá chi tiết, không phát sinh chi phí ẩn",
              "Hỗ trợ thủ tục mua bán điện với EVN",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700 md:text-base"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-600" />
            <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
              Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi chỉ sử
              dụng để tư vấn dịch vụ.
            </p>
          </div>
        </div>

        {/* Right side - form */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/50 md:p-8"
        >
          {submitted ? (
            <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={32} strokeWidth={2.4} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">
                Đăng ký thành công!
              </h3>
              <p className="max-w-md text-sm text-slate-600 md:text-base">
                Cảm ơn bạn đã đăng ký. Kỹ sư của Nhật Minh Solar sẽ liên hệ
                tư vấn trong vòng 24 giờ.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Gửi yêu cầu khác →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">
                Thông tin của bạn
              </h3>

              {/* Name */}
              <FormField
                label="Họ và tên *"
                icon={User}
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={update("name")}
                error={errors.name}
              />

              {/* Phone */}
              <FormField
                label="Số điện thoại *"
                icon={Phone}
                placeholder="0987 654 321"
                value={form.phone}
                onChange={update("phone")}
                error={errors.phone}
              />

              {/* Address */}
              <FormField
                label="Địa chỉ *"
                icon={MapPin}
                placeholder="Số nhà, đường, phường/xã, tỉnh/thành"
                value={form.address}
                onChange={update("address")}
                error={errors.address}
              />

              {/* Bill */}
              <FormField
                label="Tiền điện hàng tháng (VNĐ)"
                icon={Wallet}
                placeholder="VD: 1.500.000"
                value={form.bill}
                onChange={update("bill")}
                error={errors.bill}
              />

              {/* Need */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nhu cầu của bạn
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quoteFormOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, need: opt.id }))
                      }
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        form.need === opt.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40"
              >
                Đăng ký khảo sát miễn phí
              </button>

              <p className="text-center text-xs leading-relaxed text-slate-500">
                Bằng việc gửi form, bạn đồng ý với chính sách bảo mật của
                Nhật Minh Solar.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Reusable field
const FormField = ({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={18}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
          error ? "text-red-400" : "text-slate-400"
        }`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"
        }`}
      />
    </div>
    {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
  </div>
);

export default SolarQuoteForm;
