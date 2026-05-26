import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Không tìm thấy sản phẩm</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>

      <img
        src={product.thumbnail}
        alt={product.name}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />

      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>

      <h2 style={{ color: "red" }}>
        {Number(product.price).toLocaleString()}đ
      </h2>

      {product.discountPrice && (
        <p style={{ textDecoration: "line-through" }}>
          {Number(product.discountPrice).toLocaleString()}đ
        </p>
      )}

      <p>{product.shortDescription}</p>

      <p>{product.description}</p>

      <h3>Thông số kỹ thuật</h3>
      <ul>
        <li>Wifi: {product.specifications?.wifi}</li>
        <li>App: {product.specifications?.appSupport}</li>
        <li>
          Voice: {product.specifications?.voiceAssistant}
        </li>
      </ul>

      <div style={{ display: "flex", gap: "10px" }}>
        {(product.images || []).map((img, index) => (
          <img
            key={index}
            src={img}
            alt="img"
            width="80"
            height="80"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;