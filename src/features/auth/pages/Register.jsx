import { RegisterForm } from "../components/RegisterForm"


export const Register = () => {

    return (
        <>
            <section className="py-8 sm:py-12 md:py-16 px-6 sm:px-12 md:px-44 flex flex-col gap-2 items-start border-b border-main-200">
                <p className="text-sm uppercase tracking-widest text-main-500 font-medium">
                    Création de compte
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-main-900">

                    Créer un compte
                </h1>
            </section>

            <section className="flex justify-center py-5">
                <RegisterForm />
            </section>
        </>
    )
}