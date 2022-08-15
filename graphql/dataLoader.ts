import { Comment, Post, Profile, Vote } from ".prisma/client";
import DataLoader from "dataloader";
import { UserContext } from "../src/pages/api/graphql";

interface Model {
  id: string
}

// dataloader has its ids order, but prisma's findMany won't keep order
function keepOrder<T extends Model>(ids: readonly string[], items: T[]): T[] {
  return ids.map((id) => items.find(item => item.id === id)) as T[]
}

const dataloaders = {
  profileById: (context: UserContext) => new DataLoader<string, Profile>(async ids => {
    const items = await context.prisma.profile.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  postById: (context: UserContext) => new DataLoader<string, Post>(async (ids) => {
    const items = await context.prisma.post.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  voteById: (context: UserContext) => new DataLoader<string, Vote>(async (ids) => {
    const items = await context.prisma.vote.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  commentById: (context: UserContext) => new DataLoader<string, Comment>(async ids => {
    const items = await context.prisma.comment.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  isVoted: (context: UserContext) => new DataLoader<string, boolean>(async ids => {
    const items = await Promise.all(
      ids.map(id => new Promise<boolean>((resolve) => {
        context.prisma.vote.count({
          where: { 
            postId: id,
            voterId: context.user?.id
          }
        }).then(value => {
          resolve(value > 0)
        })
      }))
    )
    return items
  }),
}

export default dataloaders
