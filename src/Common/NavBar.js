import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = ({ history }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Invoice App</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem onClick={() => history.push('/invoices')}>Invoices</NavItem>
      <NavItem onClick={() => history.push('/products')}>Products</NavItem>
      <NavItem onClick={() => history.push('/customers')}>Customers</NavItem>
    </Nav>
  </Navbar>
);

NavBar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(NavBar);
