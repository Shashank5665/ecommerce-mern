const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authUser.js");

//----------------------------------------------------------------------------------------------------------------------

router.get("/verify", protect);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
