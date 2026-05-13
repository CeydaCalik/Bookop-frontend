import { useEffect, useState, useRef } from "react";
import axios from "axios";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Trend = () => {

    const swiperRef = useRef({});

    const categories = [
        { title: "Tendance fiction", query: "bestseller fiction" },
        { title: "Polar & Thriller", query: "crime thriller novels" },
        { title: "Fantaisie", query: "fantasy epic" },
    ];

    const [bookCategory, setBookCategory] = useState({});
    const [loading, setLoading] = useState(true);

    const retry = async (url, retries = 3) => {
        try {
            return await axios.get(url);
        } catch (err) {
            if (retries > 0) {
                return retry(url, retries - 1);
            }
            throw err;
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const results = [];

                const delay = (ms) =>
                    new Promise((res) => setTimeout(res, ms));

                for (const category of categories) {

                    const url = `https://www.googleapis.com/books/v1/volumes?q=${category.query}&maxResults=10`;

                    const res = await retry(url);

                    results.push({
                        title: category.title,
                        books: res.data.items || [],
                    });

                    await delay(300);
                }

                const formatted = {};

                results.forEach((result) => {
                    formatted[result.title] = result.books;
                });

                setBookCategory(formatted);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="text-white p-10">Chargement...</div>;
    }

    return (
        <>
            <section className="py-12 px-44 flex flex-col gap-4 items-start">
                <h1 className="text-5xl text-main-900">
                    Jette un coup d'oeil aux dernières tendances !
                </h1>
            </section>

            <section className="py-12 px-44 flex flex-col gap-10">

                {categories.map((category) => (
                    <div key={category.title} className="relative">
                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-2xl font-bold mb-4 text-main-800">
                                {category.title}
                            </h2>

                        </div>

                        
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current[category.title] = swiper
                            }}
                            spaceBetween={15}
                            slidesPerView={"auto"}
                        >
                            <div className="flex flex-row place-content-between px-5 py-5  ">

                                <button
                                    onClick={() => swiperRef.current[category.title]?.slidePrev()}
                                    className="bg-main-200 text-2xl font-bold shadow-xl px-3 py-1 rounded-lg hover:scale-105 transition cursor-pointer w-20 h-15"
                                >
                                    &#8592;
                                </button>
                                <button
                                    onClick={() => swiperRef.current[category.title]?.slideNext()}
                                    className="bg-main-200 text-2xl font-bold shadow-xl px-3 py-1 rounded-lg hover:scale-105 transition cursor-pointer w-20 h-15"
                                >
                                    &#8594;
                                </button>
                            </div>

                            {bookCategory[category.title]?.map((book) => (
                                <SwiperSlide
                                    key={book.id}
                                    style={{ width: "180px" }}
                                >
                                    <div className="rounded-2xl overflow-hidden bg-main-100 shadow-md hover:shadow-2xl transition duration-300 flex flex-col">

                                        <img
                                            src={
                                                book.volumeInfo?.imageLinks?.thumbnail ||
                                                "https://via.placeholder.com/180x260"
                                            }
                                            alt={book.volumeInfo?.title}
                                            className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                                        />

                                        <div className="p-4 flex flex-col gap-2">

                                            <h3 className="text-sm font-bold text-main-900 line-clamp-2">
                                                {book.volumeInfo?.title}
                                            </h3>

                                            <p className="text-xs text-gray-700">
                                                {book.volumeInfo?.authors?.join(", ") ||
                                                    "Auteur inconnu"}
                                            </p>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                ))}

            </section>
        </>
    );
};