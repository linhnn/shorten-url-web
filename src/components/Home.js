import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
 Grid, Button, Form, Row, Col, FormGroup, FormControl
} from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Header from './Header';
import UrlList from './UrlList';
import { fetchUrls } from '../queries';
import { shortenLink } from '../mutations';
import {
  HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, UPDATE_URL, ADD_URL,
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.home
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, urlIds) =>
    dispatch({ type: HOME_PAGE_LOADED, payload, urlIds }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED }),
  onChangeUrl: url =>
    dispatch({ type: UPDATE_URL, url }),
  onSubmit: (payload, urlIds) =>
    dispatch({ type: ADD_URL, payload, urlIds })
});

class Home extends Component {
  constructor() {
    super();

    this.setUrl = (ev) => {
      this.props.onChangeUrl({ url: ev.target.value }); // eslint-disable-line
    };

    this.shortenLink = async (ev) => {
      try {
        // submit form
        ev.preventDefault();
        const result = await this.props.shortenLink({
          variables: {
            url: this.props.url, // eslint-disable-line
            baseUrl: 'http://localhost:3000'
          }
        });

        // save to local storage
        const { urlIds } = this.props;
        if (!urlIds.includes(result.data.shortenLink.urlCode)) {
          urlIds.unshift(result.data.shortenLink.urlCode);
          localStorage.setItem('urls', urlIds.join());

          // update state
          this.props.onSubmit(result, urlIds); // eslint-disable-line
        }
      } catch (error) {
        const message = error.graphQLErrors && error.graphQLErrors[0]
          && error.graphQLErrors[0].message;
        NotificationManager.error(message, 'Error', 1000);
    }
  };
}

  async componentWillMount() {
    const urls = localStorage.getItem('urls');
    let urlArr = [];
    let result = [];
    if (urls) {
      urlArr = urls.split(',');
      result = await this.props.client.query({
        query: fetchUrls,
        variables: { urlCodes: urls }
      });
    }

    this.props.onLoad(result, urlArr); // eslint-disable-line
  }

  componentWillUnmount() {
    this.props.onUnload(); // eslint-disable-line
  }

  render() {
    if (!this.props.urls) { // eslint-disable-line
      return null;
    }

    return (
      <div className="container">
        <Header activeKey={1} />
        <div className="main-content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Form inline onSubmit={this.shortenLink}>
                  <FormGroup controlId="formInlineName" className="col-md-5">
                    <FormControl
                      type="text"
                      placeholder="Paste a link to shorten it"
                      className="input-text"
                      value={this.props.url} // eslint-disable-line
                      onChange={this.setUrl}
                    />
                  </FormGroup>
                  <Button type="submit">SHORTEN</Button>
                </Form>
              </Col>
            </Row>

            <Row className="url-list">
              <UrlList urls={this.props.urls} count={false} />
            </Row>
          </Grid>

          <NotificationContainer />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  client: PropTypes.object.isRequired,
  shortenLink: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withApollo,
  graphql(shortenLink, { name: 'shortenLink' })
)(Home);
