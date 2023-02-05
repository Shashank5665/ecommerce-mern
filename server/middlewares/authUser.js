const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authentication);
  if (
    req.headers.authentication &&
    req.headers.authentication.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authentication.split(" ")[1];
      console.log(token);
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = await User.find({ email: decoded.email });
      console.log(user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
