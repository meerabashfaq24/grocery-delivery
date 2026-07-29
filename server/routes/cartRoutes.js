const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", getCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;