import React from "react";
import Star from "../../assets/images/star.svg";
import Starred from "../../assets/images/starred.svg";
import Tooltip from "@mui/material/Tooltip";
import { timeFormatter } from "./util";

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
  const FavStar = ({ teamKey, name }) => {
    const title = () => {
      if (!signedIn) {
        return "Sign in to add favorites";
      }
      if (favorites.length >= 10) {
        return "You can only add up to 10 favorites!";
      }
      return "Favorite this team";
    };
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
      <Tooltip title={title()} placement="left" id="fav-tooltip">
        <img
          className={`fav-star ${
            favorites.length >= 10 ? "unhoverable" : "unselected"
          }`}
          src={Star}
          alt="Select Favorite"
          onClick={() => addFavorite(teamKey, name)}
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
        <FavStar teamKey={teamKey} name={name} />
        <Name name={name} />
        <Odds odds={odds} />
      </div>
    );
  };

  const Time = ({ time }) => {
    return <div className="time-display">{timeFormatter(time)}</div>;
  };

  return (
    <div className="item event-list-item">
      <Time time={event.time} />
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
