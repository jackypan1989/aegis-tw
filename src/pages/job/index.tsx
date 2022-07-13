import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react"
import { useListPostQuery } from "../../../codegen/graphql"
import PostCard from "../../components/postCard"

export const defaultUuid = "00000000-0000-0000-0000-000000000000"

const Job = () => {
  const { data, loading, error, fetchMore } = useListPostQuery({
    variables: {
      first: 30,
      filter: {
        title: '徵才'
      }
    }
  })

  if (loading) return <Center><Spinner /></Center>
  if (error) return <Center>{error.message}</Center>

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
      return node && <PostCard key={node?.id} post={node} />
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>Load More</Button>
    </Box>}
  </Flex>
}

export default Job