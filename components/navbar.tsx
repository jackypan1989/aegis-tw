import { Avatar, Box, Flex, Heading, HStack } from "@chakra-ui/react"
import Link from "next/link"

const Navbar = () => {
  return <HStack m='3' alignContent='flex-start'>
    <Heading size='sm'>Aegis</Heading>
    <Link href='/post'>Feed</Link>
    <Link href='/post/create'>Submit</Link>
    <Box flex='1'/>
    <Avatar size='sm' />
  </HStack>
}

export default Navbar