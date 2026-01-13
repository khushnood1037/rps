import { useNavigate, useLocation } from "react-router-dom";
import CommonButton from "../../common/button/CommonButton";
import "./ErrorPage.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleGoHome = () => {
    if (isAdminRoute) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="error">
        <h1>404</h1>
        <h4>This page is not found</h4>
        <CommonButton
          title="Go to Home"
          onClick={handleGoHome}
        />
      </div>
    </>
  );
};

export default ErrorPage;
