import { Link as ScrollLink } from "react-scroll";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramNewIcon,
  TwitterIconNew,
  YoutubeIcon,
} from "../../../assets/svgImgs/SvgImgs.tsx";
import "./Footer.scss";
interface SocialLink {
  icon: React.ReactNode;
  href: string;
}
const socialLinks: SocialLink[] = [
  {
    icon: <TwitterIconNew />,
    href: "#",
  },
  {
    icon: <TelegramNewIcon />,
    href: "#",
  },
  {
    icon: <InstagramIcon />,
    href: "#",
  },
  // {
  //   icon: <LinkedInIcon />,
  //   href: "https://www.linkedin.com/company/108816375/",
  // },
  {
    icon: <FacebookIcon />,
    href: "#",
  },
  {
    icon: <YoutubeIcon />,
    href: "#",
  },
];
// type LinkItem = {
//   label: string;
//   link?: string;
//   path?: string;
// };
const Footer = () => {



  const quickLinks = [
    { label: "ROCK Wallet", link: "#", tooltip: "Coming Soon" },
    { label: "ROCK Blockchain", link: "#", tooltip: "Coming Soon" },
    { label: "Security", link: "#", tooltip: "Coming Soon" },
    { label: "Roadmap", link: "#roadmap" },
  ];

  const tokenLinks = [
    { label: "Tokenomics", link: "tokenomics" },
    { label: "Staking", link: "#", tooltip: "Coming Soon" },
    { label: "DAO", link: "dao" },
    {
      label: "Whitepaper",
      link: "#",
      target: "_blank",
    },
  ];
  const resourcesLinks = [
    { label: "Terms and Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Legal Overview", link: "#", tooltip: "Coming Soon" },
    { label: "Compliance", link: "#", tooltip: "Coming Soon" },
  ];
  const quickClick = (item: { link: string; label: string }) => {
    if (item.link.startsWith("#") && item.link !== "#roadmap") {
      console.log(`${item.label} clicked`);
    }
  };

  const resourceClick = (item: { tooltip?: string; label: string }) => {
    if (item.tooltip) {
      console.log(`${item.label} clicked (Coming Soon)`);
    }
  };
  return (
    <footer className="footer">
      <div className="footer_in">
        <Container>
          <Row>
            <Col xs={12} lg={4} xl={5}>
              <div className="footer_left">
                <ScrollLink
                  to="banner"
                  smooth={true}
                  duration={600}
                  offset={-80}
                  spy={true}
                  className="logo cursor-pointer"
                >
                  <img src={logo} alt="ROCK" />
                </ScrollLink>
                <p>POWERING GLOBAL-SCALE ROCK-PAPER-SCISSORS TOURNAMENTS ON SOLANA</p>
              </div>
            </Col>
            <Col xs={12} lg={8} xl={7}>
              <Row>
                <Col xs={6} sm={4} xl={4}>
                  <div className="footer_links">
                    <h4>Product</h4>
                    <ul>
                      {quickLinks.map((item, index) => (
                        <li key={index} onClick={() => quickClick(item)}>
                          {item.tooltip ? (
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip
                                  id={`tooltip-${index}`}
                                  className="custom_nav_tooltip"
                                >
                                  {item.tooltip}
                                </Tooltip>
                              }
                            >
                              <div className="d-inline-block">{item.label}</div>
                            </OverlayTrigger>
                          ) : item.link === "#roadmap" ? (
                            <ScrollLink
                              to="roadmap"
                              smooth={true}
                              duration={600}
                              offset={-80}
                              spy={true}
                              className="cursor-pointer"
                            >
                              {item.label}
                            </ScrollLink>
                          ) : (
                            <div>{item.label}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col
                  xs={6}
                  sm={4}
                  xl={4}
                  className="d-flex justify-content-center"
                >
                  <div className="footer_links w-max ">
                    <h4>Token</h4>
                    <ul>
                      {tokenLinks.map((item, index) => {
                        const isExternalUrl =
                          item.link.startsWith("http://") ||
                          item.link.startsWith("https://");
                        const itemWithTarget = item as {
                          label: string;
                          link: string;
                          tooltip?: string;
                          target?: string;
                        };

                        return (
                          <li key={index} onClick={() => quickClick(item)}>
                            {item.tooltip ? (
                              <OverlayTrigger
                                placement="right"
                                overlay={
                                  <Tooltip
                                    id={`tooltip-${index}`}
                                    className="custom_nav_tooltip"
                                  >
                                    {item.tooltip}
                                  </Tooltip>
                                }
                              >
                                <div className="d-inline-block cursor-pointer">
                                  {item.label}
                                </div>
                              </OverlayTrigger>
                            ) : isExternalUrl ? (
                              <a
                                href={item.link}
                                target={itemWithTarget.target || "_blank"}
                                rel="noopener noreferrer"
                                className="scroll-link cursor-pointer"
                              >
                                {item.label}
                              </a>
                            ) : (
                              <ScrollLink
                                to={item.link}
                                smooth={true}
                                duration={600}
                                offset={-80}
                                spy={true}
                                activeClass="active"
                                className="scroll-link cursor-pointer"
                              >
                                {item.label}
                              </ScrollLink>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    
                  </div>
                </Col>
                <Col
                  xs={6}
                  sm={4}
                  xl={4}
                  className="mt-4 mt-sm-0 d-flex justify-content-end "
                >
                  <div className="footer_links w-max">
                    <h4>Resources</h4>
                    <ul>
                      {resourcesLinks.map((item, index) => (
                        <li key={index} onClick={() => resourceClick(item)}>
                          {item.tooltip ? (
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip
                                  id={`tooltip-${index}`}
                                  className="custom_nav_tooltip"
                                >
                                  {item.tooltip}
                                </Tooltip>
                              }
                            >
                              <div className="d-inline-block cursor-pointer">
                                {item.label}
                              </div>
                            </OverlayTrigger>
                          ) : (
                            <Link to={item.path} className="cursor-pointer">
                              {item.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer_bottom">
        <Container>
          <div className="footer_bottom_in">
            <p>
              © {new Date().getFullYear()} ROCK, All Rights Reserved |{" "}
              <a href="mailto:contact@rock.app">contact@rock.app</a>
            </p>
            <ul className="social_links">
              {socialLinks.map(({ icon, href }, index) => (
                <li key={index}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
