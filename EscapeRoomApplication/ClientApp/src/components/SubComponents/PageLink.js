import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class PageLink extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        var parameters = this.props.parameters ? this.props.parameters : {};
        return (
            <div>
                <NavLink
                    tag={Link}
                    className="text-dark"
                    to={{
                        pathname: "/" + this.props.linkURL,
                        state: parameters
                    }}
                >
                    {this.props.linkText}
                </NavLink>
            </div>
        );
    }
}
