import React, { Component } from 'react';

export class CreateNewGame extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="createNewGame">
                <h1>Build Game</h1>
                <label>
                    <p>Name</p>
                    <input value={this.props.gameName} onChange={(e) => { this.props.updateStateInputValue(e,'gameName') }} type="text" />
                </label>
                <label>
                    <p>Description</p>
                    <textarea value={this.props.gameDescription} onChange={(e) => { this.props.updateStateInputValue(e, 'gameDescription') }} rows="4" cols="50"/>
                </label>
                <button onClick={this.props.addNewGame}>Submit</button>
            </div>
        );
    }
}
