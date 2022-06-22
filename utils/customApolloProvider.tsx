import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useUser } from "@supabase/auth-helpers-react"
import { ReactNode } from "react"

export const CustomApolloProvider = (props: {children: ReactNode}) => {
  const { accessToken } = useUser()
  
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SUPABASE_URL + '/graphql/v1'
  })
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        ...(accessToken ? {authorization: `Bearer ${accessToken}`} : {})
      }
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={apolloClient}>
    {props.children}
  </ApolloProvider>
}
