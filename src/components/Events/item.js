import React from "react";
import Star from "../../assets/images/star.svg";
import Starred from "../../assets/images/starred.svg";
import Tooltip from "@mui/material/Tooltip";

const parseOdds = (num) => {
  return parseInt(num) > 0 ? `+${num}` : num;
};

const EventItem = ({ event, favorites, addFavorite, signedIn }) => {
  const isFavorite = (teamKey) => {
    for (let fav of favorites) {
      if (fav.team_key === teamKey) return true;
    }
    return false;
  };
  const FavStar = ({ teamKey }) => {
    if (isFavorite(teamKey)) {
      return (
        <img
          className="fav-star selected"
          src={Starred}
          alt="Select Favorite"
        />
      );
    }
    return (
      <Tooltip
        title={signedIn ? "Favorite This Team" : "Sign in to add favorites"}
        placement="left"
      >
        <img
          className="fav-star unselected"
          src={Star}
          alt="Select Favorite"
          onClick={() => addFavorite(teamKey)}
        />
      </Tooltip>
    );
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
        <FavStar teamKey={teamKey} />
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