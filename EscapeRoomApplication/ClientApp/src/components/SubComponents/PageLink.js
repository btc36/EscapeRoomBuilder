import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class PageLink extends Component {

    constructor(props) {
        super(props);

    }

    render() {
      
        return (
            <div>
                <NavLink tag={Link} className="text-dark" to={"/" + this.props.linkURL}>{this.props.linkText}</NavLink>
            </div>
        );
    }
}
