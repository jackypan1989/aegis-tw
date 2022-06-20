import { AppProps } from 'next/app'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { Box, ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SUPABASE_URL + '/graphql/v1'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  }
}) 

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider>
          <Navbar />
          <Box minH='1000px'>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ChakraProvider>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
