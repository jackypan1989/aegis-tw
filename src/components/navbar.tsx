import { AddIcon } from "@chakra-ui/icons"
import { Avatar, Box, Flex, Icon, Link, Spacer } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { NextLink } from "./exportUtils"

type TabItem = {
  icon: string,
  title: string,
  href: string
}

const Tab = (props: { tabItem: TabItem }) => {
  const { tabItem } = props 
  return <NextLink href={tabItem.href} passHref>
    <Link>
      <Flex direction={{ base: 'row', lg: 'row' }} alignItems='center'>
        <Box>{tabItem.icon}</Box> 
        <Box>{tabItem.title}</Box>
      </Flex>
    </Link>
  </NextLink>
}

const Navbar = () => {
  const { user } = useUser() 

  const mainTabItems: TabItem[] = [
    {
      href: '/post',
      icon: '📰',
      title: '動態'
    },
    {
      href: '/job',
      icon: '🔍',
      title: '求職'
    },
    {
      href: '/community',
      icon: '👋',
      title: '社群'

    },
    {
      href: '/startup',
      icon: '🦄',
      title: '新創',
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
    {mainTabItems.map((tabItem, index) => <Tab key={index} tabItem={tabItem} />)}
    <Spacer />
    <NextLink href='/post/create' passHref>
      <Link display='block'>
        <Icon as={AddIcon} mb='1' />
      </Link>
    </NextLink>
    {user
      ?<NextLink href={`/profile/${user.id}`} passHref>
        <Link>
          <Avatar size='sm' name={user.email?.[0]}/>
        </Link>
      </NextLink>
      :<NextLink href='/auth/signIn' passHref>
        <Link>
          <Flex direction={{ base: 'row', lg: 'row' }} alignItems='center'>
            <Box>登入</Box>
          </Flex>
        </Link>
      </NextLink>
    }
  </Flex>
}

export default Navbar