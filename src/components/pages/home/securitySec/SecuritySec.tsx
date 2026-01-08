import { Col, Container, Row } from "react-bootstrap"
import "./SecuritySec.scss"
import CommonHeading from "../../../common/commonHeading/CommonHeading"
import img1 from "../../../../assets/images/Adventurer.png"
import img2 from "../../../../assets/images/Emperor.png"
import { CircleCheckIcon } from "../../../../assets/svgImgs/SvgImgs"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
gsap.registerPlugin( useGSAP);

const layersData = [
    {
        heading: "Marketing - Reward the Community.",
        items: [
            {
                title: "Core strategy",
                detail:
                    "Convert influencers into affiliates with ongoing payouts to reward both influencers and community builders",
            },
            {
                title: "Allocation",
                detail:
                    "Allocated a robust 30% of total tokens specifically for marketing and the affiliate program",
            },
            {
                title: "Affiliate rewards",
                detail: [
                    <p>Earn 5% of tokens played by referred players for the first 12 months</p>, <p>Receive unique referral codes</p>, <p>Access exclusive tournaments</p> ]
            },
            {
                title: "The Rock game enables influencers to",
                detail:
                    [<p>Interact directly with their community</p>, <p>Raise funds for charity simultaneously</p>]
            },
            {
                title: "Interoperability",
                detail:
                    "Development architecture supports integration with all major streaming platforms",
            },
            {
                title: "Post-launch growth drivers",
                detail: [<p>Engaging missions</p>, <p>Cross-platform access (iOS, Android, web)</p>, <p>Designed for organic, viral spread</p>]
            },
            {
                title: "Integrity",
                detail:"Built on provably fair mechanics and strict KYC processes to ensure trust and enable widespread adoption",
            },
        ],
    },
];

const rockData = [
    {
        heading:
            "Transparency & Security Engineered – Not Assumed",
            description: "Rock Tournaments is built on a foundation of trust, with every layer engineered to protect player privacy and security.",
        items: [
            {
                title: "Registered Entity",
                detail: "Dedicated issuance company – British Virgin Islands (BVI)",
            },
            {
                title: "Foundation Structure",
                detail: "Ownerless Rock Foundation – Cayman Islands",
            },
            {
                title: "Nature of platform",
                detail: "Skill-based competitive gaming with charity impact",
            },
            {
                title: "Provably Fair on Solana",
                detail: "Every match and outcome immutable and publicly verifiable",
            },
            {
                title: "On-Chain Charity Traceability",
                detail: "All donations fully transparent and auditable via blockchain",
            },
            {
                title: "Player Protection",
                detail: "Strict KYC, age verification (18+), and geo-restrictions enforced",
            },
        ],
    },
];

const ItemList: React.FC<{ items: { title: string; detail: string }[] }> = ({ items }) => (
    <ul className="">
        {items.map((item, idx) => (
            <li key={idx}>
                <span className="checkIcon"><CircleCheckIcon /></span>
                <p><strong>{item.title}:</strong> {item.detail}</p>
            </li>
        ))}
    </ul>
);

const SecuritySec = () => {
    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".securitySec_card").forEach((card) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(card.querySelector("h3"), {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    card.querySelectorAll("li"),
                    {
                        y: 30,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.3"
                )
                .from(
                    card.querySelector(".securitySec_card_img img"),
                    {
                        x: 80,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
            tl.from(".securitySec_card_content", {
                "--arrowY": "40px", 
                duration: 0.8,
                ease: "linear",
            }, "-=1");
        });

    }, []);

    return (
        <>
            <section className="securitySec">
                <Container>
                    <CommonHeading
                        title="Security, Engineered - Not Assumed"
                        subtitle="Rock Tournament’s architecture is built on a single principle: Privacy by Design."
                        centered
                    />
                    <div className="securitySec_card mb-5">
                        {layersData.map((section, idx) => (
                            <Row className="align-items-center" key={idx}>
                                <Col lg={7} xl={6} >
                                    <div className="securitySec_card_content">
                                        <h3>{section.heading}</h3>
                                        <ItemList items={section.items} />
                                    </div>
                                </Col>
                                <Col lg={5} xl={6}>
                                    <div className="securitySec_card_img text-center text-lg-end">
                                        <img src={img1} alt="securitySec_card_img" width={500} height={601}/>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </div>
                    <div className="securitySec_card">
                        {rockData.map((section, idx) => (
                            <Row className="align-items-center" key={idx}>
                                <Col lg={7} xl={6} >
                                    <div className="securitySec_card_content">
                                        <h3>{section.heading}</h3>
                                        <p>{section.description}</p>
                                        <ItemList items={section.items} />
                                    </div>
                                </Col>
                                <Col lg={5} xl={6}>
                                    <div className="securitySec_card_img text-center text-lg-end">
                                        <img src={img2} alt="securitySec_card_img"width={587} height={412} />
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </div>
                    {/* <Row>
                        <Col lg={6}>
                            <h3>Every layer is engineered to remove assumptions and eliminate attack surfaces - ensuring that protection isn’t promised, it’s proven.</h3>
                            <ul>
                                {biodata.map((item: any, index: number) => (
                                    <li key={index}>
                                        <p><strong>{item.title}</strong> {item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={6}>

                        </Col>
                    </Row> */}
                </Container>
            </section>
        </>
    )
}

export default SecuritySec