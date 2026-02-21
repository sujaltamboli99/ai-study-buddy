import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-6 relative">

      {/* 🔎 Search Bar */}
      <div className="relative w-1/2">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search notes, questions, or topics..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* 🔔 Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification Icon */}
        <Bell className="text-gray-500 cursor-pointer" size={20} />

        {/* 👤 User Section */}
        <div
          className="flex items-center gap-3 cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          {/* Avatar */}
          <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
            {firstLetter}
          </div>

          {/* Name + Course */}
          <div className="text-sm leading-tight">
            <p className="font-medium">
              {user?.name || "User"}
            </p>
            <p className="text-gray-500 text-xs">
              {user?.course || "Student"}
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-400" />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;