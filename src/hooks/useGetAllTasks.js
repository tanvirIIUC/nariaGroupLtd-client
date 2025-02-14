import { useEffect, useState } from "react";

export const useGetAllTasks = ()=>{


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

    return {tasks,loading}
}