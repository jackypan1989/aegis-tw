import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { Post } from '@prisma/client'
import { differenceInHours } from 'date-fns'
import { Resolvers } from "../../codegen/graphql"
import { Context } from '../../src/pages/api/graphql'

const getRankingScore = (post: Post, newVoteCount: number) => {
  const { createdAt, viewCount } = post
  const ageHours = differenceInHours(Date.now(), createdAt)
  // https://felx.me/2021/08/29/improving-the-hacker-news-ranking-algorithm.html
  const rs =  Math.pow(newVoteCount, 0.8) / Math.pow(ageHours + 2, 1.8) / (viewCount + 1)
  return rs
}

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
        (findManyArgs) => context.prisma.post.findMany({
          ...findManyArgs,
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
    createVote: async (_, args, context) => {
      const { input } = args
      
      // check if voted
      const count = await context.prisma.vote.count({
        where: {
          postId: input.postId,
          voterId: input.voterId
        }
      })
      if (count > 0) throw Error('You have already voted this post.')
        
      // get the post
      const post = await context.prisma.post.findUnique({
        where: {
          id: input.postId,
        }
      })
      if (!post) throw Error('There is no post with this id.') 
      
      const [vote] = await context.prisma.$transaction([
        // create vote
        context.prisma.vote.create({ 
          data: {
            postId: input.postId,
            voterId: input.voterId
          } 
        }),
        // update post
        context.prisma.post.update({
          data: {
            voteCount: post.voteCount + 1,
            rankingScore: getRankingScore(post, post.voteCount + 1)
          },
          where: {
            id: input.postId
          }
        })
      ])
      
      return vote
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
      
      const [vote] = await context.prisma.$transaction([
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
            rankingScore: getRankingScore(post, post.voteCount - 1)
          },
          where: {
            id: postId
          }
        })
      ])
      
      return vote
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