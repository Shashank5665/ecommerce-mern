const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { products, totalPrice } = req.body;

    const order = new Order({
      user: _id,
      products,
      totalPrice,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

const viewAllOrders = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await Order.find({ user: _id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  viewOrder,
  viewAllOrders,
};
