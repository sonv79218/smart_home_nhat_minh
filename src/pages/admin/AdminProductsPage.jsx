import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

const AdminProductsPage = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Bạn có chắc muốn xóa?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.log(error);

      alert("Xóa thất bại");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>
          Quản lý sản phẩm
        </h1>

        <a href="/admin/products/add">
          <button>
            + Thêm sản phẩm
          </button>
        </a>
      </div>

      <table
        border="1"
        cellPadding="12"
        width="100%"
        style={{
          borderCollapse:
            "collapse",
        }}
      >
  <thead>
  <tr>
    <th>Ảnh</th>
    <th>Tên</th>
    <th>Thương hiệu</th>
    <th>Danh mục</th>
    <th>Giá</th>
    <th>Giảm giá</th>
    <th>Tồn kho</th>
    <th>Đã bán</th>
    <th>Rating</th>
    <th>Nổi bật</th>
    <th>Trạng thái</th>
    <th>Mô tả ngắn</th>
    <th>Ảnh phụ</th>
    <th>Ngày tạo</th>
    <th>Hành động</th>
  </tr>
</thead>

<tbody>
  {products.length === 0 ? (
    <tr>
      <td colSpan="15" align="center">
        Không có sản phẩm
      </td>
    </tr>
  ) : (
    products.map((product) => (
      <tr key={product.id}>
        {/* Thumbnail */}
        <td>
          <img
            src={product.thumbnail || ""}
            alt={product.name}
            width="70"
            height="70"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </td>

        <td>{product.name}</td>
        <td>{product.brand}</td>
        <td>{product.category}</td>

        <td>
          {Number(product.price || 0).toLocaleString()}đ
        </td>

        <td>
          {product.discountPrice
            ? Number(product.discountPrice).toLocaleString() + "đ"
            : "-"}
        </td>

        <td>{product.stock}</td>

        <td>{product.sold || 0}</td>

        <td>{product.rating || 0} ⭐</td>

        <td>{product.featured ? "⭐" : "-"}</td>

        <td>{product.status}</td>

        {/* short description */}
        <td>
          {product.shortDescription
            ? product.shortDescription.slice(0, 50) + "..."
            : "-"}
        </td>

        {/* images gallery */}
        <td>
          <div style={{ display: "flex", gap: "5px" }}>
            {(product.images || []).slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="img"
                width="40"
                height="40"
                style={{
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        </td>

        {/* createdAt */}
        <td>
          {product.createdAt?.seconds
            ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
            : "-"}
        </td>

        {/* actions */}
        <td>
          <div style={{ display: "flex", gap: "8px" }}>
            <button>Sửa</button>

            <button onClick={() => handleDelete(product.id)}>
              Xóa
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;