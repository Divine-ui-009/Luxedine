import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post("/users/login", form);
            login(res.data.user, res.data.token);
            navigate(res.data.user.role === "admin" ? "/admin" : "/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-10 w-full max-w-md">
                <h1 className="font-serif text-4xl text-white text-center mb-2">Welcome Back</h1>
                <p className="text-gray-400 text-center text-sm mb-8">Sign in to your Luxedine account</p>
                {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                <div className="mb-5">
                    <label className="text-gray-300 text-sm mb-1 block">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <div className="mb-8">
                    <label className="text-gray-300 text-sm mb-1 block">Password</label>
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <button onClick={handleSubmit} className="w-full bg-gold text-dark py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition">
                    Login
                </button>
                <p className="text-gray-400 text-sm text-center mt-6">
                    Don't have an account? <Link to="/register" className="text-gold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;