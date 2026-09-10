import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-gray-200 bg-white

          transform transition-transform duration-300 ease-in-out

          lg:static
          lg:translate-x-0

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6">
          <h2 className="text-lg font-bold text-gray-900">
            DAM
          </h2>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={onClose}
          />

          <NavItem
            to="/assets"
            icon={<Images size={20} />}
            label="Assets"
            onClick={onClose}
          />

          <NavItem
            to="/gallery"
            icon={<Images size={20} />}
            label="Gallery"
            onClick={onClose}
          />
        </nav>
      </aside>
    </>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function NavItem({
  to,
  icon,
  label,
  onClick,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default Sidebar;