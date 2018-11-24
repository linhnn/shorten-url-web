import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withApollo } from 'react-apollo';

import { fetchUrl } from '../queries';

class Url extends Component {
  async componentWillMount() {
    try {
      const result = await this.props.client.query({
        query: fetchUrl,
        variables: { urlCode: this.props.match.params.code } // eslint-disable-line
      });
      if (result) {
         window.location = result.data.url.originalUrl;
      }
    } catch (error) {
      window.location = 'http://localhost:3000/';
    }
  }
}

Url.propTypes = {
  client: PropTypes.object.isRequired,
};

export default compose(
  withApollo,
)(Url);
