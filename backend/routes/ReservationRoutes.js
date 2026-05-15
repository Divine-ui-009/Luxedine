const express = require("express");
const router = express.Router();
const { createReservation, getMyReservations, getAllReservations, updateReservation } = require("../controllers/ReservationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.get("/", protect, adminOnly, getAllReservations);
router.put("/:id", protect, adminOnly, updateReservation);

module.exports = router;