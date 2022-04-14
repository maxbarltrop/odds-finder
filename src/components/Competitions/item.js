import React from "react";
import USA from "../../assets/images/usa.svg";
import WORLD from "../../assets/images/world.svg";
const CompetitionItem = ({ competition, setCompetition }) => {
  const getIcon = (id) => {
    switch (id) {
      case "usa":
        return USA;
      default:
        return WORLD;
    }
  };
  const regionName = (country) => {
    return country.slice(0, 3).toUpperCase();
  };
  return (
    <div className="competition-list-item item" onClick={setCompetition}>
      <img
        className="competition-icon icon"
        src={getIcon(competition.country)}
        alt="sport-icons"
      ></img>
      <div className="competitions-text">{`${competition.name} (${regionName(
        competition.country
      )})`}</div>
    </div>
  );
};

export default CompetitionItem;
