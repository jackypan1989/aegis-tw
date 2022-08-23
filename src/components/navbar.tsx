import { AddIcon } from "@chakra-ui/icons"
import { Avatar, Box, Flex, Icon, Link, Spacer } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { NextLink } from "./exportUtils"

const Navbar = () => {
  const { user } = useUser() 

  return <Flex 
    w='100vw' 
    h={{ base: '14', lg: '16' }} 
    px={{ base: '3', lg: '16' }} 
    py={{ base: '2', lg: '8' }} 
    gap={{ base: '3', lg: '6' }} 
    fontSize={{ base: 'sm', lg: 'xl' }}
    fontWeight='medium' 
    bg='#5A57FF' 
    color='white' 
    alignItems='center' 
    position='sticky'
    top='0px'
    zIndex='1'
  >
    <NextLink href='/post' passHref>
      <Link>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems='center'>
          <Box>📰</Box> 
          <Box>News</Box>
        </Flex>
      </Link>
    </NextLink>
    <NextLink href='/job' passHref>
      <Link>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems='center'>
          <Box>🔍</Box> 
          <Box>Jobs</Box>
        </Flex>
      </Link>
    </NextLink>
    <NextLink href='/community' passHref>
      <Link>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems='center'>
          <Box>🧑‍💻</Box> 
          <Box>People</Box>
        </Flex>
      </Link>
    </NextLink>
    <NextLink href='/startup' passHref>
      <Link>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems='center'>
          <Box>🦄</Box> 
          <Box>Startup</Box>
        </Flex>
      </Link>
    </NextLink>
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
          <Flex direction={{ base: 'column', lg: 'row' }} alignItems='center'>
            <Box>👤</Box> 
            <Box>Login</Box>
          </Flex>
        </Link>
      </NextLink>
    }
  </Flex>
}

export default Navbar