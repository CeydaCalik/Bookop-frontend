import { RegisterForm } from "../components/RegisterForm"


export const Register = () => {

    return (
        <>
        <section className="py-5 px-44 flex flex-col gap-4 items-start">
                   <h2 className="text-5xl text-center text-main-800">
                        Créer un compte
                    </h2>
                </section>
        
        <section className="flex justify-center py-5">
            <RegisterForm />
        </section>
        </>
    )
}