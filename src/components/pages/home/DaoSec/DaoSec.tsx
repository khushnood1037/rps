import { useGSAP } from '@gsap/react';
import './DaoSec.scss'
import gsap from 'gsap';
import CommonButton from '../../../common/button/CommonButton';
import CommonHeading from "../../../common/commonHeading/CommonHeading";

const DaoSec = () => {
    useGSAP(() => {
        gsap.from(".tokenomics_dao_content > *", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".tokenomics_dao_content",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);
    return (
        <section className="tokenomics_dao" id="dao">
            <div className="tokenomics_dao_content">
                <CommonHeading title="Join the Community Early" />
                <p>The platform launches first in Fun Mode — letting players practice, sharpen skills, complete missions, and earn points toward launch rewards.</p>
                <p>The real excitement begins with Competition Mode activation post-official launch (Q2 2026), where ROCK tokens power tournament entries and prize pools.</p>
                <p>Acquire ROCK during the Q1 2026 Token Distribution to ensure you're fully prepared.</p>
                <CommonButton className="btn-animate" title="Join Pre-Sale Now" />
            </div>
        </section>
    )
}

export default DaoSec
