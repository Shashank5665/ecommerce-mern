const express = require("express");
const router = express.Router();
const {
  viewMyCart,
  addToMyCart,
  removeFromMyCart,
  removeOneFromMyCart,
} = require("../controllers/cartController.js");
const { protect } = require("../middlewares/authUser.js");

//----------------------------------------------------------------------------------------------------------------------
// Cart routes
router.get("/", protect, viewMyCart);
router.post("/add", protect, addToMyCart);
// router.delete("/remove/:id", protect, removeFromMyCart);
router.delete("/remove/:id", protect, removeOneFromMyCart);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
