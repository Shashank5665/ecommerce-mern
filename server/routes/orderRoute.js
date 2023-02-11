const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authUser.js");
const {
  placeOrder,
  viewOrder,
  viewMyOrders,
  checkout,
  clearOrders,
} = require("../controllers/orderController.js");

//----------------------------------------------------------------------------------------------------------------------

// Order routes
router.get("/pastOrders", protect, viewMyOrders);
router.post("/checkout", protect, checkout);
router.delete("/clearOrderList", protect, clearOrders);
router.get("/:id", protect, viewOrder);
router.post("/add", protect, placeOrder);
//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
