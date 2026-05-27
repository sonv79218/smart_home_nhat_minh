// ============================================
// CONTACT SECTION COMPONENT
// Modern Premium Smart Home Style
// ============================================

const ContactSection = ({ companyInfo, companySocial }) => {
  if (!companyInfo) return null;

  const contactMethods = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Địa chỉ",
      value: companyInfo.address,
      href: null,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Hotline",
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: companySocial?.facebook,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "#1877f2",
    },
    {
      name: "TikTok",
      href: companySocial?.tiktok,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      color: "#000000",
    },
    {
      name: "YouTube",
      href: companySocial?.youtube,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: "#ff0000",
    },
    {
      name: "Instagram",
      href: companySocial?.instagram,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      color: "#e4405f",
    },
    {
      name: "Zalo",
      href: companySocial?.zalo,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.512c-.096.24-.312.408-.576.456-.264.048-.54-.024-.768-.192l-3.072-2.304v5.088c0 .528-.432.96-.96.96s-.96-.432-.96-.96V9.6l-2.064 1.584c-.216.168-.48.216-.744.144-.264-.072-.456-.264-.528-.528L6.12 6.72c-.12-.384-.072-.816.144-1.152.216-.336.576-.528.96-.528h11.712c.384 0 .744.192.96.528.216.336.264.768.144 1.152l-3.168 7.104c-.072.168-.192.312-.336.408z" />
        </svg>
      ),
      color: "#0068ff",
    },
  ];

  return (
    <>
      <style>{contactStyles}</style>
      <section className="contact-section">
        <div className="contact-container">
          {/* Section Header */}
          <div className="contact-header">
            <span className="header-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Liên hệ
            </span>
            <h2 className="contact-title">Kết nối với chúng tôi</h2>
            <p className="contact-subtitle">
              Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn 24/7
            </p>
          </div>

          {/* Contact Cards */}
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className={`contact-card ${method.href ? "clickable" : ""}`}
                onClick={(e) => !method.href && e.preventDefault()}
              >
                <div className="card-icon">{method.icon}</div>
                <div className="card-content">
                  <span className="card-label">{method.label}</span>
                  <span className="card-value">{method.value}</span>
                </div>
                {method.href && (
                  <div className="card-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="social-section">
            <h3 className="social-title">Theo dõi chúng tôi</h3>
            <div className="social-grid">
              {socialLinks.map((social, index) =>
                social.href ? (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                    style={{ "--social-color": social.color }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="contact-cta">
            <div className="cta-content">
              <h3>Bạn cần hỗ trợ ngay?</h3>
              <p>Đội ngũ chuyên gia sẵn sàng tư vấn miễn phí</p>
            </div>
            <a href={`tel:${companyInfo.phone}`} className="cta-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Gọi ngay {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const contactStyles = `
  /* ==================== SECTION LAYOUT ==================== */
  .contact-section {
    padding: 80px 0;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    position: relative;
    overflow: hidden;
  }

  .contact-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent);
  }

  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== HEADER ==================== */
  .contact-header {
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

  .contact-title {
    font-size: clamp(28px, 5vw, 40px);
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 12px;
    letter-spacing: -1px;
  }

  .contact-subtitle {
    font-size: clamp(14px, 2vw, 16px);
    color: #64748b;
    margin: 0;
  }

  /* ==================== CONTACT GRID ==================== */
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 48px;
  }

  .contact-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: #ffffff;
    border-radius: 20px;
    border: 2px solid #e2e8f0;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .contact-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(56, 189, 248, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .contact-card.clickable:hover {
    border-color: #2563eb;
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37, 99, 235, 0.15);
  }

  .contact-card.clickable:hover::before {
    opacity: 1;
  }

  .card-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .card-content {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .card-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .card-value {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.4;
  }

  .card-arrow {
    color: #94a3b8;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .contact-card.clickable:hover .card-arrow {
    color: #2563eb;
    transform: translateX(4px);
  }

  /* ==================== SOCIAL SECTION ==================== */
  .social-section {
    text-align: center;
    margin-bottom: 48px;
  }

  .social-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 24px;
  }

  .social-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .social-link:hover {
    border-color: var(--social-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--social-color);
    transition: transform 0.25s ease;
  }

  .social-link:hover .social-icon {
    transform: scale(1.1);
  }

  .social-name {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
  }

  /* ==================== CTA SECTION ==================== */
  .contact-cta {
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

  .cta-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #ffffff;
    text-decoration: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(34, 197, 94, 0.5);
  }

  /* ==================== RESPONSIVE ==================== */

  @media (max-width: 992px) {
    .contact-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .contact-cta {
      flex-direction: column;
      text-align: center;
      padding: 32px;
    }
  }

  @media (max-width: 768px) {
    .contact-container {
      padding: 0 16px;
    }

    .contact-section {
      padding: 60px 0;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .contact-card {
      padding: 20px;
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
    }

    .social-grid {
      gap: 12px;
    }

    .social-link {
      padding: 12px 20px;
    }

    .social-name {
      font-size: 13px;
    }

    .contact-cta {
      padding: 24px;
      border-radius: 20px;
    }

    .cta-content h3 {
      font-size: 20px;
    }

    .cta-button {
      width: 100%;
      justify-content: center;
      padding: 14px 24px;
    }
  }

  @media (max-width: 480px) {
    .social-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .social-link {
      justify-content: center;
    }

    .social-name {
      display: none;
    }
  }
`;

export default ContactSection;
