import { gql } from "@apollo/client"
import { useUser } from "@supabase/auth-helpers-react"

export const GET_PROFILE = gql`
  query profile (
    $first: Int,
    $after: Cursor,
    $filter: PostFilter
  ) {
    profile(
      filter: $filter
    ) {
      id
      username
    }
  }
`

const ProfileDetail = () => {
  const { user } = useUser()

  return <>
    
  </>
}

export default ProfileDetail