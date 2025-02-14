import { useEffect, useState } from "react";

const AllTasks = () => {
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_SERVER_API}/allTasks`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                const data = await response.json();
    
                // Sort tasks by dueDate (assuming ISO date format)
                const sortedTasks = data.sort((a, b) => 
                    new Date(b.dueDate).getTime()- new Date(a.dueDate).getTime()
                );
    
                setTasks(sortedTasks);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            }
        };
    
        fetchTasks();
    }, []);
    
    if (loading) {
        return <div className="w-28 h-28 mx-auto mt-32 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
    }

    if (tasks?.length === 0) {
        return <div className="text-center font-semibold text-2xl mt-32">
            <p>NO Task Found</p>
        </div>
    }
    return <div className="mt-20 flex justify-center">
        <div className="flex flex-col gap-3">
            {tasks?.map((task) => (
                <div key={task._id} className="border rounded-[8px] mx-2 lg:mx-0 lg:w-[500px] p-3 bg-blue-100">
                    <div className=" flex justify-between text-[14px]">
                        <div>
                            <h1 className="text-2xl font-semibold">{task?.title}</h1>
                            <p className="text-gray-600 my-2">{task?.description}</p>
                        </div>
                        <p>
                            {task?.CreatorName}
                        </p>

                    </div>

                    <div className="flex justify-between">
                        <p>{task?.dueDate}</p>
                        <p className={`${task?.status === "completed" ? "text-[green]" : "text-[red]"}`}>{task?.status}</p>
                    </div>

                </div>
            ))}
        </div>
    </div>;
};
export default AllTasks;