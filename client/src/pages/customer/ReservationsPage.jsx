import { useState, useEffect } from "react";
import API from "../../api/axios";

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [form, setForm] = useState({ date: "", time: "", guests: 1, specialRequests: "" });
    const [msg, setMsg] = useState("");

    const fetchReservations = () => API.get("/reservations/my").then((res) => setReservations(res.data.reservations));
    useEffect(() => { fetchReservations(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/reservations", form);
            setMsg("✅ Reservation created!");
            setForm({ date: "", time: "", guests: 1, specialRequests: "" });
            fetchReservations();
            setTimeout(() => setMsg(""), 3000);
        } catch {
            setMsg("❌ Failed to create reservation.");
        }
    };

    return (
        <div className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Reservations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Form */}
                <div className="bg-charcoal border border-gold/20 rounded-2xl p-8">
                    <h2 className="text-white font-semibold text-lg mb-6">Book a Table</h2>
                    {msg && <p className="text-sm mb-4">{msg}</p>}
                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-1 block">Date</label>
                        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-1 block">Time</label>
                        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-1 block">Guests</label>
                        <input type="number" min="1" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-300 text-sm mb-1 block">Special Requests</label>
                        <textarea rows={3} value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-gold text-dark py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
                        Book Now
                    </button>
                </div>
                {/* List */}
                <div>
                    <h2 className="text-white font-semibold text-lg mb-6">My Reservations</h2>
                    {reservations.length === 0 ? (
                        <p className="text-gray-400">No reservations yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {reservations.map((r) => (
                                <div key={r._id} className="bg-charcoal border border-gold/20 rounded-xl p-5">
                                    <p className="text-white font-semibold">{r.date} at {r.time}</p>
                                    <p className="text-gray-400 text-sm">{r.guests} guests</p>
                                    {r.specialRequests && <p className="text-gray-500 text-xs mt-1">"{r.specialRequests}"</p>}
                                    <p className={`text-xs mt-2 font-semibold capitalize ${r.status === "confirmed" ? "text-green-400" : r.status === "cancelled" ? "text-red-400" : "text-yellow-400"}`}>
                                        {r.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationsPage;