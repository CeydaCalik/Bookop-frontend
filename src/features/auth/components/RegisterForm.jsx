import { useState } from "react"
import api from "../../../api"
import { useNavigate } from "react-router";

const passwordRules = [
    { id: "length", label: "8 caractères minimum", test: (p) => p.length >= 8 },
    { id: "upper", label: "Une majuscule", test: (p) => /[A-Z]/.test(p) },
    { id: "number", label: "Un chiffre", test: (p) => /[0-9]/.test(p) },
    { id: "special", label: "Un caractère spécial (!@#$...)", test: (p) => /[^a-zA-Z0-9]/.test(p) },
];

export const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const isPasswordValid = passwordRules.every(rule => rule.test(password));

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            setError("Le mot de passe ne respecte pas les conditions requises.");
            return;
        }

        try {
            const res = await api.post('/auth/register', { username, email, password });
            console.log(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur serveur");
        }
    }

    return (
        <>
            <section className="min-h-fit px-5 py-10 flex items-center justify-center bg-main-50">
                <div className="flex flex-col items-center gap-8 w-full sm:w-xl md:w-2xl px-4 sm:px-6">

                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-3xl sm:text-4xl font-serif text-main-900">
                            Rejoignez <span className="italic">Bookop.</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                        <span className="flex-1 h-px bg-main-200"></span>
                    </div>

                    <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">Email</label>
                            <input
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">Nom d'utilisateur</label>
                            <input
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="VotreNom"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs uppercase tracking-widest text-main-500 font-medium">Mot de passe</label>
                            <input
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="border border-main-200 rounded-full px-5 py-3 text-sm text-main-700 placeholder:text-main-300 focus:outline-none focus:border-main-400 focus:shadow-sm transition duration-300 bg-white"
                                placeholder="••••••••••"
                            />

                            {password.length > 0 && (
                                <ul className="flex flex-col gap-1 mt-2 px-2">
                                    {passwordRules.map(rule => (
                                        <li key={rule.id} className={`text-xs flex items-center gap-2 transition-colors duration-200 ${rule.test(password) ? "text-green-500" : "text-main-400"}`}>
                                            <span>{rule.test(password) ? "✓" : "○"}</span>
                                            {rule.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {error && (
                            <p className="text-sm text-second-950 bg-second-100 border border-second-200 rounded-full px-4 py-2 text-center">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={password.length > 0 && !isPasswordValid}
                            className="btn w-full rounded-full py-3 text-sm tracking-wide mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            S'enregistrer
                        </button>

                    </form>
                </div>
            </section>
        </>
    );
}