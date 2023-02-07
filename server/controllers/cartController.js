const Cart = require("../models/cartModel.js");

// View cart
const viewMyCart = async (req, res) => {
  //view the cart of the logged in user
  try {
    const { _id } = req.user;
    const cart = await Cart.findOne({ user: _id }).populate(
      "products.productId"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToMyCart = async (req, res) => {
  try {
    const { _id } = req.user;

    // get the product id and quantity from the request body
    const { productId, quantity } = req.body;

    // find the user's cart
    const cart = await Cart.findOne({ user: _id });
    console.log(cart);

    // if the cart doesn't exist, create a new one
    if (!cart) {
      const newCart = await Cart.create({
        userId: _id,
        products: [{ productId, quantity }],
      });
      res.status(201).json(newCart);
    } else {
      // check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId.toString()
      );

      // if the product already exists, update its quantity
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += parseInt(quantity); // convert the quantity to an integer
        await cart.save();
        res.json(cart);
      } else {
        // if the product doesn't exist, add it to the cart
        cart.products.push({ productId, quantity });
        await cart.save();
        res.json(cart);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove all items of a product from cart
const removeFromMyCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      userId: req.user._id,
      product: req.params.id,
    });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Remove one item from cart
const removeOneFromMyCart = async (req, res) => {
  try {
    const { _id } = req.user;

    //get the product id from the params
    const productId = req.params.id;

    // find the user's cart
    const cart = await Cart.findOne({ user: _id });

    // if the cart doesn't exist, return an error
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }

    // check if the product exists in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId.toString()
    );

    // if the product doesn't exist, return an error
    if (productIndex === -1) {
      res.status(400).json({ message: "Product not found in cart" });
      return;
    }

    // if the product's quantity is 1, remove the product from the cart
    if (cart.products[productIndex].quantity === 1) {
      cart.products.splice(productIndex, 1);
    } else {
      // if the product's quantity is greater than 1, decrement its quantity by 1
      cart.products[productIndex].quantity -= 1;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  viewMyCart,
  addToMyCart,
  removeFromMyCart,
  removeOneFromMyCart,
};
