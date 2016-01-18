import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class Header extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (


      <Navbar fixedTop toggleNavKey={0}>
        <NavBrand>
          <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
            <div className='logo'></div>
          </IndexLink>
        </NavBrand>

        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LinkContainer to="/performers">
              <NavItem  active={true} disable={true} eventKey={1}>{msg.performers_title}</NavItem>
            </LinkContainer>
            <LinkContainer to="/videos">
              <NavItem  active={true} disable={true} eventKey={1}>{msg.video_title}</NavItem>
            </LinkContainer>
            <LinkContainer to="/competitions-and-festivals">
              <NavItem eventKey={2}>{msg.competitions_title}</NavItem>
            </LinkContainer>
            <LinkContainer to="/advises">
              <NavItem eventKey={3}>{msg.advise_title}</NavItem>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <NavItem eventKey={4}>{msg.about_us_title}</NavItem>
            </LinkContainer>
          </Nav>


        </CollapsibleNav>
      </Navbar>
    );
  }

}
