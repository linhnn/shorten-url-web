import React, { Component } from 'react';
import {
 Grid, Button, Form, Row, Col, FormGroup, FormControl
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { graphql, compose, withApollo } from 'react-apollo';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Header from './Header';
import { subscribeEmail } from '../mutations';

class Subscribe extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };

    this.setEmail = (ev) => {
      this.setState({ email: ev.target.value });
    };

    this.submitForm = async (ev) => {
      try {
        // submit form
        ev.preventDefault();
        await this.props.subscribeEmail({
          variables: {
            email: this.state.email,
          }
        });
        this.setState({ email: '' });
        NotificationManager.success('Subscribe done', 'Notification', 1000);
      } catch (error) {
        const message = error.graphQLErrors && error.graphQLErrors[0]
          && error.graphQLErrors[0].message;
        NotificationManager.error(message, 'Error', 1000);
      }
    };
  }

  render() {
    return (
      <div className="container">
        <Header activeKey={3} />
        <div className="main-content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Form inline onSubmit={this.submitForm}>
                  <FormGroup controlId="formInlineName" className="col-md-5">
                    <FormControl
                      type="text"
                      placeholder="Enter your email"
                      className="input-text"
                      value={this.state.email}
                      onChange={this.setEmail}
                    />
                  </FormGroup>
                  <Button type="submit">SUBSCRIBE</Button>
                </Form>
                <NotificationContainer />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Subscribe.propTypes = {
  subscribeEmail: PropTypes.func.isRequired,
};

export default compose(
  withApollo,
  graphql(subscribeEmail, { name: 'subscribeEmail' })
)(Subscribe);
