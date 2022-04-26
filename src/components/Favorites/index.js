import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getEvents } from "../../services/cloudbetService";
import { getMoneyLines, timeFormatter } from "../Events/util";
import FavStar from "../../assets/images/star.svg";
import Delete from "./menu";
import CircularProgress from "@mui/material/CircularProgress";

export const Favorites = ({
  favorites,
  removeFavorite,
  signedIn,
  loadingFavorites,
  favError,
}) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (favorites && favorites.length > 0) {
      findFavoritesEvents(favorites);
    }
  }, [favorites]);

  const findFavoritesEvents = async (favs) => {
    let keyList = [];
    for (let fav of favs) {
      keyList.push(fav.competition_key);
    }
    keyList = _.uniq(keyList);
    let newList = [];
    await Promise.all(keyList.map((key) => getEvents(key)))
      .then((res) => res.forEach((comp) => newList.push(...comp.events)))
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setEvents(newList);
    setLoading(false);
  };

  const parseOdds = (num) => {
    return parseInt(num) > 0 ? `+${num}` : num;
  };

  const UpcomingGame = ({ event }) => {
    const FavTeamGame = ({ name, odds, isFav }) => {
      return (
        <React.Fragment>
          <div
            className={`event-team-name ${isFav ? "fav-upcoming-bold" : ""}`}
          >
            {name}
          </div>
          <div className="event-odds">{parseOdds(odds)}</div>
        </React.Fragment>
      );
    };
    const odds = getMoneyLines(event.markets);
    return (
      <div className="fav-upcoming">
        <div className="time-display">{timeFormatter(event.cutoffTime)}</div>
        <div className="fav-upcoming-team">
          <FavTeamGame
            name={event.home.name}
            odds={odds.home}
            isFav={favorites.find((f) => f.team_key === event.home.key)}
          />
        </div>
        <div className="fav-upcoming-team">
          <FavTeamGame
            name={event.away.name}
            odds={odds.away}
            isFav={favorites.find((f) => f.team_key === event.away.key)}
          />
        </div>
      </div>
    );
  };

  const Team = ({ team }) => {
    let upcoming = null;
    if (events.length > 0) {
      upcoming = events.find(
        (e) =>
          (e.home && e.home.key === team.team_key) ||
          (e.away && e.away.key === team.team_key)
      );
    }
    if (!upcoming) {
      return null;
    }
    return (
      <div className="fav-team">
        <div className="fav-team-title-container">
          <div />
          <div className="fav-team-title">{team.name}</div>
          <Delete removeFavorite={() => removeFavorite(team)} />
        </div>
        {upcoming ? (
          <React.Fragment>
            <div className="fav-upcoming-text">Upcoming game:</div>
            <UpcomingGame event={upcoming} />{" "}
          </React.Fragment>
        ) : (
          <div className="fav-upcoming-text">No upcoming game.</div>
        )}
      </div>
    );
  };

  function content() {
    if (!signedIn) {
      return "Sign in to add favorites.";
    }
    if (favError || error) {
      return <div className="error">Error loading favorites.</div>;
    }
    if (favorites.length === 0) {
      return "Search for events to add favorites.";
    }
    if (loading || loadingFavorites) {
      return (
        <div className="fav-loader">
          <CircularProgress size="50%" color="inherit" />
        </div>
      );
    }
    return favorites.map((f) => <Team team={f} key={f.team_key} />);
  }
  return (
    <div className="favorites">
      <div className="favorites-title">
        <img src={FavStar} className="fav-title-star" alt={"star"}></img>
        Favorite Teams
      </div>
      <div className="favorites-content">{content()}</div>
    </div>
  );
};
