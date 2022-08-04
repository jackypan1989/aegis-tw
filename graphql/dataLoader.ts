import { Comment, Post, Profile, Vote } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../src/utils/prismaClient";

interface Model {
  id: string
}

// dataloader has its ids order, but prisma's findMany won't keep order
function keepOrder<T extends Model>(ids: readonly string[], items: T[]): T[] {
  return ids.map((id) => items.find(item => item.id === id)) as T[]
}

const dataloaders = {
  profileById: new DataLoader<string, Profile>(async ids => {
    const items = await prisma.profile.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  postById: new DataLoader<string, Post>(async (ids) => {
    const items = await prisma.post.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  voteById: new DataLoader<string, Vote>(async (ids) => {
    const items = await prisma.vote.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
  commentById: new DataLoader<string, Comment>(async ids => {
    const items = await prisma.comment.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    return keepOrder(ids, items)
  }),
}

export default dataloaders
