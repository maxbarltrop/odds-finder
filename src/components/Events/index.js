import React, { useState, useEffect } from "react";
import { getEvents } from "../../services/cloudbetService";
import EventItem from "./item";
import EVENTS from "../../assets/images/event.svg";
import { getMoneyLines } from "./util";
import Loader from "../Loader";

const Events = ({ competitionKey, favorites, newFavorite, signedIn }) => {
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState(null);
  var [events, setEvents] = useState(null);

  useEffect(() => {
    const parseEvents = (eventList) => {
      let parsed = [];
      for (let event of eventList.events) {
        if (event.home && event.away && event.status === "TRADING") {
          const odds = getMoneyLines(event.markets);
          parsed.push({
            homeName: event.home.name,
            homeKey: event.home.key,
            homeOdds: odds.home,
            awayOdds: odds.away,
            awayKey: event.away.key,
            awayName: event.away.name,
            time: event.cutoffTime,
          });
        }
      }
      setEvents(parsed);
    };
    if (competitionKey === null) return;
    setLoading(true);
    setError(null);
    setTimeout(() => {
      getEvents(competitionKey)
        .then((result) => {
          parseEvents(result);
          setLoading(false);
        })
        .catch((ignore) => {
          setError("Unable to fetch events. Check Your Connection");
          setLoading(false);
        });
    }, 1000);
  }, [competitionKey]);

  const addFavorite = (teamKey, name) => {
    if (!signedIn) return;
    newFavorite({
      competition_key: competitionKey,
      team_key: teamKey,
      name: name,
    });
  };

  const renderList = () => {
    if (loading) return <Loader />;
    if (!events) return null;
    return (
      <div className="list events-list">
        {events.map((e) => (
          <EventItem
            event={e}
            key={e.key}
            favorites={favorites}
            addFavorite={(tk, name) => addFavorite(tk, name)}
            signedIn={signedIn}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="category" id="events-container">
      <div className="category-title">
        <img className="category-icon" src={EVENTS} alt="sports-logo" />
        Events
      </div>
      {renderList()}
    </div>
  );
};

export default Events;
