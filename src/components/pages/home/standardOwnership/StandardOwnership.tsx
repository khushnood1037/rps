import { Col, Container, Row } from "react-bootstrap"
import "./StandardOwnership.scss"
import CommonHeading from "../../../common/commonHeading/CommonHeading"
import { MissionIcon, VisionEyeIcon } from "../../../../assets/svgImgs/SvgImgs";
import CommonButton from "../../../common/button/CommonButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NiceModal from "@ebay/nice-modal-react";
gsap.registerPlugin(useGSAP);

const StandardOwnership = () => {

    const handleOpen = () => {
        NiceModal.show("PrivateModal");
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".standardOwnership",
                    start: "top 40%",
                    toggleActions: "play none none reverse",
                },
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.from(".standardOwnership_card", {
                y: 80,
                opacity: 0,
                duration: .8,
                stagger: 0.15,
            });

            tl.from(".standardOwnership_card .standardOwnership_card_icon", {
                x: -60,
                opacity: 0,
                duration: .8,
                stagger: 0.1,
            }, "-=0.4");
            tl.from(".standardOwnership_card h2,.standardOwnership_card p", {
                y: 60,
                opacity: 0,
                duration: .8,
                stagger: 0.1,
            }, "-=0.4");
            tl.fromTo(".standardOwnership_card", { "--line-height": "0rem" },
                { "--line-height": "13.5rem", duration: 1.2, ease: "power2.out" }, "-=2");
        });

        return () => ctx.revert();
    }, []);
    const cardsData = [
        {
            id: 1,
            title: 'Vision',
            icon: <VisionEyeIcon />,
            descriptions: [
                "At Rock Tournaments, we redefine gaming as a platform for connection, positive change, and exhilarating experiences. Our mission is to foster a dynamic community where every player contributes to collective success, supports meaningful causes, and enjoys the thrill of competition. We harness the power of play to drive real-world impact, with transparent donations empowering players to make a difference while having fun."
            ]
        },
        {
            id: 2,
            title: 'Mission',
            icon: <MissionIcon />,
            descriptions: [
                "We don't think short-term—we have a lifelong commitment to our three core pillars: Community (universal, player-owned, and inclusive), Charity (protecting endangered animals and building a legacy through our own rescue center), and Transparency (blockchain-verified fairness forever). As we grow and evolve together, Rock Token will become synonymous with loyal, impactful gaming that transcends borders and generations."
            ]
        }
    ];

    return (
        <div className="standardOwnership">
            <Container>
                <CommonHeading
                    title="Gaming with Purpose"
                    centered
                />
                <Row>
                    {cardsData.map((card) => (
                        <Col xs={12} lg={6} key={card.id} className="mb-5">
                            <div className="standardOwnership_card">
                                <div className="standardOwnership_card_icon">
                                    {card.icon}
                                </div>
                                <h2>{card.title}</h2>
                                {card.descriptions.map((desc, index) => (
                                    <p key={index}>{desc}</p>
                                ))}
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <CommonButton className="eary_btn" title="Get Early Access" onClick={handleOpen} />
                </div>
            </Container>
        </div>
    )
}

export default StandardOwnership