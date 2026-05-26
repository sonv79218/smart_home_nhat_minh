import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../../services/productService";
import {
  CATEGORIES,
  BRANDS,
  PRODUCT_STATUS,
} from "../../constants/productMeta";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Xóa sản phẩm thất bại");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getBrandName = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId);
    return brand?.name || brandId;
  };

  const getStatusInfo = (status) => {
    return PRODUCT_STATUS.find((s) => s.id === status) || {
      name: status,
      color: "#999",
    };
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("vi-VN");
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesBrand = !filterBrand || product.brand === filterBrand;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBrand && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Đang tải dữ liệu...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Quản lý sản phẩm</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            Tổng số: <strong>{products.length}</strong> sản phẩm
          </p>
        </div>
        <Link
          to="/admin/products/add"
          style={{
            padding: "10px 20px",
            backgroundColor: "#27ae60",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Tìm theo tên hoặc SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            width: "200px",
          }}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={filterSelect}
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          style={filterSelect}
        >
          <option value="">Tất cả thương hiệu</option>
          {BRANDS.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={filterSelect}
        >
          <option value="">Tất cả trạng thái</option>
          {PRODUCT_STATUS.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
          <p>Không có sản phẩm nào</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={thStyle}>Ảnh</th>
                <th style={thStyle}>Tên & SKU</th>
                <th style={thStyle}>Danh mục</th>
                <th style={thStyle}>Thương hiệu</th>
                <th style={thStyle}>Giá</th>
                <th style={thStyle}>Tồn kho</th>
                <th style={thStyle}>Đã bán</th>
                <th style={thStyle}>Rating</th>
                <th style={thStyle}>Flags</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ngày tạo</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const statusInfo = getStatusInfo(product.status);
                return (
                  <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>
                      <img
                        src={product.thumbnail || ""}
                        alt={product.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: "bold" }}>{product.name}</div>
                      <div style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
                        SKU: {product.sku || "N/A"}
                      </div>
                    </td>
                    <td style={tdStyle}>{getCategoryName(product.category)}</td>
                    <td style={tdStyle}>{getBrandName(product.brand)}</td>
                    <td style={tdStyle}>
                      <div style={{ color: "#e74c3c", fontWeight: "bold" }}>
                        {Number(product.price || 0).toLocaleString()}đ
                      </div>
                      {product.discountPrice > 0 && (
                        <div style={{ fontSize: "11px", color: "#999", textDecoration: "line-through" }}>
                          {Number(product.discountPrice).toLocaleString()}đ
                        </div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          color: product.stock <= (product.minStockAlert || 5) ? "#e74c3c" : "#27ae60",
                          fontWeight: product.stock <= (product.minStockAlert || 5) ? "bold" : "normal",
                        }}
                      >
                        {product.stock || 0}
                      </span>
                    </td>
                    <td style={tdStyle}>{product.sold || 0}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span>⭐</span>
                        <span style={{ fontWeight: "bold" }}>
                          {Number(product.rating || 0).toFixed(1)}
                        </span>
                        <span style={{ fontSize: "11px", color: "#999" }}>
                          ({product.ratingCount || 0})
                        </span>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {product.featured && (
                          <span style={badgeStyle("#f39c12")}>Nổi bật</span>
                        )}
                        {product.bestSeller && (
                          <span style={badgeStyle("#e74c3c")}>Bán chạy</span>
                        )}
                        {product.newProduct && (
                          <span style={badgeStyle("#3498db")}>Mới</span>
                        )}
                        {!product.featured && !product.bestSeller && !product.newProduct && (
                          <span style={{ color: "#ccc" }}>-</span>
                        )}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#fff",
                          backgroundColor: statusInfo.color,
                        }}
                      >
                        {statusInfo.name}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontSize: "12px" }}>
                      {formatDate(product.createdAt)}
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          style={actionBtn("#3498db")}
                        >
                          Xem
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          style={actionBtn("#e74c3c")}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#333",
  borderBottom: "1px solid #eee",
};

const tdStyle = {
  padding: "12px",
  fontSize: "13px",
  verticalAlign: "middle",
};

const filterSelect = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  minWidth: "150px",
  cursor: "pointer",
};

const badgeStyle = (bgColor) => ({
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: bgColor,
});

const actionBtn = (bgColor) => ({
  padding: "6px 10px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  textDecoration: "none",
});

export default AdminProductsPage;
