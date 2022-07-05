import { Box, ChakraProvider } from "@chakra-ui/react"
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
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
