import { gql } from "@apollo/client"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, Heading, Icon, IconButton, Spacer, Spinner, Text } from "@chakra-ui/react"
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
      <title>動態 | Aegis | 台灣人軟體新創社群</title>
    </Head>
    <Flex p={{ base: 4, lg: 8 }} direction='column'>
      <Flex>
        <Heading size='lg'>動態消息 🗞️</Heading>
        <Spacer />
        <NextLink href='/post/create' passHref>
          <IconButton ml='3' size='sm' icon={<Icon as={AddIcon} />} aria-label="Add"></IconButton>
        </NextLink>
      </Flex>
      <Text color='gray.500' mt='3'>你可以張貼新聞連結、發問問題，點擊標題可以查看詳情，也可以留言互動。</Text>
    </Flex>
    <Flex direction='column' alignItems='center' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <PostCard key={node?.id} post={node} refetchQuery={LIST_POST}/>
      })}
      {hasNextPage && <Box p={{ base: 4, lg: 8 }}>
        <Button onClick={onLoadMore}>Load More</Button>
      </Box>}
    </Flex>
  </Box>
}

export default PostIndex
