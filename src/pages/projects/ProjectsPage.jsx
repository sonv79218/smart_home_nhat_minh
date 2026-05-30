import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  Landmark,
  Store,
  KeyRound,
  Camera,
  Lightbulb,
  Blinds,
  ShieldCheck,
  ArrowRight,
  Phone,
  CheckCircle,
  Sparkles,
  ClipboardCheck,
  Wrench,
  Handshake,
} from "lucide-react";

const houseTypes = [
  {
    icon: Home,
    title: "Nhà phố",
    budget: "Phổ thông",
    desc: "Phù hợp nhà nhiều tầng, cần quản lý đèn, camera, khóa cửa, cảm biến và thiết bị điện theo từng khu vực.",
    items: [
      "Công tắc thông minh từng tầng",
      "Khóa cửa vân tay",
      "Camera cổng / sân",
      "Cảm biến cầu thang",
      "Rèm tự động phòng khách",
      "Ngữ cảnh ra khỏi nhà / đi ngủ",
    ],
  },
  {
    icon: Landmark,
    title: "Biệt thự",
    budget: "Cao cấp",
    desc: "Phù hợp công trình diện tích lớn, nhiều phòng, cần hệ thống đồng bộ, sang trọng và dễ quản lý.",
    items: [
      "Chiếu sáng thông minh toàn nhà",
      "Rèm tự động nhiều khu vực",
      "An ninh sân vườn",
      "Camera và cảm biến",
      "Điều khiển điều hòa / bình nóng lạnh",
      "Kịch bản tiếp khách / nghỉ ngơi",
    ],
  },
  {
    icon: Building2,
    title: "Chung cư",
    budget: "Tiết kiệm",
    desc: "Phù hợp căn hộ cần gọn gàng, dễ lắp đặt, không can thiệp quá nhiều vào hạ tầng.",
    items: [
      "Công tắc thông minh",
      "Rèm tự động",
      "Cảm biến cửa",
      "Camera trong nhà",
      "Điều khiển qua app",
      "Ngữ cảnh về nhà / đi ngủ",
    ],
  },
  {
    icon: Home,
    title: "Nhà cấp 4",
    budget: "Tiết kiệm",
    desc: "Phù hợp gia đình muốn bắt đầu Smart Home với chi phí dễ tiếp cận, tập trung vào tiện ích thiết thực.",
    items: [
      "Đèn thông minh",
      "Công tắc thông minh",
      "Camera an ninh",
      "Khóa cửa thông minh",
      "Cảm biến chuyển động",
      "Điều khiển từ xa qua điện thoại",
    ],
  },
  {
    icon: Store,
    title: "Showroom / Văn phòng",
    budget: "Phổ thông",
    desc: "Phù hợp không gian kinh doanh cần kiểm soát ánh sáng, an ninh, thiết bị điện và tạo trải nghiệm chuyên nghiệp.",
    items: [
      "Điều khiển đèn khu vực",
      "Camera giám sát",
      "Cảm biến cửa",
      "Hẹn giờ thiết bị điện",
      "Rèm tự động",
      "Kịch bản mở cửa / đóng cửa",
    ],
  },
  {
    icon: KeyRound,
    title: "Căn hộ cho thuê",
    budget: "Tiết kiệm",
    desc: "Phù hợp chủ nhà muốn tăng giá trị căn hộ, quản lý ra vào và thiết bị từ xa.",
    items: [
      "Khóa cửa thông minh",
      "Camera cửa ra vào",
      "Công tắc thông minh",
      "Cảm biến cửa",
      "Quản lý từ xa",
      "Mã mở cửa tạm thời",
    ],
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Khảo sát công trình",
    desc: "Kiểm tra hiện trạng điện, vị trí thiết bị và nhu cầu sử dụng thực tế.",
  },
  {
    icon: Sparkles,
    title: "Tư vấn giải pháp",
    desc: "Đề xuất thiết bị, thương hiệu và ngân sách phù hợp với từng loại nhà.",
  },
  {
    icon: Wrench,
    title: "Thi công lắp đặt",
    desc: "Lắp đặt gọn gàng, cấu hình app, hub, cảm biến và các ngữ cảnh tự động.",
  },
  {
    icon: Handshake,
    title: "Bàn giao sử dụng",
    desc: "Hướng dẫn khách hàng dùng app, tạo ngữ cảnh và bảo hành sau thi công.",
  },
];

const packages = [
  {
    name: "Gói cơ bản",
    desc: "Dành cho người mới bắt đầu làm nhà thông minh.",
    devices: "Công tắc, camera, khóa cửa",
  },
  {
    name: "Gói phổ thông",
    desc: "Dành cho gia đình muốn tự động hóa nhiều khu vực.",
    devices: "Công tắc, cảm biến, rèm, camera, khóa",
  },
  {
    name: "Gói cao cấp",
    desc: "Dành cho biệt thự, nhà phố lớn, showroom.",
    devices: "Hệ thống đồng bộ nhiều phòng, nhiều tầng, nhiều ngữ cảnh",
  },
];

