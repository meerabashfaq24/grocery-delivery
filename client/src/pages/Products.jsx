import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/cart",
      {
        product: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Added to Cart!");
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Failed to add to cart");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>

       <button
  onClick={() => addToCart(product._id)}
  style={{
    background: "#2e7d32",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Add to Cart
</button>
          </div>
        ))
      )}
    </div>
  );
}
