import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { PageLink } from './SubComponents/PageLink';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="layout">
            <h1>Escape Room Builder - {this.props.gameName}</h1>
            {
                !this.props.runningGame
                &&
                <PageLink
                    linkURL={""}
                    linkText={"Home"}
                />
            }
            <Container>
              {this.props.children}
            </Container>
      </div>
    );
  }
}
