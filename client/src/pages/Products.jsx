import { useEffect, useState } from "react";
import api from "../services/api";
import "./Products.css";

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
  <div className="products-page">
    <h1 className="products-title">Fresh Groceries</h1>

    {products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">

            <img
              src={
                product.image ||
                "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
              }
              className="product-image"
            />

            <div className="product-content">

              <div className="product-name">
                {product.name}
              </div>

              <div className="product-description">
                {product.description}
              </div>

              <div className="price">
                ${product.price}
              </div>

              <div className="stock">
                In Stock: {product.stock}
              </div>

              <button
                className="add-btn"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>

            </div>

          </div>
        ))}
      </div>
    )}
  </div>
);
}
