import { Link } from "react-router-dom";

const cards = [
    { label: "Manage Categories", path: "/admin/categories", icon: "🗂️" },
    { label: "Manage Menu Items", path: "/admin/menu", icon: "🍽️" },
    { label: "Manage Orders", path: "/admin/orders", icon: "📦" },
    { label: "Manage Reservations", path: "/admin/reservations", icon: "📅" },
    { label: "Manage Users", path: "/admin/users", icon: "👥" },
];

const AdminDashboard = () => (
    <div className="min-h-screen px-8 py-16 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl text-white mb-2">Admin Dashboard</h1>
        <p className="text-gold tracking-widest text-sm uppercase mb-12">Luxedine Control Panel</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((c) => (
                <Link key={c.path} to={c.path}
                    className="bg-charcoal border border-gold/20 rounded-xl p-8 text-center hover:border-gold transition group">
                    <div className="text-5xl mb-4">{c.icon}</div>
                    <p className="text-white font-semibold group-hover:text-gold transition">{c.label}</p>
                </Link>
            ))}
        </div>
    </div>
);

export default AdminDashboard;