const Cart = require("../models/cartModel.js");
const User = require("../models/userModel.js");

// View cart
const viewMyCart = async (req, res) => {
  //send the data of the cart array of the users model to the client
  try {
    const { _id } = req.user;
    const cartItems = await User.findOne({ _id }).populate("cart.productId");
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
  }
};

// const addToMyCart = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     console.log(_id);

//     // get the product id and quantity from the request body
//     const { productId, quantity } = req.body;
//     console.table({ productId, quantity });

//     // find the user's cart
//     const cart = await Cart.findOne({ user: _id });
//     console.log(cart);

//     // if the cart doesn't exist, create a new one
//     if (!cart) {
//       const newCart = await Cart.create({
//         userId: _id,
//         products: [{ productId, quantity }],
//       });
//       res.status(201).json(newCart);
//     } else {
//       // check if the product already exists in the cart
//       const productIndex = cart.products.findIndex(
//         (product) => product.productId.toString() === productId.toString()
//       );

//       // if the product already exists, update its quantity
//       if (productIndex !== -1) {
//         cart.products[productIndex].quantity += parseInt(quantity); // convert the quantity to an integer
//         await cart.save();
//         res.json(cart);
//       } else {
//         // if the product doesn't exist, add it to the cart
//         cart.products.push({ productId, quantity });
//         await cart.save();
//         res.json(cart);
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Remove all items of a product from cart
// const removeFromMyCart = async (req, res) => {
//   try {
//     const cartItem = await Cart.findOneAndDelete({
//       userId: req.user._id,
//       product: req.params.id,
//     });
//     res.json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const addToMyCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    // Check if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the product is already in the cart, update its quantity
    if (existingProductIndex > -1) {
      user.cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
      // If the product is not in the cart, add it as a new item
      user.cart.push({ productId, quantity });
    }

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.status(200).json({ success: true, data: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeOneFromMyCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;

    // Find the product in the cart
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the product is not in the cart, return an error
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // If the product is in the cart, remove one from its quantity
    user.cart[productIndex].quantity--;

    // If the quantity is 0, remove the product from the cart
    if (user.cart[productIndex].quantity === 0) {
      user.cart.splice(productIndex, 1);
    }

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.status(200).json({ success: true, data: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  viewMyCart,
  addToMyCart,
  removeOneFromMyCart,
};
