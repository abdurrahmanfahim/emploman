import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* ========= Sidebar ========= */}
      <div>
        <Sidebar />
      </div>

      {/* ========= Children ========= */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 pt-16 lg:pt-8 max-w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
