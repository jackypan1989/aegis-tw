import { Flex } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return <Flex bg='#5A57FF' h='48px' p='8px 12px' gap='8px' fontWeight='medium' color='white' alignItems='center' boxShadow='sm' position='sticky'>
    <Link href='/about'>About</Link>
    <Link href='/feedback'>Feedback</Link>
    <Link href='/privacy'>Privacy</Link>
  </Flex>
}

export default Footer