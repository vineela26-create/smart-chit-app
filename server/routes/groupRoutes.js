const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Protected Route Example
router.post("/create", authMiddleware, (req, res) => {
  res.json({ message: `Group created by user ${req.user.id}` });
});

module.exports = router;
