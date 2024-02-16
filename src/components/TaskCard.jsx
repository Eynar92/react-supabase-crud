import { useState } from "react";
import { supabase } from "../supabase";
import { useTasks } from "../hooks";

export const TaskCard = ({ id, name, done }) => {

    const { updateTaskStatus, deleteTask } = useTasks();

    const handleDelete = () => {
        deleteTask(id);
    }

    const handleToggleDone = async () => {
        updateTaskStatus(id, { done: !done });
    }

    return (
        <li
            className="flex items-center justify-between gap-8 p-4 bg-gray-900 text-white rounded-md"
        >
            <h3 className="w-full">{name}</h3>
            <p>{done ? 'Done' : 'Pending'}</p>
            <div className="flex gap-4">
                <button
                    className={`px-4 py-1 rounded-md ${done ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-800 hover:bg-green-900'} transition-colors`}
                    onClick={handleToggleDone}
                >
                    {done ? 'Pending' : 'Done'}
                </button>
                <button
                    className={`px-4 py-1 rounded-md bg-red-800 hover:bg-red-900 transition-colors`}
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}
