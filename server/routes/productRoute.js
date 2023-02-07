const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController.js");
//----------------------------------------------------------------------------------------------------------------------

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
