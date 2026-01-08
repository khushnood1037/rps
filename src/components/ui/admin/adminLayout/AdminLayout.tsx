import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="admin_layout">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`admin_main`}>
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="admin_content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
