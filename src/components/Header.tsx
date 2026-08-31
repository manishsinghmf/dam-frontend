import { Bell, User } from "lucide-react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">

      {/* Application Name */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          DAM Platform
        </h1>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">

        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <button
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <User size={20} />

          <span className="text-sm font-medium text-gray-700">
            Admin
          </span>
        </button>

      </div>
    </header>
  );
}

export default Header;