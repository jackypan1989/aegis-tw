import { Box, ChakraProvider } from "@chakra-ui/react"
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import Script from "next/script"
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { CustomApolloProvider } from '../utils/customApolloProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-REPJEXSGK2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-REPJEXSGK2');
        `}
      </Script>
      <UserProvider supabaseClient={supabaseClient}>
        <CustomApolloProvider>
          <ChakraProvider>
            <Navbar />
            <Box minH='calc(100vh - 96px)'>
              <Component {...pageProps} />
            </Box>
            <Footer />
          </ChakraProvider>
        </CustomApolloProvider>
      </UserProvider>
    </>
  )

}

export default MyApp
