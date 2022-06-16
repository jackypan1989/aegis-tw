import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Link, StackDivider, VStack, Text } from '@chakra-ui/react'
import { formatDistanceToNowStrict } from 'date-fns'

type Post = {
  id: number,
  title: string,
  url: string,
  submitter: string,
  upvoteCount: number,
  commentCount: number,
  create: Date
}

const posts: Post[] = [
  {
    id: 1,
    title: "React v18.0",
    url: "https://reactjs.org/blog/2022/03/29/react-v18.html",
    submitter: "jackypan1989",
    upvoteCount: 374,
    commentCount: 12,
    create: new Date("2022-05-19 04:29:42")
  },
  {
    id: 2,
    title: "一探那些令人興奮的 React 18 三大功能",
    url: "https://jason-memo.dev/posts/react-18/",
    submitter: "jackypan1989",
    upvoteCount: 21,
    commentCount: 22,
    create: new Date("2022-05-01 04:29:42")
  },
  {
    id: 3,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    submitter: "jackypan1989",
    upvoteCount: 1,
    commentCount: 22,
    create: new Date("2022-05-19 12:29:42")
  }
]

type PostEntryProps = {
  post: Post
}

const PostEntry = (props: PostEntryProps) => {
  const { post } = props

  return <HStack w='100%'>
    <VStack minWidth='30'>
      <ArrowUpIcon />
      <Text>{post.upvoteCount}</Text>
    </VStack>
    <VStack alignItems='flex-start' spacing='0'>
      <Link href={post.url} target='_blank'>
        <Heading size='sm' display='inline'>{post.title}</Heading>
        <Text display='inline' size='8' ml='1'>{`(${new URL(post.url).hostname})`}</Text>
      </Link>
      <HStack fontSize='sm' fontStyle={{ color: 'lightgrey' }}>
        <Box>{post.commentCount} Reply</Box>
        <Box>{formatDistanceToNowStrict(post.create)}</Box> 
        <Box>{post.submitter}</Box>
      </HStack>
    </VStack>
  </HStack>
}

const PostIndex = () => {
  return <VStack
    divider={<StackDivider />}
    m='3'
  >
    {posts.map(post => {
      return <PostEntry key={post.id} post={post} />
    })}
  </VStack>
}

export default PostIndex