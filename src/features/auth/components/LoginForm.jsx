

export const LoginForm = () => {

    return (
        <>

            <section className="bg-main-800 px-5 py-5 rounded-xl">

                <form className="w-full max-w-md bg-main-100 rounded-2xl shadow-lg p-6 flex flex-col gap-5">


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Email :
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 focus:border-transparent transition"
                            placeholder="your@email.com" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Mot de passe :
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 focus:border-transparent transition"
                            placeholder="••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn" >
                        Se connecter
                    </button>

                    {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}

                </form>
            </section>


        </>
    )
}