import { gql } from "@apollo/client"
import { Box, Center, Flex, Spinner } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { useListPostQuery } from "../../codegen/graphql"
import PostCard, { POST_CARD } from "../../components/postCard"

export const LIST_POST = gql`
  ${POST_CARD}

  query listPost (
    $voteFilter: VoteFilter
  ) {
    postCollection(
      orderBy: [{ rankingScore: DescNullsLast }, { createdAt: DescNullsLast }]
      first: 30
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...PostCard
        }
      }
    }
  }
`

const PostIndex = () => {
  const { user } = useUser()
  const { data, loading, error } = useListPostQuery({
    variables: {
      voteFilter: {
        voterId: {
          eq: user?.id
        } 
      }
    }
  })
  
  if (loading) return <Center><Spinner /></Center>
  if (error) return <Center>{error.message}</Center>

  return <Flex direction='column' alignItems='center' gap='8px'>
    {data?.postCollection?.edges.map(edge => {
      return edge.node && <PostCard key={edge.cursor} post={edge.node} />
    })}
    <Box p='30px'>Pagination Placeholder</Box>
  </Flex>
}

export default PostIndex