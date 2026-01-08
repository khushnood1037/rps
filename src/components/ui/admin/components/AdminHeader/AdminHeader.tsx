import { Dropdown } from "react-bootstrap";
import { memo } from "react";
import { UserIcon } from "../../../../../assets/svgImgs/SvgImgs";
import "./AdminHeader.scss";

const AdminHeader = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <header className="admin_header">
      <h2>ADMIN DASHBOARD</h2>

      <div className="admin_header_right">
        <Dropdown className="profile_dropdown">
          <Dropdown.Toggle>
            <div>
              <h3>Hello Admin</h3>
            </div>
            <div className="drop_icon">
              <UserIcon />
            </div>
          </Dropdown.Toggle>
        </Dropdown>

        <button
          className={`menu_btn ${isSidebarOpen ? "close_menu" : ""}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default memo(AdminHeader);
