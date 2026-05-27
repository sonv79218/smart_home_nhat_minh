// ============================================
// ECOSYSTEM SECTION COMPONENT
// ============================================
import EcosystemCard from "./EcosystemCard";

// ============================================
// DATA
// ============================================
const ecosystems = [
  {
    id: "aqara",
    name: "Aqara",
    description:
      "Hệ sinh thái smart home cao cấp hỗ trợ Apple HomeKit và Zigbee.",
    features: ["HomeKit", "Automation", "Zigbee", "AI Smart"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Aqara_logo.svg/200px-Aqara_logo.svg.png",
    color: "#2563eb",
    link: "/ecosystem/aqara",
  },
  {
    id: "lumi",
    name: "Lumi",

    description:
      "Giải pháp nhà thông minh toàn diện dành cho gia đình Việt.",
    features: ["Made in Vietnam", "Tiếng Việt", "Dễ sử dụng"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop",
    logo: "https://lumi.vn/favicon.ico",
    color: "#0f172a",
    link: "/ecosystem/lumi",
  },
  {
    id: "hunonic",
    name: "Hunonic",
    description:
      "Thiết bị thông minh giá tốt, dễ lắp đặt và điều khiển từ xa.",
    features: ["Giá tốt", "WiFi", "Điều khiển app", "Smart Life"],
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&h=400&fit=crop",
    logo: "https://hunonic.com/favicon.ico",
    color: "#38bdf8",
    link: "/ecosystem/hunonic",
  },
];

// ============================================
// COMPONENT
// ============================================
const EcosystemSection = () => {
  return (
    <>
      <style>{sectionStyles}</style>
      <section className="ecosystem-section">
        <div className="ecosystem-container">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">Hệ Sinh Thái Smart Home</h2>
            <p className="section-subtitle">
              Kết nối toàn bộ thiết bị thông minh trong ngôi nhà của bạn
            </p>
          </div>

          {/* Cards Grid */}
          <div className="ecosystem-grid">
            {ecosystems.map((ecosystem) => (
              <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const sectionStyles = `
  .ecosystem-section {
    position: relative;

    padding: 80px 0px 10px 0px;
    background: linear-gradient(
      180deg,
      #f8fafc 0%,
      #f1f5f9 50%,
      #f8fafc 100%
    );
    overflow: hidden;
  }

  .ecosystem-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(37, 99, 235, 0.2),
      transparent
    );
  }

  .ecosystem-section::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(37, 99, 235, 0.2),
      transparent
    );
  }

  .ecosystem-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(56, 189, 248, 0.1));
    border: 1px solid rgba(37, 99, 235, 0.2);
    border-radius: 50px;
    margin-bottom: 20px;
  }

  .header-badge svg {
    color: #2563eb;
  }

  .header-badge span {
    font-size: 13px;
    font-weight: 600;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .section-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 16px;
    letter-spacing: -1px;
    line-height: 1.2;
  }

  .section-subtitle {
    font-size: clamp(16px, 2vw, 18px);
    color: #64748b;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Grid */
  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 56px;
  }



  /* Responsive */
  @media (max-width: 1024px) {
    .ecosystem-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }

  @media (max-width: 768px) {
    .ecosystem-section {
      padding: 60px 0;
    }

    .ecosystem-container {
      padding: 0 16px;
    }

    .section-header {
      margin-bottom: 40px;
    }

    .ecosystem-grid {
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }

    .section-cta {
      padding: 24px;
    }


  }
`;

export default EcosystemSection;
