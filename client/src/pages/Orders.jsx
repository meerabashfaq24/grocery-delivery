import { useEffect, useState } from "react";
import api from "../services/api";
import "./Products.css";

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
    <div className="products-page">

      <h1 className="products-title">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          No Orders Yet
        </p>
      ) : (
        <div className="products-grid">

          {orders.map((order) => (

            <div
              key={order._id}
              className="product-card"
            >

              <div className="product-content">

                <h2 className="product-name">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="stock">
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        order.status === "Delivered"
                          ? "green"
                          : "#ff9800",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="stock">
                  <strong>Items:</strong> {order.products.length}
                </p>

                <p className="price">
                  Total: ${order.totalPrice}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}