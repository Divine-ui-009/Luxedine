import { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);

    const fetch = () => API.get("/reservations").then((res) => setReservations(res.data.reservations));
    useEffect(() => { fetch(); }, []);

    const updateStatus = async (id, status) => { await API.put(`/reservations/${id}`, { status }); fetch(); };

    return (
        <div className="min-h-screen px-8 py-16 max-w-5xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Manage Reservations</h1>
            <div className="space-y-4">
                {reservations.map((r) => (
                    <div key={r._id} className="bg-charcoal border border-gold/20 rounded-xl p-6 flex justify-between items-center">
                        <div>
                            <p className="text-white font-semibold">{r.user?.name} — {r.user?.email}</p>
                            <p className="text-gray-400 text-sm">{r.date} at {r.time} · {r.guests} guests</p>
                            {r.specialRequests && <p className="text-gray-500 text-xs mt-1">"{r.specialRequests}"</p>}
                        </div>
                        <select value={r.status} onChange={(e) => updateStatus(r._id, e.target.value)}
                            className="bg-dark border border-gold/30 text-white px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:border-gold">
                            {["pending", "confirmed", "cancelled"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReservations;