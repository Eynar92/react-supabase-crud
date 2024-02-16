import { useEffect } from "react";
import { useTasks } from "../hooks"
import { TaskCard } from "./TaskCard";

export const TaskList = ({ done }) => {

    const { tasks, loading, getAllTasks } = useTasks();

    useEffect(() => {
        getAllTasks(done);
    }, [done]);

    function renderTasks() {
        if (loading) {
            return <span className="loader"></span>
        } else if (tasks.length === 0) {
            return <h1>No tasks found</h1>
        } else {
            return (
                <ul className="max-h-[600px] flex flex-col gap-2 px-4 overflow-y-auto">
                    {
                        tasks.map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))
                    }
                </ul>
            )
        }
    }

    return <div>{renderTasks()}</div>

}
