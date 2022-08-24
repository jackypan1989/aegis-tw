import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react"
import Head from "next/head"
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
      first: 10,
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

  return <Box>
    <Head>
      <title>求職 | Aegis | 臺灣人軟體新創社群</title>
    </Head>
    <Flex direction='column' alignItems='center' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <PostCard key={node?.id} post={node} refetchQuery={LIST_POST_ONLY_JOB} />
      })}
      {hasNextPage && <Box p={{ base: 4, lg: 8 }}>
        <Button onClick={onLoadMore}>Load More</Button>
      </Box>}
    </Flex>
  </Box>
}

export default Job