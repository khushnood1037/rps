import { Container } from "react-bootstrap";
import CommonHeading from "../../../common/commonHeading/CommonHeading";
import "./RoadmapToPeace.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type React from "react";
gsap.registerPlugin(useGSAP);

const RoadmapToPeace = () => {
  interface RoadmapItem {
  value: string;
  title: string;
  text: string | React.ReactNode;
  title2?: string;
  text2?: string;
}

    const roadmapList:RoadmapItem[] = [
    { value: "Phase 1", title: "Completed Q4 2025", text: "Game development; Smart contract creation & audits; Wallet integration & testing; Tokenomics finalization. ", },
    { value: "Phase 2", title: "Current Q1 2026", text: "Token Generation Event (TGE) & minting; Token Distribution completes; Fun Mode launches for practice & missions; DAO established with initial governance framework. First community members join." },
    { value: "Phase 3", title: "Q2 2026", text: <>Official platform launch; Competition Mode activation — 24/7 global tournaments with Rock Tokens used for entry; Loyalty Club launches with bonus rewards.</> },
    { value: "Phase 4", title: "Q3–Q4 2026", text: "Expanded charity initiatives & on-chain donations; Global tournament events & leaderboards; New gameplay features & avatar upgrades; Community-driven updates via DAO voting" },
    { value: "Phase 5", title: "2027 Onwards", text: <>Major charity expansion — community voting on animal rescue center proposal; Real-world community events & partnerships; Regional expansion to new markets; Ongoing ecosystem growth & DAO-led innovations</> },
  ];
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".roadmapTo",
        start: "top 60%",
        toggleActions: "play none none reverse",

      },
    });

    tl.from(
      ".roadmapTo_list_Card",
      {
        opacity: 0,
        x: 100,
        duration: 1.4,
        stagger: .2,
        ease: "power3.out",
      },
      "-=0.3"
    );
  }, []);
  return (
    <>

      <div className="roadmapTo" id="roadmap">
        <Container>
          <CommonHeading
            title="From Concept to Global Impact"
            centered
          />

          <div className="roadmapTo_list">
            {roadmapList.map((data, index) => (
              <div key={index} className="roadmapTo_list_Card">
                <h3>{data.value}</h3>
                <div className="roadmapTo_list_Card_content">
                  <h4>{data.title}</h4>
                  <p>{data.text}</p>
                  {
                    data.title2 && <h4 className="mt-2">{data.title2}</h4>
                  }
                  {
                    data.text2 && <p>{data.text2}</p>
                  }
                </div>
              </div>
            ))}
          </div>
          {/* <ul className="roadmap_to_peace_list">
            {roadmapData.map((item, index) => (
              <li key={index}>
                <h2>{item.value}</h2>
                <p>{item.label}</p>
              </li>
            ))}
          </ul> */}
        </Container>
      </div>
    </>
  );
};

export default RoadmapToPeace;
