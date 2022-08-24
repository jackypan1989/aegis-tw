import { gql } from "@apollo/client"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, IconButton, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import { useListPostQuery } from "../../../codegen/graphql"
import { NextLink } from "../../components/exportUtils"
import PostCard, { POST_CARD } from "../../components/postCard"

export const defaultUuid = "00000000-0000-0000-0000-000000000000"

export const LIST_POST = gql`
  ${POST_CARD}
  
  query listPost (
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

const PostIndex = () => {
  const { data, loading, error, fetchMore } = useListPostQuery({
    variables: {
      first: 10
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
          after: pageInfo.endCursor,
        }
      })
    }
  }

  return <Box>
    <Head>
      <title>動態 | Aegis | 臺灣人軟體新創社群</title>
    </Head>
    <Flex direction='column' alignItems='center' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <PostCard key={node?.id} post={node} refetchQuery={LIST_POST}/>
      })}
      {hasNextPage && <Box p={{ base: 4, lg: 8 }}>
        <Button onClick={onLoadMore}>Load More</Button>
      </Box>}
      <Box
        position='fixed'
        right={{ base: 4, lg: 16 }}
        bottom={{ base: 16, lg: 32 }}
      >
        <NextLink href='/post/create'>
          <IconButton 
            colorScheme='gray'
            borderRadius='50%'
            boxSize='6'
            size={{ base: 'md', lg: 'lg' }}
            icon={<AddIcon />} 
            aria-label="create"
          />  
        </NextLink>
      </Box>
    </Flex>
  </Box>
}

export default PostIndex
