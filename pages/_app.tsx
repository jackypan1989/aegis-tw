import { AppProps } from 'next/app'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
