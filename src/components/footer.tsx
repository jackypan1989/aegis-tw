import { Flex, Spacer } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return <Flex 
    h={{ base: '12', lg: '16' }} 
    px={{ base: '3', lg: '16' }} 
    py={{ base: '2', lg: '8' }} 
    gap={{ base: '3', lg: '6' }} 
    fontSize={{ base: 'md', lg: 'xl' }}
    bg='#5A57FF'  
    fontWeight='medium' 
    color='white' 
    alignItems='center' 
    boxShadow='sm' 
    position='sticky'
  >
    <Link href='/about'>About</Link>
    <Link href='/feedback'>Feedback</Link>
    <Link href='/privacy'>Privacy</Link>
    <Spacer />
    <iframe src="https://ghbtns.com/github-btn.html?user=jackypan1989&repo=aegis-tw-community&type=star" width='50' height='20'></iframe>
  </Flex>
}

export default Footer