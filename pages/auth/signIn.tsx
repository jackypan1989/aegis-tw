import React from 'react'
import { Center, Box, Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/ui'

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