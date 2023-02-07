const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authUser.js");
const {
  placeOrder,
  viewOrder,
  viewAllOrders,
} = require("../controllers/orderController.js");

//----------------------------------------------------------------------------------------------------------------------

// Order routes
router.post("/orders", protect, placeOrder);
router.get("/orders/:id", protect, viewOrder);
router.get("/orders", protect, viewAllOrders);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
