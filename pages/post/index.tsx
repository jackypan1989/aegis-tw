import { formatDistance } from 'date-fns'

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
    submitter: "jackypan1989@gmail.com",
    upvoteCount: 32,
    commentCount: 12,
    create: new Date()
  },
  {
    id: 2,
    title: "一探那些令人興奮的 React 18 三大功能",
    url: "https://jason-memo.dev/posts/react-18/",
    submitter: "jackypan1989@gmail.com",
    upvoteCount: 21,
    commentCount: 22,
    create: new Date()
  }
]

const PostIndex = () => {
  return posts.map(post => {
    return <div key={post.id}>
      <div>
        <a href={post.url}>{post.title}</a>
        <>{`(${new URL(post.url).hostname})`}</>
      </div>
      <div>{post.submitter} {formatDistance(post.create, new Date())}</div>
    </div>
  })
}

export default PostIndex