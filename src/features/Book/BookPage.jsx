import { useLocation } from "react-router";
import api from '../../api';
import { useEffect, useState } from "react";
import { CommentSection } from "../auth/components/CommentSection";

export const BookPage = () => {

    const { state } = useLocation();
    const [favorites, setFavorites] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const book = state?.book;
    const isLogged = localStorage.getItem('token');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get("/favorites");
                setFavorites(res.data.favorites);
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        fetchFavorites();
    }, []);

    const handleFavorite = async () => {
        try {
            const res = await api.post("/favorites/toggle", { bookId: book.id });
            setFavorites(res.data.favorites);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const isFavorite = favorites.includes(book?.id);

    return (
        <section className="min-h-screen bg-gray-50 py-10 px-4">


            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-6">

                <div className="flex justify-center items-center bg-gray-100 p-6">
                    <img
                        src={book?.volumeInfo?.imageLinks?.thumbnail}
                        alt="Livre"
                        className="w-64 h-auto object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                    />
                </div>

                <div className="p-6 flex flex-col gap-4">

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {book?.volumeInfo?.title || "Titre inconnu"}
                    </h1>

                    <p className="text-gray-600">
                        <span className="font-semibold">Auteur :</span>{" "}
                        {book?.volumeInfo?.authors?.join(", ") || "Inconnu"}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Pages :</span>{" "}
                        {book?.volumeInfo?.pageCount || "Non renseigné"}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Maturité :</span>{" "}
                        {book?.volumeInfo?.maturityRating || "Non renseigné"}
                    </p>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {book?.volumeInfo?.description || "Pas de description disponible."}
                        </p>
                    </div>

                    <div className="mt-auto">
                        <p className="text-2xl font-bold text-main-800">
                            {book?.saleInfo?.listPrice?.amount
                                ? `${book.saleInfo.listPrice.amount}€`
                                : "Prix non disponible"}
                        </p>
                    </div>


                    <div className="flex gap-2 flex-row">
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="btn cursor-pointer"
                        >
                            {showComments ? "Masquer les commentaires" : "Afficher les commentaires"}
                        </button>

                        {isLogged && (
                            <button onClick={handleFavorite} className="btn cursor-pointer">
                                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                            </button>
                        )}
                    </div>

                </div>
            </div>


            {showComments && (
                <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow-lg">
                    <CommentSection bookId={book?.id} />
                </div>
            )}

        </section>
    );
};