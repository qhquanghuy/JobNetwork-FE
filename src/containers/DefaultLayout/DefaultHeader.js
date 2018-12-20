import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown } from '@coreui/react';


const propTypes = {
  children: PropTypes.node,
  userName: PropTypes.string
};

const defaultProps = {
  userName: ""
};

class DefaultHeader extends Component {
  render() {
    console.log("rerender")
    const { userName } = this.props
    console.log(this.props)
    const isNotLoggedIn = userName === ""
    const title = isNotLoggedIn ?'Login' : userName

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const item = isNotLoggedIn ? <Button color = "primary" onClick = {
      () => this.props.onLogin()
    }>Login</Button> : <AppHeaderDropdown direction="down">
    <DropdownToggle nav>
    {title}
      {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
    </DropdownToggle>
    <DropdownMenu right style={{ right: 'auto' }}>
      <DropdownItem onClick = { () => this.props.onClickProfile() }><i className="fa fa-user"></i> Profile</DropdownItem>
      <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
    </DropdownMenu>
  </AppHeaderDropdown>
    return (
      <React.Fragment>
        
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i></NavLink>
          </NavItem>
          {item}
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
