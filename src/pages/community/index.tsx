import { gql } from "@apollo/client"
import { Box, Button, Center, Spinner } from "@chakra-ui/react"
import { useListProfileQuery } from "../../../codegen/graphql"
import ProfileCard, { PROFILE_CARD } from "../../components/profileCard"

export const LIST_PROFILE = gql` 
  ${PROFILE_CARD}

  query listProfile (
    $first: Int,
    $after: Cursor,
    $filter: ProfileFilter
  ) {
    profiles(
      first: $first,
      after: $after,
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...ProfileCard
        }
      }
    }
  }
`

const Community = () => {
  const { data, loading, error, fetchMore } = useListProfileQuery({
    variables: {
      first: 30
    }
  })

  if (loading) return <Center><Spinner /></Center>
  if (error) return <Center>{error.message}</Center>

  const nodes = data?.profiles.edges.map(edge => edge.node) ?? []
  const pageInfo = data?.profiles?.pageInfo
  const hasNextPage = pageInfo?.hasNextPage

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        }
      })
    }
  }

  return <Box>
    {nodes.map(node => {
      return node && <ProfileCard key={node?.id} profile={node} />
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>Load More</Button>
    </Box>}
  </Box>
}

export default Community