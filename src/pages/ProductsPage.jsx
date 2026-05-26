import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách sản phẩm</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h3>{product.name}</h3>

            <p style={{ color: "red" }}>
              {Number(product.price).toLocaleString()}đ
            </p>

            {product.discountPrice && (
              <p style={{ textDecoration: "line-through" }}>
                {Number(product.discountPrice).toLocaleString()}đ
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;