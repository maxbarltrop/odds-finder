import React from "react";
import Sports from "../Sports";
import Competitions from "../Competitions";
import Events from "../Events";
import { getFavorites, addFavorite } from "../../services/firebaseService";
import { Favorites } from "../Favorites";
import { deleteFavorite } from "../../services/firebaseService";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: null,
      competition: null,
      favorites: [],
      favError: null,
      loading: false,
    };
    if (this.props.signedIn) {
      this.fetchFavorites(props.user.user);
    }
  }

  fetchFavorites() {
    this.setState({ error: null, loading: true });
    if (!this.props.signedIn) return;
    getFavorites(this.props.user)
      .then((data) => {
        this.setState({ favorites: data, loading: false });
      })
      .catch((ignore) => {
        this.setState({
          favError: "Unable to fetch favorites",
          loading: false,
        });
      });
  }

  setSport(sport) {
    this.setState({ sport });
  }

  setCompetition(competitionKey) {
    this.setState({ competition: competitionKey });
  }

  newFavorite(fav) {
    if (this.state.favorites.length >= 10) return;
    addFavorite(this.props.user, fav).then((result) => {
      if (result) {
        this.setState({ favorites: [...this.state.favorites, fav] });
      }
    });
  }

  removeFavorite(fav) {
    deleteFavorite(this.props.user, fav);
    let { favorites } = this.state;
    const newSet = favorites.filter((f) => f.team_key !== fav.team_key);
    this.setState({ favorites: newSet });
  }

  render() {
    return (
      <div className="main">
        <Favorites
          favorites={this.state.favorites}
          removeFavorite={(f) => this.removeFavorite(f)}
          signedIn={this.props.signedIn}
          loadingFavorites={this.state.loading}
          favError={this.state.favError}
        />
        <div className="main-container">
          <Sports
            setSport={(s) => this.setSport(s)}
            selectedKey={this.state.sport ? this.state.sport.key : null}
          />
          <Competitions
            sportKey={this.state.sport ? this.state.sport.key : null}
            setCompetition={(c) => this.setCompetition(c)}
            selectedKey={this.state.competition}
          />
          <Events
            competitionKey={this.state.competition}
            favorites={this.state.favorites}
            newFavorite={(f) => this.newFavorite(f)}
            signedIn={this.props.signedIn}
          />
        </div>
      </div>
    );
  }
}

export default Main;
