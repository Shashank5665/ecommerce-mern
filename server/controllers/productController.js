const Product = require("../models/productModel");

//----------------------------------------------------------------------------------------------------------------------

const createProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------------

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------------

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
