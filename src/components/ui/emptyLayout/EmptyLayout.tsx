import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./EmptyLayout.scss";

const EmptyLayout = () => {
  return (
    <>
      <div className="emptylayout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EmptyLayout;
