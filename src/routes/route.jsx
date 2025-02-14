import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import Register from "../pages/Login/Register";
import Login from "../pages/Login/Login";
import Tasks from "../pages/Tasks/Tasks";
import CreateTaskPage from "../pages/Tasks/CreateTaskPage";
import MyTasksPage from "../pages/Tasks/MyTasksPage";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";


export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<PrivateRoute><Tasks/></PrivateRoute> 
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/allTask',
                element:<PrivateRoute><Tasks/></PrivateRoute> 
            },
            {
                path: '/profile',
                element:<PrivateRoute><Profile/></PrivateRoute> 
            },
            {
                path: '/createTask',
                element:<PrivateRoute><CreateTaskPage/></PrivateRoute> 
            },
            {
                path: '/myTasks',
                element:<PrivateRoute><MyTasksPage/></PrivateRoute> 
            }
        ]
    }
])