import {
  findManyCursorConnection
} from '@devoxa/prisma-relay-cursor-connection'
import { differenceInHours } from 'date-fns'
import { Resolvers } from "../../codegen/graphql"
import { Prisma } from '../../codegen/prisma/client'
import { UserContext } from '../../src/pages/api/graphql'
import dataloaders from '../dataLoader'

import Metascraper from 'metascraper'
import MetascraperTitle from 'metascraper-title'
import { fetch } from 'undici'

// https://felx.me/2021/08/29/improving-the-hacker-news-ranking-algorithm.html
const getRankingScore = (
  voteCount: number,
  createdAt: Date,
  viewCount: number,  
) => {
  const ageHours = differenceInHours(Date.now(), createdAt)
  const rankingScore =  Math.pow(voteCount + 0.0001, 0.8) / Math.pow(ageHours + 2, 1.8) / (viewCount + 1) * 100000
  return rankingScore
}

const metascraper = Metascraper([
  MetascraperTitle()
])

const resolvers: Resolvers<UserContext> = {  
  Post: {
    poster: (post, _args, context) => {
      return dataloaders.profileById(context).load(post.posterId)
    },
    isVoted: (post, _args, context) => {
      if (!context.user) return false
      return dataloaders.isVoted(context).load(post.id)
    }
  },
  Vote: {
    post: (vote, _args, context) => {
      return dataloaders.postById(context).load(vote.postId)
    },
  },
  Comment: {
    commenter: (comment, _args, context) => {
      return dataloaders.profileById(context).load(comment.commenterId)
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
      const { filter } = args
      const where: Prisma.ProfileWhereInput = {}

      if (filter?.roles?.length ?? 0 > 0) where.roles = { hasSome: filter?.roles }
      if (filter?.markets?.length ?? 0 > 0) where.markets = { hasSome: filter?.markets }

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.profile.findMany({
          ...findManyArgs,
          where
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
            { title: { contains: 'job' }},
            { title: { contains: 'Job' }},
            { title: { contains: 'hiring' }},
            { title: { contains: 'Hiring' }},
            { title: { contains: '徵才' }},
            { title: { contains: '應徵' }},
            { title: { contains: '面試' }},  
          ]
        } 
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
    },
    startup: async (_, args, context) => {
      const { id } = args
      const result = await context.prisma.startup.findUnique({
        where: {
          id: id
        }
      })
      return result
    },
    startups: async (_, args, context) => {
      const { filter } = args
      const where: Prisma.StartupWhereInput = {}

      if (filter?.markets?.length ?? 0 > 0) where.markets = { hasSome: filter?.markets }

      const result = await findManyCursorConnection(
        (findManyArgs) => context.prisma.startup.findMany({
          ...findManyArgs,
          where,
        }),
        () => context.prisma.startup.count(),
        args
      )
      return result
    }
  },
  Mutation: {
    updateProfile: async (_, { input }, context) => {
      if (!context.user) throw Error('You must sign in.')

      const result = await context.prisma.profile.update({ 
        data: input,
        where: {
          id: input.id
        }
      })
      return result
    },
    createPost: async (_, { input }, context) => {
      if (!context.user) throw Error('You must sign in.')

      const result = await context.prisma.post.create({ 
        data: { 
          posterId: context.user.id,
          title: input.title,
          url: input.url,
          content: input.content,
          rankingScore: getRankingScore(0, new Date(), 0)
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
      if (!context.user) throw Error('You must sign in.')
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
      if (!context.user) throw Error('You must sign in.')
      const { id } = input 

      const result = await context.prisma.post.delete({ 
        where: {
          id
        }
      })

      return result
    },
    removeVote: async (_, { input }, context) => {
      if (!context.user) throw Error('You must sign in.')
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
      if (!context.user) throw Error('You must sign in.')
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
      if (!context.user) throw Error('You must sign in.')
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
    },
    createStartup: async (_, { input }, context) => {
      if (!context.user) throw Error('You must sign in.')

      const result = await context.prisma.startup.create({ 
        data: { 
          name: input.name,
          url: input.url,
          logo: input.logo,
          description: input.description,
          teamSize: input.teamSize,
          funding: input.funding,
          valuation: input.valuation,
          revenue: input.revenue,
          dau: input.dau,
          markets: input.markets,
          foundedAt: input.foundedAt,
          lastEditorId: context.user.id
        }
      })
      return result
    },
    updateEveryPostRankingScore: async (_, args, context) => {
      const posts = await context.prisma.post.findMany()

      await Promise.all(posts.map(post => {
        const rankingScore = getRankingScore(
          post.voteCount,
          post.createdAt,
          post.viewCount,
        )

        return context.prisma.post.update({
          where: {
            id: post.id
          },
          data: {
            rankingScore
          }
        })
      }))

      return true
    },
    getUrlMetadata: async (_, { input }) => {
      const { url } = input
      
      try {
        const res = await fetch(url)
        const text = await res.text()  
        const metadata = await metascraper({ url: url, html: text })
        return {
          url,
          title: metadata.title
        }
      } catch {
        return {
          url,
          title: ""
        }
      }
    }
  }
}

export default resolvers