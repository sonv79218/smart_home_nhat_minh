// ============================================
// ABOUT PAGE - NHAT MINH SMART HOME
// ============================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, SHADOW, BORDER_RADIUS, TRANSITION } from "../styles/designSystem";
import { ProjectsSection } from "../pages/home/components";

// ============================================
// ICONS (SVG)
// ============================================
const Icons = {
  SmartHome: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Convenience: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  Connection: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1" />
      <rect x="16" y="2" width="6" height="6" rx="1" />
      <rect x="9" y="16" width="6" height="6" rx="1" />
      <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
      <path d="M12 13v3" />
    </svg>
  ),
  Security: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Energy: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Light: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  Camera: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  Sensor: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Hub: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  EnergyMng: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  ),
  Quote: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l-.007.004z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

// ============================================
// CORE VALUES DATA
// ============================================
const CORE_VALUES = [
  {
    icon: Icons.Convenience,
    title: "Thông minh & Tiện lợi",
    description: "Điều khiển ngôi nhà qua smartphone, giọng nói hoặc tự động hóa theo thói quen sinh hoạt.",
    color: "#38bdf8",
  },
  {
    icon: Icons.Connection,
    title: "Kết nối & Tự động hóa",
    description: "Hệ thống IoT kết nối liền mạch giữa các thiết bị, hoạt động đồng bộ và thông minh.",
    color: "#818cf8",
  },
  {
    icon: Icons.Security,
    title: "An toàn & Bảo mật",
    description: "Camera, cảm biến chuyển động, khóa thông minh và cảnh báo 24/7 bảo vệ ngôi nhà của bạn.",
    color: "#f472b6",
  },
  {
    icon: Icons.Energy,
    title: "Tiết kiệm năng lượng",
    description: "Tối ưu hóa điện năng tiêu thụ, giảm chi phí sinh hoạt với các giải pháp smart lighting và smart plugs.",
    color: "#34d399",
  },
];

// ============================================
// PRODUCT CATEGORIES DATA
// ============================================
const PRODUCT_CATEGORIES = [
  {
    icon: Icons.Light,
    title: "Smart Lighting",
    description: "Đèn thông minh, bóng LED điều khiển từ xa, tự động bật/tắt theo lịch trình hoặc cảm biến.",
  },
  {
    icon: Icons.Camera,
    title: "Smart Security Cameras",
    description: "Camera giám sát HD, nhận diện chuyển động, gửi thông báo real-time đến điện thoại.",
  },
  {
    icon: Icons.Sensor,
    title: "Smart Sensors",
    description: "Cảm biến nhiệt độ, độ ẩm, khói, rò rỉ nước - giám sát môi trường sống an toàn.",
  },
  {
    icon: Icons.Hub,
    title: "Home Automation Hub",
    description: "Trung tâm điều khiển trung tâm, kết nối và quản lý tất cả thiết bị IoT trong nhà.",
  },
  {
    icon: Icons.EnergyMng,
    title: "Energy Management",
    description: "Ổ cắm thông minh, công tắc WiFi, đo lường và tối ưu hóa tiêu thụ điện năng.",
  },
];

// ============================================
// TESTIMONIALS DATA
// ============================================
const TESTIMONIALS = [
  {
    name: "Anh Minh Đức",
    role: "Chủ nhà phố",
    location: "Quận 2, TP. Hồ Chí Minh",
    content: "Sau khi lắp đặt hệ thống Smart Home của NHAT MINH, tôi có thể điều khiển đèn, điều hòa, camera từ xa. Đặc biệt tính năng tự động bật đèn khi về đến nhà rất tiện lợi. Đội ngũ lắp đặt chuyên nghiệp, hỗ trợ nhiệt tình sau bán hàng.",
    rating: 5,
  },
  {
    name: "Chị Thu Hà",
    role: "Quản lý dự án",
    location: "Khu đô thị Starlake, Hà Nội",
    content: "Chúng tôi đã hợp tác với NHAT MINH cho dự án căn hộ thông minh 200+ căn. Sản phẩm chất lượng cao, tích hợp đồng bộ với hệ thống BMS của tòa nhà. Giải pháp IoT của họ giúp tăng giá trị và thu hút khách hàng.",
    rating: 5,
  },
  {
    name: "Anh Việt Hoàng",
    role: "Giám đốc kỹ thuật",
    location: "Tòa nhà văn phòng Intel",
    content: "NHAT MINH đã triển khai hệ thống smart building cho văn phòng của chúng tôi. Tự động hóa điều hòa, đèn chiếu sáng theo lịch làm việc giúp tiết kiệm 30% chi phí điện năng. Đội ngũ kỹ thuật am hiểu công nghệ và hoàn thành đúng tiến độ.",
    rating: 5,
  },
];

