import { FaHome } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { signOut } from "../features/redux-slice/userSlice";
import { useDispatch } from "react-redux";

const Menubar = () => {
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(false);
  const navToggle = () => {
    setNavOpen(!navOpen);
  };

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className="menu bg-blue-700  py-[1rem] ">
      <div className="wrapper mx-[3rem] flex sm:gap-3 md:gap-3 items-center justify-between sm:justify-normal md:justify-normal">
        <div className="logo text-white">
          <Link to="/" className=" flex gap-1 items-center">
            <p>friendZone</p>
            <FaHome className="text-red-600" />
          </Link>
        </div>
        <nav className="main-nav text-white hidden sm:flex md:flex gap-5 items-center sm:text-[15px] md:text-[16px]">
          {/* created different links based on if user is sign in or not, and this navbar for bigger screen*/}
          {user ? (
            <>
              <NavLink to="/users">USERS</NavLink>
              <NavLink to={`/user/${user.id}`}>MY PROFILE</NavLink>
              <button onClick={handleSignOut}>SIGN OUT</button>
            </>
          ) : (
            <>
              <NavLink to="/signup">SIGN UP</NavLink>
              <NavLink to="/signin">SIGN IN</NavLink>
            </>
          )}
        </nav>
        {/* menubar for mobile screens */}
        <FaBars
          className="text-white flex sm:hidden md:hidden"
          onClick={navToggle}
        />
      </div>
      {/* created different links based on if user is sign in or not, and this navbar for mobile screen*/}
      {navOpen && (
        <div className="mobile-nav flex items-center justify-center p-[1rem] sm:hidden md:hidden">
          <nav className="main-nav text-white flex flex-col gap-4 items-center ">
            {user ? (
              <>
                <NavLink to="/users">USERS</NavLink>
                <NavLink to={`/user/${user.id}`}>MY PROFILE</NavLink>
                <button onClick={handleSignOut}>SIGN OUT</button>
              </>
            ) : (
              <>
                <NavLink to="/signup">SIGN UP</NavLink>
                <NavLink to="/signin">SIGN IN</NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menubar;
