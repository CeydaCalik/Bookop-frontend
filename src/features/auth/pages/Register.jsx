import { RegisterForm } from "../components/RegisterForm"


export const Register = () => {

    return (
        <>
        <section className="py-16 px-44 flex flex-col gap-2 items-start border-b border-main-200">
        <p className="text-sm uppercase tracking-widest text-main-500 font-medium">
                            Création de compte
                        </p>
                <h1 className="text-5xl font-serif text-main-900">
                    Créer un compte
                </h1>
            </section>
        
        <section className="flex justify-center py-5">
            <RegisterForm />
        </section>
        </>
    )
}