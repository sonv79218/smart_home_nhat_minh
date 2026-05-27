// ============================================
// FEATURES BAR COMPONENT - MODERN STYLE
// ============================================
import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    icon: <Truck size={34} strokeWidth={1.8} />,
    title: "Miễn phí vận chuyển",
    subtitle: "Đơn hàng từ 500K",
  },
  {
    icon: <ShieldCheck size={34} strokeWidth={1.8} />,
    title: "Thanh toán an toàn",
    subtitle: "100% bảo mật",
  },
  {
    icon: <Headphones size={34} strokeWidth={1.8} />,
    title: "Hỗ trợ 24/7",
    subtitle: "Luôn sẵn sàng",
  },
  {
    icon: <RefreshCcw size={34} strokeWidth={1.8} />,
    title: "Đổi trả dễ dàng",
    subtitle: "Trong 7 ngày",
  },
];

const FeaturesBar = () => {
  return (
    <section style={styles.wrapper}>
      <div style={styles.container}>
        {features.map((feature, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconBox}>
              {feature.icon}
            </div>

            <div style={styles.content}>
              <h4 style={styles.title}>{feature.title}</h4>
              <p style={styles.subtitle}>{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  wrapper: {
    marginBottom: "40px",
  },

  container: {
    marginTop: "10px",
    background: "#ffffff",
    borderRadius: "8px",
    padding: "32px 24px",
    
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    border: "1px solid #e2e8f0",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "18px",
    borderRadius: "18px",
    transition: "all 0.25s ease",
    cursor: "pointer",
    background: "#f8fafc",
  },

  iconBox: {
    width: "64px",
    height: "64px",
    minWidth: "64px",
    // borderRadius: "18px",
    // background: "linear-gradient(135deg, #2563eb, #38bdf8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray.700",
    // boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  title: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: 1.4,
  },

  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};

export default FeaturesBar;