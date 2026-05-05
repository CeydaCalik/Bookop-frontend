import { useLocation } from "react-router"

export const BookPage = () => {

    const { state } = useLocation();
    const book = state?.book;


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
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Description
                    </h2>
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


                <button className="mt-4 bg-main-500 text-white py-2 px-4 rounded-lg hover:bg-main-600 transition">
                    Commentaire
                </button>

            </div>
        </div>
    </section>
);
}