const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  placeOrderStripe,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);
router.post("/stripe", protect, placeOrderStripe);
module.exports = router;