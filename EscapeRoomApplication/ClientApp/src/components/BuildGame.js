import React, { Component } from 'react';
import { BuildGameMenu } from './SubComponents/BuildGame/BuildGameMenu';
import { CreateNewGame } from './SubComponents/BuildGame/CreateNewGame';

export class BuildGame extends Component {

  constructor(props) {
    super(props);
      this.state = {
          gameName: "",
          gameDescription: ""
      };
      this.updateStateInputValue = this.updateStateInputValue.bind(this);
      this.addNewGame = this.addNewGame.bind(this);
    }

    updateStateInputValue(e, stateValue) {
        var inputObject = {}
        inputObject[stateValue] = e.target.value;
        this.setState(inputObject)
    }

    async addNewGame() {
        var gameName = this.state.gameName;
        var gameDescription = this.state.gameDescription;
        if (!gameName || !gameDescription) {
            alert("Please enter a game name and game description");
        }
        var newGameId = await this.props.FrontEndDAO.addGame(this.props.userId, gameName, gameDescription);
        this.props.setGameId(newGameId,gameName);
    }


  render() {
    return (
        this.props.gameId
            ?
            <BuildGameMenu/>
            :
            <CreateNewGame
                gameName={this.state.gameName}
                gameDescription={this.state.gameDescription}
                updateStateInputValue={this.updateStateInputValue}
                addNewGame={this.addNewGame}
            />
    );
  }
}
    