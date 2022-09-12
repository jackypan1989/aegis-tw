import { Box, ChakraProvider, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { MDXComponents } from 'mdx/types'
import { AppProps } from 'next/app'
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"
import Banner from "../components/banner"
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { CustomApolloProvider } from '../utils/customApolloProvider'

const component: MDXComponents = {
  h1: (props) => <Heading as='h1' size='2xl' mb='4' {...props} />,
  h2: (props) => <Heading as='h2' size='xl' mb='4' {...props} />,
  h3: (props) => <Heading as='h3' size='lg' mb='4' {...props} />,
  h4: (props) => <Heading as='h4' size='md' mb='4' {...props} />,
  h5: (props) => <Heading as='h5' size='sm' mb='4' {...props} />,
  h6: (props) => <Heading as='h6' size='xs' mb='4' {...props} />,
  p: (props) => <Text mb='4' lineHeight={1.6} {...props} />,
  a: (props) => <Link {...props} />,
  ol: (props) => <OrderedList mb='4' {...props} />,
  ul: (props) => <UnorderedList mb='4' {...props} />,
  li: (props) => <ListItem mb='1' {...props} />,
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Aegis Taiwan | 台灣人軟體新創社群</title>
        <meta name="description"  content="Aegis Taiwan 是以軟體業為出發，擁有台灣人認同，串連海內外台灣人的跨境新創社群。" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Aegis Taiwan | 台灣人軟體新創社群" />
        <meta property="og:description" content="Aegis Taiwan 是以軟體業為出發，擁有台灣人認同，串連海內外台灣人的跨境新創社群。" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
          <MDXProvider components={component}>
            <ChakraProvider>
              <Navbar />
              {router.pathname === '/' && <Banner />}
              <Box m={{ lg: '0 auto'}} width={{ lg: '800px' }} minH={{ base: 'calc(100vh - 96px)', lg: 'calc(100vh - 128px)' }}>
                <Component {...pageProps} />
              </Box>
              <Footer />
            </ChakraProvider>
          </MDXProvider>
        </CustomApolloProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
