import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"

const Navbar = () => {
  const { user } = useUser() 

  return <Flex bg='#5A57FF' fontSize='24px' color='white' p='24px 32px' alignItems='center' boxShadow='sm' position='sticky' gap='30px'>
    <Link href='/'>
      <Heading>Aegis</Heading>
    </Link>
    <Link href='/post'>News</Link>
    <Link href='/job'>Job</Link>
    <Link href='/post/create'>Submit</Link>
    <Flex flex='1'/>
    <Link href='/auth/signIn'>
      <Box>
        {user ? <Text>{user.email}</Text> : <Text> Sign In</Text>}
      </Box>
    </Link>
  </Flex>
}

export default Navbar