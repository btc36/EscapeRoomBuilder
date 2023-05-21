import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BuildGame } from './components/BuildGame';
import { RunGame } from './components/RunGame';
import { Games } from './components/SubPages/Games';
import { Items } from './components/SubPages/Items';
import { Locks } from './components/SubPages/Locks';
import { Media } from './components/SubPages/Media';
import { Props } from './components/SubPages/Props';
import { Puzzles } from './components/SubPages/Puzzles';
import { Stages } from './components/SubPages/Stages';

import './escape-room-builder.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/build-game' component={BuildGame} />
        <Route path='/run-game' component={RunGame} />
        <Route path='/games' component={Games} />
        <Route path='/items' component={Items} />
        <Route path='/locks' component={Locks} />
        <Route path='/media' component={Media} />
        <Route path='/props' component={Props} />
        <Route path='/puzzles' component={Puzzles} />
        <Route path='/stages' component={Stages} />
      </Layout>
    );
  }
}
