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
    className="
      bg-slate-50
      border border-blue-200
      overflow-hidden
      mb-8
    "
  >
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-blue-100 bg-white">
      <div className="flex items-center gap-2.5">
        <List
          size={20}
          strokeWidth={2.5}
          className="text-blue-600 shrink-0"
        />

        <h3 className="text-xl font-extrabold text-slate-800">
          Mục lục
        </h3>
      </div>

      <ChevronRight
        size={18}
        className="text-slate-400 rotate-90"
      />
    </div>

    {/* Items */}
    <ul className="py-4 px-5 space-y-2">
      {headings.map(({ id, text, level }) => {
        const isActive = activeId === id;
        const indent =
          level === 3
            ? "ml-5"
            : level === 4
            ? "ml-9"
            : "ml-0";

        return (
          <li key={id} className={indent}>
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className={`
                group flex items-start gap-2
                text-sm md:text-[15px]
                leading-6
                transition-all duration-200
                ${isActive
                  ? "text-blue-700 font-bold"
                  : "text-slate-700 hover:text-blue-600"
                }
              `}
            >
              <span
                className={`
                  mt-2 w-1.5 h-1.5 shrink-0
                  ${isActive ? "bg-blue-600" : "bg-slate-400"}
                `}
              />

              <span>{text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);
};

export default TableOfContents;
