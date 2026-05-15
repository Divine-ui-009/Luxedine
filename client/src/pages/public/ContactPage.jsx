import { useState } from "react";

const ContactPage = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen px-8 py-20 max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl text-white text-center mb-4">Contact Us</h1>
            <p className="text-gold text-center tracking-widest text-sm uppercase mb-12">We'd Love to Hear From You</p>
            {sent ? (
                <p className="text-center text-green-400 text-lg">✅ Message sent! We'll get back to you soon.</p>
            ) : (
                <div className="bg-charcoal border border-gold/20 rounded-2xl p-10">
                    <div className="mb-6">
                        <label className="text-gray-300 text-sm mb-1 block">Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-300 text-sm mb-1 block">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <div className="mb-8">
                        <label className="text-gray-300 text-sm mb-1 block">Message</label>
                        <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full bg-dark border border-gold/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold" />
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-gold text-dark py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition">
                        Send Message
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContactPage;