import { Comment, Post, Profile, Vote } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../src/utils/prismaClient";

const dataloaders = {
  profileById: new DataLoader<string, Profile>((ids) =>
    prisma.profile.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })
  ),
  postById: new DataLoader<string, Post>((ids) =>
    prisma.post.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })
  ),
  voteById: new DataLoader<string, Vote>((ids) =>
    prisma.vote.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })
  ),
  commentById: new DataLoader<string, Comment>((ids) =>
    prisma.comment.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })
  )
}

export default dataloaders
