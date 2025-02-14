import { useEffect, useState } from "react";
import { useGetAllTasks } from "../../../hooks/useGetAllTasks";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsData } from "../../../redux/features/getPostsSlice";

const AllTasks = () => {
    const { tasks:data} = useGetAllTasks();

    //redux
    const {tasks,error,loading} = useSelector((state) => state.allPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsData(data));

        return () => {
            // dispatch(clearData()); // Optional: Clear data when component unmounts
        };
    }, [dispatch, data]);

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