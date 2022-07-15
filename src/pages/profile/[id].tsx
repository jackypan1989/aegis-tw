import { gql } from "@apollo/client"
import { Box, Heading, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useProfileQuery } from "../../../codegen/graphql"

export const GET_PROFILE = gql`
  query profile (
    $id: ID!
  ) {
    profile(
      id: $id
    ) {
      id
      username
      email
    }
  }
`

const ProfileDetail = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { user } = useUser()
  const { data, loading } = useProfileQuery({
    variables: {
      id: id
    }
  })

  if (loading) return <Box>Loading...</Box>
  
  const profile = data?.profile
  
  if (user?.id === profile?.id) {
    return <Box>
      <Heading>My Profile</Heading>
      <Text>{profile?.id}</Text>
      <Text>{profile?.username}</Text>
      <Text>{profile?.email}</Text>
    </Box>
  } else {
    return <Box>
      <Heading>About {profile?.username}</Heading>
      <Text>{profile?.id}</Text>
      <Text>{profile?.username}</Text>
      <Text>{profile?.email}</Text>
    </Box>
  }
}

export default ProfileDetail