import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const newsItems = [
  { to: "/guides", label: "Hướng dẫn" },
  { to: "/projects", label: "Công trình" },
  { to: "/blogs", label: "Bài viết" },
  { to: "/solutions", label: "Giải pháp" },
];

const MobileNewsAccordion = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const isItemActive = (path) => location.pathname === path;

  return (
    <div className="mobile-news-accordion">
      <button
        type="button"
        onClick={handleToggle}
        className="mobile-menu-item"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="mobile-news-label">Tin tức</span>
        <ChevronDown
          className={`mobile-news-chevron ${
            isOpen ? "mobile-news-chevron-open" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="mobile-news-submenu-wrapper"
          >
            <div className="mobile-news-submenu">
              {newsItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mobile-news-item ${
                    isItemActive(item.to)
                      ? "mobile-news-item-active"
                      : ""
                  }`}
                  onClick={handleItemClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNewsAccordion;
