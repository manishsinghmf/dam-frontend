import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;