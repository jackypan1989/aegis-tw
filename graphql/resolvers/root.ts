import { Prisma, PrismaClient, Profile } from "@prisma/client"
import { Resolvers } from "../../codegen/graphql"

const prisma = new PrismaClient()

const resolvers: Resolvers = {  
  Post: {
    poster: async (parent) => {
      return prisma.profile.findUnique({
        where: { id: parent.posterId }
      }) as Prisma.Prisma__ProfileClient<Profile>
    }
  },
  Query: {
    posts: async (_, args) => {
      const { cursorArgs, filter, orderBy } = args
      // const { first, after, last, before } = cursorArgs

      const posts = await prisma.post.findMany({})

      return {
        edges: posts.map(post => ({ cursor: "", node: post })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "",
          endCursor: ""
        }
      }
    }
  },
  Mutation: {
    addPost: async (_, args) => {
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
    addVote: async (_, args) => {
      const { input } = args
      const vote = await prisma.vote.create({ 
        data: {
          postId: input.postId,
          voterId: input.voterId
        } 
      })
      return vote
    },
    addComment: async (_, args) => {
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