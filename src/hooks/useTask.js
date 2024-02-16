import { useContext } from "react"
import { TaskContext } from "../context";

export const useTasks = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) throw new Error('useTasks must be used within a TaskContext');

    return taskContext
}
