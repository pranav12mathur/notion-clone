import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await API.post("/auth/signup", form);
            login(data);
            toast.success("Account created! Welcome 🎉");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
            <div className="w-full max-w-md fade-in">
                <div className="text-center mb-10">
                    <Link to="/" className="font-display text-3xl text-ink">✦ Notevo</Link>
                    <p className="text-muted text-sm mt-2">Create your workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 shadow-sm">
                    <div className="mb-5">
                        <label className="block text-xs text-muted mb-2 uppercase tracking-wider">Name</label>
                        <input
                            type="text" name="name" value={form.name}
                            onChange={handleChange} required
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-surface focus:outline-none focus:border-ink transition-colors"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-xs text-muted mb-2 uppercase tracking-wider">Email</label>
                        <input
                            type="email" name="email" value={form.email}
                            onChange={handleChange} required
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-surface focus:outline-none focus:border-ink transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-xs text-muted mb-2 uppercase tracking-wider">Password</label>
                        <input
                            type="password" name="password" value={form.password}
                            onChange={handleChange} required minLength={6}
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-surface focus:outline-none focus:border-ink transition-colors"
                            placeholder="Min 6 characters"
                        />
                    </div>
                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-ink text-cream py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create account →"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-ink font-medium hover:text-accent">Sign in</Link>
                </p>
            </div>
        </div>
    );
}