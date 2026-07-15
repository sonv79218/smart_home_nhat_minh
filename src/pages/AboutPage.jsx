// ============================================
// ABOUT PAGE - NHẬT MINH SMART
// Minimal, modern and subtle animations
// ============================================

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const IMAGES = {
  showroom:
    "/picture/showroom/show_room.png",


};

const solutions = [
  {
    number: "01",
    title: "Chiếu sáng thông minh",
    description:
      "Điều khiển đèn theo ngữ cảnh, hẹn giờ, cảm biến và giọng nói. Tương thích Apple HomeKit, Google Home và các hệ sinh thái nhà thông minh.",
    image: "/picture/solutions/chieu_sang.png",
  },
  {
    number: "02",
    title: "Khóa cửa thông minh",
    description:
      "Mở cửa bằng vân tay, mã số, thẻ từ, điện thoại hoặc chìa cơ. Quản lý lịch sử ra vào và phân quyền người dùng.",
    image: "/picture/solutions/khoa_cua.png",
  },
  {
    number: "03",
    title: "Kiểm soát điện, nước",
    description:
      "Giám sát điện năng, lượng nước tiêu thụ và cảnh báo bất thường giúp tiết kiệm chi phí và vận hành an toàn.",
    image: "/picture/solutions/kiem_soat_dien_nuoc.png",
  },
  {
    number: "04",
    title: "Điều hòa thông minh",
    description:
      "Điều khiển điều hòa từ xa, tự động theo nhiệt độ hoặc lịch trình, phù hợp cho điều hòa treo tường và âm trần.",
    image: "/picture/solutions/dieu_hoa.png",
  },
  {
    number: "05",
    title: "Điều khiển bình nước nóng",
    description:
      "Bật tắt từ xa, hẹn giờ hoạt động, theo dõi trạng thái và tối ưu điện năng cho bình nước nóng.",
    image: "/picture/solutions/binh_nuoc_nong.png",
  },
  {
    number: "06",
    title: "Điều khiển cửa cuốn",
    description:
      "Đóng mở cửa cuốn bằng điện thoại, điều khiển từ xa hoặc tự động hóa theo kịch bản thông minh.",
    image: "/picture/solutions/cua_cuon.png",
  },
  {
    number: "07",
    title: "Trợ lý ảo & âm thanh đa vùng",
    description:
      "Điều khiển toàn bộ ngôi nhà bằng giọng nói, phát nhạc đa vùng và xây dựng các kịch bản tự động.",
    image: "/picture/solutions/tro_ly_ao.png",
  },
  {
    number: "08",
    title: "Hệ thống mạng WiFi Mesh",
    description:
      "Phủ sóng WiFi toàn bộ ngôi nhà, chuyển vùng liền mạch và đảm bảo kết nối ổn định cho thiết bị thông minh.",
    image: "/picture/solutions/mesh_wifi.png",
  },
  {
    number: "09",
    title: "Camera AI & cảm biến",
    description:
      "Giám sát thông minh với AI nhận diện người, phương tiện, cảnh báo xâm nhập và tích hợp cảm biến an ninh.",
    image: "/picture/solutions/camera_ai.png",
  },
  {
    number: "10",
    title: "Rèm cửa thông minh",
    description:
      "Đóng mở rèm theo lịch, theo ánh sáng hoặc điều khiển bằng điện thoại, giọng nói và kịch bản tự động.",
    image: "/picture/solutions/curtain.png",
  },
];

const values = [
  {
    title: "Tư vấn đúng nhu cầu",
    description:
      "Giải pháp được xây dựng dựa trên nhu cầu sử dụng, không gian và ngân sách thực tế của khách hàng.",
  },
  {
    title: "Thi công chuyên nghiệp",
    description:
      "Quy trình lắp đặt rõ ràng, đảm bảo tính thẩm mỹ, ổn định và thuận tiện trong quá trình sử dụng.",
  },
  {
    title: "Đồng hành lâu dài",
    description:
      "Hỗ trợ hướng dẫn sử dụng, bảo hành và xử lý kỹ thuật sau khi công trình được bàn giao.",
  },
];

const process = [
  {
    number: "01",
    title: "Tiếp nhận nhu cầu",
    description: "Tìm hiểu không gian, mục tiêu sử dụng và ngân sách.",
  },
  {
    number: "02",
    title: "Khảo sát & tư vấn",
    description: "Khảo sát thực tế và đề xuất giải pháp phù hợp.",
  },
  {
    number: "03",
    title: "Thiết kế giải pháp",
    description: "Lên phương án thiết bị, vị trí lắp đặt và chi phí.",
  },
  {
    number: "04",
    title: "Thi công & bàn giao",
    description: "Lắp đặt, cấu hình, kiểm tra và hướng dẫn sử dụng.",
  },
];

const AboutPage = () => {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative border-b border-slate-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-5 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="animate-about-fade-up">
            <p className="mb-4 text-xs font-semibold uppercase  text-blue-600 md:text-sm">
              Về Nhật Minh Smart
            </p>


            <h2 className="mt-4 text-3xl font-bold  text-slate-950 md:text-4xl">
              Kiến tạo không gian sống thông minh và an toàn
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Nhật Minh Smart cung cấp giải pháp nhà thông minh, camera an
              ninh và kiểm soát ra vào cho nhà ở, biệt thự, căn hộ, văn phòng
              và doanh nghiệp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 md:text-base"
              >
                Nhận tư vấn
                <ChevronRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/projects"
                className="text-sm font-semibold text-slate-700 transition hover:text-blue-600 md:text-base"
              >
                Xem công trình
              </Link>
            </div>
          </div>

          <div className="animate-about-fade-up about-delay-150">
            <div className="group relative overflow-hidden rounded-2xl bg-slate-100">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGES.showroom}
                  alt="Showroom Nhật Minh Smart"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
                <p className="text-sm font-medium text-white/80">
                  Không gian trải nghiệm
                </p>
                <p className="mt-1 text-xl font-semibold md:text-2xl">
                  Showroom Nhật Minh Smart
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-5 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase  text-blue-600 md:text-sm">
              Chúng tôi là ai
            </p>
            

            <h2 className="mt-4 text-3xl font-bold  text-slate-950 md:text-4xl">
              Giải pháp phù hợp cho từng không gian
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
              Nhật Minh Smart đồng hành cùng khách hàng từ tư vấn, khảo sát,
              thiết kế đến thi công, cài đặt và bảo hành hệ thống.
            </p>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Chúng tôi ưu tiên những giải pháp dễ sử dụng, hoạt động ổn định
              và có khả năng mở rộng theo nhu cầu. Mỗi công trình đều được
              nghiên cứu dựa trên thói quen sinh hoạt, đặc điểm không gian và
              ngân sách thực tế.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
            {values.map((item, index) => (
              <article
                key={item.title}
                className="group bg-white p-7 transition duration-300 hover:bg-slate-50 md:p-9"
              >
                <p className="mb-8 text-sm font-semibold text-blue-600">
                  0{index + 1}
                </p>

                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  {item.description}
                </p>

                <div className="mt-7 h-px w-10 bg-blue-600 transition-all duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="text-xs font-semibold uppercase  text-blue-600 md:text-sm">
              Lĩnh vực hoạt động
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Các giải pháp chính
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Một hệ thống đồng bộ giúp không gian trở nên tiện nghi, dễ quản
              lý và an toàn hơn.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((item) => (
              <article
                key={item.title}
                className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-900 md:min-h-[430px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" /> */}

                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  {/* <p className="mb-4 text-sm font-semibold text-blue-300">
                    {item.number}
                  </p> */}

<div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/50 p-4 backdrop-blur-sm md:inset-x-6 md:bottom-6 md:p-5">


  <h3 className="mt-1 text-xl font-bold leading-tight text-white md:text-2xl">
    {item.title}
  </h3>

  <p className="mt-2 text-sm leading-6 text-white/85 md:text-base">
    {item.description}
  </p>
</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
<section className="border-y border-slate-100 bg-white py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-5">
    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      <div>
        <p className="text-xs font-semibold uppercase text-blue-600 md:text-sm">
          Quy trình làm việc
        </p>

        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
          Rõ ràng trong từng giai đoạn
        </h2>

        <p className="mt-5 max-w-md text-base leading-7 text-slate-600 md:text-lg">
          Khách hàng được tư vấn và theo dõi toàn bộ quá trình từ khi tiếp nhận
          nhu cầu đến khi hệ thống được bàn giao.
        </p>
      </div>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {process.map((item) => (
          <article
            key={item.number}
            className="group grid gap-4 py-6 transition md:grid-cols-[70px_1fr] md:gap-6 md:py-7"
          >
            <p className="text-sm font-semibold text-blue-600">
              {item.number}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 md:text-xl">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

{/* COMMITMENT */}
<section className="">
  <div className="mx-auto max-w-7xl px-4 sm:px-5">
    <div className="relative overflow-hidden  bg-white px-6 py-12 text-center ">


      <div className="relative mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Cam kết của Nhật Minh Smart
        </p>

        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
          Không chỉ lắp đặt thiết bị,
          <br />
          chúng tôi xây dựng một giải pháp phù hợp và bền vững.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Thiết bị chính hãng, phương án rõ ràng, thi công đúng tiêu chuẩn và
          luôn đồng hành cùng khách hàng trong suốt quá trình sử dụng.
        </p>

        <Link
          to="/contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 md:text-base"
        >
          Gửi yêu cầu tư vấn

          <ChevronRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* PAGE ANIMATIONS */}
      <style>{`
        @keyframes aboutFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-about-fade-up {
          opacity: 0;
          animation: aboutFadeUp 0.75s ease-out forwards;
        }

        .about-delay-150 {
          animation-delay: 150ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-about-fade-up {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutPage;