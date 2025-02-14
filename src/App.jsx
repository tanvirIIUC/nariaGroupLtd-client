import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/route"

function App() {
 

  return (
   <div className="max-w-[1920px] w-full mx-auto ">
    <RouterProvider router={routes}>

    </RouterProvider>
   
   </div>
  )
}

export default App
