// ============================================
// AQARA PAGE
// Route: /aqara
// ============================================
import BrandProductsPage from "../features/brand/components/BrandProductsPage";

const AqaraPage = () => {
  return (
    <BrandProductsPage
      brandKey="aqara"
      name="Aqara"
      tagline="Nhà thông minh hàng đầu thế giới"
      description="Hệ sinh thái nhà thông minh với hơn 1.000 thiết bị, hỗ trợ Matter, Apple Home, Google Home, Amazon Alexa và Samsung SmartThings."
    />
  );
};

export default AqaraPage;