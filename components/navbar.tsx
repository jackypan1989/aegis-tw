import { Avatar, Box, HStack } from "@chakra-ui/react"
import Link from "next/link"

const Navbar = () => {
  return <HStack p='3' alignContent='flex-start' boxShadow='sm' position='sticky'>
    <Link href='/post'>Feed</Link>
    <Link href='/job'>Job</Link>
    <Link href='/post/create'>Submit</Link>
    <Box flex='1'/>
    <Link href='/auth/signIn'>
      <Avatar size='sm' cursor='pointer'/>
    </Link>
  </HStack>
}

export default Navbar