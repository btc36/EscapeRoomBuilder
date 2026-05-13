import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="layout">
        <nav className="app-navbar">
          <div className="app-navbar-brand">
            🔐 Escape Room Builder
            {this.props.gameName && (
              <span className="game-name">— {this.props.gameName}</span>
            )}
          </div>
          {!this.props.runningGame && (
            <Link to="/" className="app-navbar-home">
              ⌂ Home
            </Link>
          )}
        </nav>
        <div className="app-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
