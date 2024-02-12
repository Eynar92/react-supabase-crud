import { useNavigate, useLoaderData } from "react-router-dom";
import { supabase } from "../supabase/client"
import { useEffect } from "react";
import { TaskForm } from "../components";


export const Home = () => {

    const { user } = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        } else {
            navigate('/');
        }
    }, [])

    const handleOnClick = () => {
        supabase.auth.signOut();
        navigate('/auth');
    }

    return (
        <main className="flex flex-col gap-4 items-center justify-center text-white">
            <h1 className="text-2xl font-bold">Home</h1>
            <button
                className="bg-zinc-800 px-4 py-2 rounded-md uppercase hover:bg-zinc-900 transition-colors"
                onClick={handleOnClick}
            >
                Logout
            </button>
            <TaskForm />
        </main>
    )
}

export const loaderSession = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return { user }
}