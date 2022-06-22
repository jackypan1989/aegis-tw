import { AppProps } from 'next/app'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { Box, ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { CustomApolloProvider } from '../utils/customApolloProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <CustomApolloProvider>
        <ChakraProvider>
          <Navbar />
          <Box minH='1000px'>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ChakraProvider>
      </CustomApolloProvider>
    </UserProvider>
  )
}

export default MyApp
