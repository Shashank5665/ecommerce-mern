const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken.js");

//---------------------------------------------------------------------------------------------------------------------

const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      //   pic: user.pic,
      token: generateToken(user.email),
    });
  } else {
    res.status(500).json({ message: "Failed to create the user" });
  }
};
//----------------------------------------------------------------------------------------------------------------------

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      //   pic: user.pic,
      token: generateToken(user.email),
    });
  } else {
    res.status(401).json("Invalid email or password");
  }
};
//----------------------------------------------------------------------------------------------------------------------

const logoutUser = async (req, res, next) => {
  try {
    localStorage.clear();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

module.exports = { signupUser, loginUser, logoutUser };
