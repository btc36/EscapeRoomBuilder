import React, { Component } from 'react';
import { PageLink } from '../SubComponents/PageLink';

export class Props extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <h3>Props</h3>
                 <button> <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                /></button>
            </div>
        );
    }
}
