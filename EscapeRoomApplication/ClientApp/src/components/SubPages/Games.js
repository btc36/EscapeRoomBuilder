import React, { Component } from 'react';
import { PageLink } from '../SubComponents/PageLink';
import { Loader } from '../Widgets/Loader';

export class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: this.props.games,
            loading: false
        }
        this.getGames = this.getGames.bind(this);
        this.selectGame = this.selectGame.bind(this);
        this.getGames();
    }

    startLoading() {
        setTimeout(() => {
            this.setState({
                loading: true
            })
        }) 
    }

    stopLoading() {
        this.setState({
            loading: false
        })
    }

    async getGames() {
        var getGamesResponse = await this.props.FrontEndDAO.getGames();
        var games = getGamesResponse.games;
        for (var i in games) {
            if (games[i].gameId == this.props.gameId) {
                games[i].selected = true;
            }
        }
        this.setState({ 
            games: games
        });
    }

    selectGame(gameId) {
        var games = this.state.games;
        var selectedGame = gameId;
        var gameName = "";
        for (var i in games) {
            if (games[i].gameId == gameId) {
                if (games[i].selected) {
                    games[i].selected = false;
                    selectedGame = ""
                }
                else {
                    games[i].selected = true;
                    gameName = games[i].name;
                }
            }
            else {
                games[i].selected = false;
            }
        }
        this.setState({
            games: games,
            selectedGame: selectedGame
        })
        this.props.setGameId(selectedGame,gameName,games);
    }


    render() {
        console.log("GAMES", this.state.games);
        var selectGameFunction = this.selectGame;
        return (
            <div className="escapeRoomPage">
                {
                    this.state.loading
                    &&
                    <Loader />
                }
                <h3 className="pageTitle">Games</h3>
                <div>
                    <table className="escapeRoomPageTable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.games.map(function (game, idx) {
                                    return (
                                        <tr className={game.selected && "selected"} key={game.gameId} onClick={() => {selectGameFunction(game.gameId) }}>
                                            <td>{game.name}</td>
                                            <td>{game.description}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                        {
                            this.props.gameId
                            &&
                            <div>
                                <button onClick={this.editGame}> <PageLink
                                    linkURL={"build-game"}
                                    linkText={"Edit"}
                                /></button>
                                <button> <PageLink
                                    linkURL={"play-game"}
                                    linkText={"Play"}
                                /></button>
                                {
                                    this.state.games.length == 0
                                    &&
                                    <button><PageLink
                                        linkURL={"build-game"}
                                        linkText={"Create New Game"}
                                    /></button>
                                }
                            </div>
                        }
                    </div>
            </div>
        );
    }
}
