import React from "react";
import "./PeaceCard.scss";

interface PeaceCardProps {
  phase: string;
  title: string;
  text: string;
}

const PeaceCard: React.FC<PeaceCardProps> = ({ phase, title, text }) => {
  return (
    <>
     <div className="phase_card">
        <h3>{phase}</h3>
        <div className="phase_card_content">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default PeaceCard;

