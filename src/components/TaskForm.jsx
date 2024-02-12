import React from 'react'
import { useForm } from '../hooks/useForm'
import { supabase } from '../supabase/client';

export const TaskForm = () => {

    const { taskName, onInputChange, onResetForm } = useForm({
        taskName: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await supabase.auth.getUser();
            const userId = user.data.user.id;

            const result = await supabase.from('tasks').insert({
                name: taskName,
                userId: userId,
            });

            console.log(result);
            onResetForm();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex gap-4'
        >
            <input
                type="text"
                placeholder="Ingresa una tarea..."
                name="taskName"
                value={taskName}
                onChange={onInputChange}
                className="w-72 bg-transparent border border-zinc-800 p-2 rounded-md placeholder:text-zinc-600"
            />
            <button
                className="bg-zinc-800 px-4 py-2 rounded-md uppercase hover:bg-zinc-900 transition-colors"
            >
                Añadir
            </button>
        </form>
    )
}
