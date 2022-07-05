import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { useListPostQuery } from "../../../codegen/graphql"
import PostCard, { POST_CARD } from "../../components/postCard"

export const defaultUuid = "00000000-0000-0000-0000-000000000000"

export const LIST_POST = gql`
  ${POST_CARD}
  
  query listPost (
    $after: Cursor
    $voteFilter: VoteFilter
  ) {
    postCollection(
      first: 30,
      after: $after,
      orderBy: [{ rankingScore: DescNullsLast }, { createdAt: DescNullsLast }]
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
      totalCount
    }
  }
`

const PostIndex = () => {
  const { user } = useUser()
  const { data, loading, error, fetchMore } = useListPostQuery({
    variables: {
      voteFilter: {
        voterId: {
          eq: user?.id ?? defaultUuid
        } 
      }
    }
  })

  if (loading) return <Center><Spinner /></Center>
  if (error) return <Center>{error.message}</Center>

  const nodes = data?.postCollection?.edges.map(edge => edge.node) ?? []
  const pageInfo = data?.postCollection?.pageInfo
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

  return <Flex direction='column' alignItems='center' gap='8px'>
    {nodes.map(node => {
      return node && <PostCard key={node?.id} post={node} />
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>Load More</Button>
    </Box>}
  </Flex>
}

export default PostIndex