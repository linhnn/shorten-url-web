import gql from 'graphql-tag';

export default gql`
	mutation subscribeEmail($email: String!) {
		subscribeEmail(email: $email) {
			email
		}
	}
`;
