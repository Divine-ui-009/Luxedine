const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require("../controllers/OrderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;