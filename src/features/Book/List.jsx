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
            <section className="py-12 px-44 flex flex-col gap-4 items-start">

                <div className=" px-1 flex flex-row gap-2">
                    <h1 className="text-5xl text-main-900">Trouve ta prochaine lecture !</h1>
                </div>

                <div className="flex flex-row bg-main-300 rounded-lg px-1 py-1">
                    <input className=" bg-transparent placeholder:text-slate-400 text-main-700 text-sm border border-main-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-main-400 hover:border-second-300 shadow-sm focus:shadow" placeholder="Type here..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        onKeyDown={searchBook}
                    />
                    <button><img className="w-10 h-10" src="../../../public/images/search_svg.svg" />
                    </button>
                </div>
            </section>

            <section className="py-10 px-4">

                <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


                    {

                        <Book book={bookData} />

                    }

                </div>

            </section>
        </>
    )
}


