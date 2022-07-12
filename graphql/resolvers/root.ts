import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { PrismaClient } from "@prisma/client"
import { Resolvers } from "../../codegen/graphql"


const prisma = new PrismaClient()

const resolvers: Resolvers = {  
  Post: {
    poster: async (parent) => {
      return prisma.profile.findUnique({
        where: { id: parent.posterId }
      })
    },
  },
  Query: {
    posts: async (_, args) => {
      const result = await findManyCursorConnection(
        (args) => prisma.post.findMany(args),
        () => prisma.post.count(),
        args
      )
      return result
    }
  },
  Mutation: {
    createPost: async (_, args) => {
      const { input } = args
      const post = await prisma.post.create({ 
        data: { 
          posterId: input.posterId,
          title: input.title,
          url: input.url,
          content: input.content
        }
      })
      return post
    },
    createVote: async (_, args) => {
      const { input } = args
      const vote = await prisma.vote.create({ 
        data: {
          postId: input.postId,
          voterId: input.voterId
        } 
      })
      return vote
    },
    createComment: async (_, args) => {
      const { input } = args
      const comment = await prisma.comment.create({ 
        data: {
          postId: input.postId,
          commenterId: input.commenterId,
          content: input.content
        } 
      })
      return comment
    }
  }
}

export default resolvers