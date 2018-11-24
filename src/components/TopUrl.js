import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Header from './Header';
import UrlList from './UrlList';
import { fetchTopUrls } from '../queries';
import {
  TOPURL_PAGE_LOADED, TOPURL_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.topurl
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: TOPURL_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: TOPURL_PAGE_UNLOADED }),
});

class TopUrl extends Component {
  async componentWillMount() {
    const result = await this.props.client.query({
      query: fetchTopUrls,
      variables: { number: 10 }
    });
    this.props.onLoad(result); // eslint-disable-line
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
        <Header activeKey={2} />
        <div className="main-content">
          <Grid fluid>
            <Row className="url-list">
              <UrlList urls={this.props.urls} count />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

TopUrl.propTypes = {
  client: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withApollo,
)(TopUrl);
