import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border border-gray-200 bg-white">

      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h2 className="text-lg font-bold text-gray-900">
          DAM
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/assets"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Images size={20} />
          Assets
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Images size={20} />
          Gallery
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;