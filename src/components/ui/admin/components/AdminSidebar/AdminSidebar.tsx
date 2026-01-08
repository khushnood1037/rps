import { useModal } from "@ebay/nice-modal-react";
import { useCallback, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  LogoutIcon,
  SettingIcon,
  TransactionHistoryIconNew,
  UserIcon
} from "../../../../../assets/svgImgs/SvgImgs";
import "./AdminSidebar.scss";
import logo from "../../../../../assets/images/logo.png";
interface sidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
const AdminSidebar = ({ isOpen, setIsOpen }: sidebarProps) => {
  const location = useLocation();

  const navLinks = [
    { path: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { path: "users", icon: <UserIcon />, label: "Users" },
    {
      path: "transaction-history",
      icon: <TransactionHistoryIconNew />,
      label: "Transaction History",
    },
    { path: "settings", icon: <SettingIcon />, label: "Settings" },
  ];
  useEffect(() => {
    if (window.innerWidth <= 991) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const logoutModal = useModal("LogoutModal");
  const closeLogoutModal = useCallback(() => {
    logoutModal.remove();
  }, [logoutModal]);

  return (
    <>
      <aside className={`admin_sidebar ${isOpen ? "collapsed" : ""}`}>
        <div className="admin_sidebar_logo">
          <Link to="/admin/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="admin_sidebar_links">
          <ul>
            {navLinks.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={() => {
                      const currentPath = location.pathname;

                      if (item.path === "users") {
                        if (
                          currentPath.startsWith("/admin/users")
                        ) {
                          return "active";
                        }
                      }
                      if (currentPath.startsWith(`/admin/${item.path}`))
                        return "active";

                      return "";
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="admin_sidebar_bottom">
            <button
              className="logout_btn"
              onClick={() => {
                logoutModal.show({ closeLogoutModal });
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`sidebar_overlay ${isOpen ? "active_overlay" : ""}`}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
