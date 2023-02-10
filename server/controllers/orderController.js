const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

//--------------------------------------------------------------------------------------------------------

// const placeOrder = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     const { productId } = req.body;
//     const order = await User.findByIdAndUpdate(
//       _id,
//       {
//         $push: { orders: { productId } },
//         $pull: { cart: { productId } },
//       },
//       { new: true }
//     );
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const placeOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    const totalPrice = product.price * quantity;
    const order = await User.findByIdAndUpdate(
      _id,
      {
        $push: { orders: { productId, totalPrice } },
        $pull: { cart: { productId } },
      },
      { new: true }
    );
    order.totalPrice = totalPrice;
    res.json({ product, totalPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------------------------------------------------------------------------

const viewOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------------------------------------------------------------------------

const viewMyOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    let data = await User.findById(_id).populate("orders.productId");
    res.json(data.orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------------------------------------------------------------------------

module.exports = {
  placeOrder,
  viewOrder,
  viewMyOrders,
};
