import { NavLink } from "react-router"

export const Header = () => {
    return (
        <>
        <header className="flex justify-between items-center py-4 px-8 bg-main-200">

            <div className="flex items-center gap-4">

                <p className="text-main-900 uppercase text-2xl font-bold ">Bookop</p>
            </div>

            <nav>
                <ul className="text-main-900 flex items-center gap-6 font-bold text-lg">
                    
                    <li>
                        <NavLink to={"/"}> Accueil </NavLink>
                    </li>

                    <li>

                        <NavLink to={"/list"}> List </NavLink>
                    </li>

                    <li>
                        <NavLink className="btn" to={"auth/login"}>Se connecter</NavLink>
                    </li>

                    <li>
                        <NavLink className="btn" to={"auth/register"}>Créer un compte</NavLink>
                    </li>

                    </ul>

            </nav>
        </header>
        
        
        </>
    )
}