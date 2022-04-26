import React, { useEffect, useState } from "react";
import { getCompetitions } from "../../services/cloudbetService";
import CompetitionItem from "./item";
import STADIUM from "../../assets/images/stadium.svg";
import Loader from "../Loader";

const Competition = ({ sportKey, setCompetition, selectedKey }) => {
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState(null);
  var [comp, setComp] = useState(null);

  const parseCompetitions = (compList) => {
    let parsed = [];
    for (let country of compList.categories) {
      for (let comp of country.competitions) {
        parsed.push({
          country: country.key,
          name: comp.name,
          key: comp.key,
        });
      }
    }
    setComp(parsed);
  };

  useEffect(() => {
    if (sportKey === null) return;
    setLoading(true);
    setError(null);
    setTimeout(() => {
      getCompetitions(sportKey)
        .then((result) => {
          parseCompetitions(result);
          setLoading(false);
        })
        .catch((ignore) => {
          setError(true);
          setLoading(false);
        });
    }, 1000);
  }, [sportKey]);

  const renderList = () => {
    if (loading) return <Loader />;
    if (error) {
      return (
        <div className="error">
          Unable to fetch competitions. Check your connection.
        </div>
      );
    }
    if (!comp) return null;

    return (
      <>
        {comp.map((c) => (
          <CompetitionItem
            competition={c}
            setCompetition={() => setCompetition(c.key)}
            key={c.key}
            isSelected={c.key === selectedKey}
          />
        ))}
      </>
    );
  };

  return (
    <div className="competitions-container category">
      <div className="category-title">
        <img className="category-icon" src={STADIUM} alt="stadium-icon" />{" "}
        Leagues
      </div>
      <div className="competitions-list list">{renderList()}</div>
    </div>
  );
};

export default Competition;
