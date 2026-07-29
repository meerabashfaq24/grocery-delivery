import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

console.log("Logged User:", user);
console.log("CART:", cart);
      const products = cart.map((item) => {
  console.log("CART ITEM:", item);
  
  return {
    product: item.product?._id,
    quantity: item.quantity,
  };
});

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
  console.log(error.response?.data);
  alert(error.response?.data?.message || error.message);
}
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
               border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{item.product?.name}</h3>

              <p>Quantity: {item.quantity}</p>

              <p>Price: ${item.product?.price}</p>

             <button
  onClick={() => removeItem(item._id)}
  style={{
    background: "#d32f2f",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  }}
>
  Remove
</button>
            </div>
          ))}

          <button
            onClick={placeOrder}
            style={{
             background: "#2e7d32",
  color: "white",
  padding: "12px 22px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "20px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}