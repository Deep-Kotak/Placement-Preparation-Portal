const express = require("express");
const router = express.Router();

const {
    registerStudent,
    loginStudent,
    dashboard
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerStudent);
router.post("/login", loginStudent);

// Dashboard Route
router.get("/dashboard", verifyToken, dashboard);

module.exports = router;