const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
    try {
        const { date, time, guests, specialRequests } = req.body;
        const reservation = await Reservation.create({
            user: req.user.userId,
            date,
            time,
            guests,
            specialRequests,
        });
        res.status(201).json({ message: "Reservation created", reservation });
    } catch (err) {
        res.status(500).json({ message: "Failed to create reservation: " + err.message });
    }
};

exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.userId }).sort({ date: 1 });
        res.status(200).json({ reservations });
    } catch (err) {
        res.status(500).json({ message: "Failed to get reservations: " + err.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("user", "name email")
            .sort({ date: 1 });
        res.status(200).json({ reservations });
    } catch (err) {
        res.status(500).json({ message: "Failed to get all reservations: " + err.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Reservation not found" });
        res.status(200).json({ message: "Reservation updated", reservation: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update reservation: " + err.message });
    }
};