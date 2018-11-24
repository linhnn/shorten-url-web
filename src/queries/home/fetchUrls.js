import gql from 'graphql-tag';

export default gql`
  query fetchUrls($urlCodes: String!) {
    urls(urlCodes: $urlCodes) {
      originalUrl
      shortUrl
      urlCode
    }
  }
`;
