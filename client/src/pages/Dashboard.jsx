import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import NoteCard from "../components/notes/NoteCard";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchNotes = async () => {
        try {
            const { data } = await API.get("/notes");
            setNotes(data);
        } catch {
            toast.error("Failed to load notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNotes(); }, []);

    const createNote = async () => {
        try {
            const { data } = await API.post("/notes", {
                title: "Untitled",
                content: "",
                emoji: "📄",
            });
            navigate(`/note/${data._id}`);
        } catch {
            toast.error("Could not create note");
        }
    };

    const deleteNote = async (id) => {
        try {
            await API.delete(`/notes/${id}`);
            setNotes(notes.filter((n) => n._id !== id));
            toast.success("Note deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    const toggleFavorite = async (id) => {
        try {
            const { data } = await API.patch(`/notes/${id}/favorite`);
            setNotes(notes.map((n) => (n._id === id ? data : n)));
        } catch {
            toast.error("Failed to update");
        }
    };

    const filtered = notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    const favorites = filtered.filter((n) => n.isFavorite);
    const rest = filtered.filter((n) => !n.isFavorite);

    return (
        <div className="flex min-h-screen bg-cream">
            <Sidebar onNewNote={createNote} />

            <main className="flex-1 p-8 ml-64">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display text-3xl text-ink">
                            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},{" "}
                            <span className="text-accent">{user?.name?.split(" ")[0]}</span>
                        </h1>
                        <p className="text-muted text-sm mt-1">{notes.length} note{notes.length !== 1 ? "s" : ""} in your workspace</p>
                    </div>
                    <button
                        onClick={createNote}
                        className="bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
                    >
                        + New Note
                    </button>
                </div>

                {/* Search */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search notes..."
                    className="w-full max-w-md border border-border bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ink mb-8 transition-colors"
                />

                {loading ? (
                    <div className="text-muted text-sm">Loading notes...</div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-24 fade-in">
                        <div className="text-5xl mb-4">✦</div>
                        <p className="text-ink font-medium mb-2">Your workspace is empty</p>
                        <p className="text-muted text-sm mb-6">Start by creating your first note</p>
                        <button onClick={createNote} className="bg-accent text-white px-6 py-2.5 rounded-full text-sm hover:bg-ink transition-colors">
                            Create a note
                        </button>
                    </div>
                ) : (
                    <>
                        {favorites.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-xs uppercase tracking-widest text-muted mb-4">⭐ Favorites</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {favorites.map((note) => (
                                        <NoteCard key={note._id} note={note} onDelete={deleteNote} onFavorite={toggleFavorite} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {rest.length > 0 && (
                            <section>
                                <h2 className="text-xs uppercase tracking-widest text-muted mb-4">All Notes</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rest.map((note) => (
                                        <NoteCard key={note._id} note={note} onDelete={deleteNote} onFavorite={toggleFavorite} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}