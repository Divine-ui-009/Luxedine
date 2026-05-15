import { useState, useEffect } from "react";
import API from "../../api/axios";

const statusColors = {
    pending: "text-yellow-400",
    confirmed: "text-blue-400",
    preparing: "text-orange-400",
    delivered: "text-green-400",
    cancelled: "text-red-400",
};

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => { API.get("/orders/my-orders").then((res) => setOrders(res.data.orders)); }, []);

    return (
        <div className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Order History</h1>
            {orders.length === 0 ? (
                <p className="text-gray-400 text-center">No orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-charcoal border border-gold/20 rounded-xl p-6">
                            <div className="flex justify-between mb-4">
                                <p className="text-white font-semibold text-sm">Order #{order._id.slice(-6).toUpperCase()}</p>
                                <p className={`text-sm font-semibold capitalize ${statusColors[order.status]}`}>{order.status}</p>
                            </div>
                            {order.items.map((item) => (
                                <div key={item._id} className="flex justify-between text-gray-400 text-sm mb-1">
                                    <span>{item.menuItem?.name} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-gold/20 mt-4 pt-3 flex justify-between">
                                <span className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="text-gold font-bold">${order.total?.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;