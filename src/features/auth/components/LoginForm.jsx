import { useState } from "react"
import api from "../../../api";
import { useNavigate } from "react-router";



export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/auth/login', {
                email,
                password
            });

            const token = res.data.token;

            localStorage.setItem('token', token);

            console.log("Logged in : ", res.data.user);
            navigate('/');

            
        } catch (err) {
            setError(err.response?.data.message || err.message);
            
            
        }
    }

    return (
        <>

            <section className="bg-main-800 px-5 py-5 rounded-xl">

                <form onSubmit={handleLogin} className="w-full max-w-md bg-main-100 rounded-2xl shadow-lg p-6 flex flex-col gap-5">


                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-main-700">
                            Email :
                        </label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="border border-main-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-400 focus:border-transparent transition"
                            placeholder="••••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-second-950 bg-second-200 rounded-xl px-1 py-1">
                            {error}
                        </p>
                    )}

                    <button
                        className="btn" >
                        Se connecter
                    </button>

                    {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}

                </form>
            </section>


        </>
    )
}