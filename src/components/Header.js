import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Row, Col, Nav, NavItem,
} from 'react-bootstrap';

/* eslint-disable */
const Header = (props) => {
    return (
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Link to="/">Shorten URL</Link>
          </Col>
          <Col xs={6} md={4}>
            <Nav bsStyle="pills" activeKey={props.activeKey}>
              <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                Home
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/top10" to="/top10">
                Top 10
              </NavItem>
              <NavItem eventKey={3} componentClass={Link} href="/subscribe" to="/subscribe">
                Subscribe
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Grid>
    );
};

export default Header;
