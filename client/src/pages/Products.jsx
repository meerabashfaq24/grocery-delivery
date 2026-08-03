import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
const [searchParams] = useSearchParams();

const selectedCategory = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      let data = res.data;

if (selectedCategory) {

  const categoryMap = {
    Fruits: ["Apple", "Bananas"],
    Vegetables: ["Tomatoes", "Potatoes"],
    Dairy: ["Whole Milk", "Eggs"],
    Bakery: ["Brown Bread"],
    Meat: ["Chicken"],
    Grocery: ["Basmati Rice"],
  };

  data = data.filter(product =>
    categoryMap[selectedCategory]?.includes(product.name)
  );
}

setProducts(data);
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
const categoryNames = {
  "6a681ba15eeed5fa012455f5": "🍎 Fruits",
  "6a681bf65eeed5fa012455f7": "🥦 Vegetables",
  "6a6a8151d72c8e24e79b288b": "🥛 Dairy",
  "6a6a8181d72c8e24e79b288c": "🍞 Bakery",
  "6a6a819cd72c8e24e79b288d": "🍗 Meat",
  "6a6a81b0d72c8e24e79b288e": "🍚 Grocery",
};
  return (
  <div className="products-page">
    <h1 className="products-title">
  {selectedCategory
    ? `${selectedCategory} Products`
    : "Fresh Groceries"}
</h1>

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
            <div className="category-badge">
            {categoryNames[product.category] || "Category"}
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
