import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "../codegen/prisma/client";

const prisma = new PrismaClient()
const myId = 'd27b6a7d-9b95-467a-a9b9-896827c750c5'
const userId1 = uuidv4()
const userId2 = uuidv4()
const postId1 = uuidv4()
const postId2 = uuidv4()
const startupId1 = uuidv4()
const startupId2 = uuidv4()

async function main() {
  await prisma.profile.createMany({
    data: [
      {
        id: myId,
        username: 'jacky',
        email: 'jackypan1989@gmail.com'
      },
      {
        id: userId1,
        username: 'user1',
        email: 'user1@gmail.com'
      },
      {
        id: userId2,
        username: 'user2',
        email: 'user2@gmail.com'
      },
    ]
  })

  await prisma.post.createMany({
    data: [
      {
        id: postId1,
        posterId: userId1,
        title: 'Post 1'
      },
      {
        id: postId2,
        posterId: userId2,
        title: 'Post 2'
      },
    ]
  })  

  await prisma.startup.createMany({
    data: [
      {
        id: startupId1,
        name: 'Gogoro'
      },
      {
        id: startupId2,
        name: 'Appier'
      },
    ]
  }) 
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })