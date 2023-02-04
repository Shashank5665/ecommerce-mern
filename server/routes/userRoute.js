const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/userController.js");
const { protect } = require("../middlewares/authUser.js");

//----------------------------------------------------------------------------------------------------------------------

router.post("/signup", signupUser);
// router.get("/viewProfile", authorize, viewProfile);
router.post("/login", protect, loginUser);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
