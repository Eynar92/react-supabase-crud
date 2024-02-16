import React from 'react'
import { useForm } from '../hooks/useForm'
import { useTasks } from '../hooks';

export const TaskForm = () => {

    const { taskName, onInputChange, onResetForm } = useForm({
        taskName: '',
    });

    const { addTask, addTaskLoader } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(taskName);
        onResetForm();
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
                disabled={addTaskLoader}
                className="bg-zinc-800 px-4 py-2 rounded-md uppercase hover:bg-zinc-900 transition-colors"
            >
                {addTaskLoader ? 'Cargando...' : 'Agregar'}
            </button>
        </form>
    )
}
