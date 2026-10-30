import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
