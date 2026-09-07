import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex min-h-screen flex-col">
      <header />

      <div className="flex flex-1">
        {!isLoginPage && <Sidebar />}
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;