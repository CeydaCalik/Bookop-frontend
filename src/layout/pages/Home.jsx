

export const Home = () => {

    return (
        <>
            <section className="flex flex-col-reverse sm:flex-row py-10 sm:py-20 md:py-50 px-6 sm:px-12 md:px-30 items-center justify-between gap-10 w-full">



                <div className="flex flex-col gap-4 items-center text-center sm:items-start sm:text-left flex-1">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-main-900 leading-tight">
                        Bienvenue sur <span className="italic text-main-500">Bookop.</span>
                    </h1>
                    <h2 className="text-base sm:text-lg md:text-xl text-main-500 max-w-lg leading-relaxed">
                        Le site pour faire des découvertes littéraires et partager vos avis avec d'autres lecteurs.
                    </h2>

                    <a href="/trend">

                        <p className="btn w-fit px-8 py-3 text-base tracking-wide">
                            Jette un coup d'œil !
                        </p>
                    </a>
                </div>

                
                <div className="w-50 h-50 sm:w-36 sm:h-36 md:w-180 md:h-107 md:shrink-12 rounded-full overflow-hidden ">
                    <img className="w-full h-full object-cover" src="images/book-wall.jpg" alt="Image de plein de livre" />
                </div> 

            </section>
        </>
    );
}