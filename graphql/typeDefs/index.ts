import Comment from './comment.gql'
import Common from './common.gql'
import Post from './post.gql'
import Profile from './profile.gql'
import Vote from './vote.gql'

const typeDefs = [
  Common,
  Profile,
  Post,
  Vote,
  Comment
]

export default typeDefs