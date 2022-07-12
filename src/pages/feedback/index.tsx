import { Box, Button, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"

const Feedback = () => {
  return <Box p='30'>
    <Heading mb='3'>Feedback</Heading>
    <Text mb='3'>
      If you have any questions or feedback. Please send us email. 
    </Text>
    <Link href="mailto: jackypan1989@gmail.com">
      <Button>Mail Us</Button>
    </Link>
  </Box>
}

export default Feedback