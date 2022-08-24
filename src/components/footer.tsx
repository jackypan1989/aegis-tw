import { Center, Flex, Spacer } from "@chakra-ui/react"
import GitHubButton from 'react-github-btn'
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
    <Tab tabItem={{ href: '/privacy', icon: undefined, title: '隱私權' }} />
    <Spacer />
    <Center pt='2'>
      <GitHubButton 
        href="https://github.com/jackypan1989/aegis-tw" 
        data-show-count='true'
      >
        Star
      </GitHubButton>
    </Center>
  </Flex>
}

export default Footer