const SolutionsByHousePage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-bold mb-6">
            <Sparkles size={16} />
            Giải pháp Smart Home theo công trình
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight max-w-5xl mx-auto">
            Biến ngôi nhà của bạn thành Smart Home hiện đại
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-base md:text-xl leading-relaxed">
            Nhất Minh Smart Home tư vấn và thi công giải pháp nhà thông minh
            theo từng loại công trình: nhà phố, biệt thự, chung cư, nhà cấp 4,
            showroom và văn phòng.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
            >
              Nhận tư vấn miễn phí
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0888999888"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/15 text-white font-extrabold hover:bg-white/15 transition"
            >
              <Phone size={18} />
              Gọi hotline
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              ["6+", "Loại công trình"],
              ["100+", "Thiết bị tương thích"],
              ["3", "Mức ngân sách"],
              ["Tận nơi", "Khảo sát & tư vấn"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 text-center shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-black text-blue-600">
                  {number}
                </div>
                <div className="mt-2 text-sm md:text-base text-slate-600 font-semibold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE TYPES */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-blue-600 font-extrabold mb-3">
              Chọn loại nhà của bạn
            </p>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Mỗi kiểu nhà sẽ có một cách triển khai Smart Home khác nhau
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Bạn chỉ cần chọn đúng loại công trình, Nhất Minh sẽ tư vấn thiết bị,
              vị trí lắp đặt và ngữ cảnh phù hợp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {houseTypes.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Icon size={28} />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                      {item.budget}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-5 space-y-3">
                    {item.items.map((feature) => (
                      <div key={feature} className="flex gap-3">
                        <CheckCircle
                          size={18}
                          className="text-blue-600 shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-semibold text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-extrabold text-blue-600 group-hover:gap-3 transition-all"
                  >
                    Xem giải pháp
                    <ArrowRight size={17} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFIT STRIP */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-4 gap-5">
            {[
              {
                icon: Lightbulb,
                title: "Tiện nghi hơn",
                desc: "Điều khiển đèn, rèm, thiết bị điện chỉ bằng điện thoại hoặc giọng nói.",
              },
              {
                icon: ShieldCheck,
                title: "An toàn hơn",
                desc: "Camera, khóa cửa và cảm biến giúp kiểm soát ngôi nhà tốt hơn.",
              },
              {
                icon: Blinds,
                title: "Tự động hơn",
                desc: "Tạo ngữ cảnh về nhà, đi ngủ, ra ngoài, tiếp khách theo nhu cầu.",
              },
              {
                icon: Camera,
                title: "Dễ quản lý hơn",
                desc: "Theo dõi và điều khiển thiết bị từ xa, phù hợp cả nhà ở và cho thuê.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6"
                >
                  <Icon className="text-blue-600 mb-4" size={30} />
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-blue-300 font-extrabold mb-3">
              Quy trình thi công Smart Home
            </p>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Từ khảo sát đến bàn giao, rõ ràng từng bước
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl bg-white/5 border border-white/10 p-6"
                >
                  <div className="text-6xl font-black text-white/5 absolute right-5 top-3">
                    {index + 1}
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-300 mb-5">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-black">{step.title}</h3>

                  <p className="mt-3 text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-600 font-extrabold mb-3">
              Gợi ý gói triển khai
            </p>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Chọn theo ngân sách và nhu cầu sử dụng
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((item, index) => (
              <div
                key={item.name}
                className={`rounded-[2rem] border p-7 shadow-sm ${
                  index === 1
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {index === 1 && (
                  <span className="inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-4">
                    Được chọn nhiều
                  </span>
                )}

                <h3 className="text-2xl font-black">{item.name}</h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-5 rounded-2xl bg-white border border-slate-200 p-4">
                  <p className="text-sm text-slate-500 font-semibold">
                    Thiết bị gợi ý
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {item.devices}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 font-extrabold text-blue-600"
                >
                  Nhận tư vấn gói này
                  <ArrowRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl md:text-6xl font-black leading-tight">
            Bạn muốn biết nhà mình nên lắp Smart Home thế nào?
          </h2>

          <p className="mt-5 text-blue-100 text-base md:text-lg leading-relaxed">
            Nhất Minh Smart Home sẽ khảo sát, tư vấn thiết bị phù hợp với nhu cầu,
            loại công trình và ngân sách của bạn.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-blue-700 font-extrabold hover:bg-blue-50 transition"
            >
              Nhận tư vấn miễn phí
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0888999888"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-extrabold hover:bg-white/15 transition"
            >
              <Phone size={18} />
              Gọi hotline
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SolutionsByHousePage;