// ============================================
// STATS DATA
// ============================================
const STATS = [
  { value: "1000+", label: "Thiết bị đã triển khai", icon: Icons.CheckCircle },
  { value: "100+", label: "Dự án Smart Home", icon: Icons.SmartHome },
  { value: "24/7", label: "Hỗ trợ khách hàng", icon: Icons.Clock },
];

// ============================================
// ABOUT PAGE COMPONENT
// ============================================
const AboutPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <style>{aboutPageStyles}</style>
      <div className="about-page">
        {/* ============================================ */}
        {/* 1. HERO SECTION */}
        {/* ============================================ */}
        <section className="hero-section">
          <div className="hero-bg">
            <div className="hero-gradient" />
            <div className="hero-pattern" />
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <Icons.SmartHome />
              <span>Smart Home Technology</span>
            </div>
            <h1 className="hero-title">
              NHAT MINH – Giải pháp thiết bị <span className="text-gradient">Smart Home</span> thông minh cho cuộc sống hiện đại
            </h1>
            <p className="hero-subtitle">
              Chúng tôi cung cấp các giải pháp nhà thông minh, thiết bị IoT và hệ thống tự động hóa giúp nâng cao chất lượng cuộc sống.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Tìm hiểu thêm
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="visual-icon">
                <Icons.SmartHome />
              </div>
              <div className="visual-text">
                <span className="visual-label">IoT Connected</span>
                <span className="visual-value">Smart Living</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 2. INTRO SECTION */}
        {/* ============================================ */}
        <section className="intro-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Về chúng tôi</span>
              <h2 className="section-title">Giới thiệu chung</h2>
            </div>
            <div className="intro-content">
              <div className="intro-text">
                <p className="intro-description">
                  <strong>NHAT MINH</strong> là công ty công nghệ chuyên về thiết bị Smart Home, IoT và giải pháp tự động hóa nhà ở. Chúng tôi mang đến những sản phẩm và giải pháp hiện đại, giúp ngôi nhà của bạn trở nên thông minh hơn, tiện nghi hơn và an toàn hơn.
                </p>
                <div className="intro-focus">
                  <h3>Lĩnh vực hoạt động:</h3>
                  <ul className="focus-list">
                    <li>
                      <Icons.CheckCircle />
                      <span>Smart Home devices – Thiết bị nhà thông minh</span>
                    </li>
                    <li>
                      <Icons.CheckCircle />
                      <span>IoT integration – Tích hợp Internet of Things</span>
                    </li>
                    <li>
                      <Icons.CheckCircle />
                      <span>Home automation systems – Hệ thống tự động hóa</span>
                    </li>
                    <li>
                      <Icons.CheckCircle />
                      <span>Energy efficiency solutions – Giải pháp tiết kiệm năng lượng</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="intro-visual">
                <div className="intro-card">
                  <div className="intro-card-icon">
                    <Icons.SmartHome />
                  </div>
                  <div className="intro-card-content">
                    <span className="intro-card-number">5+</span>
                    <span className="intro-card-label">Năm kinh nghiệm</span>
                  </div>
                </div>
                <div className="intro-card">
                  <div className="intro-card-icon" style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)" }}>
                    <Icons.Connection />
                  </div>
                  <div className="intro-card-content">
                    <span className="intro-card-number">50+</span>
                    <span className="intro-card-label">Đối tác công nghệ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. COMPANY INFO SECTION */}
        {/* ============================================ */}
        <section className="company-info-section">
          <div className="container">
            <div className="company-info-grid">
              <div className="company-info-card">
                <div className="info-icon">
                  <Icons.SmartHome />
                </div>
                <div className="info-content">
                  <span className="info-label">Tên công ty</span>
                  <span className="info-value">NHAT MINH SMART HOME</span>
                </div>
              </div>
              <div className="company-info-card">
                <div className="info-icon" style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)" }}>
                  <Icons.Connection />
                </div>
                <div className="info-content">
                  <span className="info-label">Lĩnh vực</span>
                  <span className="info-value">Smart Home / IoT Devices</span>
                </div>
              </div>
              <div className="company-info-card">
                <div className="info-icon" style={{ background: "linear-gradient(135deg, #f472b6, #fb7185)" }}>
                  <Icons.MapPin />
                </div>
                <div className="info-content">
                  <span className="info-label">Địa chỉ</span>
                  <span className="info-value">TP. Hồ Chí Minh, Việt Nam</span>
                </div>
              </div>
              <div className="company-info-card">
                <div className="info-icon" style={{ background: "linear-gradient(135deg, #38bdf8, #22d3ee)" }}>
                  <Icons.Phone />
                </div>
                <div className="info-content">
                  <span className="info-label">Hotline</span>
                  <span className="info-value">1900 xxxx</span>
                </div>
              </div>
              <div className="company-info-card">
                <div className="info-icon" style={{ background: "linear-gradient(135deg, #34d399, #10b981)" }}>
                  <Icons.Mail />
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">contact@nhatminh.vn</span>
                </div>
              </div>
              <div className="company-info-card">
                <div className="info-icon" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}>
                  <Icons.Users />
                </div>
                <div className="info-content">
                  <span className="info-label">Người đại diện</span>
                  <span className="info-value">Đang cập nhật</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. CORE VALUES SECTION */}
        {/* ============================================ */}
        <section className="core-values-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Giá trị cốt lõi</span>
              <h2 className="section-title">Những gì chúng tôi mang đến</h2>
            </div>
            <div className="values-grid">
              {CORE_VALUES.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon" style={{ background: `${value.color}20`, color: value.color }}>
                    <value.icon />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. VISION SECTION */}
        {/* ============================================ */}
        <section className="vision-section">
          <div className="vision-bg">
            <div className="vision-gradient" />
          </div>
          <div className="container">
            <div className="vision-content">
              <span className="section-badge light">Tầm nhìn</span>
              <h2 className="vision-title">Tầm nhìn của chúng tôi</h2>
              <div className="vision-quote">
                <Icons.Quote />
                <blockquote>
                  "Biến mọi ngôi nhà trở thành một không gian sống thông minh và tiện nghi"
                </blockquote>
              </div>
              <p className="vision-text">
                Chúng tôi hướng đến một tương lai nơi mà công nghệ IoT và tự động hóa trở nên phổ biến trong mọi gia đình. NHAT MINH cam kết nghiên cứu và phát triển các giải pháp Smart Home tiên tiến, kết nối mọi thiết bị trong ngôi nhà để tạo ra một hệ sinh thái sống hoàn hảo – từ chiếu sáng, điều hòa không khí, an ninh đến quản lý năng lượng.
              </p>
              <div className="vision-features">
                <div className="vision-feature">
                  <Icons.CheckCircle />
                  <span>Hệ sinh thái Smart Home toàn diện</span>
                </div>
                <div className="vision-feature">
                  <Icons.CheckCircle />
                  <span>Tự động hóa thông minh theo thói quen</span>
                </div>
                <div className="vision-feature">
                  <Icons.CheckCircle />
                  <span>Kết nối IoT không giới hạn</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 6. STATS SECTION */}
        {/* ============================================ */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {STATS.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <stat.icon />
                  </div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 7. TECHNOLOGY / PRODUCT SECTION */}
        {/* ============================================ */}
        <section className="tech-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Sản phẩm & Công nghệ</span>
              <h2 className="section-title">Giải pháp Smart Home của chúng tôi</h2>
              <p className="section-subtitle">
                Khám phá các danh mục sản phẩm IoT và Smart Home được thiết kế để nâng cấp ngôi nhà của bạn.
              </p>
            </div>
            <div className="tech-grid">
              {PRODUCT_CATEGORIES.map((category, index) => (
                <div key={index} className="tech-card">
                  <div className="tech-icon">
                    <category.icon />
                  </div>
                  <h3 className="tech-title">{category.title}</h3>
                  <p className="tech-description">{category.description}</p>
                  <Link to={`/products?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="tech-link">
                    Xem sản phẩm
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 8. TESTIMONIAL SECTION */}
        {/* ============================================ */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Đánh giá</span>
              <h2 className="section-title">Khách hàng nói gì về chúng tôi</h2>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-rating">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.name.split(" ").pop()[0]}
                    </div>
                    <div className="author-info">
                      <span className="author-name">{testimonial.name}</span>
                      <span className="author-role">{testimonial.role}</span>
                      <span className="author-location">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
<ProjectsSection />
        {/* ============================================ */}
        {/* 9. CONTACT SECTION */}
        {/* ============================================ */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <span className="section-badge">Liên hệ</span>
                <h2 className="section-title">Kết nối với chúng tôi</h2>
                <p className="contact-description">
                  Bạn có câu hỏi hoặc cần tư vấn về giải pháp Smart Home? Hãy liên hệ với đội ngũ NHAT MINH để được hỗ trợ.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Icons.MapPin />
                    </div>
                    <div>
                      <span className="contact-label">Địa chỉ</span>
                      <span className="contact-value">TP. Hồ Chí Minh, Việt Nam</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Icons.Mail />
                    </div>
                    <div>
                      <span className="contact-label">Email</span>
                      <span className="contact-value">contact@nhatminh.vn</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Icons.Phone />
                    </div>
                    <div>
                      <span className="contact-label">Hotline</span>
                      <span className="contact-value">1900 xxxx</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Icons.Clock />
                    </div>
                    <div>
                      <span className="contact-label">Giờ làm việc</span>
                      <span className="contact-value">Thứ 2 - Thứ 6: 8:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrapper">
                {formSubmitted ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <Icons.CheckCircle />
                    </div>
                    <h3>Cảm ơn bạn!</h3>
                    <p>Chúng tôi đã nhận được liên hệ và sẽ phản hồi sớm nhất.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">Gửi liên hệ</h3>
                    <div className="form-group">
                      <label htmlFor="name">Họ và tên</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên của bạn"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleInputChange}
                          placeholder="0912 xxx xxx"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Nội dung</label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        placeholder="Viết nội dung liên hệ của bạn..."
                        rows="5"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">
                      Gửi liên hệ
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// ============================================
// CSS STYLES
// ============================================
const aboutPageStyles = `
  .about-page {
    padding-top: 70px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== SECTION HEADER ==================== */
  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(56, 189, 248, 0.05));
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 50px;
    color: #38bdf8;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .section-badge.light {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .section-title {
    font-size: 36px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .section-subtitle {
    font-size: 16px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ==================== BUTTONS ==================== */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    color: #fff;
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .btn-submit {
    width: 100%;
    justify-content: center;
  }

  /* ==================== HERO SECTION ==================== */
  .hero-section {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    padding: 80px 0;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .hero-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 60% 80%, rgba(52, 211, 153, 0.08) 0%, transparent 40%);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 50px;
    color: #38bdf8;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
    width: fit-content;
  }

  .hero-badge svg {
    width: 20px;
    height: 20px;
  }

  .hero-title {
    font-size: 48px;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 24px;
  }

  .text-gradient {
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 520px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-visual-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 32px 40px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    animation: float 6s ease-in-out infinite;
  }

  .visual-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 20px;
    color: #fff;
  }

  .visual-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .visual-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .visual-value {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  /* ==================== INTRO SECTION ==================== */
  .intro-section {
    padding: 100px 0;
    background: #fff;
  }

  .intro-content {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 60px;
    align-items: start;
  }

  .intro-description {
    font-size: 17px;
    color: #475569;
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .intro-description strong {
    color: #0f172a;
  }

  .intro-focus h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 16px;
  }

  .focus-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .focus-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: #475569;
  }

  .focus-list li svg {
    width: 20px;
    height: 20px;
    color: #22c55e;
    flex-shrink: 0;
  }

  .intro-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .intro-card {
    padding: 28px;
    background: linear-gradient(135deg, #f8fafc, #fff);
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
    transition: all 0.3s ease;
  }

  .intro-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .intro-card-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 16px;
    color: #fff;
  }

  .intro-card-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .intro-card-number {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
  }

  .intro-card-label {
    font-size: 13px;
    color: #64748b;
  }

  /* ==================== COMPANY INFO SECTION ==================== */
  .company-info-section {
    padding: 80px 0;
    background: #f8fafc;
  }

  .company-info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .company-info-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .company-info-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .info-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 12px;
    color: #fff;
    flex-shrink: 0;
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .info-label {
    font-size: 13px;
    color: #64748b;
  }

  .info-value {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  /* ==================== CORE VALUES SECTION ==================== */
  .core-values-section {
    padding: 100px 0;
    background: #fff;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .value-card {
    padding: 32px 24px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    text-align: center;
    transition: all 0.3s ease;
  }

  .value-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: transparent;
  }

  .value-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    margin: 0 auto 20px;
  }

  .value-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 12px;
  }

  .value-description {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
  }

  /* ==================== VISION SECTION ==================== */
  .vision-section {
    position: relative;
    padding: 100px 0;
    overflow: hidden;
  }

  .vision-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .vision-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .vision-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 0 24px;
  }

  .vision-title {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 32px;
  }

  .vision-quote {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
  }

  .vision-quote svg {
    color: rgba(56, 189, 248, 0.3);
  }

  .vision-quote blockquote {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    line-height: 1.5;
    font-style: italic;
    max-width: 700px;
  }

  .vision-text {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 32px;
  }

  .vision-features {
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .vision-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
  }

  .vision-feature svg {
    color: #34d399;
    width: 20px;
    height: 20px;
  }

  /* ==================== STATS SECTION ==================== */
  .stats-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }

  .stat-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    color: #fff;
  }

  .stat-value {
    font-size: 48px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  .stat-label {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  /* ==================== TECH SECTION ==================== */
  .tech-section {
    padding: 100px 0;
    background: #f8fafc;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .tech-card {
    padding: 32px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .tech-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: transparent;
  }

  .tech-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 16px;
    color: #fff;
    margin-bottom: 20px;
  }

  .tech-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 12px;
  }

  .tech-description {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .tech-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #38bdf8;
    text-decoration: none;
    transition: gap 0.3s ease;
  }

  .tech-link:hover {
    gap: 12px;
  }

  /* ==================== TESTIMONIALS SECTION ==================== */
  .testimonials-section {
    padding: 100px 0;
    background: #fff;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .testimonial-card {
    padding: 32px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .testimonial-rating {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .testimonial-content {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .author-name {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  .author-role {
    font-size: 13px;
    color: #64748b;
  }

  .author-location {
    font-size: 12px;
    color: #94a3b8;
  }

  /* ==================== CONTACT SECTION ==================== */
  .contact-section {
    padding: 100px 0;
    background: #f8fafc;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 60px;
    align-items: start;
  }

  .contact-description {
    font-size: 16px;
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .contact-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    border-radius: 12px;
    color: #fff;
    flex-shrink: 0;
  }

  .contact-label {
    display: block;
    font-size: 13px;
    color: #64748b;
    margin-bottom: 2px;
  }

  .contact-value {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  .contact-form-wrapper {
    background: #fff;
    border-radius: 24px;
    padding: 40px;
    border: 1px solid #e2e8f0;
  }

  .form-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 24px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
  }

  .form-group input,
  .form-group textarea {
    padding: 14px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    color: #0f172a;
    transition: all 0.25s ease;
    background: #f8fafc;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    background: #fff;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #94a3b8;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-success {
    text-align: center;
    padding: 40px 20px;
  }

  .success-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    color: #fff;
    margin: 0 auto 20px;
  }

  .success-icon svg {
    width: 32px;
    height: 32px;
  }

  .form-success h3 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
  }

  .form-success p {
    font-size: 15px;
    color: #64748b;
  }

  /* ==================== RESPONSIVE ==================== */
  @media (max-width: 1024px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-title {
      font-size: 36px;
    }

    .hero-subtitle {
      max-width: 100%;
    }

    .hero-actions {
      justify-content: center;
    }

    .hero-visual {
      display: none;
    }

    .intro-content {
      grid-template-columns: 1fr;
    }

    .intro-visual {
      order: -1;
    }

    .company-info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .values-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .testimonials-grid {
      grid-template-columns: 1fr;
    }

    .contact-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 16px;
    }

    .section-title {
      font-size: 28px;
    }

    .hero-section {
      min-height: auto;
      padding: 60px 0;
    }

    .hero-title {
      font-size: 28px;
    }

    .hero-subtitle {
      font-size: 16px;
    }

    .company-info-grid {
      grid-template-columns: 1fr;
    }

    .values-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .stat-value {
      font-size: 36px;
    }

    .tech-grid {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .contact-form-wrapper {
      padding: 24px;
    }

    .vision-quote blockquote {
      font-size: 20px;
    }

    .vision-features {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default AboutPage;
