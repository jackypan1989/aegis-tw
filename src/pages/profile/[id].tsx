import { gql } from "@apollo/client"
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useProfileQuery } from "../../../codegen/graphql"

export const GET_PROFILE = gql`
  query profile($id: ID!) {
    profile(id: $id) {
      id
      username
      email
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileMutationInput!) {
    updateProfile(input: $input) {
      id
      username
      email
    }
  }
`

type FormValues = {
  username: string
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
  const { data, loading } = useProfileQuery({
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
        <Heading>My Profile</Heading>
        <Box flex={1}></Box>
        <Button onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
      </Flex>
      <Text>{profile?.email}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username}>
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
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          Submit
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