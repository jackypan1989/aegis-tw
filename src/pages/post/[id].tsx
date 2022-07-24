import { gql } from "@apollo/client"
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useGetPostQuery } from "../../../codegen/graphql"
import CommentList from "../../components/commentList"
import PostCard, { POST_CARD } from "../../components/postCard"

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

  if (loading) return <Box>Loading ...</Box>
  if (!post) return <Box>Can not find any post.</Box>

  return <Box bg='white'>
    <PostCard key={post?.id} post={post} refetchQuery={GET_POST} />
    <CommentList postId={post.id} />
  </Box>
} 

export default PostDetail