import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import SignInPanel from '../../components/signInPanel'

const SignIn: NextPage = () => {
  return <Box p={{ base: 4, lg: 10 }}>
    <SignInPanel />
  </Box>
}

export default SignIn