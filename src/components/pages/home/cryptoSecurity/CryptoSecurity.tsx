import { Col, Container, Row } from "react-bootstrap";
import VectorImage from "../../../../assets/images/Samurai.png";
import "./CryptoSecurity.scss";
import CommonButton from "../../../common/button/CommonButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NiceModal from "@ebay/nice-modal-react";
import CommonHeading from "../../../common/commonHeading/CommonHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CryptoSecurity = () => {
  const cryptoContent = [
    {
      title: "Utility and Rewards in Gaming",
      text:
        "ROCK is essential for entering tournaments, competing in prize pools, and upgrading unique animal avatars. Large pots of ROCK tokens are up for grabs every 5-10 minutes, 24/7 worldwide, giving players a fair, skill-based chance to win big.",
    },
    {
      title: "Efficient Tournament Mechanics",
      text:
        "Streamlined bracket-style elimination (two players per game, winners advancing). For example, 100,000 players entering with 10 ROCK each creates a 1,000,000 ROCK pool, resolved in under 20 minutes by eliminating 17 opponents.",
    },
    {
      title: "Additional Features",
      text:
        "Spectator modes, leaderboards, and affiliate payouts create endless ways to earn and engage.",
    },
    {
      title: "Community-Driven Value",
      text:
        "Capped at 2.1 billion tokens with built-in scarcity and vesting schedules for sustainable release. 15% of supply is dedicated to launch rewards, distributed via mission points for tasks like registering, inviting friends, and joining social channels.",
    },
    {
      title: "Real-World Impact Through Charity",
      text:
        "10% of total supply allocated to charity. A percentage of every tournament pot, avatar upgrade, and more is donated to wildlife conservation. Players vote on charities via DAO proposals.",
    },
    {
      title: "Transparency and Security",
      text:
        "Built on blockchain with provably fair matches, traceable donations, and secure transactions. Strict KYC ensures only real 18+ players participate.",
    },
    {
      title: "Early Community Members",
      text:
        "Pre-sale participants secure ROCK at foundational pricing, gain early access to rewards, avatars, and governance.",
    },
    {
      title: "Supply",
      text:
        "Limited initial supply. Rewards are locked for 60 days, then released gradually over 10 months.",
    },
  ];

  useGSAP(() => {
    if (window.innerWidth < 768) return;

    const section = document.querySelector(".cryptosec") as HTMLElement;
    const scrollArea = document.querySelector(
      ".cryptosec_right_scroll"
    ) as HTMLElement;

    if (!section || !scrollArea) return;

    const getScrollDistance = () =>
      scrollArea.scrollHeight - scrollArea.clientHeight;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        scrollArea.scrollTop = self.progress * getScrollDistance();
      },
    });
  }, []);

  return (
    <div className="cryptosec">
      <Container>
        <Row className="align-items-start">
          <Col lg={6} className="cryptosec_left">
            <CommonHeading title="Why ROCK Tokens" />
            <div className="cryptosec_left_scanner">
              <img
                src={VectorImage}
                alt="face-scan-img"
                className="face-scan-img"
                width={300}
                height={401}
              />
            </div>
          </Col>

          <Col lg={6} className="cryptosec_right">
            <div className="cryptosec_right_scroll">
              {cryptoContent.map((item, index) => (
                <div key={index} className="cryptosec_right_tile">
                  <div className="cryptosec_right_tile_info">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}

              <CommonButton
                className="discover_btn"
                title="Discover the Solution"
                onClick={() => NiceModal.show("PublicModal")}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CryptoSecurity;
