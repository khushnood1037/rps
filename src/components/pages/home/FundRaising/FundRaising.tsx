import { Col, Container, Row } from 'react-bootstrap'
import './FundRaising.scss'
import CommonHeading from '../../../common/commonHeading/CommonHeading'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import CommonButton from "../../../common/button/CommonButton";
gsap.registerPlugin(useGSAP);

const FundRaising = () => {
    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".fund_raising",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.from(".fund_raising_left .border_gradient_card", {
                x: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
            });

            tl.from(".fund_raising_right .allocation_row", {
                x: -60,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
            }, "-=0.4");

            tl.from(".fund_raising_bottom", {
                y: 50,
                opacity: 0,
                duration: 0.9,
            }, "-=0.3");
        });

        return () => ctx.revert();
    }, []);

    const FundingTargets = [
        {
            title: "$105 M",
            subTitle: "Private Sale"
        },
        {
            title: "$210 M",
            subTitle: "Public Sale"
        },

        {
            title: "TBA",
            subTitle: "Launch Listing price"
        },
        {
            title: "TBA",
            subTitle: "Launch Market Cap"
        },
    ]
    const allocationData = [
        { purpose: "Platform Development & Hosting", allocation: "50%" },
        { purpose: "Marketing & Community Growth", allocation: "30%" },
        { purpose: "Operations & Compliance", allocation: "10%" },
        { purpose: "Liquidity & Reserves", allocation: "10%" },
    ];
    return (
        <section className='fund_raising'>
            <Container>
                <CommonHeading
                    title="Use of Proceeds For The ROCK TREASURY"
                    centered
                />
                <Row>
                    <Col xl={6}>
                        <div className="fund_raising_left">
                            <h3>Funding Targets</h3>
                            <div className="fund_raising_cards">
                                {
                                    FundingTargets.map((item, index) => {
                                        return (
                                            <div key={index} className='border_gradient_card'>
                                                <h2>{item.title}</h2>
                                                <h4>{item.subTitle}</h4>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xl={6}>
                        <div className="fund_raising_right">
                            <h3>Use of Funds</h3>

                            <div className="allocation_section border_gradient_card">
                                <div className="allocation_header">
                                    <span>Purpose</span>
                                    <span className='allocation_head'>Allocation</span>
                                </div>

                                {allocationData.map((item, index) => (
                                    <div className="allocation_row" key={index}>
                                        <span>{item.purpose}</span>
                                        <span className='allocation'>{item.allocation}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </Col>
                </Row>
                <div className="fund_raising_bottom">
                    <div className='fund_raising_desc'>
                        <h4>Every early participation fuels the foundation of the Rock ecosystem from core technology to compliant market expansion, ensuring the long-term vision is upheld.</h4>
                    </div>
                    <CommonButton title="Join Public Sale" />
                </div>
            </Container>
        </section>
    )
}

export default FundRaising
