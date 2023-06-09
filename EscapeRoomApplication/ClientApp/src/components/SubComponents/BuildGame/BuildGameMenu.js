import React, { Component } from 'react';
import { PageLink } from '../PageLink';

export class BuildGameMenu extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>BUILD GAME MENU</h1>
                <div>
                    <button onClick={this.editGame}> <PageLink
                        linkURL={"stages"}
                        linkText={"Stages"}
                    /></button>
                    <button> <PageLink
                        linkURL={"puzzles"}
                        linkText={"Puzzles"}
                    /></button>
                    <button> <PageLink
                        linkURL={"items"}
                        linkText={"Items"}
                    /></button>
                    <button> <PageLink
                        linkURL={"props"}
                        linkText={"Props/Locations"}
                    /></button>
                    <button> <PageLink
                        linkURL={"play-game"}
                        linkText={"Play"}
                    /></button>
                    <button> <PageLink
                        linkURL={"Locks"}
                        linkText={"locks"}
                    /></button>
                </div>
            </div>
        );
    }
}
