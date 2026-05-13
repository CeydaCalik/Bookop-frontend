

export const Home = () => {

    return (
        <>
            <section className="min-h-screen flex flex-col py-50 px-30 gap-10 border-b border-main-200">
    
    
                <p className="text-sm uppercase tracking-widest text-main-500 font-medium w-fit">
                    Votre bibliothèque en ligne
                </p>
    
    
                <div className="flex flex-col gap-4">
                    <h1 className="text-7xl font-serif text-main-900 leading-tight">
                        Bienvenue sur <span className="italic">Bookop.</span>
                    </h1>
                    <h2 className="text-xl text-main-500 max-w-lg leading-relaxed">
                        Le site pour faire des découvertes littéraires et partager vos avis avec d'autres lecteurs.
                    </h2>
                </div>
    
    
                <button className="btn w-fit px-8 py-3 text-base tracking-wide">
                    Cherche un nouveau livre
                </button>
    
            </section>
        </>
    );
}