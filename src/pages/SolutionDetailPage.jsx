// ============================================
// SOLUTION DETAIL PAGE
// Display single solution details
// ============================================
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSolutionBySlug } from "../services/solutionService";
import { companyInfo } from "../data/company";

// Placeholder gradients (reuse from SolutionCard)
const getPlaceholderGradient = (id) => {
  const gradients = {
    lighting: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
    "smart-lock": "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
    "energy-water": "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
    "smart-ac": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
    "water-heater": "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
    "rolling-door": "linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)",
    "voice-assistant": "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    network: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
    security: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    "smart-curtain": "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
  };
  return gradients[id] || "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
};

const SolutionDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getSolutionBySlug(slug);
        
        if (!data) {
          setError("Không tìm thấy giải pháp này");
          return;
        }
        
        setSolution(data);
      } catch (err) {
        console.error("[SolutionDetailPage] Error:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSolution();
    }
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{error}</h2>
          <p className="text-slate-500 mb-6">Vui lòng kiểm tra lại hoặc quay về trang chủ.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Về trang chủ
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!solution) return null;

  const hasImage = solution.image && solution.image.trim() !== "";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        {hasImage ? (
          <img
            src={solution.image}
            alt={solution.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: getPlaceholderGradient(solution.id) }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-700 font-medium hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {solution.title}
            </h1>
            {solution.subtitle && (
              <p className="text-lg md:text-xl text-white/90 font-semibold">
                {solution.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          {/* Description */}
          {solution.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Giới thiệu</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {solution.description}
              </p>
            </div>
          )}

          {/* Features could be added here */}

          {/* CTA Section */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Quan tâm đến giải pháp này?
                </h3>
                <p className="text-slate-500">
                  Liên hệ với chúng tôi để được tư vấn miễn phí
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {companyInfo.phone}
                </a>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailPage;
