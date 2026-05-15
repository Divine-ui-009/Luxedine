import { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => API.get("/orders").then((res) => setOrders(res.data.orders));
    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        await API.put(`/orders/${id}`, { status });
        fetchOrders();
    };

    return (
        <div className="min-h-screen px-8 py-16 max-w-5xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Manage Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-charcoal border border-gold/20 rounded-xl p-6">
                        <div className="flex justify-between mb-3">
                            <div>
                                <p className="text-white font-semibold">Order #{order._id.slice(-6).toUpperCase()}</p>
                                <p className="text-gray-400 text-sm">{order.user?.name} — {order.user?.email}</p>
                            </div>
                            <p className="text-gold font-bold">${order.total?.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-gray-400 text-sm">Status:</span>
                            <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}
                                className="bg-dark border border-gold/30 text-white px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:border-gold">
                                {["pending", "confirmed", "preparing", "delivered", "cancelled"].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;