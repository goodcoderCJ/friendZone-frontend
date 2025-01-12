import { Outlet } from "react-router-dom";
import Menubar from "./Menubar";
import Footer from "./Footer";

// root layout component

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Menubar />
      <div className="flex-1 py-[1rem]">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
