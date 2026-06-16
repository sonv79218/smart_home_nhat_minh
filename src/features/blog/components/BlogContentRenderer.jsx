const BlogContentRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="blog-content space-y-6">
      {content.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level || 2}`;
            const headingStyles = {
              2: "text-2xl font-black text-slate-900 leading-tight scroll-mt-24",
              3: "text-xl font-bold text-slate-900 leading-snug scroll-mt-24",
              4: "text-lg font-bold text-slate-800 leading-snug scroll-mt-24",
            };

            const id = block.text
              .toLowerCase()
              .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
              .replace(/[èéẹẻẽêềếệểễ]/g, "e")
              .replace(/[ìíịỉĩ]/g, "i")
              .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
              .replace(/[ùúụủũưừứựửữ]/g, "u")
              .replace(/[ỳýỵỷỹ]/g, "y")
              .replace(/[đ]/g, "d")
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .slice(0, 60);

            return (
              <Tag
                key={idx}
                id={`heading-${id}-${idx}`}
                className={headingStyles[block.level] || headingStyles[2]}
              >
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p
                key={idx}
                className="text-base leading-8 text-slate-700"
              >
                {block.text}
              </p>
            );

          case "image":
            return (
              <figure
                key={idx}
                className="rounded-2xl overflow-hidden my-6"
              >
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
                  }}
                />
                {block.caption && (
                  <figcaption className="mt-3 text-sm text-slate-500 text-center italic px-4">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            if (!block.items || block.items.length === 0) return null;
            return (
              <ul
                key={idx}
                className="space-y-3 pl-5"
              >
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="relative pl-5 text-base text-slate-700 leading-8 before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-2 before:h-2 before:rounded-full before:bg-blue-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-blue-500 pl-6 py-3 my-6 text-slate-700 bg-slate-50 rounded-r-xl"
              >
                <p className="text-base leading-8 italic">{block.text}</p>
                {block.author && (
                  <footer className="mt-2 text-sm font-semibold text-slate-500 not-italic">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          case "divider":
            return (
              <hr
                key={idx}
                className="border-slate-200 my-8"
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogContentRenderer;
