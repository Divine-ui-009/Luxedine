import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const CartPage = () => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const navigate = useNavigate();

    const fetchCart = () => API.get("/cart").then((res) => setCart(res.data.cart));
    useEffect(() => { fetchCart(); }, []);

    const updateQty = async (menuItemId, quantity) => {
        await API.put("/cart/update", { menuItemId, quantity });
        fetchCart();
    };

    const clearCart = async () => {
        await API.delete("/cart/clear");
        fetchCart();
    };

    return (
        <div className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Your Cart</h1>
            {cart.items.length === 0 ? (
                <p className="text-gray-400 text-center text-lg">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4 mb-10">
                        {cart.items.map((item) => (
                            <div key={item._id} className="bg-charcoal border border-gold/20 rounded-xl p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={item.menuItem?.image || "https://via.placeholder.com/80"} alt={item.menuItem?.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <p className="text-white font-semibold">{item.menuItem?.name}</p>
                                        <p className="text-gold text-sm">${item.price?.toFixed(2)} each</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => updateQty(item.menuItem._id, item.quantity - 1)} className="bg-dark text-white px-3 py-1 rounded border border-gold/30">−</button>
                                    <span className="text-white">{item.quantity}</span>
                                    <button onClick={() => updateQty(item.menuItem._id, item.quantity + 1)} className="bg-dark text-white px-3 py-1 rounded border border-gold/30">+</button>
                                </div>
                                <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-charcoal border border-gold/20 rounded-xl p-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">Total</p>
                            <p className="text-gold text-3xl font-bold">${cart.total?.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={clearCart} className="border border-red-400 text-red-400 px-6 py-2 rounded-lg hover:bg-red-400 hover:text-white transition">Clear Cart</button>
                            <button onClick={() => navigate("/checkout")} className="bg-gold text-dark px-8 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;