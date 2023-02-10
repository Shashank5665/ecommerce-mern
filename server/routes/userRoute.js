const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController.js");
const { protect } = require("../middlewares/authUser.js");

//----------------------------------------------------------------------------------------------------------------------

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify", protect, (req, res) => {
  res.json({ message: "User verified" });
});

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
