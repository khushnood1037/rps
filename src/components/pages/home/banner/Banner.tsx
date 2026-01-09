import { Col, Container, Row } from "react-bootstrap";
import CommonButton from "../../../common/button/CommonButton";
import Countdown from "../../../common/countdown/Countdown";
import "./Banner.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NiceModal from "@ebay/nice-modal-react";
import BuyCard from "../buyCard/BuyCard";

const Banner = () => {


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    gsap.fromTo(
      ".banner_video",
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );

    tl.from(
      ".banner_desc",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
      },
      "-=0.5"
    );

    tl.from(
      ".banner_content_in p",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
      },
      "-=0.4"
    );

    tl.from(
      ".banner_content_in .banner-btn-anime",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      },
      "-=0.3"
    );
  }, []);


  return (
    <>
      <div className="banner" id="banner">
        {/* <video
          // ref={videoRef}
          src="https://d1m3ouxjy8rwjs.cloudfront.net/face-recognition-video1.mp4"
          autoPlay
          loop
          webkit-playsinline="true"
          muted
          playsInline
          preload="auto"
          className="banner_video"
        /> */}
        <Container>
          <div className="banner_inner">

            <div className="banner_content">
              <Row className="align-items-center">
                <Col md={6}>
                  <div className="banner_content_in">
                  <h1>
                    <span>ROCK TOKEN</span>
                    Powering Global-scale Rock-paper-scissors Tournaments On Solana
                  </h1>
                    <p>
                      The Token uniting a global gaming community. Essential for entry into every tournament and rewards pool. Every early participation fuels the foundation and treasury of the Rock Tournaments ecosystem — from core infrastructure to global marketing, ensuring long-term utility, adoption, and stability. Proceeds support immediate post-launch readiness, driving real demand through nonstop gameplay and community expansion.
                    </p>
                    <CommonButton
                      className="mt-16 banner-btn-anime"
                      // onClick={() => handleNavigation()}
                      onClick={() => NiceModal.show("PublicModal")}
                      title="PUBLIC SALE"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <BuyCard />
                </Col>
              </Row>
            </div> 
          </div>
        </Container>
      </div>
    </>
  );
};

export default Banner;
