import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    if (this.props.gameId) {
      this.props.setGameId('');
    }
  }

  render() {
    return (
      <div className="mainPageLinks">
        <div className="home-hero">
          <h1>🔐 Escape Room Builder</h1>
          <p>Design, build, and run your own escape room experiences.</p>
        </div>
        <div className="home-cards">
          <Link to="/build-game" className="home-card">
            <div className="home-card-icon">🏗️</div>
            <h3>Create a New Game</h3>
          </Link>
          <Link to="/games" className="home-card">
            <div className="home-card-icon">🎮</div>
            <h3>See Existing Games</h3>
          </Link>
        </div>
      </div>
    );
  }
}
