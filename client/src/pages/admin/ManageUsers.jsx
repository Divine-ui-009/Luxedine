import { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const fetch = () => API.get("/users/all").then((res) => setUsers(res.data.users)).catch(() => {});
    useEffect(() => { fetch(); }, []);

    const handleDelete = async (id) => { await API.delete(`/users/${id}`); fetch(); };

    return (
        <div className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-white mb-10">Manage Users</h1>
            <div className="space-y-4">
                {users.map((u) => (
                    <div key={u._id} className="bg-charcoal border border-gold/20 rounded-xl p-5 flex justify-between items-center">
                        <div>
                            <p className="text-white font-semibold">{u.name}</p>
                            <p className="text-gray-400 text-sm">{u.email}</p>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-gold/20 text-gold" : "bg-gray-700 text-gray-300"}`}>
                                {u.role}
                            </span>
                        </div>
                        <button onClick={() => handleDelete(u._id)} className="text-red-400 text-sm hover:underline">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;