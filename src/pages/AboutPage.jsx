// ============================================
// ABOUT PAGE - NHAT MINH SMART HOME
// Real Company Style + Image Placeholder
// ============================================
import { Link } from "react-router-dom";
import {
  Home,
  Camera,
  Lock,
  Lightbulb,
  ShieldCheck,
  Wrench,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ChevronRight,
  Building2,
  Users,
  Settings,
  Headphones,
} from "lucide-react";

const IMAGES = {
  hero: "../../assets/images/showroom/show_room.png",
  showroom: "../../assets/images/showroom/show_room.png",
  office1: "../../assets/images/showroom/phong_ky_thuat.png",
  office2: "../../assets/images/showroom/show_room_trung_bay.png",
  office3: "../../assets/images/showroom/show_room_trung_bay_2.png",

  project1: "../../assets/images/projects/biet_thu_thong_minh.png",
  project2: "../../assets/images/projects/nha_pho_thong_minh.png",
  project3: "../../assets/images/projects/can_ho_thong_minh.png",
  project4: "../../assets/images/projects/van_phong_thong_minh.png",

  process1: "../../assets/images/process/khao_sat.png",
  process2: "../../assets/images/process/tu_van.png",
  process3: "../../assets/images/process/thiet_ke.png",
  process4: "../../assets/images/process/thi_cong.png",
  process5: "../../assets/images/process/ban_giao.png",
  process6: "../../assets/images/process/bao_hanh.png",
  gallery1: "../../assets/images/gallery/gallery_1.png",
  gallery2: "../../assets/images/gallery/gallery_2.png",
  gallery3: "../../assets/images/gallery/gallery_3.png",
  gallery4: "../../assets/images/gallery/gallery_4.png",
  gallery5: "../../assets/images/gallery/gallery_5.png",
  gallery6: "../../assets/images/gallery/gallery_6.png",
  team1: "../../assets/images/team/team_1.png",
  team2: "",
  team3: "",
  contact: "",
};

const ImageBox = ({ src, label, className = "" }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full min-h-[220px] flex items-center justify-center text-center p-6">
          <div>
            <Camera className="w-8 h-8 mx-auto mb-3 text-slate-400" />
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="text-xs text-slate-400 mt-1">Thêm ảnh tại biến IMAGES</p>
          </div>
        </div>
      )}
    </div>
  );
};

const services = [
  {
    icon: Lightbulb,
    title: "Chiếu sáng thông minh",
    desc: "Điều khiển đèn theo khu vực, ngữ cảnh, cảm biến hoặc lịch trình.",
  },
  {
    icon: Lock,
    title: "Khóa cửa thông minh",
    desc: "Mở khóa bằng vân tay, mã số, thẻ từ, app và quản lý từ xa.",
  },
  {
    icon: Camera,
    title: "Camera an ninh",
    desc: "Giám sát nhà ở, cửa hàng, văn phòng với cảnh báo chuyển động.",
  },
  {
    icon: Home,
    title: "Tự động hóa nhà ở",
    desc: "Kết nối công tắc, cảm biến, rèm, điều hòa, camera thành một hệ thống.",
  },
];

const projects = [
  {
    image: IMAGES.project1,
    title: "Biệt thự thông minh",
    desc: "Giải pháp điều khiển chiếu sáng, rèm, an ninh và tự động hóa theo ngữ cảnh.",
  },
  {
    image: IMAGES.project2,
    title: "Nhà phố thông minh",
    desc: "Tối ưu tiện nghi sinh hoạt hằng ngày với công tắc, cảm biến và camera.",
  },
  {
    image: IMAGES.project3,
    title: "Căn hộ thông minh",
    desc: "Giải pháp gọn nhẹ, dễ sử dụng, phù hợp chung cư và gia đình trẻ.",
  },
  {
    image: IMAGES.project4,
    title: "Văn phòng thông minh",
    desc: "Quản lý chiếu sáng, an ninh và thiết bị điện hiệu quả hơn.",
  },
];

