import { useNavigate, useLoaderData } from "react-router-dom";
import { supabase } from "../supabase/client"
import { useEffect, useState } from "react";
import { TaskForm, TaskList } from "../components";

export const Home = () => {

    const [showTasksDone, setShowTasksDone] = useState(false);
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

    const handleToggleShowTasks = () => {
        setShowTasksDone(!showTasksDone);
    }

    return (
        <main className="flex flex-col gap-4 items-center text-white h-auto">
            <h1 className="text-2xl font-bold">Home</h1>
            <h2 className="text-xl font-semibold">{user.email}</h2>
            <button
                className="bg-zinc-800 px-4 py-2 rounded-md uppercase hover:bg-zinc-900 transition-colors"
                onClick={handleOnClick}
            >
                Logout
            </button>
            <TaskForm />
            <header className="flex items-center gap-4">
                <h2>Tasks pending</h2>
                <button
                    className="w-[200px] px-4 py-2 bg-zinc-800 rounded-md uppercase hover:bg-zinc-900 transition-colors"
                    onClick={handleToggleShowTasks}
                >
                    {`Show Tasks ${showTasksDone ? 'Pending' : 'Done'}`}
                </button>
            </header>
            <TaskList done={showTasksDone} />
        </main>
    )
}

export const loaderSession = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return { user }
}