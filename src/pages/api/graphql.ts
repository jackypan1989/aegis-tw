import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getUser, User } from '@supabase/auth-helpers-nextjs';
import { PrismaClient } from '../../../codegen/prisma/client';
import resolvers from '../../../graphql/resolvers/root';
import { prisma } from '../../utils/prismaClient';

import typeDefs from '../../../graphql/typeDefs';

type ServerContext = {
  req: NextApiRequest
  res: NextApiResponse
}

export type UserContext = {
  user: User | null,
  prisma: PrismaClient
}

export default createServer<ServerContext, UserContext>({ 
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  context: async (ctx) => {
    const { user } = await getUser(ctx)

    return {
      user: user,
      prisma: prisma
    }
  }
})

export const config = {
  runtime: 'experimental-edge',
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
}