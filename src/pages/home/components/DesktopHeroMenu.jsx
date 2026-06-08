import { Link } from "react-router-dom";

const brandItems = [
  { label: "Aqara", href: "/ecosystem/aqara" },
  { label: "Hunonic", href: "/ecosystem/hunonic" },
  { label: "Lumi", href: "/ecosystem/lumi" },
];

const cameraItems = [
  { label: "Hikvision", href: "/products?category=camera" },
  { label: "Ezviz", href: "/products?category=camera" },
  { label: "IMOU", href: "/products?category=camera" },
  { label: "Dahua", href: "/products?category=camera" },
];

const supportItems = [
  { label: "Hướng dẫn", href: "/guides" },
  { label: "Tư vấn", href: "/blogs" },
  { label: "Công trình", href: "/projects" },
];

const DesktopHeroMenu = () => {
  const menuLinkClass = `
    relative flex items-center justify-center
    text-[15px] font-semibold tracking-[-0.01em]
    text-slate-700
    transition-colors duration-200
    border-r border-slate-100
    hover:text-blue-600
    after:absolute after:left-6 after:right-6 after:bottom-0
    after:h-[2px] after:bg-blue-500
    after:scale-x-0 after:origin-center
    after:transition-transform after:duration-200
    hover:after:scale-x-100
  `;

  const supportLinkClass = `
    relative flex items-center justify-center
    text-[14px] font-medium tracking-[-0.01em]
    text-slate-600
    transition-colors duration-200
    hover:text-blue-600
    after:absolute after:left-5 after:right-5 after:bottom-0
    after:h-[2px] after:bg-blue-500
    after:scale-x-0 after:origin-center
    after:transition-transform after:duration-200
    hover:after:scale-x-100
  `;

  return (
    <div
      className="
        hidden lg:grid
        grid-cols-[300px_1fr_320px]
        h-14
        bg-white
        border-b border-slate-100
        overflow-visible
        relative z-50
      "
    >
      <div
        className="
          flex items-center justify-center px-6
          text-[14px] font-semibold tracking-[-0.01em]
          text-slate-800
          border-r border-slate-100
        "
      >
        Danh mục sản phẩm
      </div>

      <div className="grid grid-cols-4">
        {brandItems.map((item) => (
          <Link key={item.label} to={item.href} className={menuLinkClass}>
            {item.label}
          </Link>
        ))}

        <div className="relative group h-full">
          <button type="button" className={`${menuLinkClass} w-full h-full`}>
            <span>Camera</span>
            <span className="ml-1 text-[10px] transition-transform duration-200 group-hover:rotate-180">
              ▼
            </span>
          </button>

          <div
            className="
              absolute left-1/2 top-full
              w-full -translate-x-1/2 translate-y-2
              bg-white
              border border-slate-100
            
              shadow-xl shadow-slate-200/60
              opacity-0 invisible
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-200
              z-[999]
              overflow-hidden
            "
          >
            {cameraItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="
                  flex items-center justify-between
                  px-4 py-3
                  text-[14px] font-medium text-slate-700
                  hover:bg-slate-50
                  hover:text-blue-600
                  border-b border-slate-100 last:border-b-0
                  transition-colors duration-200
                "
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-400">›</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {supportItems.map((item, index) => (
          <Link
            key={item.label}
            to={item.href}
            className={`
              ${supportLinkClass}
              ${index !== supportItems.length - 1 ? "border-r border-slate-100" : ""}
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopHeroMenu;