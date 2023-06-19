import React, { Component } from 'react';
import { PageLink } from '../SubComponents/PageLink';

export class Locks extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <h3>Locks</h3>
                <button> <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                /></button>
            </div>
        );
    }
}