const process = [
  { image: IMAGES.process1, title: "Khảo sát", desc: "Kiểm tra hiện trạng công trình và nhu cầu sử dụng." },
  { image: IMAGES.process2, title: "Tư vấn", desc: "Đề xuất hệ thiết bị phù hợp với ngân sách." },
  { image: IMAGES.process3, title: "Thiết kế", desc: "Lên phương án thiết bị, vị trí lắp đặt và kịch bản sử dụng." },
  { image: IMAGES.process4, title: "Thi công", desc: "Lắp đặt, đấu nối và cấu hình thiết bị." },
  { image: IMAGES.process5, title: "Bàn giao", desc: "Hướng dẫn sử dụng app, ngữ cảnh và điều khiển từ xa." },
  { image: IMAGES.process6, title: "Bảo hành", desc: "Hỗ trợ kỹ thuật sau lắp đặt, xử lý nhanh khi cần." },
];

const commitments = [
  "Tư vấn đúng nhu cầu",
  "Thiết bị chính hãng",
  "Thi công đúng kỹ thuật",
  "Bảo hành rõ ràng",
  "Hỗ trợ sau lắp đặt",
  "Đồng hành lâu dài",
];

const team = [
  { image: IMAGES.team1, name: "Đang cập nhật", role: "Tư vấn giải pháp" },
  { image: IMAGES.team2, name: "Đang cập nhật", role: "Kỹ thuật triển khai" },
  { image: IMAGES.team3, name: "Đang cập nhật", role: "Kỹ thuật lắp đặt" },
];

const AboutPage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-sm font-semibold mb-6">
              <Home size={16} />
              Nhật Minh Smart Home
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Tư vấn, thiết kế và thi công nhà thông minh
            </h1>

            <p className="mt-5 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Nhật Minh Smart Home cung cấp giải pháp thiết bị thông minh cho nhà ở,
              căn hộ, biệt thự, văn phòng và cửa hàng. Chúng tôi giúp không gian sống
              tiện nghi hơn, an toàn hơn và dễ kiểm soát hơn mỗi ngày.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold transition"
              >
                Nhận tư vấn miễn phí
                <ChevronRight size={18} />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold transition"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          </div>

          <ImageBox
            src={IMAGES.hero}
            label="Ảnh banner showroom hoặc công trình nổi bật"
            className="h-[320px] md:h-[460px]"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <ImageBox
            src={IMAGES.showroom}
            label="Ảnh showroom / văn phòng / đội ngũ"
            className="h-[300px] md:h-[440px]"
          />

          <div>
            <p className="text-sky-500 font-bold mb-3">Chúng tôi là ai?</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Đơn vị Smart Home đồng hành cùng từng công trình
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Nhật Minh Smart Home tập trung vào các giải pháp thiết bị thông minh,
              tự động hóa nhà ở và hệ thống an ninh. Mỗi công trình đều được tư vấn
              dựa trên nhu cầu thực tế, thói quen sinh hoạt và ngân sách của khách hàng.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                    <Icon className="w-6 h-6 text-sky-500 mb-3" />
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* OFFICE */}
<section className="py-16 md:py-24 bg-slate-50">
  <div className="max-w-[1400px] mx-auto px-5 md:px-8">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-sky-500 font-bold mb-3">
        Văn phòng & Showroom
      </p>

      <h2 className="text-3xl md:text-5xl font-extrabold">
        Không gian làm việc thực tế
      </h2>

      <p className="mt-4 text-slate-600">
        Khu vực làm việc, kho thiết bị và không gian trải nghiệm Smart Home.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <ImageBox
        src={IMAGES.office1}
        label="Văn phòng kỹ thuật"
        className="h-[300px]"
      />

      <ImageBox
        src={IMAGES.office2}
        label="Kho thiết bị"
        className="h-[300px]"
      />

      <ImageBox
        src={IMAGES.office3}
        label="Showroom trải nghiệm"
        className="h-[300px]"
      />
    </div>
  </div>
