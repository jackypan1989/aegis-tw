import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { useListPostOnlyJobQuery } from "../../../codegen/graphql"
import PostCard, { POST_CARD } from "../../components/postCard"

export const defaultUuid = "00000000-0000-0000-0000-000000000000"

export const LIST_POST_ONLY_JOB = gql`
  ${POST_CARD}
  
  query listPostOnlyJob (
    $first: Int,
    $after: Cursor,
    $filter: PostFilter
  ) {
    posts(
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
          ...PostCard
        }
      }
    }
  }
`

const Job = () => {
  const { data, loading, error, fetchMore } = useListPostOnlyJobQuery({
    variables: {
      first: 30,
      filter: {
        onlyJobs: true
      }
    }
  })

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (error) return <Center h='80vh'>{error.message}</Center>

  const nodes = data?.posts?.edges.map(edge => edge.node) ?? []
  const pageInfo = data?.posts?.pageInfo
  const hasNextPage = pageInfo?.hasNextPage
  
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor
        }
      })
    }
  }

  return <Flex direction='column' alignItems='center' gap='8px'>
    {nodes.map(node => {
      return node && <PostCard key={node?.id} post={node} refetchQuery={LIST_POST_ONLY_JOB} />
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>Load More</Button>
    </Box>}
    <Text>{`News title with "Job" or "徵才"`}</Text>
  </Flex>
}

export default Job