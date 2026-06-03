import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";


const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const booksCache = {};

export const Trend = () => {

  const swiperRef = useRef({});

  const categories = [

    { title: "Fantasy", query: "subject:fantasy" },
    { title: "Fantasy Sombre", query: "subject:fantasy subject:horror" },
    { title: "Romance", query: "subject:romance" },
    { title: "Romance Fantasy", query: "subject:fantasy subject:romance" },
    { title: "Science-fiction", query: "subject:science fiction" },
    { title: "Dystopie", query: "dystopian science fiction" },
    { title: "Aventure", query: "subject:adventure" },
    { title: "Fantasy Aventure", query: "subject:fantasy subject:adventure" },
    { title: "Manga", query: "subject:manga" },
    { title: "Thriller", query: "subject:thriller" },
    { title: "Mystère", query: "subject:mystery" },


  ];

  const [bookCategory, setBookCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const fetched = useRef(false);


  const retry = async (url, retries = 3, delay = 1000) => {
    try {
      return await axios.get(url);
    } catch (err) {
      if (retries <= 0 || err.response?.status !== 429) throw err;

      await new Promise(res => setTimeout(res, delay));
      return retry(url, retries - 1, delay * 2);
    }
  };

  useEffect(() => {

    if (fetched.current) return;
    fetched.current = true;

    const fetchBooks = async () => {
      try {
        const results = [];

        for (const category of categories) {


          if (booksCache[category.query]) {
            results.push({ title: category.title, books: booksCache[category.query] });
            continue;
          }

          const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(category.query)}&maxResults=15&key=${API_KEY}`;
          const res = await retry(url);

          booksCache[category.query] = res.data.items || [];
          results.push({ title: category.title, books: booksCache[category.query] });

          await new Promise(res => setTimeout(res, 500));
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

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-12 md:px-44 flex flex-col gap-2 items-start border-b border-main-200">
        <p className="text-sm uppercase tracking-widest text-main-500 font-medium">Découverte</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-main-900">
          Dernières tendances
        </h1>
      </section>

      <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-12 md:px-44 flex flex-col gap-8 sm:gap-12 md:gap-16">
        {categories.map((category) => (
          <div key={category.title}>

            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 h-px bg-main-400"></span>
              <h2 className="text-sm sm:text-base lg:text-lg uppercase tracking-widest font-semibold text-main-700">
                {category.title}
              </h2>
              <span className="flex-1 h-px bg-main-200"></span>
            </div>

            <div className="relative group">

              <button
                onClick={() => swiperRef.current[category.title]?.slidePrev()}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                       bg-white border border-main-200 shadow-lg
                       w-10 h-10 rounded-full items-center justify-center
                       text-main-700 hover:bg-main-100 hover:scale-110
                       transition duration-200 cursor-pointer
                       opacity-0 group-hover:opacity-100"
              >
                &#8592;
              </button>

              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current[category.title] = swiper;
                }}
                spaceBetween={12}
                slidesPerView={"auto"}
              >
                {bookCategory[category.title]?.map((book) => (
                  <SwiperSlide key={book.id} style={{ width: "130px" }}>
                    <Link to={`/book/${book.id}`} state={{ book: book }}>
                      <div className="flex flex-col gap-3 group/card cursor-pointer">

                        <div className="rounded-lg overflow-hidden shadow-md group-hover/card:shadow-xl transition duration-300">
                          <img
                            src={book.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/160x240"}
                            alt={book.volumeInfo?.title}
                            className="w-full h-44 sm:h-52 object-cover group-hover/card:scale-105 transition duration-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1 px-1">
                          <h3 className="text-sm font-semibold text-main-900 line-clamp-2 leading-snug">
                            {book.volumeInfo?.title}
                          </h3>
                          <p className="text-xs text-main-500 italic line-clamp-1">
                            {book.volumeInfo?.authors?.join(", ") || "Auteur inconnu"}
                          </p>
                        </div>

                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                onClick={() => swiperRef.current[category.title]?.slideNext()}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                       bg-white border border-main-200 shadow-lg
                       w-10 h-10 rounded-full items-center justify-center
                       text-main-700 hover:bg-main-100 hover:scale-110
                       transition duration-200 cursor-pointer
                       opacity-0 group-hover:opacity-100"
              >
                &#8594;
              </button>

            </div>
          </div>
        ))}
      </section>
    </>

  );
};