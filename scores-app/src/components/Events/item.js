import React from "react";
import Star from "../../assets/images/star.svg";

const parseOdds = (num) => {
  return parseInt(num) > 0 ? `+${num}` : num;
};

const EventItem = ({ event, favorites }) => {
  const isFavorite = (teamKey) => {
    for (let fav of favorites) {
      if (fav.team_key === teamKey) return true;
    }
    return false;
  };
  const FavStar = ({ teamName, teamKey }) => {
    const className = `fav-star ${isFavorite(teamKey) ? "selected" : ""}`;
    return <img className={className} src={Star} alt="Select Favorite" />;
  };

  const Name = ({ name }) => {
    return <div className="event-team-name">{name}</div>;
  };

  const Odds = ({ odds }) => {
    return <div className="event-odds">{parseOdds(odds)}</div>;
  };

  const Team = ({ name, teamKey, odds }) => {
    return (
      <div className="event-team">
        <FavStar teamName={name} teamKey={teamKey} />
        <Name name={name} />
        <Odds odds={odds} />
      </div>
    );
  };

  return (
    <div className="item event-list-item">
      <Team
        name={event.homeName}
        teamKey={event.homeKey}
        odds={event.homeOdds}
      />
      <Team
        name={event.awayName}
        teamKey={event.awayKey}
        odds={event.awayOdds}
      />
    </div>
  );
};

export default EventItem;
