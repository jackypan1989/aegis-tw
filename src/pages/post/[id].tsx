import { gql } from "@apollo/client"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useGetPostQuery } from "../../../codegen/graphql"
import CommentList from "../../components/commentList"
import PostCard, { POST_CARD } from "../../components/postCard"
import { getI18nProps } from "../../utils/getI18nProps"

export const GET_POST = gql`
  ${POST_CARD}
  
  query getPost($id: ID!) {
    post(id: $id) {
      ...PostCard
    }
  }
`

const PostDetail = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data, loading } = useGetPostQuery({
    variables: {
      id
    }
  })

  const post = data?.post

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (!post) return <Center h='80vh'>Can not find any post.</Center>

  return <Box bg='white'>
    <PostCard key={post?.id} post={post} refetchQuery={GET_POST} />
    <CommentList postId={post.id} />
  </Box>
} 

export default PostDetail

export const getServerSideProps = getI18nProps