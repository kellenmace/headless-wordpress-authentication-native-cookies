import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  credentials: 'include',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
