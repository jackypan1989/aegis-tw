import { gql } from "@apollo/client"
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useGetProfileQuery } from "../../../codegen/graphql"

export const GET_PROFILE = gql`
  query getProfile($id: ID!) {
    profile(id: $id) {
      id
      email
      username
      roles
      markets
      avatarUrl
      website
      linkedin
      facebook
      twitter
      github
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileMutationInput!) {
    updateProfile(input: $input) {
      id
      email
      username
      roles
      markets
      avatarUrl
      website
      linkedin
      facebook
      twitter
      github
    }
  }
`

type FormValues = {
  username: string
  avatarUrl: string
  website: string
  linkedin: string
  facebook: string
  twitter: string
  github: string
}

const ProfileDetail = () => {
  const { user } = useUser()
  const router = useRouter()
  const id = router.query.id as string
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  const { data, loading } = useGetProfileQuery({
    variables: {
      id: id
    }
  })

  const profile = data?.profile

  if (loading) return <Box>Loading...</Box>
  
  const onSubmit = async (value: FormValues) => {
    console.log(value)
  }

  if (id === user?.id) {
    return <Box p='30'>
      <Flex>
        <Heading size='md'>My Profile</Heading>
        <Spacer />
        <Button size='sm' onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4'>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Text>{profile?.email}</Text>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.username}>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input
            id='username'
            placeholder='username'
            {...register('username', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='website'>Website</FormLabel>
          <Input
            id='website'
            placeholder='website url'
            {...register('website')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='linkedin'>Linkedin</FormLabel>
          <Input
            id='linkedin'
            placeholder='linkedin url'
            {...register('linkedin')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='facebook'>Facebook</FormLabel>
          <Input
            id='facebook'
            placeholder='facebook url'
            {...register('facebook')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='twitter'>Twitter</FormLabel>
          <Input
            id='twitter'
            placeholder='twitter url'
            {...register('twitter')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='github'>Github</FormLabel>
          <Input
            id='github'
            placeholder='github url'
            {...register('github')}
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          Update
        </Button>
      </form>
      
    </Box>
  } else {
    return <Box p='30'>
      <Heading>About {profile?.username}</Heading>
      <Text>{profile?.id}</Text>
      <Text>{profile?.username}</Text>
      <Text>{profile?.email}</Text>
    </Box>
  }
}

export default ProfileDetail