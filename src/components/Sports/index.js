import React from "react";
import { getSports } from "../../services/cloudbetService";
import SportItem from "./item";
import SPORTS from "../../assets/images/sportHeader.svg";

const Sports = ({ setSport, selectedKey }) => {
  const sports = getSports();
  return (
    <div className="sports-container category">
      <div className="category-title">
        <img className="category-icon" src={SPORTS} alt="sports-logo" />
        Sports
      </div>
      <div className="sports-list list">
        {sports.map((sport) => (
          <SportItem
            sport={sport}
            setSport={() => setSport(sport)}
            key={sport.key}
            isSelected={sport.key === selectedKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Sports;
