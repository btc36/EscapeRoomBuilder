import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BuildGame } from './components/BuildGame';
import { RunGame } from './components/RunGame';
import { Games } from './components/SubPages/Games';
import { Items } from './components/SubPages/Items';
import { Locks } from './components/SubPages/Locks';
import { LockTypes } from './components/SubPages/LockTypes';
import { Media } from './components/SubPages/Media';
import { PropNLocations } from './components/SubPages/PropNLocations';
import { Puzzles } from './components/SubPages/Puzzles';
import { Stages } from './components/SubPages/Stages';
import { FrontEndDAO } from './FrontEndDAO';

import './escape-room-builder.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = {
            userId: '1',
            userName: 'Ben Cookson',
            gameId: '1',
            gameName: 'Nuclear Reactor',
            games: []
        };
        this.setGameId = this.setGameId.bind(this);
        this.makeRESTCall = this.makeRESTCall.bind(this);
        this.FrontEndDAO = new FrontEndDAO(this.makeRESTCall,this.state.userId,this.state.gameId);
    }


    setGameId(gameId,gameName, games=[]) {
        this.setState({
            gameId: gameId,
            gameName: gameName,
            games: games
        })
    }

    async makeRESTCall(URL, method, body, responseFunction, errorFunction, finalFunction) {
        var fetchParameters = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        if (body) {
            fetchParameters.body = JSON.stringify(body);
        }
        await fetch(URL, fetchParameters).then(response => {
            if (!response.ok) {
                console.log("ERROR:", response);
                if (response.status == 401) {
                    return Promise.reject("Unauthorized");
                }
                else {
                    return Promise.reject("Unknown Error - Please contact I.T.");
                }
            }
            else {
                return response.json();
            }
        }).then((responseInfo) => {
            return responseFunction(responseInfo);
        }).catch((error) => {
            if (error == "Unauthorized") {
                console.log("UNATHORIZED");
                alert("Session Timeout: Your session has timed out and you will need to log in again");
                this.logout();
                //Log them out, they are unauthorized
            }
            else if (error.message == "Failed to fetch") {
                errorFunction("Unknown Error", "There was an Network error. Check your internet connection and try again");
            } else {
                errorFunction("Unknown Error", error);
            }
        }).finally(() => {
            finalFunction();
        });
    }

  render () {
      return (
        <div>
            <Layout
                gameName={this.state.gameName}
            >
            <Route exact path='/' component={() => (
                    <Home
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        setGameId={this.setGameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/build-game' component={() => (
                    <BuildGame
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        setGameId={this.setGameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/run-game' component={() => (
                    <RunGame
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/games' component={() => (
                    <Games
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        games={this.state.games}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                        setGameId={this.setGameId}
                    />
                )}
            />
            <Route path='/items' component={() => (
                    <Items
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/locks' component={() => (
                    <Locks
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
                />
                <Route path='/lockTypes' component={() => (
                    <LockTypes
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
                />
            <Route path='/media' component={() => (
                    <Media
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/props' component={() => (
                    <PropNLocations
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/puzzles' component={() => (
                    <Puzzles
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
            <Route path='/stages' component={() => (
                    <Stages
                        userId={this.state.userId}
                        userName={this.state.userName}
                        gameId={this.state.gameId}
                        makeRESTCall={this.makeRESTCall}
                        FrontEndDAO={this.FrontEndDAO}
                    />
                )}
            />
              </Layout>
        </div>
    );
  }
}
