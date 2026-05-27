import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const booksCache = {};

export const Favorite = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFavorites = async () => {

            try {
                const res = await api.get("/favorites");
                console.log(res.data);
                const favoriteIds = res.data.favorites;

                const booksData = [];

                for (const id of favoriteIds) {

                    if (booksCache[id]) {
                        booksData.push(booksCache[id]);
                        continue;
                    }

                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
                    );

                    const book = await response.json();
                    booksCache[id] = book;
                    booksData.push(book);

                    await new Promise(res => setTimeout(res, 300));
                }

                setBooks(booksData);

            } catch (err) {
                console.log(err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();

    }, []);

    if (loading) {
        return (
            <div className="p-10 text-center">
                Chargement...
            </div>
        );
    }

    return (
        <section className="py-16 px-44 flex flex-col gap-2 min-h-screen">
    
    
            <div className="flex flex-col gap-2 items-start border-b border-main-200 pb-10 mb-10">
                <p className="text-sm uppercase tracking-widest text-main-500 font-medium">Collection personnelle</p>
                <h1 className="text-5xl font-serif text-main-900">
                    Mes favoris
                </h1>
            </div>
    
            {books.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center py-24">
                    <p className="text-6xl">📚</p>
                    <p className="text-xl font-serif text-main-700">Votre bibliothèque est vide</p>
                    <p className="text-sm text-main-400">Explorez les tendances et ajoutez vos premiers livres</p>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    
                    {books.map((book) => (
                        <Link
                            key={book.id}
                            to={`/book/${book.id}`}
                            state={{ book: book }}
                            className="flex flex-col gap-3 group cursor-pointer"
                        >
                            
                            <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition duration-300">
                                <img
                                    src={book.volumeInfo?.imageLinks?.thumbnail}
                                    alt={book.volumeInfo?.title}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>
    
    
                            <div className="flex flex-col gap-1 px-1">
                                <h2 className="text-sm font-semibold text-main-900 line-clamp-2 leading-snug">
                                    {book.volumeInfo?.title}
                                </h2>
                                <p className="text-xs text-main-500 italic line-clamp-1">
                                    {book.volumeInfo?.authors?.join(", ") || "Auteur inconnu"}
                                </p>
                            </div>
                        </Link>
                    ))}
    
                </div>
            )}
    
        </section>
    );
};