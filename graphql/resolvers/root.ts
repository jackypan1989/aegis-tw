import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { differenceInHours } from 'date-fns'
import { Resolvers } from "../../codegen/graphql"
import { UserContext } from '../../src/pages/api/graphql'
import dataloaders from '../dataLoader'

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
    poster: (post) => {
      return dataloaders.profileById.load(post.posterId)
    },
    isVoted: async (post, _args, context) => {
      if (!context.user) return false
      const count = await context.prisma.vote.count({
        where: { 
          postId: post.id,
          voterId: context.user.id
        }
      })
      return count > 0
    }
  },
  Vote: {
    post: async (vote) => {
      return dataloaders.postById.load(vote.postId)
    },
  },
  Comment: {
    commenter: async (comment) => {
      return dataloaders.profileById.load(comment.postId)
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
    profiles: async (_, args, context) => {
      const where = {}

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.profile.findMany({
          ...findManyArgs,
          where: where
        }),
        () => context.prisma.profile.count(),
        args
      )
      return result
    },
    post: async (_, args, context) => {
      const { id } = args
      const result = await context.prisma.post.findUnique({
        where: {
          id: id
        }
      })
      return result
    },
    posts: async (_, args, context) => {
      const { filter } = args

      const where = filter?.onlyJobs
        ? { 
          OR: [
            { title: { contains: '徵才' }},
            { title: { contains: 'Job' }}
          ]
        } 
        : {}

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.post.findMany({
          ...findManyArgs,
          where: where,
          include: {
            poster: true
          },
          orderBy: {
            rankingScore: 'desc'
          }
        }),
        () => context.prisma.post.count(),
        args
      )
      return result
    },
    comments: async (_, args, context) => {
      const { filter } = args

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.comment.findMany({
          ...findManyArgs,
          where: {
            postId: filter?.postId
          },
          orderBy: {
            createdAt: 'desc'
          }
        }),
        () => context.prisma.comment.count(),
        args
      )
      return result
    }
  },
  Mutation: {
    updateProfile: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')

      const result = await context.prisma.profile.update({ 
        data: input,
        where: {
          id: input.id
        }
      })
      return result
    },
    createPost: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')

      const result = await context.prisma.post.create({ 
        data: { 
          posterId: context.user.id,
          title: input.title,
          url: input.url,
          content: input.content
        }
      })
      return result
    },
    viewPost: async (_, { input }, context) => {
      const { id } = input

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
    createVote: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')
      const { postId } = input

      // check if voted
      const count = await context.prisma.vote.count({
        where: {
          postId,
          voterId: context.user.id
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
            voterId: context.user.id,
          } 
        }),
        // update post
        context.prisma.post.update({
          data: {
            voteCount: {
              increment: 1
            },
            rankingScore: {
              set: getRankingScore(post.voteCount + 1, post.createdAt, post.viewCount)
            }
          },
          where: {
            id: postId
          }
        })
      ])
      
      return result
    },
    removePost: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')
      const { id } = input 

      const result = await context.prisma.post.delete({ 
        where: {
          id
        }
      })

      return result
    },
    removeVote: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')
      const { postId } = input 

      // check if voted
      const count = await context.prisma.vote.count({
        where: {
          postId,
          voterId: context.user.id
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
        // remove vote
        context.prisma.vote.delete({ 
          where: {
            postId_voterId: {
              postId,
              voterId: context.user.id
            },
          }
        }),
        // update post
        context.prisma.post.update({
          data: {
            voteCount: {
              decrement: 1
            },
            rankingScore: {
              set: getRankingScore(post.voteCount - 1, post.createdAt, post.viewCount)
            }
          },
          where: {
            id: postId
          }
        })
      ])
      
      return result
    },
    createComment: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')
      const { postId, content } = input 
      
      const [result] = await context.prisma.$transaction([
        // create comment
        context.prisma.comment.create({ 
          data: {
            postId,
            commenterId: context.user.id,
            content,
          } 
        }),
        // update post
        context.prisma.post.update({
          data: {
            commentCount: {
              increment: 1
            },
          },
          where: {
            id: postId
          }
        })
      ])

      return result
    },
    removeComment: async (_, { input }, context) => {
      if (!context.user) throw Error('You must login.')
      const { id } = input 

      // check if comment exist
      const comment = await context.prisma.comment.findUnique({
        where: {
          id
        }
      })
      if (!comment) throw Error('There is no comment for this id to remove.')
              
      const [result] = await context.prisma.$transaction([
        // remove comment
        context.prisma.comment.delete({ 
          where: {
            id
          }
        }),
        // update post
        context.prisma.post.update({
          data: {
            commentCount: {
              decrement: 1
            },
          },
          where: {
            id: comment.postId 
          }
        })
      ])

      return result
    }
  }
}

export default resolvers