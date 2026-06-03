import { NavLink, useNavigate } from "react-router"
import Hamburger from "hamburger-react";
import { useState } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    const navLinks = (
        <>
            <li><NavLink to={"/"} onClick={() => setIsOpen(false)}> Accueil </NavLink></li>
            <li><NavLink to={"/list"} onClick={() => setIsOpen(false)}> List </NavLink></li>
            <li><NavLink to={"/trend"} onClick={() => setIsOpen(false)}> Tendances </NavLink></li>
            {token ? (
                <>
                    <li><NavLink to={"/favorite"} onClick={() => setIsOpen(false)}> Mes favoris </NavLink></li>
                    <li>
                        <button onClick={handleLogOut} className="btn cursor-pointer">
                            Déconnexion
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li><NavLink className="btn" to={"auth/login"} onClick={() => setIsOpen(false)}>Se connecter</NavLink></li>
                    <li><NavLink className="btn" to={"auth/register"} onClick={() => setIsOpen(false)}>Créer un compte</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <header className="bg-main-200 w-full">


            <div className="flex justify-between items-center py-4 px-8 ">

                <a href="/">

                    <p className="text-main-900 uppercase text-2xl font-bold">Bookop</p>

                </a>

                <nav className="hidden md:block">
                    <ul className="text-main-900 flex items-center gap-6 font-bold text-lg">
                        {navLinks}
                    </ul>
                </nav>


                <div className="md:hidden">
                    <Hamburger toggled={isOpen} toggle={setIsOpen} />
                </div>

            </div>


            {isOpen && (
                <nav className="md:hidden px-8 pb-4">
                    <ul className="text-main-900 flex flex-col gap-4 font-bold text-lg">
                        {navLinks}
                    </ul>
                </nav>
            )}

        </header>
    );
}