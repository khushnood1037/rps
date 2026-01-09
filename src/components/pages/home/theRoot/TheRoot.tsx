import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Col, Container, Row } from "react-bootstrap"
import CommonHeading from "../../../common/commonHeading/CommonHeading"
import "./TheRoot.scss"

const TheRoot = () => {
  const features = [
    {
      text: "Tournaments run 24/7 with new prize pools every 5-10 minutes",
    },
    {
      text: "Efficient single-elimination brackets resolve huge events fast ",
    },
    {
      text: "Players pay entry fees in ROCK that directly fund the pot — creating frequent prize pools.",
    },

    {
      text: "Winners claim the majority; top 8 share 90% (1st: 45%, down to 8th: 1%)",
    },
    {
      text: "5% of each pot is automatically distributed to Loyalty Club members paid in Rock",
    },
    {
      text: "5% of each pot is automatically distributed to Loyalty Club members paid in Rock tokens. A percentage also goes directly to community-voted wildlife conservation efforts (on-chain & traceable)",
    },
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".theRoot",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        ease: "power3.out",
      },
    });


    tl.from(
      ".theRoot_left h3, .theRoot_left .border-btn, .theRoot_left_blockBox, .theRoot_left p",
      {
        opacity: 0,
        x: -80,
        duration: 0.8,
        stagger: 0.15,
      },
      "-=0.6"
    );

    tl.from(
      ".theRoot_right h3",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
      },
      "-=0.5"
    );

    tl.from(
      ".theRoot_right p",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
      },
      "-=0.5"
    );
    tl.from(
      ".theRoot_right h5",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
      },
      "-=0.5"
    );

    tl.from(
      ".theRoot_right_list li",
      {
        opacity: 0,
        x: 80,
        duration: 0.8,
        stagger: 0.15,
      },
      "-=0.4"
    );

    tl.from(
      ".theRoot_right .anime",
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
      },
      "-=0.4"
    );
  }, []);

  return (
    <>
      <div className="theRoot" id="theRoot">
        <Container>
        <CommonHeading
            title="The Birth of Rock Token"
            centered
          />
          <CommonHeading
            subtitle={<>
            <span>Rock Token (ROCK) was born from a simple yet powerful idea: transforming the timeless game of Rock-Paper-Scissors into a global, community-driven force for good. In a world where gaming often feels disconnected and profit-focused, Rock Token envisions a platform that puts players first, fosters unbreakable loyalty, and creates real-world impact.</span>
            <span>Launched on the Solana blockchain for its speed, security, and low costs, Rock Token powers Rock Tournaments—a decentralized gaming ecosystem where everyone has an equal shot at winning, and every play contributes to something bigger.</span>
            <span>At its core, Rock Token places community first. It is not just building a game; it is cultivating the most loyal community in the world. Through a Decentralized Autonomous Organization (DAO) structure—governed by the ownerless Rock Foundation in the Cayman Islands and managed by Lemma Solutions—players own and shape the platform. Every key decision, from game updates to charity selections, is put to a community vote, ensuring transparency and inclusivity. Whether a casual player or dedicated affiliate, participants are rewarded for participation, skill, and loyalty, turning gamers into true stakeholders.</span>
            <span>The game will initially launch in <strong>Fun Mode</strong>, allowing players to sharpen skills, build engagement, and earn mission points for rewards. The real excitement begins in Competition Mode, where players compete for ROCK tokens following the official launch.</span>
            </>}
            centered
          />
          <CommonHeading className="main_heading" title="Rock Tournaments: The Ultimate Upgrade" />

          <Row>
            <Col xs={12} lg={6}>
              <div className="theRoot_left">
              <div className="theRoot_left_blockBox">
                  <h4>The Limits Of Traditional Rock-Paper-Scissors</h4>
                </div>
                <div className="root_left_item">
                  <h3>Rock-Paper-Scissors is a timeless, skill-based classic enjoyed by millions worldwide — simple, fast, and universally understood <span className="green_text">(world record tournament: 10,033 players).</span></h3>
                  {/* <CommonButton
                    title="Chainalysis Report - >"
                    className="border-btn"
                  /> */}
                </div>
                <div className="root_left_item">
                  <h3>Yet it remains constrained: physical events are rare, costly, and location-bound, requiring travel and limiting participation. Everyday play offers no global matchmaking, verifiable fairness, large prize pools, or ongoing incentives — keeping the game small, fleeting, and disconnected.</h3>
                  {/* <CommonButton
                    title="CoinTracker  - >"
                    className="border-btn"
                  /> */}
                </div>
               

               
              </div>
            </Col>
            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
              <div className="theRoot_right">
                <h3>The Solution</h3>
                <p>Rock Token makes it possible to transform this classic game into a decentralized, global tournament platform on Solana.</p>
                <h5>Nonstop competition:</h5>
                <ul className="theRoot_right_list">
                  {features.map((item: { text: string }, idx: number) => (
                    <li key={idx}>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TheRoot