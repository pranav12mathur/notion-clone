import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

export default function Sidebar({ onNewNote }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await API.get("/notes");
                setNotes(data.slice(0, 8)); // Show last 8
            } catch { }
        };
        fetch();
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col py-6 px-4">
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 mb-8">
                <span className="font-display text-xl text-ink">✦ Notevo</span>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 px-2 mb-6">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-medium text-ink truncate w-36">{user?.name}</p>
                    <p className="text-xs text-muted truncate w-36">{user?.email}</p>
                </div>
            </div>

            {/* New Note Button */}
            <button
                onClick={onNewNote}
                className="flex items-center gap-2 text-sm text-ink hover:text-accent px-2 py-2 rounded-lg hover:bg-border transition-colors mb-4"
            >
                <span className="text-lg">+</span> New Page
            </button>

            {/* Dashboard Link */}
            <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-ink hover:text-accent px-2 py-2 rounded-lg hover:bg-border transition-colors mb-4"
            >
                🏠 All Notes
            </Link>

            {/* Recent notes */}
            <div className="flex-1 overflow-y-auto">
                <p className="text-xs text-muted uppercase tracking-widest px-2 mb-2">Recent</p>
                {notes.map((note) => (
                    <Link
                        key={note._id}
                        to={`/note/${note._id}`}
                        className="flex items-center gap-2 text-sm text-ink px-2 py-1.5 rounded-lg hover:bg-border transition-colors truncate"
                    >
                        <span>{note.emoji}</span>
                        <span className="truncate">{note.title || "Untitled"}</span>
                    </Link>
                ))}
            </div>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent px-2 py-2 rounded-lg hover:bg-border transition-colors mt-4"
            >
                🚪 Log out
            </button>
        </aside>
    );
}