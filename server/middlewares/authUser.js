const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401);
        res.json({ message: "Not authorized, no token" });
      }
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);

      const user = await User.findOne({ email: decoded.email });
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      res.json({ message: "Not authorized, token failed" });
    }
  }
};

module.exports = { protect };
