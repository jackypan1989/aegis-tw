import { Flex, Spacer } from "@chakra-ui/react"
import { Tab } from "./tab"

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
    <Tab tabItem={{ href: '/about', icon: 'ℹ️', title: '關於' }} />
    <Spacer />
    <Tab tabItem={{ href: '/privacy', icon: undefined, title: '隱私權' }} />
    <iframe src="https://ghbtns.com/github-btn.html?user=jackypan1989&repo=aegis-tw-community&type=star" frameBorder="0" scrolling="0" width='50' height='20'></iframe>
  </Flex>
}

export default Footer