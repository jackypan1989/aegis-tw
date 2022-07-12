import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { Resolvers } from "../../codegen/graphql"
import { Context } from '../../src/pages/api/graphql'

const resolvers: Resolvers<Context> = {  
  Post: {
    poster: async (post, args, context) => {
      return context.prisma.profile.findUnique({
        where: { id: post.posterId }
      })
    },
    isVoted: async (post, args, context) => {
      const count = await context.prisma.vote.count({
        where: { 
          postId: post.id,
          voterId: context.user?.id
        }
      })
      return count > 0
    },
  },
  Vote: {
    post: async (vote, args, context) => {
      return context.prisma.post.findUnique({
        where: { id: vote.postId }
      })
    },
  },
  Query: {
    posts: async (_, args, context) => {
      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.post.findMany(findManyArgs),
        () => context.prisma.post.count(),
        args
      )
      return result
    }
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const { input } = args
      const result = await context.prisma.post.create({ 
        data: { 
          posterId: input.posterId,
          title: input.title,
          url: input.url,
          content: input.content
        }
      })
      return result
    },
    createVote: async (_, args, context) => {
      const { input } = args
      const result = await context.prisma.vote.create({ 
        data: {
          postId: input.postId,
          voterId: input.voterId
        } 
      })
      return result
    },
    createComment: async (_, args, context) => {
      const { input } = args
      const result = await context.prisma.comment.create({ 
        data: {
          postId: input.postId,
          commenterId: input.commenterId,
          content: input.content
        } 
      })
      return result
    },
    removeVote: async (_, args, context) => {
      const { filter } = args
      if (filter.postId && filter.voterId) {
        const result = await context.prisma.vote.delete({ 
          where: { 
            postId_voterId: {
              postId: filter.postId,
              voterId: filter.voterId
            }
          }
        }) 
        return result
      } else {
        throw Error('Argument Wrong!')
      }
    }
  }
}

export default resolvers