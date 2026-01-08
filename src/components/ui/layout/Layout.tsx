import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { Container } from "react-bootstrap";
import "./Layout.scss";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <Container>
          <main className="layout_mainSec">
            <Outlet />
          </main>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
