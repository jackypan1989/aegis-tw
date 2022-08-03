import { Flex, Spacer } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return <Flex bg='#5A57FF' h='48px' p='8px 12px' gap='12px' fontWeight='medium' color='white' alignItems='center' boxShadow='sm' position='sticky'>
    <Link href='/about'>About</Link>
    <Link href='/feedback'>Feedback</Link>
    <Link href='/privacy'>Privacy</Link>
    <Spacer />
    <iframe src="https://ghbtns.com/github-btn.html?user=jackypan1989&repo=aegis-tw-community&type=star" width='50' height='20'></iframe>
  </Flex>
}

export default Footer