import { Avatar, Flex, Hide, Icon, Link, Show, Spacer } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { AiFillHome, AiOutlineUser } from "react-icons/ai"
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
    }
  ]

  return <Flex 
    w='100vw' 
    h={{ base: '12', lg: '16' }} 
    px={{ base: '3', lg: '16' }} 
    py={{ base: '2', lg: '8' }} 
    gap={{ base: '3', lg: '6' }} 
    fontSize={{ base: 'md', lg: 'xl' }}
    fontWeight='bold' 
    bg='black'
    color='white' 
    alignItems='center' 
    position='sticky'
    top='0px'
    zIndex='1'
  >
    <NextLink href='/' passHref>
      <Link>
        <Hide above='lg'><Icon mt={{ base: 1.5, md: 2 }} as={AiFillHome}></Icon></Hide>
        <Show above='lg'>Aegis Venture</Show>
      </Link>
    </NextLink>
    {mainTabItems.map((tabItem, index) => <Tab key={index} tabItem={tabItem} />)}
    <Spacer />
    {user
      ?<NextLink href={`/profile/${user.id}`} passHref>
        <Link>
          <Avatar size='sm' name={user.email?.[0]}/>
        </Link>
      </NextLink>
      :<NextLink href={`/auth/signIn`} passHref>
        <Link>
          <Icon mt={{ base: 1.5, md: 2 }} as={AiOutlineUser} />
        </Link>
      </NextLink>
    }
  </Flex>
}

export default Navbar