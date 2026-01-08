import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import VectorImage from "../../../../assets/images/Samurai.png"
import "./CryptoSecurity.scss";
import CommonButton from "../../../common/button/CommonButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NiceModal from "@ebay/nice-modal-react";

gsap.registerPlugin(useGSAP);

const CryptoSecurity = () => {
    const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

    const cryptoContent = [
        {
            title: "Utility and Rewards in Gaming",
            text: "ROCK is essential for entering tournaments, competing in prize pools, and upgrading unique animal avatars. Large pots of ROCK tokens are up for grabs every 5-10 minutes, 24/7 worldwide, giving players a fair, skill-based chance to win big."
        },
        {
            title: "Efficient Tournament Mechanics",
            text: "Streamlined bracket-style elimination (two players per game, winners advancing). For example, 100,000 players entering with 10 ROCK each creates a 1,000,000 ROCK pool, resolved in under 20 minutes by eliminating 17 opponents."
        },
        {
            title: "Additional Features",
            text: "Spectator modes, leaderboards, and affiliate payouts create endless ways to earn and engage."
        },
        {
            title: "Community-Driven Value",
            text: "Capped at 2.1 billion tokens with built-in scarcity and vesting schedules for sustainable release. 15% of supply is dedicated to launch rewards, distributed via mission points for tasks like registering, inviting friends, and joining social channels. Loyalty Club members (unlocked at higher avatar levels) receive bonus rewards, including 5% of every tournament pot."
        },
        {
            title: "Real-World Impact Through Charity",
            text: "10% of total supply (210 million tokens) allocated to charity. A percentage of every tournament pot, avatar upgrade, and more is donated to wildlife conservation, inspired by the animal avatars (e.g., fierce tigers, wise pandas, elusive snow leopards). Players vote on charities via profiles and DAO proposals, with 10 options always available. The ultimate goal is to acquire land, build assets, and establish the Rock Community's own animal rescue and rehabilitation center."
        },
        {
            title: "Transparency and Security",
            text: "Built on blockchain with provably fair matches, traceable donations, and secure transactions. Strict KYC ensures only real 18+ players from eligible jurisdictions participate—no bots or shortcuts."
        },
        {
            title: "Early Community Members",
            text: "Pre-sale participants secure ROCK at foundational pricing, gain early access to rewards, avatars, and governance, and support hosting and marketing through the Funds Treasury. As the ecosystem grows, token utility and demand increase via expanding tournaments, partnerships, and a loyal user base."
        },
        {
            title: "Supply",
            text: "Only a small percentage of supply is available at launch. Reward recipients can play with tokens but cannot sell for 60 days, followed by 10% monthly release over the next 10 months. Pre-sale participants may then decide if they want to sell portions of their utility tokens to the community at market rates."
        }
    ];

    const truncateText = (text: string, maxWords: number = 10): string => {
        const words = text.split(' ');
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '...';
    };

    const toggleExpand = (index: number) => {
        setExpandedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const ReadMoreText = ({ text, index }: { text: string; index: number }) => {
        const isExpanded = expandedStates[index] || false;
        const truncatedText = truncateText(text, 10);
        const needsTruncation = text.split(' ').length > 10;

        return (
            <p>
                {isExpanded ? text : truncatedText}
                {needsTruncation && (
                    <span 
                        className="read-more-btn" 
                        onClick={() => toggleExpand(index)}
                    >
                        {' '}{isExpanded ? 'Read less' : 'Read more'}
                    </span>
                )}
            </p>
        );
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".cryptosec",
                start: "top 40%",
                toggleActions: "play none none reverse",
            },
            defaults: {
                ease: "power3.out",
            },
        });

        tl.from(".cryptosec_left h2,.cryptosec_left p,.cryptosec_left strong", {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
        });
        tl.from(".cryptosec .cryptosec_left .face-scan-img", {
            scale: 1.1,
            duration: 1,
        }, "-=.8");
        tl.from(".cryptosec .cryptosec_right .cryptosec_right_tile", {
            x: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
        }, "-=1");

        tl.from(".cryptosec_right_tile .cryptosec_right_tile_icon,.cryptosec_right_tile h2,.cryptosec_right_tile p", {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
        }, "-=0.4");


    }, []);
    return (
        <>
            <div className="cryptosec">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="cryptosec_left">
                            <h2 className="t_heading">Why ROCK Tokens</h2>
                            <p className="t_small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </p>
                            <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </strong>
                            <div className="cryptosec_left_scanner">
                                <img src={VectorImage} alt="face-scan-img" className="face-scan-img" height={300} width={401}/>
                            </div>
                        </Col>
                        <Col lg={6} className="cryptosec_right">
                            {cryptoContent.map((item, index) => (
                                <div key={index} className="cryptosec_right_tile">
                                    <div className="cryptosec_right_tile_info">
                                        <h3>{item.title}</h3>
                                        <ReadMoreText 
                                            text={item.text}
                                            index={index}
                                        />
                                    </div>
                                </div>
                            ))}
                            <CommonButton className="discover_btn" title="Discover the Solution"   onClick={() => NiceModal.show("PublicModal")}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default CryptoSecurity;
