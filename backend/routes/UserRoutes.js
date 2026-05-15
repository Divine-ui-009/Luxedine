const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require("../controllers/UserController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUserProfile);
router.put("/:id", protect, updateUserProfile);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;