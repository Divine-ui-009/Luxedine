import { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageMenuItems = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "", featured: false, available: true });
    const [editId, setEditId] = useState(null);
    const [msg, setMsg] = useState("");

    const fetchItems = () => API.get("/menu").then((res) => setItems(res.data.menuItems));
    useEffect(() => {
        fetchItems();
        API.get("/categories").then((res) => setCategories(res.data.categories));
    }, []);

    const handleSubmit = async () => {
        try {
            if (editId) {
                await API.put(`/menu/${editId}`, form);
                setMsg("✅ Item updated!");
            } else {
                await API.post("/menu", form);
                setMsg("✅ Item created!");
            }
            setForm({ name: "", description: "", price: "", image: "", category: "", featured: false, available: true });
            setEditId(null);
            fetchItems();
            setTimeout(() => setMsg(""), 2000);
        } catch (err) {
            setMsg("❌ " + (err.response?.data?.message || "Error"));
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setForm({ name: item.name, description: item.description, price: item.price, image: item.image, category: item.category?._id, featured: item.featured, available: item.available });
    };

    const handleDelete = async (id) => { await API.delete(`/menu/${id}`); fetchItems(); };

    return (
        <div className="min-h-screen px-8 py-16 max-w-5xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Manage Menu Items</h1>
            <div className="bg-charcoal border border-gold/20 rounded-2xl p-8 mb-10">
                <h2 className="text-white font-semibold mb-4">{editId ? "Edit Item" : "Add Item"}</h2>
                {msg && <p className="text-sm mb-3">{msg}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold">
                        <option value="">Select Category</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold md:col-span-2" rows={3} />
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-gold" />
                        Featured
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                        <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-gold" />
                        Available
                    </label>
                </div>
                <button onClick={handleSubmit} className="bg-gold text-dark px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                    {editId ? "Update" : "Add Item"}
                </button>
                {editId && <button onClick={() => { setEditId(null); setForm({ name: "", description: "", price: "", image: "", category: "", featured: false, available: true }); }} className="ml-3 text-gray-400 text-sm hover:text-white">Cancel</button>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                    <div key={item._id} className="bg-charcoal border border-gold/20 rounded-xl p-5 flex gap-4">
                        <img src={item.image || "https://via.placeholder.com/80"} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                            <p className="text-white font-semibold">{item.name}</p>
                            <p className="text-gold text-sm">${item.price?.toFixed(2)}</p>
                            <p className="text-gray-400 text-xs">{item.category?.name}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(item)} className="text-gold text-xs hover:underline">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="text-red-400 text-xs hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMenuItems;