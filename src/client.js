import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = process.env.REACT_APP_API_LINK;

const httpLink = new HttpLink({
  uri,
});

const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
};

export default new ApolloClient({
  link: httpLink,
  dataIdFromObject: obj => obj.id,
  cache: new InMemoryCache(),
  defaultOptions,
});
