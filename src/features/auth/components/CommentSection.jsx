import { useState, useEffect } from "react";
import api from "../../../api";

export const CommentSection = ({ bookId }) => {

    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const isLogged = localStorage.getItem("token");


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get(`/reviews/${bookId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) return;
        if (rating === 0) {
            setError("Veuillez attribuer une note.");
            return;
        }

        try {
            const res = await api.post("/reviews", { bookId, content, rating });
            setComments([res.data, ...comments]);
            setContent("");
            setRating(0);
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue.");
        }
    };

    return (
        <div className="flex flex-col gap-6 py-8 px-6  ">


            <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest text-main-500 font-medium">Avis lecteurs</p>
                <h2 className="text-2xl font-serif text-main-900">Commentaires</h2>
            </div>


            {isLogged ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">


                    <div className="flex flex-row gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl transition ${star <= rating ? "text-yellow-400" : "text-main-200"}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Partagez votre avis sur ce livre..."
                        rows={3}
                        className="w-full border border-main-200 rounded-2xl px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white resize-none"
                    />

                    {error && (
                        <p className="text-sm text-second-950 bg-second-100 border border-second-200 rounded-full px-4 py-2 text-center">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn w-fit rounded-full px-6 py-2 text-sm tracking-wide cursor-pointer">
                        Publier
                    </button>

                </form>
            ) : (
                <p className="text-sm text-main-400 italic">
                    Connectez-vous pour laisser un commentaire.
                </p>
            )}


            {loading ? (
                <p className="text-sm text-main-400 text-center">Chargement...</p>
            ) : comments.length === 0 ? (
                <p className="text-sm text-main-400 italic text-center py-4">
                    Aucun commentaire pour l'instant. Soyez le premier !
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {comments.map((c) => (
                        <div key={c._id} className="flex flex-col gap-1 border-b border-main-100 pb-4">

                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-main-700 uppercase tracking-widest">
                                    {c.userId?.username || "Anonyme"}
                                </p>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-sm ${star <= c.rating ? "text-yellow-400" : "text-main-200"}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-sm text-main-800">{c.content}</p>

                            <p className="text-xs text-main-400 italic">
                                {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};