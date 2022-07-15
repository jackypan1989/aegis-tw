import { Flex } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"

const Navbar = () => {
  const { user } = useUser() 

  return <Flex w='100vw' h='48px' p='8px 16px' gap='12px' bg='#5A57FF' color='white' alignItems='center' position='sticky'>
    <Link href='/'>Aegis</Link>
    <Link href='/post'>News</Link>
    <Link href='/job'>Job</Link>
    <Link href='/post/create'>Submit</Link>
    <Flex flex='1'/>
    {user
      ?<Link href={`/profile/${user.id}`}>Profile</Link>
      :<Link href='/auth/signIn'>Sign In</Link>
    }
  </Flex>
}

export default Navbar