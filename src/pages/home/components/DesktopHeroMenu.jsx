import { Link } from "react-router-dom";

const brandItems = [
  { label: "Aqara", href: "/ecosystem/aqara" },
  { label: "Hunonic", href: "/ecosystem/hunonic" },
  { label: "Lumi", href: "/ecosystem/lumi" },
];

const supportItems = [
  { label: "Hướng dẫn", href: "/guides" },
  { label: "Tư vấn", href: "/contact" },
];

const DesktopHeroMenu = () => {
  return (
    <div
      className="
        hidden lg:grid
        grid-cols-[300px_1fr_220px]
        h-14
        bg-blue-50
        overflow-hidden
      "
    >
      <div
        className="
          flex items-center justify-center px-6
          text-sm font-bold text-slate-800
          border-r border-slate-200

        "
      >
        Danh mục sản phẩm
      </div>

      <div className="grid grid-cols-3">
        {brandItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="
              flex items-center justify-center
              text-base font-bold text-blue-700
              hover:bg-white hover:text-blue-600
              transition-colors duration-200
              border-r border-slate-200
            "
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2">
        {supportItems.map((item, index) => (
          <Link
            key={item.label}
            to={item.href}
            className={`
              flex items-center justify-center
              text-sm font-semibold text-slate-600
              hover:bg-white hover:text-blue-600
              transition-colors duration-200
              ${index === 0 ? "border-r border-slate-200" : ""}
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