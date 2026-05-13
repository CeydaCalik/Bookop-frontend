import { useState } from "react"
import api from "../../../api"
import { useNavigate } from "react-router";


export const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();


        try {
            const res = await api.post('/auth/register', {
                username,
                email,
                password
            });

            console.log(res.data);
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || "Erreur serveur");
        }
    }

    return (
        <>
            <section className="min-h-fit px-5 py-10 flex items-center justify-center bg-main-50">

                <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">


                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm uppercase tracking-widest text-main-500 font-medium">
                            Création de compte
                        </p>
                        <h1 className="text-4xl font-serif text-main-900">
                            Rejoignez <span className="italic">Bookop.</span>
                        </h1>
                    </div>


                    <div className="flex items-center gap-4 w-full">
                        <span className="flex-1 h-px bg-main-200"></span>
                    </div>


                    <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">
                                Email
                            </label>
                            <input
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">
                                Nom d'utilisateur
                            </label>
                            <input
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="VotreNom"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">
                                Mot de passe
                            </label>
                            <input
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="••••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-second-950 bg-second-100 border border-second-200 rounded-full px-4 py-2 text-center">
                                {error}
                            </p>
                        )}

                        <button className="btn w-full rounded-full py-3 text-sm tracking-wide mt-2">
                            S'enregistrer
                        </button>

                    </form>

                </div>

            </section>
        </>
    );
}