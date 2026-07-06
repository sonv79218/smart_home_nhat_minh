// ============================================
// SOLAR FOOTER — Footer riêng cho Nhật Minh Solar
// Style đồng bộ với Footer Smart Home (dark)
// ============================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { solarContactInfo } from "../../data/solarData";

const FooterSections = [
  {
    title: "GIẢI PHÁP",
    items: [
      { label: "Điện mặt trời hòa lưới", href: "#solutions" },
      { label: "Điện mặt trời Hybrid", href: "#solutions" },
      { label: "Điện mặt trời có lưu trữ", href: "#solutions" },
      { label: "Điện mặt trời doanh nghiệp", href: "#solutions" },
      { label: "Điện mặt trời nhà xưởng", href: "#solutions" },
    ],
  },
  {
    title: "THIẾT BỊ",
    items: [
      { label: "Inverter", href: "#products" },
      { label: "Pin lưu trữ", href: "#products" },
      { label: "Tấm pin mặt trời", href: "#products" },
      { label: "Phụ kiện & giá đỡ", href: "#products" },
    ],
  },
  {
    title: "THƯƠNG HIỆU",
    items: [
      { label: "Huawei" },
      { label: "Deye" },
      { label: "Sungrow" },
      { label: "Growatt" },
      { label: "Jinko Solar" },
      { label: "JA Solar" },
      { label: "LONGi" },
    ],
  },
  {
    title: "LIÊN HỆ",
    items: [
      { label: `Hotline: ${solarContactInfo.hotline}` },
      { label: `Kỹ thuật: ${solarContactInfo.technical}` },
      { label: `Email: ${solarContactInfo.email}` },
      { label: `Giờ làm việc: 8h - 18h (T2 - T7)` },
    ],
  },
];

const SolarFooter = () => {
  const [openSection, setOpenSection] = useState(null);

  const renderItem = (item) => {
    if (item.href) {
      return (
        <a
          href={item.href}
          className="text-sm text-gray-400 transition-colors duration-200 hover:text-emerald-400"
        >
          {item.label}
        </a>
      );
    }
    return <span className="text-sm text-gray-400">{item.label}</span>;
  };

  return (
    <>
      {/* DESKTOP */}
      <footer className="hidden bg-slate-950 text-gray-300 lg:block">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2"
          >
            <Sun className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium text-white">
              Đơn vị thi công điện mặt trời uy tín Bắc Ninh
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {FooterSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-5 text-lg font-bold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx}>{renderItem(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="my-12 border-t border-slate-800" />

          <div className="grid gap-8 text-sm md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h4 className="text-base font-semibold text-white">
                  Nhật Minh Solar
                </h4>
              </div>
              <p className="leading-7 text-gray-400">
                © 2018 – 2026 Nhật Minh Solar — Đơn vị tư vấn, thiết kế và
                thi công hệ thống điện năng lượng mặt trời cho hộ gia đình
                và doanh nghiệp.
              </p>
            </div>

            <div className="space-y-3 leading-7 text-gray-400">
              <p>
                <span className="font-medium text-white">
                  {solarContactInfo.company}
                </span>
              </p>
              <p>MST: {solarContactInfo.taxCode}</p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                {solarContactInfo.address}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE */}
      <footer className="border-t border-slate-200 bg-white text-slate-900 lg:hidden">
        <div className="divide-y divide-slate-200">
          {FooterSections.map((section) => {
            const isOpen = openSection === section.title;
            return (
              <div key={section.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(isOpen ? null : section.title)
                  }
                  className="flex w-full items-center justify-between px-4 py-5 text-left"
                >
                  <span className="text-sm font-extrabold tracking-wide">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <ul className="space-y-3 px-4 pb-5">
                    {section.items.map((item, idx) => (
                      <li key={idx}>{renderItem(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-200 bg-slate-100 px-4 py-6">
          <div className="mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5 text-emerald-600" />
            <h4 className="font-extrabold text-slate-900">Nhật Minh Solar</h4>
          </div>
          <p className="mb-4 text-sm leading-6 text-slate-700">
            © 2018 – 2026 Nhật Minh Solar. Đơn vị tư vấn, thiết kế và thi
            công điện năng lượng mặt trời cho hộ gia đình và doanh nghiệp tại
            Bắc Ninh.
          </p>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              Hotline: {solarContactInfo.hotline}
            </p>
            <p className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {solarContactInfo.email}
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {solarContactInfo.address}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SolarFooter;
