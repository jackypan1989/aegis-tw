import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import Script from "next/script"
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { CustomApolloProvider } from '../utils/customApolloProvider'

const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: '3xl',
        fontWeight: 'bold',
        mb: '4'
      },
      h2: {
        fontSize: 'xl',
        fontWeight: 'bold',
        mb: '4'
      },
      h3: {
        fontSize: 'lg',
        fontWeight: 'bold',
        mb: '4'
      },
      h4: {
        fontSize: 'md',
        fontWeight: 'bold',
        mb: '4'
      },
      p: {
        fontSize: 'sm',
        mb: '4'
      },
      ol: {
        fontSize: 'sm',
        p: '0 24px',
        mb: '4'
      },
      ul: {
        fontSize: 'sm',
        p: '0 24px',
        mb: '4'
      },
      li: {
        mb: '1'
      }
    }
  }
})

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
          <ChakraProvider theme={theme}>
            <Navbar />
            <Box m={{ lg: '0 auto'}} width={{ lg: '800px' }} minH='calc(100vh - 96px)'>
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
