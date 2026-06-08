import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getBlogById,
  createBlog,
  updateBlog,
  checkSlugExists,
} from "../../services/adminBlogService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import { useToast } from "../../contexts/ToastContext";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Heading2,
  Type,
  Image,
  List,
  Quote,
  Minus,
} from "lucide-react";

const BLOCK_TYPES = [
  { type: "heading", label: "Tieu de H2", icon: Heading2, level: 2 },
  { type: "heading", label: "Tieu de H3", icon: Heading2, level: 3 },
  { type: "paragraph", label: "Doan van", icon: Type },
  { type: "image", label: "Anh", icon: Image },
  { type: "list", label: "Danh sach", icon: List },
  { type: "quote", label: "Trich dan", icon: Quote },
  { type: "divider", label: "Duong ke", icon: Minus },
];

const createBlock = (type, level = 2) => {
  const base = { type, id: Date.now() + Math.random() };
  if (type === "heading") return { ...base, level, text: "" };
  if (type === "paragraph") return { ...base, text: "" };
  if (type === "image") return { ...base, src: "", alt: "" };
  if (type === "list") return { ...base, items: [""] };
  if (type === "quote") return { ...base, text: "" };
  if (type === "divider") return { ...base };
  return base;
};

const DEFAULT_FORM = {
  title: "",
  slug: "",
  type: "blog",
  excerpt: "",
  thumbnail: "",
  author: "Nhat Minh Smart Home",
  tags: "",
  status: "draft",
  featured: false,
  seoTitle: "",
  seoDescription: "",
  relatedProducts: "",
  content: [],
};

const AdminBlogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [activeBlock, setActiveBlock] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blog = await getBlogById(id);
      if (!blog) {
        toast.error("Khong tim thay bai viet.");
        navigate("/admin/blogs");
        return;
      }
      setForm({
        title: blog.title || "",
        slug: blog.slug || "",
        type: blog.type || "blog",
        excerpt: blog.excerpt || "",
        thumbnail: blog.thumbnail || "",
        author: blog.author || "Nhat Minh Smart Home",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
        status: blog.status || "draft",
        featured: blog.featured || false,
        seoTitle: blog.seoTitle || "",
        seoDescription: blog.seoDescription || "",
        relatedProducts: Array.isArray(blog.relatedProducts) ? blog.relatedProducts.join(", ") : "",
        content: Array.isArray(blog.content) ? blog.content.map((c) => ({ ...c, id: Date.now() + Math.random() })) : [],
      });
      if (blog.slug) setSlugManual(true);
    } catch (err) {
      toast.error("Khong the tai bai viet.");
    } finally {
      setLoading(false);
    }
  };

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "title" && !slugManual) {
      const s = generateSlug(value);
      setForm((prev) => ({ ...prev, slug: s }));
      setSlugError("");
    }
    if (field === "slug") {
      setSlugError("");
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/[đ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToCloudinary(file);
      setForm((prev) => ({ ...prev, thumbnail: url }));
      toast.success("Tai anh thanh cong.");
    } catch (err) {
      toast.error("Tai anh that bai.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddBlock = (blockType, level) => {
    const block = createBlock(blockType, level);
    setForm((prev) => ({ ...prev, content: [...prev.content, block] }));
    setActiveBlock(block.id);
  };

  const handleUpdateBlock = (blockId, updates) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
    }));
  };

  const handleDeleteBlock = (blockId) => {
    setForm((prev) => ({ ...prev, content: prev.content.filter((b) => b.id !== blockId) }));
  };

  const handleMoveBlock = (blockId, direction) => {
    setForm((prev) => {
      const idx = prev.content.findIndex((b) => b.id === blockId);
      if (idx < 0) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.content.length) return prev;
      const blocks = [...prev.content];
      [blocks[idx], blocks[newIdx]] = [blocks[newIdx], blocks[idx]];
      return { ...prev, content: blocks };
    });
  };

  const handleListItemChange = (blockId, itemIdx, value) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((b) => {
        if (b.id !== blockId) return b;
        const items = [...b.items];
        items[itemIdx] = value;
        return { ...b, items };
      }),
    }));
  };

  const handleAddListItem = (blockId) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((b) => {
        if (b.id !== blockId) return b;
        return { ...b, items: [...b.items, ""] };
      }),
    }));
  };

  const handleRemoveListItem = (blockId, itemIdx) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((b) => {
        if (b.id !== blockId) return b;
        const items = b.items.filter((_, i) => i !== itemIdx);
        return { ...b, items };
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.warning("Vui long nhap tieu de bai viet.");
      return;
    }
    if (!form.slug.trim()) {
      toast.warning("Vui long nhap duong dan (slug).");
      return;
    }

    // Check slug uniqueness
    try {
      const exists = await checkSlugExists(form.slug, isEditing ? id : null);
      if (exists) {
        setSlugError("Duong dan nay da ton tai. Vui long chon ten khac.");
        toast.warning("Duong dan da ton tai.");
        return;
      }
    } catch (err) {
      console.error("Slug check error:", err);
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      type: form.type,
      excerpt: form.excerpt.trim(),
      thumbnail: form.thumbnail,
      author: form.author.trim(),
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      status: form.status,
      featured: form.featured,
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      relatedProducts: form.relatedProducts
        ? form.relatedProducts.split(",").map((p) => p.trim()).filter(Boolean)
        : [],
      content: form.content.map(({ id: _id, ...rest }) => rest),
    };

    try {
      setSaving(true);
      if (isEditing) {
        await updateBlog(id, payload);
        toast.success("Cap nhat bai viet thanh cong.", { title: "Luu thanh cong" });
      } else {
        await createBlog(payload);
        toast.success("Tao bai viet moi thanh cong.", { title: "Tao thanh cong" });
      }
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Khong the luu bai viet luc nay.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/blogs"
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {isEditing ? "Sua bai viet" : "Them bai viet moi"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          <Save size={18} />
          {saving ? "Dang luu..." : "Luu bai viet"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - main fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Noi dung chinh</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Tieu de <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleField("title", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                    placeholder="VD: Chieu sang thong minh, tich hop Apple HomeKit"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Duong dan (slug)</label>
                    <button
                      type="button"
                      onClick={() => {
                        if (!slugManual) {
                          setSlugManual(true);
                        } else {
                          setSlugManual(false);
                          handleField("title", form.title);
                        }
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {slugManual ? "Tu dong" : "Sua thu cong"}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => handleField("slug", e.target.value)}
                    disabled={!slugManual}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${
                      slugManual
                        ? "border-slate-200 focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
                        : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                    }`}
                    placeholder="duong-dan-bai-viet"
                  />
                  {slugError && (
                    <p className="text-xs text-red-500 mt-1">{slugError}</p>
                  )}
                  {/* <p className="text-xs text-slate-400 mt-1">
                    URL: /blogs/{form.slug || "duong-dan"}
                  </p> */}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Loai</label>
                  <select
                    value={form.type}
                    onChange={(e) => handleField("type", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white transition-all"
                  >
                    <option value="solution">Tu van giai phap</option>
                    <option value="guide">Huong dan</option>
                    <option value="project">Cong trinh thuc te</option>
                    <option value="blog">Bai viet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mo ta ngan</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => handleField("excerpt", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none transition-all"
                    placeholder="Tom tat noi dung bai viet (hien thi tren card)"
                  />
                </div>
              </div>
            </div>

            {/* Content Builder */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Noi dung bai viet</h2>
                <span className="text-xs text-slate-400">{form.content.length} blocks</span>
              </div>

              {/* Block type buttons */}
              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => handleAddBlock("heading", 2)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Heading2 size={13} /> H2
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("heading", 3)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Heading2 size={13} /> H3
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("paragraph")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Type size={13} /> Doan van
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("image")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Image size={13} /> Anh
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("list")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <List size={13} /> Danh sach
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("quote")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Quote size={13} /> Trich dan
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("divider")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Minus size={13} /> Duong ke
                </button>
              </div>

              {/* Block list */}
              <div className="space-y-3">
                {form.content.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                    Chua co noi dung. Nhan nut phia tren de them block.
                  </div>
                )}
                {form.content.map((block, idx) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    idx={idx}
                    total={form.content.length}
                    isActive={activeBlock === block.id}
                    onActivate={() => setActiveBlock(block.id)}
                    onUpdate={(updates) => handleUpdateBlock(block.id, updates)}
                    onDelete={() => handleDeleteBlock(block.id)}
                    onMoveUp={() => handleMoveBlock(block.id, -1)}
                    onMoveDown={() => handleMoveBlock(block.id, 1)}
                    onListItemChange={(i, v) => handleListItemChange(block.id, i, v)}
                    onAddListItem={() => handleAddListItem(block.id)}
                    onRemoveListItem={(i) => handleRemoveListItem(block.id, i)}
                  />
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">SEO Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => handleField("seoTitle", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                    placeholder="SEO title cho bai viet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">SEO Description</label>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) => handleField("seoDescription", e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none transition-all"
                    placeholder="Mo ta SEO cho bai viet"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - meta */}
          <div className="space-y-5">
            {/* Publish */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Cong bo</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Trang thai</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleField("status", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white transition-all"
                  >
                    <option value="draft">Ban nhap</option>
                    <option value="published">Xuat ban</option>
                    <option value="hidden">An</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Noi bat</label>
                  <button
                    type="button"
                    onClick={() => handleField("featured", !form.featured)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      form.featured ? "bg-primary-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        form.featured ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Anh dai dien</h2>
              <div className="space-y-3">
                <div
                  className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors ${
                    form.thumbnail ? "border-primary-200" : "border-slate-200"
                  }`}
                >
                  {form.thumbnail ? (
                    <div className="relative">
                      <img src={form.thumbnail} alt="Thumbnail" className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleField("thumbnail", "")}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                      <Image size={28} className="mb-2 opacity-50" />
                      <p className="text-xs">Chua co anh</p>
                    </div>
                  )}
                </div>
                <label
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                    uploading
                      ? "bg-slate-100 text-slate-400 cursor-wait"
                      : "bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-200"
                  }`}
                >
                  <Upload size={15} />
                  {uploading ? "Dang tai..." : "Tai anh len"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Author & Tags */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Khac</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tac gia</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => handleField("author", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => handleField("tags", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                    placeholder="Tag 1, Tag 2, Tag 3"
                  />
                  <p className="text-xs text-slate-400 mt-1">Phan cach bang dau phay</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">San pham lien quan</label>
                  <input
                    type="text"
                    value={form.relatedProducts}
                    onChange={(e) => handleField("relatedProducts", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                    placeholder="product-id-1, product-id-2"
                  />
                  <p className="text-xs text-slate-400 mt-1">Phan cach bang dau phay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// ============================================================
// Block Editor sub-component
// ============================================================
const BlockEditor = ({
  block,
  idx,
  total,
  isActive,
  onActivate,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onListItemChange,
  onAddListItem,
  onRemoveListItem,
}) => {
  const blockLabel = {
    heading: `Tieu de H${block.level}`,
    paragraph: "Doan van",
    image: "Anh",
    list: "Danh sach",
    quote: "Trich dan",
    divider: "Duong ke",
  }[block.type] || block.type;

  const blockColor = {
    heading: "border-blue-200 bg-blue-50",
    paragraph: "border-slate-200 bg-white",
    image: "border-emerald-200 bg-emerald-50",
    list: "border-amber-200 bg-amber-50",
    quote: "border-purple-200 bg-purple-50",
    divider: "border-slate-200 bg-slate-50",
  }[block.type] || "border-slate-200 bg-white";

  return (
    <div
      className={`border rounded-xl transition-all ${blockColor} ${
        isActive ? "ring-2 ring-primary-400 shadow-md" : "hover:shadow-sm"
      }`}
      onClick={onActivate}
    >
      {/* Block header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
          #{idx + 1} {blockLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            disabled={idx === 0}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            disabled={idx === total - 1}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-6 h-6 rounded flex items-center justify-center text-red-400 hover:bg-red-50"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Block content */}
      <div className="p-4">
        {block.type === "heading" && (
          <div className="space-y-2">
            <select
              value={block.level}
              onChange={(e) => onUpdate({ level: Number(e.target.value) })}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 border border-slate-200 rounded-lg text-xs bg-white"
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
            <input
              type="text"
              value={block.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder={`Nhap tieu de H${block.level}...`}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
            />
          </div>
        )}

        {block.type === "paragraph" && (
          <textarea
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            rows={4}
            placeholder="Nhap noi dung doan van..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none bg-white"
          />
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            <input
              type="text"
              value={block.src}
              onChange={(e) => onUpdate({ src: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="URL anh..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
            />
            <input
              type="text"
              value={block.alt}
              onChange={(e) => onUpdate({ alt: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Mo ta anh (alt text)..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
            />
            {block.src && (
              <img src={block.src} alt={block.alt} className="w-full max-h-48 object-cover rounded-lg" />
            )}
          </div>
        )}

        {block.type === "list" && (
          <div className="space-y-2">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">-</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => onListItemChange(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={`Muc ${i + 1}...`}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 bg-white"
                />
                {block.items.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRemoveListItem(i); }}
                    className="w-6 h-6 flex items-center justify-center text-red-400 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onAddListItem(); }}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-primary-600 hover:bg-primary-50 rounded transition-colors"
            >
              <Plus size={12} /> Them muc
            </button>
          </div>
        )}

        {block.type === "quote" && (
          <textarea
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            rows={3}
            placeholder="Noi dung trich dan..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none italic bg-white"
          />
        )}

        {block.type === "divider" && (
          <div className="py-2">
            <hr className="border-slate-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogFormPage;
