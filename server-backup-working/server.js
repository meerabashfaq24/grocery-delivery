const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const protect = require("./middleware/authMiddleware");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cartRoutes = require("./routes/cartRoutes");
connectDB();
const orderRoutes = require("./routes/orderRoutes");
const { stripeWebhook } = require("./controllers/orderController");

const app = express();

app.use(cors());

app.post(
  "/api/orders/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// Home Route
app.get("/", (req, res) => {
  res.send("Grocery Delivery API is running...");
});

// Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});