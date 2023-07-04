import { Box, ChakraProvider, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { Session } from '@supabase/auth-helpers-nextjs'
import { MDXComponents } from 'mdx/types'
import { AppProps } from 'next/app'
import Head from "next/head"
import Script from "next/script"
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { Image } from "@chakra-ui/react"

const component: MDXComponents = {
  h1: (props) => <Heading as='h1' size='xl' mb='4' {...props} />,
  h2: (props) => <Heading as='h2' size='lg' mb='4' {...props} />,
  h3: (props) => <Heading as='h3' size='md' mb='4' {...props} />,
  h4: (props) => <Heading as='h4' size='sm' mb='4' {...props} />,
  h5: (props) => <Heading as='h5' size='xs' mb='4' {...props} />,
  h6: (props) => <Heading as='h6' size='2xs' mb='4' {...props} />,
  p: (props) => <Text mb='4' lineHeight={1.6} {...props} />,
  a: (props) => <a {...props} />,
  ol: (props) => <OrderedList mb='4' {...props} />,
  ul: (props) => <UnorderedList mb='4' {...props} />,
  li: (props) => <ListItem mb='1' {...props} />,
}

const title = 'Aegis Venture - Startup Advisory Service for SaaS, AI, and Social Startups'
const description = 'Aegis Venture is a leading startup advisory firm in Taiwan, offering comprehensive support and guidance to SaaS, AI, and Social startups. Our experienced team of founders, Jacky Pan and Oscar Chien, provide expert tech, product, operations, legal, and fundraising assistance, helping startups secure funding, connect with partners, and achieve their entrepreneurial goals. Contact us today to turn your startup dreams into reality.'

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description"  content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
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
      <MDXProvider components={component}>
        <ChakraProvider>
          <Box 
            height='200px'
            backgroundImage='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800'
            backgroundSize='cover'
          >
          </Box>
          <Box 
            m={{ lg: '0 auto' }} 
            p={30}
            width={{ lg: '800px' }} 
            minH={{ base: 'calc(100vh - 96px)', lg: 'calc(100vh - 128px)' }}
          >
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </MDXProvider>
    </>
  )
}

export default MyApp
