import { useEffect, useRef, useState } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logoDesktop from "../../../assets/images/logo.png";
import logoMobile from "../../../assets/images/faviconlogo.png";
import CommonButton from "../../common/button/CommonButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./Header.scss";

const Header = () => {

  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const onclick = () => {
    if (ref.current && document.body.clientWidth < 1199) {
      ref.current.click();
      setIsActive(false);
    }
  };

  // Static navigation arrays - keeping the logic structure
  const homeNav = [
    { link: "HOME", to: "#banner" },
    { link: "ABOUT", to: "#theRoot" },
    { link: "ROADMAP", to: "#roadmap" },
    {
      link: "WHITEPAPER",
      to: "#",
      target: "_blank",
    },
    { link: "TOKENOMICS", to: "#tokenomics" },
    // { link: walletAddress ? "BUY" : "", to: "/buy" },
  ];

  const innerNav = [
    { link: "Home", to: "/" },
  ];
  const navlink = location.pathname === "/" ? homeNav : innerNav;


  const [placement, setPlacement] = useState<Placement>(
    (window.innerWidth < 576 ? "right" : "bottom") as Placement
  );
  useEffect(() => {
    const handleResize = () => {
      setPlacement((window.innerWidth < 576 ? "right" : "bottom") as Placement);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isActive]);
  return (
    <header className={isActive ? "siteHeader openmenu" : "siteHeader"}>
      <Container>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="brandLogo">
            <Link to="/" className="d-flex align-items-center">
              <span className="logo-desktop">
                {/* <LogoIcon /> */}
                <img src={logoDesktop} alt="logo_img" />
              </span>
              <img src={logoMobile} alt="" className="logo-mobile" />
            </Link>
          </div>
          <div className="siteHeader_right">
            <div className={`headernav_link ${isActive ? "show" : ""}`}>
              <Link to="#" className="sidebar_logo d-flex d-xl-none ">
                <img src={logoDesktop} alt="logo_img" />
              </Link>

              <ul>
                {navlink.map((item, index) => {
                  const { link, to, tooltip, target } = item as {
                    link: string;
                    to: string;
                    tooltip?: string;
                    target?: string;
                  };
                  const isExternalUrl =
                    to.startsWith("http://") || to.startsWith("https://");

                  return link ? (
                    <li key={index}>
                      {tooltip ? (
                        <OverlayTrigger
                          placement={placement}
                          overlay={
                            <Tooltip
                              className="custom_nav_tooltip"
                              id={`tooltip-${index}`}
                            >
                              {tooltip}
                            </Tooltip>
                          }
                        >
                          <div>
                            {isExternalUrl ? (
                              <a
                                href={to}
                                target={target || "_blank"}
                                rel="noopener noreferrer"
                                onClick={onclick}
                                className="nav-link"
                              >
                                {link}
                              </a>
                            ) : to.startsWith("#") ? (
                              location.pathname === "/" ? (
                                <ScrollLink
                                  to={to.replace("#", "")}
                                  smooth={true}
                                  duration={600}
                                  offset={-80}
                                  spy={true}
                                  // onClick={onclick}
                                  className="nav-link"
                                >
                                  {link}
                                </ScrollLink>
                              ) : (
                                <NavLink
                                  to={"/" + to}
                                  onClick={onclick}
                                  className="nav-link"
                                >
                                  {link}
                                </NavLink>
                              )
                            ) : (
                              <NavLink
                                to={to}
                                onClick={onclick}
                                className={({ isActive }) =>
                                  isActive ? "active nav-link" : "nav-link"
                                }
                              >
                                {link}
                              </NavLink>
                            )}
                          </div>
                        </OverlayTrigger>
                      ) : (
                        <>
                          {isExternalUrl ? (
                            <a
                              href={to}
                              target={target || "_blank"}
                              rel="noopener noreferrer"
                              onClick={onclick}
                              className="nav-link"
                            >
                              {link}
                            </a>
                          ) : to.startsWith("#") ? (
                            location.pathname === "/" ? (
                              <ScrollLink
                                to={to.replace("#", "")}
                                smooth={true}
                                duration={600}
                                offset={-80}
                                spy={true}
                                onClick={onclick}
                                className="nav-link"
                              >
                                {link}
                              </ScrollLink>
                            ) : (
                              <NavLink
                                to={"/" + to}
                                onClick={onclick}
                                className="nav-link"
                              >
                                {link}
                              </NavLink>
                            )
                          ) : (
                            <NavLink
                              to={to}
                              onClick={onclick}
                              className={({ isActive }) =>
                                isActive ? "active nav-link" : "nav-link"
                              }
                            >
                              {link}
                            </NavLink>
                          )}
                        </>
                      )}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            {isActive && (
              <div onClick={onclick} className="sidebar_backdrop d-xl-none" />
            )}
          </div>
          <div className="action_btn">
            <div className="solana_wallet_btn">
              <WalletMultiButton />
            </div>
            <CommonButton
              onClick={() => navigate("/login")}
              title="SIGN IN"
              className="btn-sm wallet_btn"
            />

            <button
              className={`toggler_btn ${isActive ? "active" : ""}`}
              ref={ref}
              onClick={toggleClass}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
