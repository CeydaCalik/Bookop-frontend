import { Link } from "react-router-dom";

export const Book = ({ book }) => {
    return (
        <>
            {book?.map((item) => {
                let thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
                let amount = item.saleInfo.listPrice?.amount;
                let maturity = item.volumeInfo?.maturityRating;
                let author = item.volumeInfo?.authors?.join(", ");
                let pages = item.volumeInfo?.pageCount;

                if (thumbnail && amount && maturity && author && pages) {
                    return (
                        <Link
                            key={item.id}
                            to={`/book/${item.id}`}
                            state={{ book: item }}
                        >
                            <section className="p-4 rounded-2xl bg-main-300 flex justify-center hover:scale-[1.02] transition">

                                <div className="max-w-sm w-full rounded-2xl overflow-hidden bg-main-100 shadow-md hover:shadow-2xl transition duration-300 flex flex-col">

                                    <div className="overflow-hidden">
                                        <img
                                            src={thumbnail}
                                            alt="Livre"
                                            className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    <div className="p-5 flex flex-col gap-3">
                                        <h3 className="text-lg font-bold text-main-900 line-clamp-2">
                                            {item.volumeInfo.title}
                                        </h3>

                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <p><span className="badge">Maturité : </span>{maturity}</p>
                                            <p><span className="badge">Auteur : </span>{author}</p>
                                            <p><span className="badge">Pages : </span>{pages}</p>
                                            <p><span className="badge">Prix : </span>{amount}€</p>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </Link>
                    );
                }
            })}
        </>
    );
};