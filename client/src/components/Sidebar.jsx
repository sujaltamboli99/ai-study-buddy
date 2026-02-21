import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Brain,
  Calendar,
  BarChart3,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "AI Chat", path: "/chat", icon: MessageSquare },
    { name: "Notes Generator", path: "/notes", icon: FileText },
    { name: "Quiz Mode", path: "/quiz", icon: Brain },
    { name: "flashcards", path: "/flashcards", icon: Calendar },
    { name: "Progress Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-6">
      <h1 className="text-2xl font-bold text-purple-600 mb-10">
        AI Study Buddy
      </h1>

      <div className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-purple-100 text-purple-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto bg-purple-50 p-4 rounded-xl">
        <p className="text-sm font-medium text-purple-600">Upgrade Plan</p>
        <p className="text-xs text-purple-400 mb-3">
          Get unlimited AI access
        </p>
        <button className="w-full bg-white border rounded-lg py-2 text-sm">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default Sidebar;