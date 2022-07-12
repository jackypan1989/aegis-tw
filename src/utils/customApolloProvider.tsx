import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { relayStylePagination } from "@apollo/client/utilities"
import { ReactNode } from "react"

export const CustomApolloProvider = (props: {children: ReactNode}) => {
  const httpLink = createHttpLink({
    uri: '/api/graphql'
  })
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      }
    }
  })

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          postCollection: relayStylePagination()
        }
      }
    }
  })
  
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache
  })

  return <ApolloProvider client={apolloClient}>
    {props.children}
  </ApolloProvider>
}
