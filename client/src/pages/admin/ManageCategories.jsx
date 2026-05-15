import { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const [editId, setEditId] = useState(null);
    const [msg, setMsg] = useState("");

    const fetch = () => API.get("/categories").then((res) => setCategories(res.data.categories));
    useEffect(() => { fetch(); }, []);

    const handleSubmit = async () => {
        try {
            if (editId) {
                await API.put(`/categories/${editId}`, form);
                setMsg("✅ Category updated!");
            } else {
                await API.post("/categories", form);
                setMsg("✅ Category created!");
            }
            setForm({ name: "", description: "" });
            setEditId(null);
            fetch();
            setTimeout(() => setMsg(""), 2000);
        } catch (err) {
            setMsg("❌ " + (err.response?.data?.message || "Error"));
        }
    };

    const handleEdit = (cat) => { setEditId(cat._id); setForm({ name: cat.name, description: cat.description }); };
    const handleDelete = async (id) => { await API.delete(`/categories/${id}`); fetch(); };

    return (
        <div className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Manage Categories</h1>
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-8 mb-10">
                <h2 className="text-white font-semibold mb-4">{editId ? "Edit Category" : "Add Category"}</h2>
                {msg && <p className="text-sm mb-3">{msg}</p>}
                <div className="mb-4">
                    <input placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold mb-3" />
                    <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <button onClick={handleSubmit} className="bg-gold text-dark px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                    {editId ? "Update" : "Add Category"}
                </button>
                {editId && <button onClick={() => { setEditId(null); setForm({ name: "", description: "" }); }} className="ml-3 text-gray-400 text-sm hover:text-white">Cancel</button>}
            </div>
            <div className="space-y-3">
                {categories.map((c) => (
                    <div key={c._id} className="bg-charcoal border border-gold/20 rounded-xl p-5 flex justify-between items-center">
                        <div>
                            <p className="text-white font-semibold">{c.name}</p>
                            <p className="text-gray-400 text-sm">{c.description}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => handleEdit(c)} className="text-gold text-sm hover:underline">Edit</button>
                            <button onClick={() => handleDelete(c._id)} className="text-red-400 text-sm hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCategories;