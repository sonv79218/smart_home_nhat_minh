// ============================================
// PREMIUM SMART HOME FOOTER
// Footer.jsx
// ============================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {

  ShieldCheck,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const supportLinks = [
    { label: "Chính sách & Điều khoản", href: "/chinh-sach" },
    { label: "Chính sách thanh toán" },
    { label: "Chính sách bảo hành" },
    { label: "Chính sách đổi trả - hoàn tiền" },
    { label: "Chính sách vận chuyển" },
    { label: "Chính sách kiểm hàng" },
    { label: "Dịch vụ lắp đặt tại nhà" },
  ];

  const productLinks = [
    { label: "Công tắc thông minh" },
    { label: "Đèn thông minh" },
    { label: "Khóa thông minh" },
    { label: "Camera thông minh" },
    { label: "Rèm thông minh" },
    { label: "Ổ cắm thông minh" },
  ];

  const brandLinks = [
    { label: "Aqara" },
    { label: "Hunonic" },
    { label: "Lumi" },
  ];

  const contactLinks = [
    { label: "Hỗ trợ khách hàng: 8h - 18h" },
    { label: "Hotline: 0876.906.668" },
    { label: "Kỹ thuật: 0972.131.477" },
    {
      label:
        "Địa chỉ: Nhà số 01 ngõ Giếng Vàng, Khu phố Phù Lưu, Phường Từ Sơn, Tỉnh Bắc Ninh",
    },
  ];

  const footerSections = [
    { title: "HỖ TRỢ", items: supportLinks },
    { title: "SẢN PHẨM", items: productLinks },
    { title: "THƯƠNG HIỆU", items: brandLinks },
    { title: "LIÊN HỆ", items: contactLinks },
  ];

  const renderItem = (item, className = "") => {
    if (item.href) {
      return (
        <Link to={item.href} className={className}>
          {item.label}
        </Link>
      );
    }

    return <span className={className}>{item.label}</span>;
  };

  return (
    <>
      {/* DESKTOP FOOTER */}
      <footer className="hidden lg:block bg-slate-950 text-gray-300 border-t border-slate-800">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-10"
          >
            <BadgeCheck className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-white">
              8 năm kinh nghiệm Smart Home
            </span>
          </motion.div>

          <div className="grid grid-cols-4 gap-10">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white text-lg font-bold mb-5">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li key={index}>
                      {renderItem(
                        item,
                        "hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm block"
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 my-10" />

          <div className="grid lg:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-white font-semibold text-base">
                  Nhật Minh Smart Home
                </h4>
              </div>

              <p className="leading-7 text-gray-400">
                © 2018 – 2026 Nhật Minh Smart Home với 8 năm hoạt động
                trong lĩnh vực thi công và tư vấn giải pháp thiết bị nhà
                thông minh
              </p>
            </div>

            <div className="space-y-3 text-gray-400 leading-7">
              <p>
                <span className="text-white font-medium">
                  CÔNG TY TNHH NHẬT MINH CÔNG NGHỆ GROUP
                </span>
              </p>

              <p>GPĐKKD: 2301374027 — MST: 2301374027</p>

              <p>
                Địa chỉ: Nhà số 01 ngõ Giếng Vàng, Khu phố Phù Lưu,
                Phường Từ Sơn, Tỉnh Bắc Ninh, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE FOOTER */}
      <footer className="lg:hidden bg-white text-slate-900 border-t border-slate-200">
        <div className="divide-y divide-slate-200">
          {footerSections.map((section) => {
            const isOpen = openSection === section.title;

            return (
              <div key={section.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(isOpen ? null : section.title)
                  }
                  className="w-full flex items-center justify-between px-4 py-5 text-left"
                >
                  <span className="text-sm font-extrabold tracking-wide">
                    {section.title}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="px-4 pb-5 space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index}>
                        {renderItem(
                          item,
                          "block text-sm leading-6 text-slate-600"
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-slate-100 px-4 py-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <h4 className="font-extrabold text-slate-900">
              Nhật Minh Smart Home
            </h4>
          </div>

          <p className="text-sm leading-6 text-slate-700 mb-4">
            © 2018 – 2026 Nhật Minh Smart Home. Đơn vị tư vấn, thiết kế
            và thi công giải pháp nhà thông minh, camera an ninh, khóa cửa
            thông minh.
          </p>

          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold">MST:</span> 2301374027
            </p>
            <p>
              <span className="font-semibold">Địa chỉ:</span> Nhà số 01
              ngõ Giếng Vàng, Phù Lưu, Từ Sơn, Bắc Ninh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;