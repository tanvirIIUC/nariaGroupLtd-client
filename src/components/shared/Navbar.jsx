import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const { user, logOut, logInUserDetails } = useContext(AuthContext);
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex justify-between items-center py-5 px-6 lg:px-10 fixed top-0 left-0 w-full z-50 shadow-md bg-white">
      <div className="font-bold text-blue-900">
        <span>NariaGroup</span>LTD
      </div>

      <div className="lg:hidden flex items-center" onClick={toggleMenu}>
        <button className="text-blue-900 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu Links */}
      <div
        className={`lg:flex ${isMenuOpen ? 'flex-col' : 'hidden'} lg:flex-row gap-6 lg:gap-10 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none z-40`}
      >
        <ul className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center">
          <li>
            <NavLink
              to="/allTask"
              className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-800")}
            >
              All Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/createTask"
              className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-800")}
            >
              Create Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myTasks"
              className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-800")}
            >
              My Task
            </NavLink>
          </li>

          {/* Logout Button */}

          {user && (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <NavLink
                  to="/profile"

                >
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </NavLink>


              ) : (
                <NavLink
                  to="/profile"

                >
                  <RxAvatar className="w-[30px] h-[30px] text-gray-500" />
                </NavLink>

              )}

              {/* Logout Button */}
              <li className="cursor-pointer" onClick={logOut}>
                Logout
              </li>
            </div>
          )}


          {!user && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-800")}
              >
                LogIn
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
