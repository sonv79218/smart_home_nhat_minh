// ============================================
// CONTACT SOCIAL SECTION
// ============================================

const ContactSection = () => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/nhatminhsmarthome",
      color: "#1877f2",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@nhatminhsmarthome",
      color: "#000000",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      color: "#ff0000",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
//     {
//   name: "Zalo",
//   href: "https://zalo.me/0876906668",
//   color: "#0068ff",
//   icon: (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <circle cx="12" cy="12" r="12" fill="#0068FF" />
//       <text
//         x="12"
//         y="16"
//         textAnchor="middle"
//         fill="white"
//         fontSize="12"
//         fontWeight="700"
//       >
//         Z
//       </text>
//     </svg>
//   ),
// },
  ];

  return (
    <section className="py-8 md:py-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-5">
            Theo dõi Nhật Minh Smart Home
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-2
                  px-4 py-2.5
                  rounded-full
                  bg-white
                  border border-slate-200
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all duration-200
                "
                style={{ color: social.color }}
              >
                {social.icon}

                <span className="font-semibold text-slate-700">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;