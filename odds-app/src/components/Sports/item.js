import React from "react";
import Basketball from "../../assets/images/basketball.svg";
import Football from "../../assets/images/football.svg";
import Baseball from "../../assets/images/baseball.svg";
const SportItem = ({ sport, setSport }) => {
  const getIcon = (id) => {
    switch (id) {
      case "american-football":
        return Football;
      case "basketball":
        return Basketball;
      case "baseball":
        return Baseball;
      default:
        return Football;
    }
  };
  return (
    <div className="sports-list-item item" onClick={setSport}>
      <img
        className="sports-icon icon"
        src={getIcon(sport.key)}
        alt="sport-icons"
      ></img>
      <div className="sports-text">{sport.name}</div>
    </div>
  );
};

export default SportItem;
