import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const CheckoutPage = () => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [address, setAddress] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => { API.get("/cart").then((res) => setCart(res.data.cart)); }, []);

    const handleOrder = async () => {
        try {
            await API.post("/orders", { deliveryAddress: address });
            setMsg("✅ Order placed successfully!");
            setTimeout(() => navigate("/orders"), 2000);
        } catch {
            setMsg("❌ Failed to place order.");
        }
    };

    return (
        <div className="min-h-screen px-8 py-16 max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Checkout</h1>
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-8 mb-6">
                <h2 className="text-white font-semibold text-lg mb-4">Order Summary</h2>
                {cart.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-gray-300 mb-2 text-sm">
                        <span>{item.menuItem?.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t border-gold/20 mt-4 pt-4 flex justify-between">
                    <span className="text-gold font-bold">Total</span>
                    <span className="text-gold font-bold text-xl">${cart.total?.toFixed(2)}</span>
                </div>
            </div>
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-8">
                <label className="text-gray-300 text-sm mb-2 block">Delivery Address</label>
                <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold mb-6" />
                {msg && <p className="text-sm mb-4">{msg}</p>}
                <button onClick={handleOrder} className="w-full bg-gold text-dark py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;