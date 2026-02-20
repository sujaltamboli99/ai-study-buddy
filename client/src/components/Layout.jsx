import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar - Fixed */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 ml-64 flex flex-col">

        {/* Navbar - Fixed */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;