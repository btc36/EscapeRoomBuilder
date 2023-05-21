import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BuildGame } from './components/BuildGame';
import { RunGame } from './components/RunGame';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/build-game' component={BuildGame} />
        <Route path='/run-game' component={RunGame} />
      </Layout>
    );
  }
}
