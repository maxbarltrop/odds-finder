import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getEvents } from "../../services/cloudbetService";

export const Favorites = ({ favorites, removeFavorite, signedIn }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      .catch((err) => setError(err));
    setEvents(newList);
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
    if (upcoming) {
      console.log(upcoming);
    }
    return (
      <div className="fav-team">
        <div className="fav-team-title">{team.name}</div>
      </div>
    );
  };

  function content() {
    if (!signedIn) {
      return "Sign in to add favorites.";
    }
    if (favorites.length === 0) {
      return "Search for events to add favorites.";
    }
    return favorites.map((f) => <Team team={f} />);
  }
  return (
    <div className="favorites">
      <div className="favorites-title">Favorite Teams</div>
      <div className="favorites-content">{content()}</div>
    </div>
  );
};
