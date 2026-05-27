// ============================================
// CONTACT SECTION - TAILWIND
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
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent" />
      
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-full mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-sm font-semibold text-primary-600">Liên hệ</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary tracking-tight mb-3">
            Kết nối với chúng tôi
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href || "#"}
              onClick={(e) => !method.href && e.preventDefault()}
              className={`
                flex items-center gap-4 p-5 md:p-6
                bg-white rounded-2xl border-2
                transition-all duration-300
                ${method.href 
                  ? "cursor-pointer hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg" 
                  : "cursor-default"
                }
                border-slate-200
              `}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="text-white">{method.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  {method.label}
                </span>
                <span className="block text-sm font-semibold text-secondary leading-tight">
                  {method.value}
                </span>
              </div>
              {method.href && (
                <div className="text-slate-400 group-hover:text-primary-600 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-base md:text-lg font-bold text-secondary mb-5">
            Theo dõi chúng tôi
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {socialLinks.map((social, index) =>
              social.href ? (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-white rounded-full border-2 border-slate-200 hover:border-current transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ "--hover-color": social.color }}
                >
                  <span style={{ color: social.color }}>{social.icon}</span>
                  <span className="text-sm font-semibold text-secondary">{social.name}</span>
                </a>
              ) : null
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 md:p-10 bg-gradient-to-br from-secondary to-slate-700 rounded-3xl shadow-strong">
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
              Bạn cần hỗ trợ ngay?
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              Đội ngũ chuyên gia sẵn sàng tư vấn miễn phí
            </p>
          </div>
          <a 
            href={`tel:${companyInfo.phone}`}
            className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 whitespace-nowrap"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Gọi ngay {companyInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
