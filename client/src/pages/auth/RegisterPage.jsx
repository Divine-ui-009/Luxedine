import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const RegisterPage = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await API.post("/users/register", form);
            setSuccess("Account created! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-10 w-full max-w-md">
                <h1 className="font-serif text-4xl text-white text-center mb-2">Create Account</h1>
                <p className="text-gray-400 text-center text-sm mb-8">Join Luxedine today</p>
                {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center mb-4">{success}</p>}
                <div className="mb-5">
                    <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
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
                    Create Account
                </button>
                <p className="text-gray-400 text-sm text-center mt-6">
                    Already have an account? <Link to="/login" className="text-gold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;