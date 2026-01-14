import { Col, Container, Row } from "react-bootstrap";
import "./Banner.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import BuyCard from "../buyCard/BuyCard";
import Coin from "../../../../assets/images/rockcoin.png";
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
              <Row className="align-items-center justify-content-center">
                <Col md={8}>
                  <div className="banner_content_in">
                  <h1>
                    <span><img src={Coin} alt="ROCK TOKEN" />ROCK TOKEN</span>
                    Your key to every tournament + all rewards pools
                  </h1>
                    <p  className="mb-4">
                    Early buyers build the ecosystem.
                    </p>
                    <p className="text-capitalize"><strong>Secure your spot. Build the future now.</strong></p>
                  </div>
                </Col>
                {/* <Col md={6}>
                  <BuyCard />
                </Col> */}
              </Row>
            </div> 
          </div>
        </Container>
      </div>
    </>
  );
};

export default Banner;
