import { Link } from "react-router-dom";

const LandingPage = () => (
    <div>
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-dark via-charcoal to-dark">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Welcome to</p>
            <h1 className="font-serif text-6xl md:text-8xl text-white font-bold mb-6">LUXEDINE</h1>
            <p className="text-gray-400 text-xl mb-10 max-w-xl">Where Luxury Meets Flavor. Experience world-class cuisine crafted for the finest palates.</p>
            <div className="flex gap-4">
                <Link to="/menu" className="bg-gold text-dark px-8 py-3 rounded font-semibold text-lg hover:bg-yellow-400 transition">
                    Explore Menu
                </Link>
                <Link to="/register" className="border border-gold text-gold px-8 py-3 rounded font-semibold text-lg hover:bg-gold hover:text-dark transition">
                    Get Started
                </Link>
            </div>
        </section>

        {/* Features */}
        <section className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
                { icon: "🍽️", title: "Premium Dishes", desc: "Crafted by world-class chefs using the finest ingredients." },
                { icon: "🚀", title: "Fast Delivery", desc: "Hot and fresh meals delivered to your door in minutes." },
                { icon: "📅", title: "Easy Reservations", desc: "Book your table in seconds for a perfect dining experience." },
            ].map((f) => (
                <div key={f.title} className="bg-charcoal p-8 rounded-xl border border-gold/20">
                    <div className="text-5xl mb-4">{f.icon}</div>
                    <h3 className="font-serif text-xl text-gold mb-2">{f.title}</h3>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
            ))}
        </section>

        {/* CTA */}
        <section className="py-20 bg-charcoal text-center px-6">
            <h2 className="font-serif text-4xl text-white mb-4">Ready to Dine in Luxury?</h2>
            <p className="text-gray-400 mb-8">Join thousands of food lovers who trust Luxedine.</p>
            <Link to="/reservations" className="bg-gold text-dark px-10 py-3 rounded font-semibold text-lg hover:bg-yellow-400 transition">
                Reserve a Table
            </Link>
        </section>
    </div>
);

export default LandingPage;