import { gql } from "@apollo/client"
import { Box, Center, Spinner } from "@chakra-ui/react"
import Head from "next/head"
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

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (!post) return <Center h='80vh'>找不到任何貼文</Center>

  return <>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Box bg='white'>
      <PostCard key={post?.id} post={post} showContent refetchQuery={GET_POST} />
      <CommentList postId={post.id} />
    </Box>
  </>
    
} 

export default PostDetail