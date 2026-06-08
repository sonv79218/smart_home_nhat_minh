/**
 * Renders rich blog content blocks
 * Supports: heading, paragraph, image, list
 */

const BlogContentRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="blog-content space-y-6">
      {content.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level || 2}`;
            const headingStyles = {
              2: "text-2xl md:text-3xl font-black text-slate-900 leading-tight",
              3: "text-xl md:text-2xl font-bold text-slate-900 leading-snug",
              4: "text-lg font-bold text-slate-800 leading-snug",
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
                className="text-base md:text-lg text-slate-700 leading-relaxed md:leading-loose"
              >
                {block.text}
              </p>
            );

          case "image":
            return (
              <figure
                key={idx}
                className="rounded-2xl overflow-hidden shadow-sm my-4"
              >
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full object-cover max-h-96"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
                  }}
                />
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-slate-500 text-center italic px-4">
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
                className="space-y-2.5 pl-2"
              >
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex gap-3 text-base text-slate-700 leading-relaxed"
                  >
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-blue-400 pl-6 py-2 my-2 italic text-slate-600 bg-blue-50 rounded-r-xl"
              >
                <p className="text-base">{block.text}</p>
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
                className="border-slate-200 my-6"
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
