import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Products.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
      alert("Item Removed");
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const products = cart.map((item) => ({
        product: item.product?._id,
        quantity: item.quantity,
      }));

      const totalPrice = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      await api.post("/orders", {
        user: user?._id,
        products,
        totalPrice,
      });

      alert("Order Placed Successfully!");
      navigate("/orders");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="products-page">

      <h1 className="products-title">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="products-grid">

            {cart.map((item) => (

              <div
                key={item._id}
                className="product-card"
              >

                <img
                  src={
                    item.product.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
                  }
                  className="product-image"
                />

                <div className="product-content">

                  <div className="product-name">
                    {item.product?.name}
                  </div>

                  <div className="stock">
                    Quantity: {item.quantity}
                  </div>

                  <div className="price">
                    ${item.product?.price}
                  </div>

                  <button
                    className="add-btn"
                    onClick={() => removeItem(item._id)}
                    style={{ background: "#d32f2f" }}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <button
              className="add-btn"
              style={{
                maxWidth: "300px",
                marginTop: "20px",
              }}
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>

        </>
      )}

    </div>
  );
}