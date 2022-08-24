import { Flex, Link, Spacer } from "@chakra-ui/react"
import { NextLink } from "./exportUtils"

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
    {/* <NextLink href='/venture' passHref>
      <Link>Venture</Link> 
    </NextLink> */}
    <NextLink href='/about' passHref>
      <Link>關於</Link> 
    </NextLink>
    <Spacer />
    <iframe src="https://ghbtns.com/github-btn.html?user=jackypan1989&repo=aegis-tw-community&type=star" width='50' height='20'></iframe>
    <NextLink href='/privacy' passHref>
      <Link>隱私政策</Link> 
    </NextLink>
  </Flex>
}

export default Footer