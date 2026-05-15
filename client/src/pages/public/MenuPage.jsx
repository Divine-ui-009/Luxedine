import { useState, useEffect } from "react";
import API from "../../api/axios";
import MenuCard from "../../components/MenuCard";

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/categories").then((res) => setCategories(res.data.categories));
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);

        API.get(`/menu?${params.toString()}`)
            .then((res) => setItems(res.data.menuItems))
            .finally(() => setLoading(false));
    }, [selectedCategory, search, sort]);

    return (
        <div className="min-h-screen px-8 py-16 max-w-7xl mx-auto">
            <h1 className="font-serif text-5xl text-white text-center mb-2">Our Menu</h1>
            <p className="text-gold text-center mb-12 tracking-widest text-sm uppercase">Crafted with Passion</p>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center">
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-charcoal border border-gold/30 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:border-gold"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-charcoal border border-gold/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gold"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-charcoal border border-gold/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gold"
                >
                    <option value="">Sort By</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <p className="text-center text-gold text-lg">Loading menu...</p>
            ) : items.length === 0 ? (
                <p className="text-center text-gray-400">No dishes found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => <MenuCard key={item._id} item={item} />)}
                </div>
            )}
        </div>
    );
};

export default MenuPage;