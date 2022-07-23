import { Avatar, Flex, Icon, Link } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import NextLink from "next/link"
import { BiShield } from "react-icons/bi"

const Navbar = () => {
  const { user } = useUser() 

  return <Flex w='100vw' h='48px' p='8px 16px' gap='12px' fontWeight='medium' bg='#5A57FF' color='white' alignItems='center' position='sticky'>
    <NextLink href='/post'>
      <Link>
        <Icon as={BiShield} display='block' />
      </Link>
    </NextLink>
    <NextLink href='/post'>News</NextLink>
    <NextLink href='/job'>Jobs</NextLink>
    <NextLink href='/community'>Community</NextLink>
    <Flex flex='1'/>
    <NextLink href='/post/create'>Submit</NextLink>
    {user
      ?<NextLink href={`/profile/${user.id}`}>
        <Link>
          <Avatar size='sm' name={user.email?.[0]}/>
        </Link>
      </NextLink>
      :<NextLink href='/auth/signIn'>
        Sign In
      </NextLink>
    }
  </Flex>
}

export default Navbar