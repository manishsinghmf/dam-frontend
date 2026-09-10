import { useState } from "react";
import {
  Menu,
  Image as ImageIcon,
} from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState<boolean>(false);

  const isLoginPage =
    location.pathname === "/login";

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="ml-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ImageIcon size={16} />
            </div>

            <span className="font-semibold text-gray-900">
              DAM
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;