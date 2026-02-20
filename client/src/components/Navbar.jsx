import { Search, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-6">

      {/* Search Bar */}
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

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-500 cursor-pointer" size={20} />

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="text-sm font-medium">Sujal</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;