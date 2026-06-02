// ============================================
// PREMIUM SMART HOME FOOTER
// Footer.jsx
// ============================================

import { motion } from "framer-motion";
import {
  Phone,
  Clock3,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const Footer = () => {
  const supportLinks = [
    "Chính sách thanh toán",
    "Chính sách bảo hành",
    "Chính sách đổi trả - hoàn tiền",
    "Chính sách vận chuyển",
    "Chính sách kiểm hàng",
    "Chính sách bảo mật",
    "Dịch vụ lắp đặt tại nhà",
  ];

  const productLinks = [
    "Công tắc thông minh",
    "Đèn thông minh",
    "Khóa thông minh",
    "Camera thông minh",
    "Rèm thông minh",
    "Ổ cắm thông minh",
    "Loa thông minh",
  ];

  const brandLinks = [
    "Aqara",
    "Hunonic",
    "Lumi",
  ];

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">
      {/* TOP */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {/* Badge */}
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* HỖ TRỢ */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">HỖ TRỢ</h3>

            <ul className="space-y-3">
              {supportLinks.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SẢN PHẨM */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">SẢN PHẨM</h3>

            <ul className="space-y-3">
              {productLinks.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* THƯƠNG HIỆU */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">THƯƠNG HIỆU</h3>

            <ul className="space-y-3">
              {brandLinks.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* LIÊN HỆ */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">LIÊN HỆ</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Clock3 className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">
                    Hỗ trợ Khách hàng
                  </p>
                  <p>8h - 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 mt-1" />
                <div className="space-y-1">
                  <p>Hotline: 0876.906.668</p>
                  <p>Kỹ thuật: 0972.131.477</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                <p>
                  Từ Sơn - Bắc Ninh
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* LINE */}
        <div className="border-t border-slate-800 my-10" />


        {/* BOTTOM */}
        <div className="grid lg:grid-cols-2 gap-8 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h4 className="text-white font-semibold text-base">
                Nhật Minh Smart Home
              </h4>
            </div>

            <p className="leading-7 text-gray-400">
              © 2017 – 2025 Nhật Minh Smart Home với 8 năm hoạt động
              trong lĩnh vực thi công và tư vấn giải pháp thiết bị nhà
              thông minh, triển khai các hệ sinh thái Aqara, Yeelight,
              Vconnex, Tuya, Lumi, Google.
            </p>
          </div>

          <div className="space-y-3 text-gray-400 leading-7">
            <p>
              <span className="text-white font-medium">
                Công ty TNHH TM & DV Giải pháp IOT Việt Nam
              </span>
            </p>

            <p>
              GPĐKKD: 0901045126 — MST: 0901045126
            </p>

            <p>
              Địa chỉ: Từ Sơn - Bắc Ninh
            </p>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;