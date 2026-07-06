// ============================================
// SOLAR CALCULATOR SECTION
// Form: tiền điện + mái + địa phương -> tính demo
// ============================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Zap,
  TrendingUp,
  Wallet,
  Clock,
  Sun,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { roofTypes, localities } from "../../data/solarData";

// Average price per kWh (VND)
const PRICE_PER_KWH = 2400;
// Average solar production per 1kWp system per month (kWh) for Bac Ninh
const KWH_PER_KWP_MONTH = 120;
// Average system cost per kWp (VND)
const COST_PER_KWP = 14_000_000;

const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(n)) + " ₫";

const SolarCalculator = () => {
  const [form, setForm] = useState({
    bill: "",
    roof: "tin",
    locality: "Bắc Ninh",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setError("");
  };

  const calculate = (e) => {
    e.preventDefault();
    const billValue = Number(String(form.bill).replace(/\D/g, ""));
    if (!billValue || billValue <= 0) {
      setError("Vui lòng nhập số tiền điện hàng tháng của bạn.");
      return;
    }

    const roof = roofTypes.find((r) => r.id === form.roof);
    const factor = roof?.factor ?? 1;

    // 1. Recommended capacity = (monthly bill / price per kWh) / monthly kWh per kWp, with roof factor
    const monthlyKwh = billValue / PRICE_PER_KWH;
    const capacityKwp = (monthlyKwh / KWH_PER_KWP_MONTH) * factor;
    const safeCapacity = Math.max(2, Math.round(capacityKwp * 10) / 10);

    // 2. Annual production
    const annualProduction = Math.round(safeCapacity * KWH_PER_KWP_MONTH * 12);

    // 3. Annual savings
    const annualSavings = annualProduction * PRICE_PER_KWH;

    // 4. Total investment
    const totalInvestment = safeCapacity * COST_PER_KWP;

    // 5. Payback years
    const paybackYears = totalInvestment / annualSavings;

    setResult({
      capacity: safeCapacity,
      annualProduction,
      annualSavings,
      totalInvestment,
      paybackYears,
      roof: roof?.label,
      locality: form.locality,
    });
  };

  const resultCards = useMemo(() => {
    if (!result) return [];
    return [
      {
        icon: Sun,
        label: "Đề xuất công suất",
        value: `${result.capacity} kWp`,
        color: "emerald",
      },
      {
        icon: Zap,
        label: "Sản lượng điện/năm",
        value: `${result.annualProduction.toLocaleString("vi-VN")} kWh`,
        color: "amber",
      },
      {
        icon: Wallet,
        label: "Tiết kiệm/năm",
        value: formatVND(result.annualSavings),
        color: "emerald",
      },
      {
        icon: Clock,
        label: "Thời gian hoàn vốn",
        value: `${result.paybackYears.toFixed(1)} năm`,
        color: "amber",
      },
    ];
  }, [result]);

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-16 md:py-24"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm md:text-sm"
          >
            <Calculator size={14} />
            Máy tính điện mặt trời
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Tính nhanh chi phí{" "}
            <span className="text-emerald-600">điện mặt trời</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Chỉ với vài thông tin cơ bản, chúng tôi sẽ giúp bạn ước tính
            công suất và khả năng tiết kiệm phù hợp.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8 lg:col-span-2"
          >
            <h3 className="mb-6 text-xl font-bold text-slate-900 md:text-2xl">
              Thông tin của bạn
            </h3>

            <form onSubmit={calculate} className="space-y-5">
              {/* Bill */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tiền điện mỗi tháng (VNĐ)
                </label>
                <div className="relative">
                  <Wallet
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.bill}
                    onChange={handleChange("bill")}
                    placeholder="VD: 1.500.000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              {/* Roof type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Loại mái
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roofTypes.map((roof) => (
                    <button
                      key={roof.id}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, roof: roof.id })
                      }
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        form.roof === roof.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      {roof.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locality */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Địa phương
                </label>
                <select
                  value={form.locality}
                  onChange={handleChange("locality")}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[right_1rem_center] bg-no-repeat py-3.5 pl-4 pr-10 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                >
                  {localities.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40"
              >
                <Calculator size={18} />
                Tính ngay
              </button>

              <p className="text-xs leading-relaxed text-slate-500">
                * Kết quả chỉ mang tính chất tham khảo. Kỹ sư của chúng tôi
                sẽ khảo sát và tư vấn chi tiết cho bạn.
              </p>
            </form>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-white/50 p-8 text-center"
                >
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <TrendingUp size={32} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Kết quả của bạn sẽ hiển thị ở đây
                  </h3>
                  <p className="max-w-md text-sm text-slate-500">
                    Nhập tiền điện hàng tháng và chọn loại mái để xem công
                    suất đề xuất, sản lượng điện, tiết kiệm và thời gian
                    hoàn vốn ước tính.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Summary banner */}
                  <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-xl md:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-emerald-100">
                          Đề xuất cho {result.locality} ·{" "}
                          {result.roof}
                        </p>
                        <h3 className="mt-1 text-2xl font-bold md:text-3xl">
                          Hệ thống {result.capacity} kWp
                        </h3>
                        <p className="mt-2 text-sm text-emerald-100">
                          Tổng đầu tư ước tính:{" "}
                          <span className="font-bold text-amber-200">
                            {formatVND(result.totalInvestment)}
                          </span>
                        </p>
                      </div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-amber-200 backdrop-blur md:h-14 md:w-14">
                        <Sun size={28} />
                      </div>
                    </div>
                  </div>

                  {/* Result cards */}
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4">
                    {resultCards.map((card, i) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5"
                      >
                        <div
                          className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                            card.color === "emerald"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <card.icon size={20} />
                        </div>
                        <p className="text-xs text-slate-500 md:text-sm">
                          {card.label}
                        </p>
                        <p className="mt-1 text-lg font-bold text-slate-900 md:text-xl">
                          {card.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Notes */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5">
                    <p className="mb-3 text-sm font-semibold text-slate-900">
                      Lợi ích khi lắp đặt
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Giảm đến 90% hóa đơn điện hàng tháng",
                        "Bảo hành tấm pin 25 năm, inverter 5-10 năm",
                        "Hỗ trợ thủ tục mua bán điện EVN miễn phí",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-emerald-500"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("quote");
                        if (el)
                          window.scrollTo({
                            top: el.getBoundingClientRect().top + window.scrollY - 80,
                            behavior: "smooth",
                          });
                      }}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
                    >
                      Nhận tư vấn chi tiết
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
