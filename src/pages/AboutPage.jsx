import { Link } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import ContactSection from "./ContactSection";

const IMAGES = {
  showroom:
    "https://cdn.phototourl.com/free/2026-06-05-38389b9c-7a29-484b-b66c-2c87a1e9f322.png",
  camera:
    "https://thaihungsmarthome.com/wp-content/uploads/2022/07/g2h-pro-510x510.png",
  lock:
    "https://thaihungsmarthome.com/wp-content/uploads/2024/12/Camera-Aqara-Hub-G5-Pro-mau-trang-01-510x510.jpg",
  safe:
    "https://thaihungsmarthome.com/wp-content/uploads/2026/01/camera-aqara-g350.jpg",
  access:
    "https://thaihungsmarthome.com/wp-content/uploads/2023/10/camera-aqara-e1-5-600x600-1.jpg",
};

const services = [
  "Nhà thông minh: công tắc, đèn, rèm, cảm biến, điều khiển qua điện thoại",
  "Camera an ninh: quan sát trong nhà, ngoài trời, xem từ xa mọi lúc",
  "Khóa cửa thông minh: vân tay, mã số, thẻ từ, app điện thoại",
  "Kiểm soát ra vào: chấm công, quản lý cửa cho văn phòng, nhà trọ, doanh nghiệp",
];

const ImageBox = ({ src, label, className = "" }) => (
  <div
    className={`
      relative overflow-hidden bg-slate-100 border-2 border-sky-500
      ${className}
    `}
  >
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-center p-4">
        <span className="text-xs md:text-sm font-semibold text-slate-500">
          Ảnh {label}
        </span>
      </div>
    )}
  </div>
);

const AboutPage = () => {
  return (
    <main className="bg-white text-slate-900 overflow-hidden">
      <section className="py-10 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          {/* INTRO */}
          <div className="max-w-4xl mb-6 md:mb-8">
            <p className="text-sky-600 font-bold mb-3 text-sm md:text-base uppercase tracking-wide">
              Nhật Minh Smart Home
            </p>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-slate-950">
              Giải pháp nhà thông minh an toàn, tiện nghi và hiện đại
            </h1>

            <p className="text-base md:text-lg leading-7 md:leading-8 text-slate-700">
              Nhật Minh Smart Home là đơn vị chuyên cung cấp giải pháp thiết bị
              nhà thông minh cho nhà ở, văn phòng, khách sạn, nhà trọ và các
              công trình dân dụng. Với định hướng “An toàn – Tiện nghi – Thông
              minh”, chúng tôi luôn chú trọng chất lượng sản phẩm, tính ổn định
              khi vận hành và trải nghiệm sử dụng thực tế của khách hàng.
            </p>
          </div>

          {/* SHOWROOM */}
          <div className="overflow-hidden rounded-none md:rounded-none border-2 md:border-[2px] border-sky-500 shadow-sm mb-10 md:mb-14 bg-slate-100">
            <img
              src={IMAGES.showroom}
              alt="Showroom Nhật Minh Smart Home"
              className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            {/* LEFT */}
            <div className="order-2 lg:order-1">
              <p className="text-base md:text-lg leading-7 md:leading-8 text-slate-800 mb-4 font-semibold">
                Chúng tôi tư vấn và thi công các hạng mục chính như:
              </p>

              <div className="space-y-3 mb-6">
                {services.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5 md:mt-1" />
                    <span className="text-sm md:text-base text-slate-800 leading-6 md:leading-7">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-base md:text-lg leading-7 md:leading-8 text-slate-700 mb-7">
                Sản phẩm được lựa chọn từ các thương hiệu uy tín, có nguồn gốc
                rõ ràng và được bảo hành minh bạch. Nhật Minh Smart Home luôn
                sẵn sàng đồng hành để giúp khách hàng xây dựng không gian sống
                an toàn, tiện nghi và hiện đại hơn.
              </p>

              <div className="rounded-none border border-slate-200 bg-slate-50 p-5 md:p-6 mb-7">
                <p className="font-bold text-slate-900 mb-4">
                  Thông tin liên hệ
                </p>

                <div className="space-y-3 text-slate-700">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base leading-6">
                      Nhà số 01 ngõ Giếng Vàng, Khu phố Phù Lưu, Phường Từ Sơn,
                      Tỉnh Bắc Ninh, Việt Nam
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">0876.906.668</span>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">
                      contact@nhatminh.vn
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm md:text-base font-bold transition rounded-xl"
              >
                Liên hệ tư vấn
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* RIGHT IMAGES */}
            <div className="order-1 lg:order-2 relative w-full max-w-[620px] mx-auto lg:mx-0">
              <div className="hidden sm:block absolute inset-0 border-2 border-blue-600 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5" />

              <div className="relative grid grid-cols-2 gap-3 md:gap-4">
                <ImageBox
                  src={IMAGES.camera}
                  label="camera an ninh"
                  className="h-[155px] sm:h-[190px] md:h-[230px] lg:h-[250px] rounded-tl-[40px] md:rounded-tl-[70px]"
                />

                <ImageBox
                  src={IMAGES.lock}
                  label="khóa cửa thông minh"
                  className="h-[155px] sm:h-[190px] md:h-[230px] lg:h-[250px] rounded-tr-[40px] md:rounded-tr-[80px]"
                />

                <ImageBox
                  src={IMAGES.safe}
                  label="két sắt thông minh"
                  className="h-[155px] sm:h-[190px] md:h-[230px] lg:h-[250px] rounded-bl-[40px] md:rounded-bl-[80px]"
                />

                <ImageBox
                  src={IMAGES.access}
                  label="kiểm soát ra vào"
                  className="h-[155px] sm:h-[190px] md:h-[230px] lg:h-[250px] rounded-br-[40px] md:rounded-br-[70px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default AboutPage;