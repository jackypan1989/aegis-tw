import { Avatar, Box, Flex, Heading, HStack } from "@chakra-ui/react"
import Link from "next/link"

const Navbar = () => {
  return <HStack p='3' alignContent='flex-start' boxShadow='sm' position='sticky'>
    <Heading size='sm'>Aegis</Heading>
    <Link href='/post'>Feed</Link>
    <Link href='/post/create'>Submit</Link>
    <Box flex='1'/>
    <Link href='/auth/signIn'>
      <Avatar size='sm' cursor='pointer'/>
    </Link>
  </HStack>
}

export default Navbar