import gql from 'graphql-tag';

export default gql`
  query fetchTopUrls($number: Int!) {
    urlsTop(number: $number) {
      originalUrl
      shortUrl
      urlCode
      title
      count
    }
  }
`;
