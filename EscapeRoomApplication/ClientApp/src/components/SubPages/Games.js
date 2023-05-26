import React, { Component } from 'react';

export class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.runTest = this.runTest.bind(this);
        this.runTest();
    }

    async runTest() {
        console.log("HERE", await this.props.FrontEndDAO.getExistingGames(this.props.userId));
    }

    render() {

        return (
            <div>
                <h3>Games</h3>
            </div>
        );
    }
}
