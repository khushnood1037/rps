import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Col, Container, Row } from "react-bootstrap"
import CommonHeading from "../../../common/commonHeading/CommonHeading"
import IconImg from "../../../../assets/images/rockcoin.png";
import "./TheRoot.scss"
import BuyCard from "../buyCard/BuyCard";
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
        <div className="theRoot_birth">
          <Container>
            <CommonHeading className="main_heading" title="Birth of Rock Token" />
            <Row className="theRoot_row">
              <Col xs={12} sm={6} lg={4}>
                <div className="theRoot_card">
                  <img src={IconImg} alt="Birth of Rock Token" />
                  <h3>Birth of Rock Token</h3>
                  <p>Rock-Paper-Scissors is a timeless, skill-based classic loved by millions—simple, fast, and truly universal (world record: 10,033 players in one tournament). Yet it remains severely limited: physical events are rare, expensive, and location-bound, while casual play lacks global matchmaking, verifiable fairness, large prize pools, or real incentives. This keeps the game small, fleeting, and disconnected.</p>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={4}>
                <div className="theRoot_card">
                  <img src={IconImg} alt="Rock Token (ROCK) Was Born to Change Everything" />
                  <h3>Rock Token (ROCK) Was Born to Change Everything</h3>
                  <p>From one bold idea: take the world's most universal game and turn it into a <strong>global</strong>, <strong>unstoppable, player-owned force</strong>. Built on Solana for blazing speed, rock-bottom costs, and unbreakable security, <strong>Rock Token</strong> powers <strong>Rock Tournaments</strong> — a decentralized ecosystem where anyone, anywhere can compete fairly, win big, and play nonstop. What starts as childhood fun becomes serious, rewarding gameplay with massive prize pools, verifiable results, and real incentives that keep the community thriving.</p>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={4}>
                <div className="theRoot_card">
                  <img src={IconImg} alt="Player-Owned. Community-Driven. Built for Lasting Impact" />
                  <h3>Player-Owned. Community-Driven. Built for Lasting Impact</h3>
                  <p>Rock Token puts <strong>players first</strong> in a gaming world too often focused on profits. Governed by a transparent DAO under the independent Rock Foundation (Cayman Islands) and supported by Lemma Solutions, you decide everything — game updates, features, even charity causes — through community votes. Start in Fun Mode to practise skills and earn mission points, then dominate in Competition Mode for real <strong>ROCK</strong> rewards. Every match, every vote, every early supporter builds unbreakable loyalty, true ownership, and meaningful real-world good. This isn't just a game — it's the most dedicated global gaming community ever created.</p>
                </div>
              </Col>
              <Col xs={12}>
                <p className="theRoot_birth_text">Join early. Shape the revolution. Own the future.</p>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <CommonHeading className="main_heading" title="Rock Tournaments: The Ultimate Upgrade" />
          <Row className="align-items-center">
            <Col xs={12} lg={6}>
              <div className="theRoot_left">
                <BuyCard />
              </div>
            </Col>
            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
              <div className="theRoot_right">
                <h3>Core Concept</h3>
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