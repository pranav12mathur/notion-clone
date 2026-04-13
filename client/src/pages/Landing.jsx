import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="min-h-screen bg-cream flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-6 border-b border-border">
                <span className="font-display text-2xl text-ink">✦ Notevo</span>
                <div className="flex gap-4">
                    <Link to="/login" className="text-sm text-ink hover:text-accent transition-colors px-4 py-2">
                        Log in
                    </Link>
                    <Link to="/signup" className="text-sm bg-ink text-cream px-5 py-2 rounded-full hover:bg-accent transition-colors">
                        Get started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
                <div className="inline-block bg-surface border border-border text-xs text-muted px-4 py-1 rounded-full mb-8 tracking-widest uppercase">
                    Your second brain
                </div>
                <h1 className="font-display text-6xl md:text-8xl text-ink leading-tight mb-6 max-w-4xl">
                    Write. Think.<br />
                    <span className="text-accent">Organize.</span>
                </h1>
                <p className="text-muted text-lg max-w-xl mb-12 leading-relaxed">
                    A minimal workspace for your notes, ideas, and everything in between.
                    Clean, fast, and beautifully simple.
                </p>
                <Link
                    to="/signup"
                    className="bg-accent text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-ink transition-colors duration-300 shadow-lg"
                >
                    Start writing for free →
                </Link>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-3 mt-16 text-xs text-muted">
                    {["✓ Rich text editor", "✓ Instant save", "✓ Organize with emoji", "✓ Favorites", "✓ Secure & private"].map(f => (
                        <span key={f} className="bg-surface border border-border px-4 py-2 rounded-full">{f}</span>
                    ))}
                </div>
            </main>

            <footer className="text-center text-xs text-muted pb-8">
                Built with React + Node.js + MongoDB
            </footer>
        </div>
    );
}