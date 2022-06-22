import { Box, Button, Center } from '@chakra-ui/react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/ui'
import { NextPage } from 'next'

const SignIn: NextPage = () => {
  const { user } = useUser()

  if (!user) {
    return <Box p='10'>
      <Auth
        supabaseClient={supabaseClient}
        providers={['github']}
        socialLayout='vertical'
        socialButtonSize='xlarge'
        onlyThirdPartyProviders={true}
      />
    </Box>
  }

  return <Center>
    <Box>Hello {user.email}</Box>
    <Button onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
  </Center>  
}

export default SignIn