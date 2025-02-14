import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const CreateTask = () => {

    const { logInUserDetails } = useContext(AuthContext);
    const userId = logInUserDetails?._id;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [tasks, setTasks] = useState([]);

    // Handle task submission
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, userId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Tasks Created Successfully!")
                setTasks([...tasks, { ...data, id: result.taskId }]);
                reset();
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    return <div className="mt-32 flex justify-center">
        <div className="p-6 border rounded-lg mx-2 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("title", { required: "Title is required" })} placeholder="Task Title" className="border p-2 w-full rounded" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <textarea {...register("description")} placeholder="Task Description" className="border p-2 w-full rounded"></textarea>

                <input type="date" {...register("dueDate", { required: "Due date is required" })} className="border p-2 w-full rounded" />
                {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}

                <select {...register("status")} className="border p-2 w-full rounded">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">Add Task</button>
            </form>

        </div>
    </div>;
};
export default CreateTask;
