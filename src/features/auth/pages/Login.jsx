import { LoginForm } from "../components/LoginForm"


export const Login = () => {



    return (
        <>
        <section className="py-5 px-44 flex flex-col gap-4 items-start">
                   <h2 className="text-5xl text-center text-main-800">
                        Connexion
                    </h2>
                </section>
                
                <section className="flex justify-center py-5">
                <LoginForm />
                </section>

        
        </>
    )
}