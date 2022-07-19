import { Flex } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return <Flex bg='#5A57FF' h='48px' p='8px 16px' gap='12px' color='white' alignItems='center' boxShadow='sm' position='sticky'>
    <Link href='/about'>About</Link>
    <Link href='/feedback'>Feedback</Link>
    <Link href='/privacy'>Privacy</Link>
  </Flex>
}

export default Footer