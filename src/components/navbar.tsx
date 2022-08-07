import { AddIcon } from "@chakra-ui/icons"
import { Avatar, Flex, Icon, Link, Spacer } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import NextLink from "next/link"

const Navbar = () => {
  const { user } = useUser() 

  return <Flex 
    w='100vw' 
    h={{ base: '12', lg: '16' }} 
    px={{ base: '3', lg: '16' }} 
    py={{ base: '2', lg: '8' }} 
    gap={{ base: '3', lg: '6' }} 
    fontSize={{ base: 'md', lg: 'xl' }}
    fontWeight='medium' 
    bg='#5A57FF' 
    color='white' 
    alignItems='center' 
    position='sticky'
  >
    <NextLink href='/post' passHref>
      <Link>News</Link>
    </NextLink>
    <NextLink href='/job' passHref>
      <Link>Jobs</Link>
    </NextLink>
    <NextLink href='/community' passHref>
      <Link>Community</Link>
    </NextLink>
    <Spacer />
    <NextLink href='/post/create' passHref>
      <Link display='block'>
        <Icon as={AddIcon} mb='1'/>
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
          Sign In
        </Link>
      </NextLink>
    }
  </Flex>
}

export default Navbar