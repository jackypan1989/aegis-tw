import { Flex } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return <Flex bg='#5A57FF' fontSize='24px' color='white' p='24px 32px' justifyContent='center' alignItems='center' boxShadow='sm' position='sticky' gap='30px'>
    <Link href='/feedback'>Feedback</Link>
    <Link href='/about'>About</Link>
  </Flex>
}

export default Footer