import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react"
import { useContext } from "react"
import { useListPostQuery } from "../../../codegen/graphql"
import PostCard, { POST_CARD } from "../../components/postCard"
import { I18nContext } from "../../i18n/i18n-react"
import { getI18nProps } from "../../utils/getI18nProps"

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
  const { LL } = useContext(I18nContext)
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

  return <Flex direction='column' alignItems='center' gap={{ base: 1, lg: 2 }}>
    {nodes.map(node => {
      return node && <PostCard key={node?.id} post={node} refetchQuery={LIST_POST}/>
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>{LL.COMPONENT.BUTTON.LOAD_MORE()}</Button>
    </Box>}
  </Flex>
}

export default PostIndex

export const getStaticProps = getI18nProps