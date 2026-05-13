import { LoginForm } from "../components/LoginForm"


export const Login = () => {



    return (
        <>
                   <section className="py-16 px-44 flex flex-col gap-2 items-start border-b border-main-200">                                                                                                                    
                <h1 className="text-5xl font-serif text-main-900">
                    Connexion
                </h1>
            </section>
                
                <section className="flex justify-center py-5">
                <LoginForm />
                </section>

        
        </>
    )
}