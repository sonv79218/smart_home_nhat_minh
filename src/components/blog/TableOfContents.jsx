import { useEffect, useRef, useState } from "react";
import { List, ChevronRight } from "lucide-react";

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleIntersect = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Mục lục bài viết"
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 bg-slate-50">
        <List size={16} strokeWidth={2.5} className="text-blue-600 shrink-0" />
        <h3 className="text-sm font-bold text-slate-800">Mục lục</h3>
      </div>

      {/* Items */}
      <ul className="py-3 px-2">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          const indent = level === 3 ? "pl-6" : level === 4 ? "pl-10" : "pl-4";

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleClick(id)}
                className={`
                  group flex items-start gap-2 py-2 px-3 rounded-xl
                  text-xs font-medium transition-all duration-150
                  ${indent}
                  ${isActive
                    ? "bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-500"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }
                `}
              >
                <ChevronRight
                  size={11}
                  strokeWidth={3}
                  className={`
                    shrink-0 mt-0.5 transition-transform duration-150
                    ${isActive ? "text-blue-500 rotate-90" : "text-slate-300 group-hover:text-slate-400"}
                  `}
                />
                <span className="leading-snug">{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
