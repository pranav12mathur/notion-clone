import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";

const EMOJIS = ["📄", "💡", "📚", "🎯", "🔥", "✨", "🧠", "📝", "🚀", "🎨"];

export default function NotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [saving, setSaving] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await API.get(`/notes/${id}`);
                setNote(data);
            } catch {
                toast.error("Note not found");
                navigate("/dashboard");
            }
        };
        fetch();
    }, [id]);

    // Auto-save with debounce
    useEffect(() => {
        if (!note) return;
        const timer = setTimeout(async () => {
            setSaving(true);
            try {
                await API.put(`/notes/${id}`, {
                    title: note.title,
                    content: note.content,
                    emoji: note.emoji,
                });
            } catch {
                toast.error("Save failed");
            } finally {
                setSaving(false);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [note?.title, note?.content, note?.emoji]);

    const createNote = async () => {
        try {
            const { data } = await API.post("/notes", { title: "Untitled", content: "", emoji: "📄" });
            navigate(`/note/${data._id}`);
        } catch {
            toast.error("Could not create note");
        }
    };

    if (!note) return (
        <div className="flex min-h-screen bg-cream items-center justify-center">
            <p className="text-muted text-sm">Loading...</p>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-cream">
            <Sidebar onNewNote={createNote} />

            <main className="flex-1 ml-64 max-w-3xl mx-auto px-8 py-12 fade-in">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8 text-xs text-muted">
                    <button onClick={() => navigate("/dashboard")} className="hover:text-ink transition-colors">
                        ← Back to workspace
                    </button>
                    <span>{saving ? "Saving..." : "All changes saved"}</span>
                </div>

                {/* Emoji picker */}
                <div className="relative mb-4">
                    <button
                        onClick={() => setShowEmoji(!showEmoji)}
                        className="text-5xl hover:scale-110 transition-transform"
                    >
                        {note.emoji}
                    </button>
                    {showEmoji && (
                        <div className="absolute top-14 left-0 bg-white border border-border rounded-2xl p-3 shadow-lg flex gap-2 flex-wrap w-64 z-10">
                            {EMOJIS.map((e) => (
                                <button
                                    key={e}
                                    onClick={() => { setNote({ ...note, emoji: e }); setShowEmoji(false); }}
                                    className="text-2xl hover:scale-125 transition-transform p-1"
                                >
                                    {e}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title */}
                <input
                    type="text"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    className="w-full font-display text-4xl text-ink bg-transparent border-none outline-none mb-6 placeholder-border"
                    placeholder="Untitled"
                />

                <div className="border-t border-border mb-6" />

                {/* Content */}
                <textarea
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    className="note-editor min-h-[60vh]"
                    placeholder="Start writing... your thoughts, ideas, plans."
                />
            </main>
        </div>
    );
}