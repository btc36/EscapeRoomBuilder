import React, { Component } from 'react';
import { PageLink } from './SubComponents/PageLink';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        if (this.props.gameId) {
            this.props.setGameId("")
        }
    }

  render () {
    return (
        <div>
            <PageLink
                linkURL={"build-game"}
                linkText={"Create a New Game"}
            />
            <PageLink
                linkURL={"run-game"}
                linkText={"Run a Game"}
            />
            <PageLink
                linkURL={"games"}
                linkText={"See Existing Games"}
            />
           
      </div>
    );
  }
}
