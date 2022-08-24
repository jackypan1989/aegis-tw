import { v4 as uuidv4 } from 'uuid';
import { Market, PrismaClient } from "../codegen/prisma/client";

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
        title: 'Post 1',
        voteCount: 2,
        createdAt: new Date(),
        viewCount: 1
      },
      {
        id: postId2,
        posterId: userId2,
        title: 'Post 2 - Job',
        voteCount: 1,
        createdAt: new Date(),
        viewCount: 1
      },
    ]
  })  

  await prisma.vote.createMany({
    data: [
      {
        id: uuidv4(),
        postId: postId1,
        voterId: myId
      },
      {
        id: uuidv4(),
        postId: postId1,
        voterId: userId1
      },
      {
        id: uuidv4(),
        postId: postId2,
        voterId: userId1
      },
    ]
  })

  await prisma.comment.createMany({
    data: [
      {
        id: uuidv4(),
        postId: postId1,
        commenterId: myId,
        content: 'Hello'
      }
    ]
  })

  await prisma.startup.createMany({
    data: [
      {
        id: startupId1,
        lastEditorId: myId,
        name: 'GoSkyAI',
        url: 'https://www.goskyai.com/',
        logo: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/137377586_740916019852994_7226491355791365076_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7Scfd5lsQ-oAX-5T61b&_nc_ht=scontent-tpe1-1.xx&oh=00_AT-3Df6O9piicasrRYsxCwGEXIurZ9lMvtjMhXcTDOec4w&oe=63293B50',
        description: 'GoSkyAI',
        markets: [Market.AI, Market.E_COMMERCE],
        foundedAt: new Date('2017-01-02'),
        teamSize: 20,
        valuation: 10000000,
        funding: 2000000,
        revenue: 3000,
        dau: 20000
      },
      {
        id: startupId2,
        lastEditorId: myId,
        name: 'GoFreight',
        url: 'https://www.gofreight.com/',
        logo: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/271609863_339990194793707_2054414662075315940_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CH32qXnfViwAX8kuNQv&_nc_ht=scontent-tpe1-1.xx&oh=00_AT-nWCI3407jN77Rq57rJSHqy6LqLtpWaBQFQXIOY7I3RA&oe=63096313',
        description: 'GoFreight',
        markets: [Market.AI, Market.LOGISTICS],
        foundedAt: new Date('2015-01-02'),
        teamSize: 120,
        valuation: 100000000,
        funding: 20000000,
        revenue: 300000,
        dau: undefined
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