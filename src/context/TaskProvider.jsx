import { useState } from "react";
import { TaskContext } from "./"
import { supabase } from "../supabase";
import { useForm } from "../hooks";
supabase
export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [addTaskLoader, setAddTaskLoader] = useState(false);
    const [loading, setLoading] = useState(false);

    const addTask = async (taskName) => {
        setAddTaskLoader(true);
        try {
            const user = await supabase.auth.getUser();
            const userId = user.data.user.id;

            const result = await supabase
                .from('tasks')
                .insert({
                    name: taskName,
                    userId: userId,
                });

            if (result.status === 201) {
                getAllTasks();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setAddTaskLoader(false);
        }
    }

    const updateTaskStatus = async (taskId, updateFields) => {
        const user = await supabase.auth.getUser();
        const userId = user.data.user.id;

        const { error, data } = await supabase
            .from('tasks')
            .update(updateFields)
            .eq('userId', userId)
            .eq('id', taskId)

        if (error) throw new Error(error);

        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const getAllTasks = async (status = false) => {
        setLoading(true);
        const userData = await supabase.auth.getUser();
        const userId = userData.data.user.id;

        const { data, error } = await supabase
            .from('tasks')
            .select()
            .eq('userId', userId)
            .eq('done', status)
            .order('id', { ascending: true });

        if (error) throw new Error(error);

        setTasks(data);
        setLoading(false)
    }

    const deleteTask = async (taskId) => {
        const userData = await supabase.auth.getUser();
        const userId = userData.data.user.id;

        const { error, data } = await supabase
            .from('tasks')
            .delete()
            .eq('userId', userId)
            .eq('id', taskId);

        if (error) throw new Error(error);

        // getAllTasks();
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                addTaskLoader,
                loading,
                getAllTasks,
                updateTaskStatus,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
