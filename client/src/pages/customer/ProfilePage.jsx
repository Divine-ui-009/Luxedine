import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

const ProfilePage = () => {
    const { user, login, token } = useAuth();
    const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
    const [msg, setMsg] = useState("");

    const handleUpdate = async () => {
        try {
            const res = await API.put(`/users/${user._id}`, form);
            login(res.data.user, token);
            setMsg("✅ Profile updated!");
            setTimeout(() => setMsg(""), 3000);
        } catch {
            setMsg("❌ Update failed.");
        }
    };

    return (
        <div className="min-h-screen px-8 py-16 max-w-xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">My Profile</h1>
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-8">
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-dark text-3xl font-bold mx-auto mb-6">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="mb-5">
                    <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <div className="mb-8">
                    <label className="text-gray-300 text-sm mb-1 block">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                {msg && <p className="text-sm mb-4">{msg}</p>}
                <button onClick={handleUpdate} className="w-full bg-gold text-dark py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;