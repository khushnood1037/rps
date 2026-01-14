import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CommonButton from '../../../common/button/CommonButton';
import CommonHeading from "../../../common/commonHeading/CommonHeading";
import TokenomicsHalfCircle from '../../../../assets/images/tokenomics-half-circle.jpg';
import './DaoSec.scss';
import { Container } from "react-bootstrap";

const DaoSec = () => {
    useGSAP(() => {
        gsap.from(".community_content > *", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".community_content",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);
    return (
        <section className="community" id="dao">
            <Container>
            <img src={TokenomicsHalfCircle} alt="Tokenomics Half Circle" />
            <div className="community_content">
                <CommonHeading title="Join the Community Early" />
                <p>The platform launches first in Fun Mode — letting players practice, sharpen skills, complete missions, and earn points toward launch rewards.</p>
                <p>The real excitement begins with Competition Mode activation post-official launch (Q2 2026), where ROCK tokens power tournament entries and prize pools.</p>
                <p>Acquire ROCK during the Q1 2026 Token Distribution to ensure you're fully prepared.</p>
                <CommonButton className="btn-animate" title="Join Pre-Sale Now" />
            </div>
            </Container>
        </section>
    )
}

export default DaoSec
