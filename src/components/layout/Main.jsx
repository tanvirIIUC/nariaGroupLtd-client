import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Main = () => {
  return <div>
    <Navbar />
    <div className="mb-10 min-h-screen ">
    <Outlet/>
    </div>
    
    <Footer/>
  </div>;
};
export default Main;