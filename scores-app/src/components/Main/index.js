import React from "react";
import { getSports } from "../../services/cloudbetService";
import Sports from "../Sports";
import Competitions from "../Competitions";
import Events from "../Events";

class Main extends React.Component {
  constructor() {
    super();
    this.state = { sport: null, competition: null };
  }

  setSport(sportKey) {
    this.setState({ sport: sportKey });
  }

  setCompetition(competitionKey) {
    this.setState({ compeition: competitionKey });
  }
  render() {
    return (
      <div className="main">
        <div className="main-container">
          <Sports />
          <Competitions sportKey={this.state.sport} />
          <Events competitionKey={this.state.competition} />
        </div>
      </div>
    );
  }
}

export default Main;
