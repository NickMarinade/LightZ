const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
