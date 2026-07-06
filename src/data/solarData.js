// ============================================
// NHAT MINH SOLAR — MOCK DATA
// All data used by SolarPage components
// ============================================

// ---------- HERO ----------
export const heroData = {
  badge: "Đơn vị tư vấn & thi công điện mặt trời hàng đầu Bắc Ninh",
  titleLine1: "Năng lượng mặt trời",
  titleLine2: "Tiết kiệm đến 90% chi phí điện",
  subtitle: [
    "Tư vấn miễn phí",
    "Thiết kế tối ưu",
    "Thi công trọn gói",
    "Bảo hành lâu dài",
  ],
  backgroundImage:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
  primaryCta: { label: "Nhận báo giá", href: "#quote" },
  secondaryCta: { label: "Xem dự án", href: "#projects" },
};

// ---------- WHY SOLAR ----------
export const whySolarFeatures = [
  {
    id: "save-money",
    title: "Tiết kiệm tiền điện",
    description:
      "Giảm đến 90% hóa đơn điện hàng tháng, hoàn vốn chỉ sau 4-6 năm và sử dụng miễn phí lên đến 30 năm.",
    icon: "Wallet",
  },
  {
    id: "fast-roi",
    title: "Hoàn vốn nhanh",
    description:
      "Hệ thống hòa lưới bán điện dư cho EVN giúp chủ đầu tư thu hồi vốn nhanh chóng và ổn định.",
    icon: "TrendingUp",
  },
  {
    id: "long-warranty",
    title: "Bảo hành dài hạn",
    description:
      "Tấm pin bảo hành 25 năm hiệu suất, inverter bảo hành 5-10 năm. Đội ngũ kỹ thuật hỗ trợ trọn đời.",
    icon: "ShieldCheck",
  },
  {
    id: "pro-team",
    title: "Đội ngũ kỹ thuật chuyên nghiệp",
    description:
      "Hơn 8 năm kinh nghiệm thi công điện mặt trời. Kỹ sư được đào tạo chuyên sâu, đảm bảo chất lượng công trình.",
    icon: "Users",
  },
];

