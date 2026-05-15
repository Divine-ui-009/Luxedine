import { Link } from "react-router-dom";

const MenuCard = ({ item }) => (
    <div className="bg-charcoal rounded-xl overflow-hidden border border-gold/20 hover:border-gold/60 transition group">
        <div className="h-48 overflow-hidden">
            <img
                src={item.image || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
        </div>
        <div className="p-4">
            <h3 className="font-serif text-lg text-white font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between mt-4">
                <span className="text-gold font-bold text-lg">${item.price?.toFixed(2)}</span>
                <Link
                    to={`/menu/${item._id}`}
                    className="bg-gold text-dark text-sm px-4 py-1.5 rounded font-semibold hover:bg-yellow-400 transition"
                >
                    View
                </Link>
            </div>
        </div>
    </div>
);

export default MenuCard;