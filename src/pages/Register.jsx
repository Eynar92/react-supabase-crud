import { supabase } from "../supabase/client";
import { useForm } from "../hooks/useForm"
import { Link } from "react-router-dom";

export const Register = () => {

    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.length <= 1) return;

        try {

            await supabase.auth.signUp({
                email,
                password,
            });

        } catch (error) {

            console.error(error);

        }

        onResetForm();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-96 h-1/2 p-4 gap-8 text-white bg-zinc-950 rounded-md shadow-xl">
            <h1 className="text-2xl font-semibold uppercase">Registro de Usuario</h1>
            <input
                type="email"
                placeholder="youremail@site.com"
                name="email"
                value={email}
                onChange={onInputChange}
                className="w-72 bg-transparent border border-zinc-800 p-2 rounded-md placeholder:text-zinc-600"
            />
            <input
                type="password"
                placeholder="Ingrese su contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
                className="w-72 bg-transparent border border-zinc-800 p-2 rounded-md placeholder:text-zinc-600"
            />
            <button
                type="submit"
                className="bg-zinc-800 px-4 py-2 rounded-md uppercase hover:bg-zinc-900 transition-colors"
            >
                Registrar
            </button>
            <Link to='/auth'>¿Ya tienes una cuenta?</Link>
        </form>
    )
}
