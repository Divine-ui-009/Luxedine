const AboutPage = () => (
    <div className="min-h-screen px-8 py-20 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl text-white text-center mb-4">About Luxedine</h1>
        <p className="text-gold text-center tracking-widest text-sm uppercase mb-16">Our Story</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="font-serif text-3xl text-white mb-4">A Passion for Perfection</h2>
                <p className="text-gray-400 mb-4">Luxedine was founded with a singular vision — to bring the finest dining experience to every table. Our chefs combine traditional techniques with modern innovation to create dishes that are both timeless and exciting.</p>
                <p className="text-gray-400 mb-4">Every ingredient is sourced from trusted local farms and premium international suppliers. We believe great food starts long before it reaches the kitchen.</p>
                <p className="text-gray-400">From intimate dinners to grand celebrations, Luxedine is your destination for unforgettable culinary moments.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { num: "15+", label: "Years of Excellence" },
                    { num: "50+", label: "Signature Dishes" },
                    { num: "10K+", label: "Happy Customers" },
                    { num: "8", label: "Award Wins" },
                ].map((s) => (
                    <div key={s.label} className="bg-charcoal border border-gold/20 rounded-xl p-6 text-center">
                        <p className="text-gold font-serif text-4xl font-bold">{s.num}</p>
                        <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default AboutPage;