// ---------- CUSTOMER TYPES ----------
export const customerTypes = [
  {
    id: "house",
    title: "Nhà phố",
    description:
      "Giải pháp cho nhà phố mái tôn, mái bằng, công suất 3-10 kWp phù hợp hộ gia đình.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  },
  {
    id: "villa",
    title: "Biệt thự",
    description:
      "Hệ thống cao cấp cho biệt thự, tối ưu thẩm mỹ và hiệu suất, kết hợp lưu trữ.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "factory",
    title: "Nhà xưởng",
    description:
      "Lắp đặt trên mái nhà xưởng quy mô lớn, công suất 50kWp - 1MWp, tiết kiệm chi phí sản xuất.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "spa",
    title: "Spa",
    description:
      "Giải pháp cho spa, salon với chi phí điện nước nóng lớn, tích hợp bình nóng lạnh mặt trời.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
  },
  {
    id: "hotel",
    title: "Khách sạn",
    description:
      "Hệ thống điện mặt trời cho khách sạn, resort, giảm chi phí vận hành và nâng tầm thương hiệu xanh.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "business",
    title: "Doanh nghiệp",
    description:
      "Tư vấn giải pháp cho doanh nghiệp, văn phòng, tòa nhà thương mại với phương án tài chính linh hoạt.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];

// ---------- CALCULATOR ----------
export const roofTypes = [
  { id: "tin", label: "Mái tôn", factor: 1.0 },
  { id: "concrete", label: "Mái bằng bê tông", factor: 0.92 },
  { id: "tile", label: "Mái ngói", factor: 0.95 },
  { id: "ground", label: "Mái đất / sân thượng", factor: 1.05 },
];

export const localities = [
  "Bắc Ninh",
  "Hà Nội",
  "Bắc Giang",
  "Hải Dương",
  "Hưng Yên",
  "Thái Nguyên",
  "Vĩnh Phúc",
  "Quảng Ninh",
];

// ---------- SOLUTIONS ----------
export const solarSolutions = [
  {
    id: "on-grid",
    title: "Điện mặt trời hòa lưới",
    description:
      "Hệ thống hòa lưới bán điện dư cho EVN, phù hợp hộ gia đình và doanh nghiệp có nhu cầu tiêu thụ ban ngày.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80",
    benefits: ["Hoàn vốn 4-6 năm", "Không cần pin lưu trữ", "Bảo hành 25 năm"],
  },
  {
    id: "hybrid",
    title: "Điện mặt trời Hybrid",
    description:
      "Kết hợp hòa lưới và lưu trữ, ưu tiên dùng điện mặt trời, mất điện vẫn hoạt động bình thường.",
    image:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=900&q=80",
    benefits: ["Có lưu trữ", "Chống cắt điện", "Tối ưu chi phí"],
  },
  {
    id: "off-grid",
    title: "Điện mặt trời có lưu trữ",
    description:
      "Hoạt động độc lập không cần lưới điện, phù hợp vùng sâu vùng xa hoặc nhu cầu dự phòng cao.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
    benefits: ["Độc lập lưới điện", "Dự phòng 24/7", "Phù hợp vùng xa"],
  },
  {
    id: "business",
    title: "Điện mặt trời doanh nghiệp",
    description:
      "Giải pháp công suất lớn cho nhà máy, xí nghiệp, tòa nhà thương mại với phương án tài chính linh hoạt.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
    benefits: ["Công suất lớn", "Tiết kiệm OPEX", "ESG xanh"],
  },
  {
    id: "factory",
    title: "Điện mặt trời nhà xưởng",
    description:
      "Thiết kế và thi công chuyên biệt cho mái nhà xưởng, đảm bảo kết cấu và hiệu suất tối đa.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=80",
    benefits: ["Kết cấu chuyên dụng", "Công suất 50kWp-1MWp", "An toàn PCCC"],
  },
];

// ---------- PRODUCT CATEGORIES (không bán, chỉ giới thiệu) ----------
export const productCategories = [
  {
    id: "inverter",
    title: "Inverter",
    description:
      "Inverter hòa lưới và hybrid công suất từ 1kW đến 100kW, hiệu suất chuyển đổi trên 98%.",
    image:
      "https://images.unsplash.com/photo-1545209463-e2825498edbf?w=800&q=80",
  },
  {
    id: "battery",
    title: "Pin lưu trữ",
    description:
      "Pin Lithium LFP cao cấp, dung lượng 5kWh - 60kWh, tuổi thọ trên 6000 chu kỳ sạc xả.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
  },
  {
    id: "panel",
    title: "Tấm pin mặt trời",
    description:
      "Tấm pin Mono / Poly hiệu suất cao từ 410Wp đến 700Wp, thương hiệu hàng đầu thế giới.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    id: "accessory",
    title: "Phụ kiện & giá đỡ",
    description:
      "Khung giá đỡ chuyên dụng cho mọi loại mái, dây dẫn DC/AC, tủ điện và thiết bị bảo vệ.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
  },
];

// ---------- BRANDS ----------
export const solarBrands = [
  { id: "huawei", name: "Huawei" },
  { id: "deye", name: "Deye" },
  { id: "sungrow", name: "Sungrow" },
  { id: "growatt", name: "Growatt" },
  { id: "jinko", name: "Jinko" },
  { id: "ja", name: "JA Solar" },
  { id: "canadian", name: "Canadian Solar" },
  { id: "longi", name: "LONGi" },
];

// ---------- PROJECTS ----------
export const solarProjects = [
  {
    id: "p1",
    title: "Hệ thống 5kWp - Nhà phố Bắc Ninh",
    location: "TP. Bắc Ninh",
    capacity: "5 kWp",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
    description:
      "Hệ thống hòa lưới 5kWp trên mái tôn, sản lượng 600 kWh/tháng, hoàn vốn 5 năm.",
  },
  {
    id: "p2",
    title: "Hệ thống 15kWp - Biệt thự Từ Sơn",
    location: "Từ Sơn, Bắc Ninh",
    capacity: "15 kWp",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
    description:
      "Lắp đặt hệ thống hybrid 15kWp kết hợp pin lưu trữ 10kWh cho biệt thự 3 tầng.",
  },
  {
    id: "p3",
    title: "Hệ thống 200kWp - Nhà xưởng Yên Phong",
    location: "Yên Phong, Bắc Ninh",
    capacity: "200 kWp",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
    description:
      "Nhà xưởng sản xuất công nghiệp, lắp đặt 200kWp, giảm 70% chi phí điện hàng tháng.",
  },
  {
    id: "p4",
    title: "Hệ thống 80kWp - Khách sạn Quế Võ",
    location: "Quế Võ, Bắc Ninh",
    capacity: "80 kWp",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    description:
      "Hệ thống điện mặt trời cho khách sạn 4 sao, nâng tầm thương hiệu xanh bền vững.",
  },
];

// ---------- TIMELINE / QUY TRÌNH ----------
export const constructionSteps = [
  {
    id: 1,
    title: "Khảo sát",
    description:
      "Đội ngũ kỹ thuật khảo sát thực tế mái nhà, đánh giá hướng nắng, kết cấu và hiện trạng điện.",
  },
  {
    id: 2,
    title: "Thiết kế",
    description:
      "Thiết kế hệ thống 3D, tính toán công suất, sản lượng, tối ưu chi phí và phương án kỹ thuật.",
  },
  {
    id: 3,
    title: "Báo giá",
    description:
      "Gửi báo giá chi tiết với các phương án thiết bị, thời gian thi công và cam kết bảo hành.",
  },
  {
    id: 4,
    title: "Thi công",
    description:
      "Thi công lắp đặt theo tiêu chuẩn kỹ thuật, đảm bảo an toàn lao động và thẩm mỹ công trình.",
  },
  {
    id: 5,
    title: "Nghiệm thu",
    description:
      "Nghiệm thu hệ thống, đo đạc sản lượng, hướng dẫn vận hành và ký kết bảo hành chính hãng.",
  },
  {
    id: 6,
    title: "Bảo hành",
    description:
      "Bảo hành thiết bị lên đến 25 năm, hỗ trợ kỹ thuật 24/7 và vệ sinh định kỳ hàng năm.",
  },
];

// ---------- TESTIMONIALS ----------
export const solarTestimonials = [
  {
    id: "t1",
    name: "Anh Nguyễn Văn Hùng",
    role: "Chủ biệt thự - Từ Sơn",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
    content:
      "Hệ thống điện mặt trời 15kWp hoạt động ổn định hơn 2 năm, tiền điện giảm hơn 80%. Đội ngũ Nhật Minh Solar thi công chuyên nghiệp, bảo hành tận tâm.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Chị Trần Thị Mai",
    role: "Chủ nhà phố - Bắc Ninh",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content:
      "Tôi rất hài lòng với dịch vụ tư vấn và lắp đặt. Hệ thống 5kWp phù hợp nhu cầu gia đình, hoàn vốn nhanh hơn dự kiến.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Ông Lê Hoàng Nam",
    role: "Giám đốc nhà máy - Yên Phong",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content:
      "Hệ thống 200kWp giúp nhà máy tiết kiệm hơn 70% chi phí điện. Nhật Minh Solar là đối tác tin cậy của chúng tôi.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Anh Phạm Quốc Đạt",
    role: "Chủ khách sạn - Quế Võ",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content:
      "Lắp đặt nhanh chóng, chuyên nghiệp. Khách sạn giờ đây vận hành xanh hơn và tiết kiệm chi phí đáng kể.",
    rating: 5,
  },
];

// ---------- NEWS ----------
export const solarNews = [
  {
    id: "n1",
    title: "Giá điện mặt trời 2026 và những điều cần biết",
    date: "15/06/2026",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    excerpt:
      "Cập nhật giá lắp đặt điện mặt trời mới nhất 2026 cho hộ gia đình và doanh nghiệp tại Bắc Ninh.",
  },
  {
    id: "n2",
    title: "Cách tính công suất điện mặt trời phù hợp với gia đình",
    date: "08/06/2026",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    excerpt:
      "Hướng dẫn chi tiết cách tính công suất tấm pin phù hợp dựa trên hóa đơn tiền điện và diện tích mái.",
  },
  {
    id: "n3",
    title: "Quy trình lắp đặt điện mặt trời chuẩn kỹ thuật 2026",
    date: "01/06/2026",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    excerpt:
      "Tìm hiểu quy trình 6 bước thi công điện mặt trời chuẩn kỹ thuật, đảm bảo an toàn và hiệu suất tối đa.",
  },
];

// ---------- NAVIGATION ----------
export const solarNavLinks = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Giải pháp", href: "#solutions" },
  { label: "Sản phẩm", href: "#products" },
  { label: "Dự án", href: "#projects" },
  { label: "Tin tức", href: "#news" },
  { label: "Liên hệ", href: "#contact" },
];

// ---------- CONTACT INFO ----------
export const solarContactInfo = {
  company: "CÔNG TY TNHH NHẬT MINH CÔNG NGHỆ GROUP",
  hotline: "0876.906.668",
  technical: "0972.131.477",
  email: "solar@nhatminh.com.vn",
  address:
    "Nhà số 01 ngõ Giếng Vàng, Khu phố Phù Lưu, Phường Từ Sơn, Tỉnh Bắc Ninh",
  taxCode: "2301374027",
};

// ---------- FORM OPTIONS ----------
export const quoteFormOptions = [
  { id: "house", label: "Nhà phố / Biệt thự" },
  { id: "factory", label: "Nhà xưởng / Doanh nghiệp" },
  { id: "hotel", label: "Khách sạn / Resort" },
  { id: "consult", label: "Chỉ muốn tư vấn thêm" },
];