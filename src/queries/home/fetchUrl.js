import gql from 'graphql-tag';

export default gql`
  query fetchUrl($urlCode: String!) {
    url(urlCode: $urlCode) {
      originalUrl
      shortUrl
      title
    }
  }
`;
