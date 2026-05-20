

export const Home = () => {

    return (
        <>
            <section className="flex flex-row py-50 px-30 place-content-evenly ">
    
    
    
    
    
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-7xl font-serif text-main-900 leading-tight">
                        Bienvenue sur <span className="italic text-main-500">Bookop.</span>
                    </h1>
                    <h2 className="text-xl text-main-500 max-w-lg leading-relaxed">
                        Le site pour faire des découvertes littéraires et partager vos avis avec d'autres lecteurs.
                    </h2>
    
    
                <button className="btn w-fit px-8 py-3 text-base tracking-wide">
                    Cherche un nouveau livre
                </button>
    
                </div>

                <div className="w-150 h-150 rounded-full inset-0 overflow-hidden">
            <img className="w-full h-full object-cover " src="../../public/images/book-wall.jpg" alt="" />
            
                </div>
            </section>
        </>
    );
}