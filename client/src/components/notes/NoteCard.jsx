import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, onDelete, onFavorite }) {
    const navigate = useNavigate();

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return (
        <div
            onClick={() => navigate(`/note/${note._id}`)}
            className="bg-white border border-border rounded-2xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 fade-in group"
        >
            <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{note.emoji}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onFavorite(note._id); }}
                        className={`text-sm px-2 py-1 rounded-lg transition-colors ${note.isFavorite ? "text-yellow-500" : "text-muted hover:text-yellow-400"}`}
                    >
                        ★
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
                        className="text-sm px-2 py-1 rounded-lg text-muted hover:text-red-400 transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <h3 className="font-medium text-ink text-sm mb-1 truncate">
                {note.title || "Untitled"}
            </h3>
            <p className="text-muted text-xs line-clamp-2 mb-3 leading-relaxed">
                {note.content || "No content yet..."}
            </p>
            <p className="text-xs text-muted/60">{formatDate(note.updatedAt)}</p>
        </div>
    );
}