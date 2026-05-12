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
            <section className="bg-main-800 px-5 py-5 rounded-xl">

                <form onSubmit={handleRegister} className="w-full max-w-md bg-main-100 rounded-2xl shadow-lg p-6 flex flex-col gap-5">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Email :
                        </label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 focus:border-transparent transition"
                            placeholder="your.name@email.com"
                        />
                    </div>

                    {/* <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Prénom :
                        </label>
                        <input
                            name="firstname"
                            type="text"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 transition"
                            placeholder="Your"
                        />
                    </div> */}

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Nom d'utilisateur:
                        </label>
                        <input
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 transition"
                            placeholder="Name"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Mot de passe :
                        </label>
                        <input
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-second-950 bg-second-200 rounded-xl px-1 py-1">
                            {error}
                        </p>
                    )}

                    <button

                        className="btn">
                        S'enregistrer
                    </button>

                </form>
            </section>
        </>
    )
}