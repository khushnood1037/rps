import tokeno from "../../../../assets/images/tokeno.png";
import { Col, Container, Row } from "react-bootstrap";
import { TickIcon } from "../../../../assets/svgImgs/SvgImgs";
import CommonButton from "../../../common/button/CommonButton";
import CommonHeading from "../../../common/commonHeading/CommonHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Tokenomics.scss";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Tokenomics = () => {

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".tokenomics",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
        });

        tl.from(".tokenomics_left img", {
            scale: 0.85,
            opacity: 0,
            duration: 1,
        });

        tl.from(".tokenomics_right_detail .tokens", {
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
        }, "-=0.6");

        tl.from(".tokenomics_right > p, .tokenomics_right h4", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
        }, "-=0.4");

        tl.from(".tokenomics_right ul li", {
            x: -60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
        }, "-=0.3");

        tl.from(".tokenomics_right .animate-btn", {
            y: 40,
            opacity: 0,
            duration: 0.7,
        }, "-=0.2");

    }, []);

    const cards = [
        {
            type: "Token Name",
            name: "ROCK",
        },
        {
            type: "Token Type",
            name: "Utility",
        },
    ]

    const data = [
        {
            data: "Public Token Distribution: No vesting — tokens fully available at launch (with per-wallet limits for fair distribution) Limited to 1 million tokens per player per tranche to prevent rug-pulls.",
        },
        {
            data: "Tournament Affiliates & Liquidity: No lockup — immediate release for ecosystem activation and smooth trading",
        },
        {
            data: "Development Team: 1-year Lockup, followed by monthly linear vesting over 2 years"
        },
        {
            data: "Launch Rewards: 10% unlocked at TGE; remaining released gradually over 12 months. Reward tokens locked for 2 months, then 10% transferable monthly"
        },
        {
            data: "Private & Future Sales (10% combined): 6–24 month lockups with linear vesting thereafter"
        },
        {
            data: "Charity Allocation (10%): 1–2 year lockups followed by monthly linear vesting over 2 years"
        }
    ]

    return (
        <>
            <section className='tokenomics' id="tokenomics">
                <CommonHeading title="Tokenomics" />
                <Container>
                    <Row className="align-items-center g-5">
                        <Col md={12} lg={6}>
                            <div className="tokenomics_left">
                                <img src={tokeno} alt="tokeno_img" />
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
                            <div className="tokenomics_right">
                                <div className="tokenomics_right_detail">
                                    {cards.map((item, index) => (
                                        <div className="tokens" key={index}>
                                            <p>{item.type}</p>
                                            <h3>{item.name}</h3>
                                        </div>
                                    ))}
                                </div>
                                <p><span>Use Cases: </span>Tournament entry fees • Avatar upgrades • Governance voting • Active Reserve rewards • Ecosystem participation</p>
                                <h4>Vesting & Lockup Schedule</h4>
                                <p>Structured vesting promotes stability, prevents short-term volatility, and aligns all stakeholders with long-term ecosystem success:</p>
                                <ul >
                                {data.map((item, index) => (
                                        <li key={index}>
                                            <span className="img"><TickIcon /></span>
                                            <p>
                                                {item.data}
                                            </p>
                                        </li>
                                ))}
                                </ul>

                                <p>Structured vesting promotes stability, prevents short-term volatility, and aligns all stakeholders with long-term ecosystem success:</p>

                                <CommonButton className="animate-btn" title="Participate in Token Distribution" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Tokenomics;