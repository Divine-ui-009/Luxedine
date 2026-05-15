import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-dark border-b border-gold/30 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link to="/" className="font-serif text-2xl text-gold font-bold tracking-widest">
                LUXEDINE
            </Link>
            <div className="flex items-center gap-8 text-sm font-medium">
                <Link to="/" className="text-gray-300 hover:text-gold transition">Home</Link>
                <Link to="/menu" className="text-gray-300 hover:text-gold transition">Menu</Link>
                <Link to="/about" className="text-gray-300 hover:text-gold transition">About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition">Contact</Link>
                {user ? (
                    <>
                        <Link to="/cart" className="text-gray-300 hover:text-gold transition">Cart</Link>
                        {user.role === "admin" && (
                            <Link to="/admin" className="text-gold font-semibold hover:text-yellow-300 transition">Admin</Link>
                        )}
                        <Link to="/profile" className="text-gray-300 hover:text-gold transition">{user.name}</Link>
                        <button onClick={handleLogout} className="bg-gold text-dark px-4 py-1.5 rounded font-semibold hover:bg-yellow-400 transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-300 hover:text-gold transition">Login</Link>
                        <Link to="/register" className="bg-gold text-dark px-4 py-1.5 rounded font-semibold hover:bg-yellow-400 transition">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;