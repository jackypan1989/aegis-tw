import { Box, Flex } from "@chakra-ui/react"
import { Post } from "../../codegen/graphql"
import PostCard from "../../components/postCard"

const posts: Post[] = [
  {
    id: 1,
    title: "React v18.0",
    url: "https://reactjs.org/blog/2022/03/29/react-v18.html",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 737,
    commentCount: 12,
    createdAt: new Date("2022-05-19 04:29:42")
  },
  {
    id: 2,
    title: "一探那些令人興奮的 React 18 三大功能",
    url: "https://jason-memo.dev/posts/react-18/",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 21,
    commentCount: 22,
    createdAt: new Date("2022-05-01 04:29:42")
  },
  {
    id: 3,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 4,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 5,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 6,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 7,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 8,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 9,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  },
  {
    id: 10,
    title: "在 AmazingTalker 開始建立 Component Library",
    url: "https://medium.com/amazingtalker-tech/building-a-component-library-at-amazingtalker-b9d46f1ce8d0",
    poster: { 
      id: 123,
      username: "jackypan1989",
    },
    upvoteCount: 1,
    commentCount: 22,
    createdAt: new Date("2022-05-19 12:29:42")
  }
]

const PostIndex = () => {
  return <Flex direction='column' alignItems='center' gap='8px'>
    {posts.map(post => {
      return <PostCard key={post.id} post={post} />
    })}
    <Box p='30px'>Pagination Placeholder</Box>
  </Flex>
}

export default PostIndex