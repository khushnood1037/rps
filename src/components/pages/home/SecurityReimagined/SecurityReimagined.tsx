import { Container } from "react-bootstrap";
import "./SecurityReimagined.scss";
import CommonHeading from "../../../common/commonHeading/CommonHeading";
import CommonButton from "../../../common/button/CommonButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NiceModal from "@ebay/nice-modal-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SecurityReimagined = () => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".security_reimagined_in",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".security_reimagined_in .subtitle", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      tl.from(".security_reimagined_in h3", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      tl.from(".security_reimagined_in p", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      tl.from(".security_reimagined_in .btn-animate", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      })
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="security_reimagined">
      <Container>
        <div className="security_reimagined_in">
          <CommonHeading title="See the Future - The ultimate Rock Paper Scissors upgrade" centered />
          <h3>Massive 100,000-Player Bracket Tournament</h3>
            <p>Imagine a single-elimination bracket with 100,000 players competing head-to-head, winners advancing each round, Entry fee example: 10 tokens per player, Resulting prize pool: 1,000,000 tokens up for grabs, Ultra-fast format: Entire tournament completed with a winner crowned and paid in under 20 minutes,Influencers and Affiliates  connecting with their community, Streaming of live tournaments</p>
          <CommonButton className="btn-animate" title="Join the ROCK ICO" onClick={() => NiceModal.show("PublicModal")} />
        </div>
      </Container>
    </div>
  );
};

export default SecurityReimagined;
