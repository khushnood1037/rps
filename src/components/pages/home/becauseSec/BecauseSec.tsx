import { Col, Container,  Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import "./BecauseSec.scss"
import CommonHeading from "../../../common/commonHeading/CommonHeading"
import Slider  from "react-slick"
import becImg1 from "../../../../assets/images/bec_img1.png"
import becImg2 from "../../../../assets/images/bec_img2.png"
import becImg3 from "../../../../assets/images/bec_img3.png"
import { CircleCheckIcon } from "../../../../assets/svgImgs/SvgImgs"
import CommonButton from "../../../common/button/CommonButton"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
interface SlideButton {
  label: string;
  link: string;
}
interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  sections?: {
    heading: string;
    items: string[];
  }[];
  listItems?: string[];
  buttons?: SlideButton[];
  text?: string;
}

const BecauseSec: React.FC = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".becauseSec",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".becauseSec_slider_img", {
      x: -200,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.2,
    });
  }, []);

  const slidesData: SlideData[] = [
    {
      id: 1,
      title: "Rock Tournaments Platform",
      subtitle: "Rock Token powers Rock Tournaments—a decentralized platform on Solana that transforms Rock-Paper-Scissors into massive, global skill-based competitions.",
      image: becImg1,
      sections: [
        {
          heading: "",
          items: [
            "Provably fair matches on blockchain",
            "Fast, low-cost gameplay with efficient brackets (e.g., 100,000 players resolved in minutes)",
            "Launches in Fun Mode for practice; Competition Mode activates post-launch for ROCK rewards",
          ],
        },
      ],
      text: "Every tournament is skill-driven and community-focused—built for nonstop 24/7 global play.",
    },
    {
      id: 2,
      title: "Token Utility & Gameplay",
      description:"ROCK is the essential utility token required to fully participate in Rock Tournaments post-launch.",
      image: becImg2,
      listItems: ["Required for tournament entries and prize pool competition", 
        "Enables loyalty club rewards", "Powers affiliate rewards, leaderboards, and more"],
      text: "Players compete in frequent prize pools (every 5-10 minutes worldwide), with 5% redistributed to Loyalty Club members—driving recurring gameplay engagement.",
    },
    {
      id: 3,
      title: "Community, Governance & Charity Impact",
      subtitle: "Rock Tournaments put players first through true community ownership and real-world impact.",
      image: becImg3,
      listItems: [
        "DAO governance: Players vote on updates, events, and charity selections via Loyalty Club",
        "Ownerless Cayman Foundation ensures transparency and long-term vision",
        "10% of supply dedicated to wildlife conservation—portions from pots/upgrades support community-voted causes",
      ],
      text: "Join a loyal, player-owned ecosystem where skill wins rewards and every play contributes to protecting endangered species. ",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<Slider | null>(null);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    beforeChange: (_old: number, next: number) => setCurrentIndex(next),
  };

  useEffect(() => {
    const sliderList =
      sliderRef.current?.innerSlider?.list ||
      sliderRef.current?.list;

    if (!sliderList) return;

    const pause = () => sliderRef.current?.slickPause();
    const play = () => sliderRef.current?.slickPlay();

    sliderList.addEventListener("touchstart", pause);
    sliderList.addEventListener("touchend", play);
    sliderList.addEventListener("touchcancel", play);

    return () => {
      sliderList.removeEventListener("touchstart", pause);
      sliderList.removeEventListener("touchend", play);
      sliderList.removeEventListener("touchcancel", play);
    };
  }, []);
  return (
    <>
      <section className="becauseSec">
        <Container>
          <CommonHeading
            title="Because Players Deserve Ownership, Fairness, and Global Impact."
          />

          <div className="becauseSec_inner">
            <div className="becauseSec_slider">
              <Row className="row align-items-center w-100 m-0">
                <Col lg={6} className="becauseSec_slider_img">
                  {slidesData.map((slide, idx) => (
                    <img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.title}
                      className={idx === currentIndex ? "active" : ""}
                    />
                  ))}
                </Col>

                <Col lg={6}>
                  <div className="becauseSec_slider_content">
                    <Slider {...settings} ref={sliderRef}>
                      {slidesData.map((slide) => (
                        <div key={slide.id} className="slide">
                          <h3 className="slide-title">{slide.title}</h3>
                          {slide.subtitle && (
                            <p className="slide-desc">{slide.subtitle}</p>
                          )}
                          {slide.description && <p>{slide.description}</p>}

                          {slide.sections &&
                            slide.sections.map((section, index) => (
                              <div className="mb-4" key={index}>
                                <h4 className="mb-4">{section.heading}</h4>
                                <ul>
                                  {section.items.map((item, i) => (
                                    <li key={i}>
                                      <span>
                                        <CircleCheckIcon />
                                      </span>{" "}
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                          {slide.listItems && (
                            <>
                              <ul>
                                {slide.listItems.map((item, i) => (
                                  <li key={i}>
                                    <span>
                                      <CircleCheckIcon />
                                    </span>{" "}
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {slide.text && <p>{slide.text}</p>}

                         

                          {slide.buttons && (
                            <div className="d-flex gap-3 mt-4">
                              {slide.buttons.map((btn, index) => (
                                <a
                                  key={index}
                                  href={btn.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <CommonButton title={btn.label} />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BecauseSec;