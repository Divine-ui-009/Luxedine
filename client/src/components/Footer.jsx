const Footer = () => (
    <footer className="bg-charcoal border-t border-gold/20 py-10 px-8 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h2 className="font-serif text-gold text-2xl font-bold mb-3">LUXEDINE</h2>
                <p className="text-gray-400 text-sm">Where Luxury Meets Flavor. Experience the finest dining from the comfort of your home.</p>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/menu" className="hover:text-gold">Menu</a></li>
                    <li><a href="/reservations" className="hover:text-gold">Reservations</a></li>
                    <li><a href="/about" className="hover:text-gold">About</a></li>
                    <li><a href="/contact" className="hover:text-gold">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-3">Contact</h3>
                <p className="text-gray-400 text-sm">123 Fine Dining Street<br />New York, NY 10001<br />info@luxedine.com<br />+1 (555) 123-4567</p>
            </div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-10">© 2024 Luxedine. All rights reserved.</p>
    </footer>
);

export default Footer;