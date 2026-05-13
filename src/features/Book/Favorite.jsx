import { useEffect, useState } from "react";
import api from "../../api";

export const Favorite = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFavorites = async () => {

            try {

                //récupérer les IDs depuis MongoDB
                const res = await api.get("/favorites");

                const favoriteIds = res.data.favorites;

                //récupérer les infos Google Books
                const booksData = await Promise.all(

                    favoriteIds.map(async (id) => {

                        const response = await fetch(
                            `https://www.googleapis.com/books/v1/volumes/${id}`
                        );

                        return response.json();
                    })
                );

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
        <section className="min-h-screen bg-gray-50 p-8">

            <h1 className="text-3xl font-bold mb-8">
                Mes favoris
            </h1>

            {books.length === 0 ? (
                <p className="btn w-fit">Aucun livre en favoris</p>
            ) : (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {books.map((book) => (

                        <div
                            key={book.id}
                            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
                        >

                            <img
                                src={book.volumeInfo?.imageLinks?.thumbnail}
                                alt={book.volumeInfo?.title}
                                className="w-full h-64 object-cover rounded"
                            />

                            <h2 className="mt-3 font-bold text-lg">
                                {book.volumeInfo?.title}
                            </h2>

                            <p className="text-sm text-gray-600">
                                {book.volumeInfo?.authors?.join(", ")}
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </section>
    );
};