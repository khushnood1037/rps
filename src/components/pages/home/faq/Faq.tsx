import { Accordion, Container } from "react-bootstrap";
import "./Faq.scss";

const Faq = () => {
  const data = [
    {
      index: "0",
      number: "01",
      header: "What is Rock Token?",
      body: "The capped-supply native utility token on Solana, powering participation, governance, rewards, and charity initiatives.",
    },
    {
      index: "1",
      number: "02",
      header: "Is the supply limited?",
      body: "Yes — strictly capped at 2.1 billion tokens, non-mintable.",
    },
    {
      index: "2",
      number: "03",
      header: "How does vesting work?",
      body: "Multi-year lockups and linear releases for major allocations to align incentives (full schedule above).",
    },
    {
      index: "3",
      number: "04",
      header: "What is the charity allocation used for?",
      body: "210 million tokens dedicated to community-voted wildlife conservation efforts.",
    },
    {
      index: "4",
      number: "05",
      header: "How can I participate?",
      body: "Join the ongoing pre-sale in Q1 2026.",
    },
  ];
  return (
    <>
      <div className="faq" id="faq">
        <Container>
          <h3>FREQUENTLY ASKED QUESTIONS</h3>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {data.map((item, index) => (
              <Accordion.Item eventKey={item.index} key={index}>
                <Accordion.Header>
                  <span>{item.number}</span>
                  <h4>{item.header}</h4>
                </Accordion.Header>
                <Accordion.Body>{item.body}</Accordion.Body>
              </Accordion.Item>
            ))}
            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item> */}
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default Faq;
