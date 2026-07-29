import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ${order.totalPrice}
            </p>

            <p>
              <strong>Items:</strong> {order.products.length}
            </p>
          </div>
        ))
      )}
    </div>
  );
}