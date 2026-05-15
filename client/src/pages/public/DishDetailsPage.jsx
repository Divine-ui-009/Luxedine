import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const DishDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        API.get(`/menu/${id}`).then((res) => setItem(res.data.menuItem));
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) return navigate("/login");
        try {
            await API.post("/cart/add", { menuItemId: id, quantity });
            setMsg("✅ Added to cart!");
            setTimeout(() => setMsg(""), 2000);
        } catch {
            setMsg("❌ Failed to add to cart.");
        }
    };

    if (!item) return <p className="text-center text-gold mt-20">Loading...</p>;

    return (
        <div className="min-h-screen px-8 py-20 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-charcoal rounded-2xl overflow-hidden border border-gold/20">
                <img
                    src={item.image || "https://via.placeholder.com/600x500?text=No+Image"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
                <div className="p-10 flex flex-col justify-center">
                    <p className="text-gold text-sm tracking-widest uppercase mb-2">{item.category?.name}</p>
                    <h1 className="font-serif text-4xl text-white font-bold mb-4">{item.name}</h1>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <p className="text-gold text-3xl font-bold mb-8">${item.price?.toFixed(2)}</p>
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-dark text-white px-4 py-2 rounded-lg text-xl border border-gold/30">−</button>
                        <span className="text-white text-xl font-semibold">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="bg-dark text-white px-4 py-2 rounded-lg text-xl border border-gold/30">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-gold text-dark py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition"
                    >
                        Add to Cart
                    </button>
                    {msg && <p className="mt-4 text-sm">{msg}</p>}
                </div>
            </div>
        </div>
    );
};

export default DishDetailsPage;