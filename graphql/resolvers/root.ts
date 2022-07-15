import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { differenceInHours } from 'date-fns'
import { Resolvers } from "../../codegen/graphql"
import { UserContext } from '../../src/pages/api/graphql'

// https://felx.me/2021/08/29/improving-the-hacker-news-ranking-algorithm.html
const getRankingScore = (
  voteCount: number,
  createdAt: Date,
  viewCount: number,  
) => {
  const ageHours = differenceInHours(Date.now(), createdAt)
  const rankingScore =  Math.pow(voteCount, 0.8) / Math.pow(ageHours + 2, 1.8) / (viewCount + 1)
  return rankingScore
}

const resolvers: Resolvers<UserContext> = {  
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
    profile: async (_, args, context) => {
      const { id } = args
      const result = await context.prisma.profile.findUnique({
        where: {
          id: id
        }
      })
      return result
    },
    posts: async (_, args, context) => {
      const { filter } = args
      const where = filter?.title 
        ? { title: { contains: filter?.title } } 
        : {}

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.post.findMany({
          ...findManyArgs,
          where: where,
          orderBy: {
            rankingScore: 'desc'
          }
        }),
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
    viewPost: async (_, args, context) => {
      const { filter } = args
      const { id } = filter

      // get the post
      const post = await context.prisma.post.findUnique({
        where: {
          id: id
        }
      })
      if (!post) throw Error('There is no post with this id.') 

      const result = await context.prisma.post.update({
        data: {
          viewCount: post.viewCount + 1,
          rankingScore: getRankingScore(post.voteCount, post.createdAt, post.viewCount + 1)
        },
        where: {
          id
        }
      })
      return result
    },
    createVote: async (_, args, context) => {
      const { input } = args
      const { postId, voterId } = input

      // check if voted
      const count = await context.prisma.vote.count({
        where: {
          postId,
          voterId
        }
      })
      if (count > 0) throw Error('You have already voted this post.')
        
      // get the post
      const post = await context.prisma.post.findUnique({
        where: {
          id: postId
        }
      })
      if (!post) throw Error('There is no post with this id.') 
      
      const [result] = await context.prisma.$transaction([
        // create vote
        context.prisma.vote.create({ 
          data: {
            postId,
            voterId,
          } 
        }),
        // update post
        context.prisma.post.update({
          data: {
            voteCount: post.voteCount + 1,
            rankingScore: getRankingScore(post.voteCount + 1, post.createdAt, post.viewCount)
          },
          where: {
            id: postId
          }
        })
      ])
      
      return result
    },
    removeVote: async (_, args, context) => {
      const { filter } = args
      const { postId, voterId } = filter 

      // check arguments
      if (!postId || !voterId) throw Error('You need both postId and voteId.')

      // check if voted
      const count = await context.prisma.vote.count({
        where: {
          postId,
          voterId
        }
      })
      if (count === 0) throw Error('There is no vote for this id to remove.')
        
      // get the post
      const post = await context.prisma.post.findUnique({
        where: {
          id: postId,
        }
      })
      if (!post) throw Error('There is no post with this id.') 
      
      const [result] = await context.prisma.$transaction([
        // delete vote
        context.prisma.vote.delete({ 
          where: {
            postId_voterId: {
              postId,
              voterId,
            }
          }
        }),
        // update post
        context.prisma.post.update({
          data: {
            voteCount: post.voteCount - 1,
            rankingScore: getRankingScore(post.voteCount - 1, post.createdAt, post.viewCount)
          },
          where: {
            id: postId
          }
        })
      ])
      
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
    }
  }
}

export default resolvers