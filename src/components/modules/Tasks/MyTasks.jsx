import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyTasks = () => {
    const { logInUserDetails } = useContext(AuthContext);
    const userId = logInUserDetails?._id;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);
    

    // Fetch tasks for the user
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://naria-group-ltd-server.vercel.app/tasks?userId=${userId}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                const data = await response.json();
                setTasks(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId, logInUserDetails]);

    // Handle task deletion
    const deleteTask = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                setLoading(true);
                await fetch(`https://naria-group-ltd-server.vercel.app/tasks/${taskId}`, {
                    method: 'DELETE',
                });
                setTasks(tasks.filter(task => task._id !== taskId));
                setLoading(false);
            } catch (error) {
                console.error("Error deleting task:", error);
                setLoading(false);
            }
        }
    };

    // Handle task update (e.g., updating status)
    const updateTask = async (taskId, updatedData) => {
        try {
            setLoading(true);
            await fetch(`https://naria-group-ltd-server.vercel.app/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, ...updatedData } : task
            ));
            setIsEditing(false); // Close edit form after updating
            setLoading(false);
        } catch (error) {
            console.error("Error updating task:", error);
            setLoading(false);
        }
    };

    // Handle opening the edit form
    const handleEditClick = (task) => {
        setIsEditing(true);
        setEditTask(task);
    };
    if(loading){
        return <div className="w-28 h-28 mx-auto mt-32 border-4 border-dashed rounded-full animate-spin border-red-600"></div> 
    }
    if (tasks?.length === 0) {
        return <div className="text-center font-semibold text-2xl mt-32">
            <p>NO Task Found</p>
        </div>
    }

    return (
        <div className="mt-32 flex justify-center">
            <div className="flex flex-col gap-3">
                {tasks?.map((task) => (
                    <div key={task._id} className="border rounded-[8px] mx-2 lg:mx-0 lg:w-[500px] w-[350px] p-3 bg-blue-100">
                        <h1 className="text-2xl font-semibold">{task?.title}</h1>
                        <p className="text-gray-600 my-2">{task?.description}</p>
                        <div className="flex justify-between">
                            <p>{task?.dueDate}</p>
                            <p className={`${task?.status === "completed" ? "text-[green]" : "text-[red]"}`}>{task?.status}</p>
                        </div>
                        <div className="flex justify-between mt-3">
                            <button
                                className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded"
                                onClick={() => handleEditClick(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
                                onClick={() => deleteTask(task?._id)}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Task Form */}
            {isEditing && editTask && (
                <div className="fixed pt-32 inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const updatedData = {
                                    title: e.target.title.value,
                                    description: e.target.description.value,
                                    dueDate: e.target.dueDate.value,
                                    status: e.target.status.value,
                                };
                                updateTask(editTask._id, updatedData);
                            }}
                        >
                            <input
                                type="text"
                                name="title"
                                defaultValue={editTask.title}
                                className="w-full p-2 mb-3 border rounded"
                            />
                            <textarea
                                name="description"
                                defaultValue={editTask.description}
                                className="w-full p-2 mb-3 border rounded"
                            ></textarea>
                            <input
                                type="date"
                                name="dueDate"
                                defaultValue={editTask.dueDate}
                                className="w-full p-2 mb-3 border rounded"
                            />
                            <select
                                name="status"
                                defaultValue={editTask.status}
                                className="w-full p-2 mb-3 border rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button
                                type="submit"
                                className="w-full p-2 cursor-pointer bg-blue-500 text-white rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="w-full cursor-pointer p-2 bg-gray-500 text-white rounded mt-3"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
