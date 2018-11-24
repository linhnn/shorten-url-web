import gql from 'graphql-tag';

export default gql`
	mutation shortenLink($url: String!, $baseUrl: String!) {
		shortenLink(url: $url, baseUrl: $baseUrl) {
			originalUrl
			shortUrl
			urlCode
			title
		}
	}
`;
