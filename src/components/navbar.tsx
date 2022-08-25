import { Avatar, Flex, Link, Show, Spacer } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { NextLink } from "./exportUtils"
import { Tab, TabItem } from "./tab"

const Navbar = () => {
  const { user } = useUser() 

  const mainTabItems: TabItem[] = [
    {
      href: '/community',
      icon: '👋',
      title: '人脈'

    },
    {
      href: '/post',
      icon: '🗞️',
      title: '動態'
    },
    {
      href: '/startup',
      icon: '🦄',
      title: '新創',
    },
    {
      href: '/venture',
      icon: '🚀',
      title: 'Venture',
    },
  ]

  return <Flex 
    w='100vw' 
    h={{ base: '12', lg: '16' }} 
    px={{ base: '3', lg: '16' }} 
    py={{ base: '2', lg: '8' }} 
    gap={{ base: '3', lg: '6' }} 
    fontSize={{ base: 'md', lg: 'xl' }}
    fontWeight='bold' 
    bg='#5A57FF' 
    color='white' 
    alignItems='center' 
    position='sticky'
    top='0px'
    zIndex='1'
  >
    <Show above='lg'>Aegis</Show>
    {mainTabItems.map((tabItem, index) => <Tab key={index} tabItem={tabItem} />)}
    <Spacer />
    {user
      ?<NextLink href={`/profile/${user.id}`} passHref>
        <Link>
          <Avatar size='sm' name={user.email?.[0]}/>
        </Link>
      </NextLink>
      :<Tab tabItem={{ href: '/auth/signIn', icon: '➡️', title: '加入' }} />
    }
  </Flex>
}

export default Navbar