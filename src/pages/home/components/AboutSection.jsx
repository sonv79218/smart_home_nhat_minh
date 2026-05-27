// ============================================
// ABOUT SECTION COMPONENT
// Modern & Professional Company Introduction
// ============================================
import { useNavigate } from "react-router-dom";
import {
  Target,
  Zap,
  Award,
  Users,
  Shield,
  Truck,
  Headphones,
  CheckCircle,
} from "lucide-react";

const AboutSection = ({ companyInfo }) => {
  const navigate = useNavigate();

  if (!companyInfo) return null;

  // const stats = [
  //   { value: "5+", label: "Năm kinh nghiệm" },
  //   { value: "10K+", label: "Khách hàng" },
  //   { value: "50+", label: "Sản phẩm" },
  //   { value: "24/7", label: "Hỗ trợ" },
  // ];

  // const features = [
  //   {
  //     icon: Shield,
  //     title: "Sản phẩm chính hãng",
  //     description: "100% authentic products with warranty",
  //     color: "#2563eb",
  //   },
  //   {
  //     icon: Zap,
  //     title: "Công nghệ tiên tiến",
  //     description: "Latest smart home technology",
  //     color: "#f59e0b",
  //   },
  //   {
  //     icon: Users,
  //     title: "Khách hàng là trung tâm",
  //     description: "Customer-first approach",
  //     color: "#10b981",
  //   },
  //   {
  //     icon: Headphones,
  //     title: "Hỗ trợ 24/7",
  //     description: "Round-the-clock support",
  //     color: "#8b5cf6",
  //   },
  //   {
  //     icon: Truck,
  //     title: "Giao hàng nhanh",
  //     description: "Fast & free shipping over 500K",
  //     color: "#06b6d4",
  //   },
  //   {
  //     icon: Award,
  //     title: "Bảo hành dài hạn",
  //     description: "Extended warranty coverage",
  //     color: "#ef4444",
  //   },
  // ];

  return (
    <>
      <style>{aboutStyles}</style>
      <section className="about-section">
        <div className="about-container">
          {/* Section Header */}
          <div className="about-header">
            <span className="header-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Về chúng tôi
            </span>
            <h2 className="about-title">Nhật Minh Smart Home</h2>
            <p className="about-slogan">{companyInfo.slogan}</p>
          </div>

          {/* Stats Row */}
          {/* <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div> */}

          {/* Main Content Grid */}
          <div className="about-grid">
            {/* Left: Introduction */}
            <div className="about-main">
              <div className="intro-card">
                <div className="intro-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="intro-content">
                  <h3 className="intro-title">Giới thiệu</h3>
                  <p className="intro-text">{companyInfo.intro}</p>
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="vm-cards">
                <div className="vm-card vm-card-vision">
                  <div className="vm-icon">
                    <Target size={24} />
                  </div>
                  <div className="vm-content">
                    <h4>Tầm nhìn</h4>
                    <p>{companyInfo.vision}</p>
                  </div>
                </div>

                <div className="vm-card vm-card-mission">
                  <div className="vm-icon">
                    <Zap size={24} />
                  </div>
                  <div className="vm-content">
                    <h4>Sứ mệnh</h4>
                    <p>{companyInfo.mission}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Values & Features */}
            <div className="about-sidebar">
              {/* Core Values */}
              <div className="values-card">
                <h3 className="sidebar-title">
                  <Award size={20} />
                  Giá trị cốt lõi
                </h3>
                <ul className="values-list">
                  {companyInfo.values?.map((value, index) => (
                    <li key={index} className="value-item">
                      <CheckCircle size={18} />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Choose Us */}
              {/* <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div 
                      className="feature-icon"
                      style={{ background: `${feature.color}15`, color: feature.color }}
                    >
                      <feature.icon size={20} />
                    </div>
                    <span className="feature-name">{feature.title}</span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* CTA Section */}
          <div className="about-cta">
            <div className="cta-content">
              <h3>Bạn cần tư vấn về giải pháp Smart Home?</h3>
              <p>Liên hệ ngay để được hỗ trợ miễn phí từ đội ngũ chuyên gia</p>
            </div>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/products")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Khám phá sản phẩm
              </button>
              <a href={`tel:${companyInfo.phone}`} className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const aboutStyles = `
  /* ==================== SECTION LAYOUT ==================== */
  .about-section {
    padding: 80px 0;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
  }

  .about-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
  }

  .about-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== HEADER ==================== */
  .about-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(56, 189, 248, 0.1));
    border: 1px solid rgba(37, 99, 235, 0.2);
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 16px;
  }

  .about-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 12px;
    letter-spacing: -1px;
  }

  .about-slogan {
    font-size: clamp(16px, 2vw, 18px);
    color: #64748b;
    margin: 0;
    font-style: italic;
  }

  /* ==================== STATS ROW ==================== */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 56px;
  }

  .stat-item {
    text-align: center;
    padding: 32px 24px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.3s ease;
  }

  .stat-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1);
    border-color: rgba(37, 99, 235, 0.2);
  }

  .stat-value {
    display: block;
    font-size: 40px;
    font-weight: 800;
    color: #2563eb;
    margin-bottom: 8px;
    letter-spacing: -2px;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ==================== MAIN GRID ==================== */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
    margin-bottom: 56px;
  }

  /* ==================== INTRO CARD ==================== */
  .about-main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .intro-card {
    display: flex;
    gap: 24px;
    padding: 32px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.5);
  }

  .intro-icon {
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
  }

  .intro-content {
    flex: 1;
  }

  .intro-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 12px;
  }

  .intro-text {
    font-size: 15px;
    line-height: 1.8;
    color: #475569;
    margin: 0;
  }

  /* ==================== VISION & MISSION ==================== */
  .vm-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .vm-card {
    display: flex;
    gap: 16px;
    padding: 24px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.3s ease;
  }

  .vm-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
  }

  .vm-card-vision .vm-icon {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
  }

  .vm-card-mission .vm-icon {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }

  .vm-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
  }

  .vm-content h4 {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
  }

  .vm-content p {
    font-size: 14px;
    line-height: 1.6;
    color: #64748b;
    margin: 0;
  }

  /* ==================== SIDEBAR ==================== */
  .about-sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .values-card {
    padding: 28px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.5);
  }

  .sidebar-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px;
  }

  .sidebar-title svg {
    color: #2563eb;
  }

  .values-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .value-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    transition: all 0.2s ease;
  }

  .value-item:hover {
    background: rgba(37, 99, 235, 0.06);
    transform: translateX(4px);
  }

  .value-item svg {
    color: #22c55e;
    flex-shrink: 0;
  }

  /* ==================== FEATURES GRID ==================== */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
    border: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.25s ease;
    cursor: default;
  }

  .feature-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    border-color: rgba(37, 99, 235, 0.2);
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feature-name {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.3;
  }

  /* ==================== CTA SECTION ==================== */
  .about-cta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    padding: 40px 48px;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    border-radius: 28px;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.3);
  }

  .cta-content h3 {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 8px;
  }

  .cta-content p {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .cta-buttons {
    display: flex;
    gap: 16px;
    flex-shrink: 0;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    border: none;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* ==================== RESPONSIVE ==================== */
  @media (max-width: 1200px) {
    .about-grid {
      grid-template-columns: 1fr;
    }

    .about-sidebar {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 992px) {
    .stats-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .about-cta {
      flex-direction: column;
      text-align: center;
      padding: 32px;
    }
  }

  @media (max-width: 768px) {
    .about-container {
      padding: 0 16px;
    }

    .about-section {
      padding: 60px 0;
    }

    .stats-row {
      gap: 16px;
      margin-bottom: 40px;
    }

    .stat-item {
      padding: 24px 16px;
    }

    .stat-value {
      font-size: 32px;
    }

    .about-grid {
      gap: 24px;
      margin-bottom: 40px;
    }

    .about-sidebar {
      grid-template-columns: 1fr;
    }

    .intro-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 24px;
    }

    .vm-cards {
      grid-template-columns: 1fr;
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .about-cta {
      padding: 24px;
      border-radius: 20px;
    }

    .cta-buttons {
      flex-direction: column;
      width: 100%;
    }

    .btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .stat-label {
      font-size: 12px;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .cta-content h3 {
      font-size: 20px;
    }
  }
`;

export default AboutSection;
