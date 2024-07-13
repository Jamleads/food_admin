import { Outlet } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { useState } from "react";
import SideBar from "../pages/SideBar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="lg:flex h-[100vh]">
        <div
          className={`sidebar ${
            sidebarOpen ? "w-[20%]" : "w-[5%]"
          } relative bg-white shadow-2xl h-[100vh] rounded-r-2xl z-10 !overflow-y-hidden`}
        >
          <SideBar sidebarOpen={sidebarOpen} />

          <div
            onClick={toggleSideBar}
            className="toggleSideBar absolute top-16 -right-2 w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
          >
            {sidebarOpen ? (
              <FaChevronLeft className="text-3xl" />
            ) : (
              <TfiMenu className="text-3xl text-theGreen" />
            )}
          </div>
        </div>

        <div
          className={`${
            sidebarOpen ? "md:w-[80%]" : "w-[95%]"
          } relative overflow-y-scroll`}
        >
          <div className="md:px-5 py-20 px-3 !overflow-y-scroll">
            <Outlet />
          </div>

          <div
            className={`hidden w-[60%] z-5 bg-green-300 shadow-2xl rounded-r-2xl h-[100vh] absolute top-0 bottom-0 left-0 px-4`}
          >
            <SideBar sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