</section>

      {/* PROJECTS */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            {/* <p className="text-sky-500 font-bold mb-3">Công trình thực tế</p> */}
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Một số dạng công trình chúng tôi triển khai
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <ImageBox src={project.image} label={`Ảnh ${project.title}`} className="h-[300px]" />
                <div className="p-6">
                  <h3 className="text-xl font-extrabold mb-2">{project.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sky-500 font-bold mb-3">Quy trình làm việc</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Rõ ràng từ khảo sát đến bàn giao
            </h2>
          </div>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {process.map((step, index) => (
    <div
      key={step.title}
      className="
        relative
        bg-white
        rounded-[32px]
        border border-slate-200
        p-8
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        overflow-hidden
      "
    >
      {/* Number */}
      <div
        className="
          absolute
          top-4
          right-5
          text-[72px]
          font-black
          text-slate-100
          leading-none
        "
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        className="
          w-24
          h-24
          rounded-3xl
          bg-gradient-to-br
          from-sky-50
          to-blue-100
          flex
          items-center
          justify-center
          mb-6
        "
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-black mb-3">
        {step.title}
      </h3>

      {/* Desc */}
      <p className="text-slate-600 leading-relaxed">
        {step.desc}
      </p>

      {/* Line */}
      <div className="mt-6 w-16 h-1 rounded-full bg-sky-500" />
    </div>
  ))}
</div>
 
        </div>
      </section>



      {/* GALLERY */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sky-500 font-bold mb-3">Thư viện hình ảnh</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Hình ảnh thực tế từ thiết bị, thi công và công trình
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImageBox src={IMAGES.gallery1} label="Ảnh công trình 1" className="h-[180px] md:h-[360px] md:row-span-2" />
            <ImageBox src={IMAGES.gallery2} label="Ảnh công trình 2" className="h-[180px]" />
            <ImageBox src={IMAGES.gallery3} label="Ảnh công trình 3" className="h-[180px]" />
            <ImageBox src={IMAGES.gallery4} label="Ảnh công trình 4" className="h-[180px] md:h-[360px] md:row-span-2" />
            <ImageBox src={IMAGES.gallery5} label="Ảnh công trình 5" className="h-[180px]" />
            <ImageBox src={IMAGES.gallery6} label="Ảnh công trình 6" className="h-[180px]" />
          </div>
        </div>
      </section>

      {/* TEAM + COMMITMENT */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-sky-500 font-bold mb-3">Đội ngũ</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">
              Tư vấn và kỹ thuật triển khai
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              {team.map((member) => (
                <div key={member.role} className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                  <ImageBox src={member.image} label={`Ảnh ${member.role}`} className="h-[180px]" />
                  <div className="p-4">
                    <h3 className="font-extrabold">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
            <p className="text-sky-500 font-bold mb-3">Cam kết</p>
            <h2 className="text-3xl font-extrabold mb-6">
              Làm đúng, rõ ràng và đồng hành lâu dài
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {commitments.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* TEAM */}
<section className="py-16 md:py-24">
  <div className="max-w-[1400px] mx-auto px-5 md:px-8">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-sky-500 font-bold mb-3">
        Đội ngũ Nhật Minh Smart Home
      </p>

      <h2 className="text-3xl md:text-5xl font-extrabold">
        Kỹ thuật viên giàu kinh nghiệm
      </h2>

      <p className="mt-4 text-slate-600">
        Tư vấn, triển khai và hỗ trợ kỹ thuật tận nơi.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          image: IMAGES.team1,
          title: "Tư vấn giải pháp",
        },
        {
          image: IMAGES.team2,
          title: "Đội ngũ kỹ thuật",
        },
        {
          image: IMAGES.team3,
          title: "Triển khai công trình",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
        >
          <ImageBox
            src={item.image}
            label={item.title}
            className="h-[280px]"
          />

          <div className="p-5 text-center">
            <h3 className="font-extrabold text-lg">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* CONTACT CTA */}
      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sky-300 font-bold mb-3">Liên hệ</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Bạn cần tư vấn giải pháp Smart Home?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Gửi nhu cầu của bạn, Nhật Minh Smart Home sẽ tư vấn phương án phù hợp
              với công trình, ngân sách và thói quen sử dụng.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-sky-300 shrink-0" />
                <span>Địa chỉ: Phù Lưu, Phường Từ Sơn, Tỉnh Bắc Ninh, Việt Nam</span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-sky-300 shrink-0" />
                <span>Hotline: 0876.906.668</span>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-sky-300 shrink-0" />
                <span>Email: contact@nhatminh.vn</span>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-sky-300 shrink-0" />
                <span>Giờ làm việc: 8:00 - 18:00</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold transition"
            >
              Liên hệ tư vấn
              <ChevronRight size={18} />
            </Link>
          </div>

          <ImageBox
            src={IMAGES.contact}
            label="Ảnh showroom / bản đồ / đội ngũ tư vấn"
            className="h-[300px] md:h-[420px]"
          />
        </div>
      </section>
    </main>
  );
};

export default AboutPage;