import React, { Component } from 'react';

export class CreateNewGame extends Component {
  render() {
    return (
      <div className="createNewGame">
        <div className="createNewGame-card">
          <h1>Create New Game</h1>
          <div className="form-group">
            <label className="form-label">Game Name</label>
            <input
              value={this.props.gameName}
              onChange={(e) => this.props.updateStateInputValue(e, 'gameName')}
              type="text"
              placeholder="e.g. Captain's Treasure"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={this.props.gameDescription}
              onChange={(e) => this.props.updateStateInputValue(e, 'gameDescription')}
              rows="4"
              placeholder="Describe your escape room scenario..."
            />
          </div>
          <button
            onClick={this.props.addNewGame}
            style={{
              width: '100%',
              background: 'var(--clr-primary)',
              color: '#fff',
              padding: '0.7rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginTop: '0.5rem',
            }}
          >
            Create Game →
          </button>
        </div>
      </div>
    );
  }
}
