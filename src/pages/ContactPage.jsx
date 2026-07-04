import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  ShieldCheck,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import ContactSection from "./ContactSection";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Vui lòng nhập đầy đủ họ tên và số điện thoại.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "contact_requests"), {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });

      setForm({ fullName: "", phone: "", email: "", message: "" });
      alert("Gửi yêu cầu thành công!");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          {/* Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-none p-6 md:p-8">
            <p className="text-blue-600 font-bold mb-2">
              LIÊN HỆ
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900">
              Nhật Minh Smart Home
            </h1>

            <div className="space-y-5 text-slate-700">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>
                  Nhà số 01 ngõ Giếng Vàng, Khu phố Phù Lưu,
                  Phường Từ Sơn, Tỉnh Bắc Ninh, Việt Nam
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>0876 906 668</span>
              </div>

              <div className="flex gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>Zalo: 0876 906 668</span>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>contact@nhatminh.vn</span>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>08:00 - 18:00</span>
              </div>
              
              <div className="flex gap-3">
  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
  <span>
    GPĐKKD: 2301374027 — MST: 2301374027
  </span>
</div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border border-slate-200 rounded-none p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              Gửi yêu cầu tư vấn
            </h2>

            <p className="text-slate-500 mb-6">
              Để lại thông tin, Nhật Minh Smart Home sẽ liên hệ tư vấn sớm nhất.
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-none
 px-4 py-3">
                {error}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Họ và tên"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Số điện thoại"
              />
            </div>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border border-slate-200 rounded-xl px-4 py-3 w-full mt-4 outline-none focus:border-blue-500"
              placeholder="Email"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="border border-slate-200 rounded-xl px-4 py-3 w-full mt-4 outline-none focus:border-blue-500 resize-none"
              placeholder="Nội dung cần tư vấn..."
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              {!loading && <Send size={18} />}
            </button>
          </form>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default ContactPage;
