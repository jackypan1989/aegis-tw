import { gql } from "@apollo/client"
import { Box, Flex } from "@chakra-ui/react"
import { useListPostQuery } from "../../codegen/graphql"
import PostCard from "../../components/postCard"

export const LIST_POST = gql`
  query listPost {
    postCollection(
      first: 30
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          url
          createdAt
          poster {
            id
            username
          }
        }
      }
    }
  }
`

const PostIndex = () => {
  const { data, loading, error } = useListPostQuery()
  
  if (loading) return <Box>loading</Box>
  if (error) return <Box>{error.message}</Box>

  return <Flex direction='column' alignItems='center' gap='8px'>
    {data?.postCollection?.edges.map(edge => {
      return edge.node && <PostCard key={edge.cursor} post={edge.node} />
    })}
    <Box p='30px'>Pagination Placeholder</Box>
  </Flex>
}

export default PostIndex