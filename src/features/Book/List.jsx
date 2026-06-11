import { useState } from "react";
import { Book } from "./Book";
import axios from "axios";


export const List = () => {


    const [search, setSearch] = useState("");
    const [bookData, setBookData] = useState([]);
    const searchBook = (evt) => {
        if (evt.key === "Enter") {


            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + import.meta.env.VITE_GOOGLE_API_KEY + '&maxResults=40')
                .then(res => setBookData(res.data.items))
                .catch(err => console.log(err))

        }
    }


    return (
        <>
            <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-12 md:px-44 flex flex-col gap-6 border-b border-main-200">
                <div className="flex flex-col gap-2">
                    <p className="text-sm uppercase tracking-widest text-main-500 font-medium">Recherche</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-main-900">
                        Trouve ta prochaine lecture
                    </h1>
                </div>

                <div className="flex flex-row items-center gap-2 bg-white border border-main-200 rounded-full px-4 py-2 shadow-sm w-full sm:w-fit hover:shadow-md transition duration-300">
                    <input
                        className="bg-transparent text-main-700 text-sm placeholder:text-main-400 focus:outline-none w-full sm:w-72"
                        placeholder="Titre..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={searchBook}
                    />
                    <button className="text-main-500 hover:text-main-800 transition">
                        <img className="w-5 h-5 opacity-60 hover:opacity-100 transition" src="images/search_svg.svg" />
                    </button>
                </div>
            </section>

            <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-12 md:px-44">
                {bookData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 text-center py-24">
                        <p className="text-sm text-main-400">Tapez un titre et appuyez sur Entrée</p>
                    </div>
                ) : bookData.length > 0 ? (
                    <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <Book book={bookData} />
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-main-400">Résultat introuvable</p>
                    </div>
                )}
            </section>
        </>
    );
}


