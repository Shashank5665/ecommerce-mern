const express = require("express");
const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------

router.post("/", signupUser);
router.get("/viewProfile", authorize, viewProfile);
router.post("/login", authorize, loginUser);

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;
