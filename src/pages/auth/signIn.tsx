import { Box, Button, Center } from '@chakra-ui/react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import SignInPanel from '../../components/SignInPanel'

const SignIn: NextPage = () => {
  const { user } = useUser()

  if (!user) {
    return <Box p={{ base: 4, lg: 10 }}>
      <SignInPanel />
    </Box>
  }
  
  return <Center>
    <Box>Hello {user.email}</Box>
    <Button onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
  </Center>  
}

export default SignIn